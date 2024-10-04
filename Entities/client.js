const pool = require('../Database/db');

class Client {
    constructor(id = null, name, phone, postingConsent) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.postingConsent = postingConsent;
    }

    static async create(name, phone, postingConsent) {
        const [result] = await pool.query(
            'INSERT INTO client (name, phone, postingConsent) VALUES (?, ?, ?)',
            [name, phone, postingConsent]
        );
        return result.insertId;
    }

    static async read(id) {
        const [rows] = await pool.query('SELECT * FROM client WHERE id = ?', [id]);
        if (rows.length > 0) {
            const { id, name, phone, postingConsent } = rows[0];
            return new Client(id, name, phone, postingConsent);
        }
        return null;
    }

    static async update(id, name, phone, postingConsent) {
        await pool.query(
            'UPDATE client SET name = ?, phone = ?, postingConsent = ? WHERE id = ?',
            [name, phone, postingConsent, id]
        );
    }

    static async delete(id) {
        await pool.query('DELETE FROM client WHERE id = ?', [id]);
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM client');
        return rows.map(row => new Client(row.id, row.name, row.phone, row.postingConsent));
    }
}

module.exports = Client;
