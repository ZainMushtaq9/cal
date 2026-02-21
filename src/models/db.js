const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const dbDir = path.dirname(dbPath);

// Ensure directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

console.log('Connected to the SQLite database. Ensuring tables exist...');

db.serialize(() => {
  // Calculators Table
  db.run(`
      CREATE TABLE IF NOT EXISTS calculators (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        seo_title TEXT,
        description TEXT,
        formula_json TEXT NOT NULL,
        variables_json TEXT NOT NULL,
        last_validated DATETIME,
        validation_status TEXT DEFAULT 'pending' 
      )
    `);

  // Validation Logs Table
  db.run(`
      CREATE TABLE IF NOT EXISTS validation_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        calculator_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        groq_response TEXT,
        is_valid BOOLEAN,
        issues_found TEXT,
        FOREIGN KEY (calculator_id) REFERENCES calculators(id)
      )
    `);

  // Tax Brackets Table
  db.run(`
      CREATE TABLE IF NOT EXISTS tax_brackets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        country_code TEXT NOT NULL,
        year INTEGER NOT NULL,
        bracket_data_json TEXT NOT NULL,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

  console.log('Database tables initialized or verified.');
});

module.exports = db;
