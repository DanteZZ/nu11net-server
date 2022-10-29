import sqlite3 from "sqlite3";
import logger from "../modules/logger";

if (!global.DB) {
  class ADO {
    constructor() {
      this.db = new sqlite3.Database(process.env.DB_FILE);
    }
    run(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.run(sql, params, function (err) {
          if (err) {
            logger.error("Error running sql " + sql);
            logger.error(err);
            reject(err);
          } else {
            resolve({ id: this.lastID });
          }
        });
      });
    }
    get(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.get(sql, params, (err, result) => {
          if (err) {
            logger.error("Error running sql: " + sql);
            logger.error(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, rows) => {
          if (err) {
            logger.error("Error running sql: " + sql);
            logger.error(err);
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  }

  global.DB = new ADO();
}

export default global.DB;
