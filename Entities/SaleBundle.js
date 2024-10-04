const mysql = require('mysql2');

class SaleBundleDAO {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  /**
   * Connects to the database.
   * @returns {Promise<void>} A promise that resolves when the
   *  connection is established.
   */
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
   * Creates a new SaleBundle in the database.
   * @param {*} expiration The expiration date of the SaleBundle.
   * @returns {Promise<number>} The id of the newly created SaleBundle.
   */
  insertSaleBundle(expiration) {
    const query = 'INSERT INTO SaleBundle (expiration) VALUES (?)';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [expiration], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  /**
   * Retrieves a SaleBundle by its ID.
   * @param {number} id The ID of the SaleBundle.
   * @returns {Promise<Object>} The SaleBundle object.
   */
  getSaleBundleById(id) {
    const query = 'SELECT * FROM SaleBundle WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }

  /**
   * Updates a SaleBundle's expiration date.
   * @param {number} id The ID of the SaleBundle.
   * @param {*} expiration The new expiration date.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   */
  updateSaleBundle(id, expiration) {
    const query = 'UPDATE SaleBundle SET expiration = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [expiration, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }

  /**
   * Deletes a SaleBundle by its ID.
   * @param {number} id The ID of the SaleBundle.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  deleteSaleBundle(id) {
    const query = 'DELETE FROM SaleBundle WHERE id = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

module.exports = SaleBundleDAO;
