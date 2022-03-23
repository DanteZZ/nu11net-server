import sqlite3 from "sqlite3"

if (!global.DB) {
    global.DB = new sqlite3.Database(process.env.DB_FILE);
}

export default global.DB;