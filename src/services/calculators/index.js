const { registerCalculator } = require('../formulaRegistry');
const db = require('../../models/db');
const financeCalculators = require('./finance');
const taxCalculators = require('./tax');
const salaryCalculators = require('./salary');
const educationCalculators = require('./education');
const healthCalculators = require('./health');
const utilityCalculators = require('./utility');

function initializeCalculators() {
    const allCalculators = [
        ...financeCalculators,
        ...taxCalculators,
        ...salaryCalculators,
        ...educationCalculators,
        ...healthCalculators,
        ...utilityCalculators
    ];

    allCalculators.forEach(calc => {
        registerCalculator(calc);

        db.run(
            `INSERT OR IGNORE INTO calculators (name, slug, category, seo_title, description, formula_json, variables_json)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [calc.name, calc.slug, calc.category, calc.seo_title, calc.description, calc.formula, JSON.stringify(calc.variables)]
        );
    });

    console.log(`Registered ${allCalculators.length} calculators.`);
}

module.exports = { initializeCalculators };
