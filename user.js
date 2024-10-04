const pool = require('./db');

class User {
    constructor(id = null, rol, name, email) {
        this.id = id;
        this.rol = rol;
        this.name = name;
        this.email = email;
    }

    static async create(rol, name, email) {
        const [result] = await pool.query(
            'INSERT INTO user (rol, name, email) VALUES (?, ?, ?)', [rol, name, email]
        );
        return result.insertId;
    }

    static async read(id) {
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        if (rows.length > 0) {
            const { id, rol, name, email } = rows[0];
            return new User(id, rol, name, email);
        }
        return null;
    }

    static async update(id, rol, name, email) {
        await pool.query(
            'UPDATE user SET rol = ?, name = ?, email = ? WHERE id = ?',
            [rol, name, email, id]
        );
    }

    static async delete(id) {
        await pool.query('DELETE FROM user WHERE id = ?', [id]);
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM user');
        return rows.map(row => new User(row.id, row.rol, row.name, row.email));
    }
}

module.exports = User;
