const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { formulaRegistry } = require('../services/formulaRegistry');

// View Admin Dashboard
router.get('/', (req, res) => {
    // We would fetch statistics from db here
    res.render('admin/dashboard', {
        title: 'Admin Dashboard',
        calculators: Object.values(formulaRegistry)
    });
});

// GET all calculators from DB
router.get('/api/calculators', (req, res) => {
    db.all('SELECT * FROM calculators', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET validation logs
router.get('/api/logs', (req, res) => {
    db.all(`
        SELECT l.*, c.name FROM validation_logs l 
        LEFT JOIN calculators c ON l.calculator_id = c.id 
        ORDER BY timestamp DESC LIMIT 100
    `, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET tax brackets
router.get('/api/tax-brackets', (req, res) => {
    db.all('SELECT * FROM tax_brackets', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
