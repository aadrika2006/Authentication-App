const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');


const DB_PATH = path.resolve(__dirname, 'data.sqlite');
const MIGRATION_PATH = path.resolve(__dirname, 'migrations', 'init.sql');


const db = new Database(DB_PATH);


// Run migrations if needed
const mig = fs.readFileSync(MIGRATION_PATH, 'utf8');
db.exec(mig);


module.exports = db;