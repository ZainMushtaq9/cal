const express = require('express');
const router = express.Router();
const db = require('../models/db');

// --- Central Formula Registry ---
const formulaRegistry = {};

/**
 * Register a calculator module
 * @param {Object} calculatorDef 
 * { slug, name, category, calculateFn, variables }
 */
function registerCalculator(calculatorDef) {
    formulaRegistry[calculatorDef.slug] = calculatorDef;
}

// Get all registered calculators (internal/memory config)
router.get('/registry', (req, res) => {
    res.json(Object.values(formulaRegistry));
});

module.exports = {
    router,
    formulaRegistry,
    registerCalculator
};
