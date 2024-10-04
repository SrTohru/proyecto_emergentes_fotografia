const pool = require('../Database/db');

class Appointment {
    constructor(id = null, date, hours, place, description) {
        this.id = id;
        this.date = date;
        this.hours = hours;
        this.place = place;
        this.description = description;
    }

    static async create(date, hours, place, description) {
        const [result] = await pool.query(
            'INSERT INTO appointment (date, hours, place, description) VALUES (?, ?, ?, ?)',
            [date, hours, place, description]
        );
        return result.insertId;
    }

    static async read(id) {
        const [rows] = await pool.query('SELECT * FROM appointment WHERE id = ?', [id]);
        if (rows.length > 0) {
            const { id, date, hours, place, description } = rows[0];
            return new Appointment(id, date, hours, place, description);
        }
        return null;
    }

    static async update(id, date, hours, place, description) {
        await pool.query(
            'UPDATE appointment SET date = ?, hours = ?, place = ?, description = ? WHERE id = ?',
            [date, hours, place, description, id]
        );
    }

    static async delete(id) {
        await pool.query('DELETE FROM appointment WHERE id = ?', [id]);
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM appointment');
        return rows.map(row => new Appointment(row.id, row.date, row.hours, row.place, row.description));
    }
}

module.exports = Appointment;
