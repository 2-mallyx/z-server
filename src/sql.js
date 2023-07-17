const sqlite3 = require('sqlite3').verbose();

class SQL {
    constructor() {
        this.db = new sqlite3.Database('./z.db', (err) => {
            if (err) {
                console.error('new' + err.message);
            }
            console.log('Connected to the database.');
        });

        this.db.run('CREATE TABLE IF NOT EXISTS endpoints (uuid TEXT PRIMARY KEY, ts_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ts_changed TIMESTAMP, auth INTERGER)', (err) => {
            if (err) {
                console.error('table' + err.message);
            }
            console.log('Table created successfully.');
        });
    }

    async addEndpoint(machineGuid) {
        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO endpoints (uuid) VALUES (?)', [machineGuid], (err) => {
                if (err) {
                    console.error('add' + err.message);
                    reject(err);
                }
                console.log('Row added successfully.');
                resolve();
            });
        });
    }
}

const sql = new SQL();
module.exports = sql;

