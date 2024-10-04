const mysql = require('mysql2');

class ItemDAO {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * Disconnects from the database.
   * @returns {Promise<void>} A promise that resolves when the
   * connection is closed.
   */
  disconnect() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  /**
   * Creates a new item in the database.
   * @param {*} name The name of the item.
   * @param {*} description The description of the item.
   * @returns {Promise<number>} The id of the newly created item.
   */
  createItem(name, description) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Item (name, description) VALUES (?, ?)';
      this.connection.query(query, [name, description], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.insertId);
      });
    });
  }

  /**
   * Getes an item from the database by its id.
   * @param {*} id The id of the item to get.
   * @returns {Promise<Object>} The item with the given id.
   */
  getItemById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Item WHERE id = ?';
      this.connection.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }

  /**
   *  Updates an item in the database.
   * @param {*} id The id of the item to update
   * @param {*} name The new name of the item
   * @param {*} description The new description of the item
   * @returns {Promise<number>} The number of affected rows.
   */
  updateItem(id, name, description) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Item SET name = ?, description = ? WHERE id = ?';
      this.connection.query(query, [name, description, id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.affectedRows);
      });
    });
  }

  /**
   * Deletes an item from the database.
   * @param {*} id The id of the item to delete.
   * @returns {Promise<number>} The number of affected rows.
   */
  deleteItem(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Item WHERE id = ?';
      this.connection.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.affectedRows);
      });
    });
  }
}

module.exports = ItemDAO;
