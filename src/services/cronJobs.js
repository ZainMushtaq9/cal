const cron = require('node-cron');
const db = require('../models/db');
const { validateFormula } = require('./groqService');

function initCronJobs() {
    // Run validation once a month on the 1st day at midnight
    // For testing/demonstration, you can change this to '* * * * *' (every minute)
    cron.schedule('0 0 1 * *', async () => {
        console.log('Running monthly Groq formula validation cron job');

        try {
            const calculators = await new Promise((resolve, reject) => {
                db.all('SELECT * FROM calculators', [], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });

            for (const calc of calculators) {
                // To avoid rate limiting, we wait a few seconds between requests
                console.log(`Validating ${calc.name}...`);
                await validateFormula(calc);
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            console.log('Monthly validation complete.');
        } catch (error) {
            console.error('Cron job error:', error);
        }
    });
}

module.exports = { initCronJobs };
