const pool = require('../Database/db');

class Bundle {
    constructor(id = null, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    static async create(name, price) {
        const [result] = await pool.query(
            'INSERT INTO bundle (name, price) VALUES (?, ?)', [name, price]
        );
        return result.insertId;
    }

    static async read(id) {
        const [rows] = await pool.query('SELECT * FROM bundle WHERE id = ?', [id]);
        if (rows.length > 0) {
            const { id, name, price } = rows[0];
            return new Bundle(id, name, price);
        }
        return null;
    }

    static async update(id, name, price) {
        await pool.query(
            'UPDATE bundle SET name = ?, price = ? WHERE id = ?',
            [name, price, id]
        );
    }

    static async delete(id) {
        await pool.query('DELETE FROM bundle WHERE id = ?', [id]);
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM bundle');
        return rows.map(row => new Bundle(row.id, row.name, row.price));
    }
}

module.exports = Bundle;
