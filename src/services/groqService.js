const { Groq } = require('groq-sdk');
const db = require('../models/db');
require('dotenv').config();

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

/**
 * Validate a specific calculator formula via Groq
 */
async function validateFormula(calculator) {
    if (!groq) {
        console.warn('GROQ_API_KEY is not set. Skipping validation.');
        return null;
    }

    const prompt = `
    Validate the following financial/utility formula for correctness and industry compliance. 
    Identify errors, outdated tax rules, or incorrect assumptions based on typical mathematical or financial standards. 
    Provide corrections if necessary. Respond ONLY in valid minified JSON.
    
    Calculator Name: ${calculator.name}
    Formula: ${calculator.formula_json}
    Variables List: ${calculator.variables_json}
    
    Response JSON format Required:
    {
      "is_valid": true/false,
      "issues_found": ["issue 1", "issue 2"],
      "recommended_changes": "string",
      "confidence_score": "high/medium/low"
    }
    `;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-8b-instant', // Fast, structured JSON capable model (Totally Free tier)
            temperature: 0.1, // Low temp for logical validation
            response_format: { type: "json_object" }
        });

        const resultText = chatCompletion.choices[0]?.message?.content;
        const resultJson = JSON.parse(resultText);

        // Update Database logs
        await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO validation_logs (calculator_id, groq_response, is_valid, issues_found) VALUES (?, ?, ?, ?)`,
                [calculator.id, resultText, resultJson.is_valid ? 1 : 0, JSON.stringify(resultJson.issues_found)],
                function (err) { if (err) reject(err); else resolve(); }
            );
        });

        // Update Calculator status
        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE calculators SET last_validated = CURRENT_TIMESTAMP, validation_status = ? WHERE id = ?`,
                [resultJson.is_valid ? 'valid' : 'needs_review', calculator.id],
                function (err) { if (err) reject(err); else resolve(); }
            );
        });

        return resultJson;

    } catch (error) {
        console.error(`Validation failed for ${calculator.name}:`, error);

        // Log the error
        try {
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT INTO validation_logs (calculator_id, groq_response, is_valid, issues_found) VALUES (?, ?, ?, ?)`,
                    [calculator.id, JSON.stringify({ error: error.message }), 0, '["API Error"]'],
                    function (err) { if (err) reject(err); else resolve(); }
                );
            });

            await new Promise((resolve, reject) => {
                db.run(
                    `UPDATE calculators SET validation_status = 'error' WHERE id = ?`,
                    [calculator.id],
                    function (err) { if (err) reject(err); else resolve(); }
                );
            });
        } catch (e) { console.error("DB error during fail log", e); }

        return null;
    }
}

module.exports = {
    validateFormula
};
