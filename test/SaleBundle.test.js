const mysql = require('mysql2');
const SaleBundleDAO = require('../Entities/SaleBundle');

jest.mock('mysql2', () => {
  const mConnection = {
    connect: jest.fn(),
    end: jest.fn(),
    query: jest.fn(),
  };
  return {
    createConnection: jest.fn(() => mConnection),
  };
});

describe('SaleBundleDAO', () => {
  let dao;
  let connection;

  beforeEach(() => {
    connection = mysql.createConnection();
    dao = new SaleBundleDAO({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('connect should resolve when connection is successful', async () => {
    connection.connect.mockImplementation((callback) => callback(null));
    await expect(dao.connect()).resolves.toBeUndefined();
    expect(connection.connect).toHaveBeenCalledTimes(1);
  });

  test('connect should reject when connection fails', async () => {
    const error = new Error('Connection failed');
    connection.connect.mockImplementation((callback) => callback(error));
    await expect(dao.connect()).rejects.toThrow('Connection failed');
    expect(connection.connect).toHaveBeenCalledTimes(1);
  });

  test('disconnect should resolve when disconnection is successful', async () => {
    connection.end.mockImplementation((callback) => callback(null));
    await expect(dao.disconnect()).resolves.toBeUndefined();
    expect(connection.end).toHaveBeenCalledTimes(1);
  });

  test('disconnect should reject when disconnection fails', async () => {
    const error = new Error('Disconnection failed');
    connection.end.mockImplementation((callback) => callback(error));
    await expect(dao.disconnect()).rejects.toThrow('Disconnection failed');
    expect(connection.end).toHaveBeenCalledTimes(1);
  });

  test('insertSaleBundle should resolve with result when query is successful', async () => {
    const result = { insertId: 1 };
    connection.query.mockImplementation((query, values, callback) =>
      callback(null, result)
    );
    await expect(dao.insertSaleBundle('2023-12-31')).resolves.toEqual(result);
    expect(connection.query).toHaveBeenCalledWith(
      'INSERT INTO SaleBundle (expiration) VALUES (?)',
      ['2023-12-31'],
      expect.any(Function)
    );
  });

  test('insertSaleBundle should reject when query fails', async () => {
    const error = new Error('Query failed');
    connection.query.mockImplementation((query, values, callback) =>
      callback(error)
    );
    await expect(dao.insertSaleBundle('2023-12-31')).rejects.toThrow(
      'Query failed'
    );
    expect(connection.query).toHaveBeenCalledWith(
      'INSERT INTO SaleBundle (expiration) VALUES (?)',
      ['2023-12-31'],
      expect.any(Function)
    );
  });

  test('getSaleBundleById should resolve with result when query is successful', async () => {
    const result = [{ id: 1, expiration: '2023-12-31' }];
    connection.query.mockImplementation((query, values, callback) =>
      callback(null, result)
    );
    await expect(dao.getSaleBundleById(1)).resolves.toEqual(result[0]);
    expect(connection.query).toHaveBeenCalledWith(
      'SELECT * FROM SaleBundle WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });

  test('getSaleBundleById should reject when query fails', async () => {
    const error = new Error('Query failed');
    connection.query.mockImplementation((query, values, callback) =>
      callback(error)
    );
    await expect(dao.getSaleBundleById(1)).rejects.toThrow('Query failed');
    expect(connection.query).toHaveBeenCalledWith(
      'SELECT * FROM SaleBundle WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });

  test('updateSaleBundle should resolve when query is successful', async () => {
    const result = { affectedRows: 1 };
    connection.query.mockImplementation((query, values, callback) =>
      callback(null, result)
    );
    await expect(dao.updateSaleBundle(1, '2024-01-01')).resolves.toEqual(
      result
    );
    expect(connection.query).toHaveBeenCalledWith(
      'UPDATE SaleBundle SET expiration = ? WHERE id = ?',
      ['2024-01-01', 1],
      expect.any(Function)
    );
  });

  test('updateSaleBundle should reject when query fails', async () => {
    const error = new Error('Query failed');
    connection.query.mockImplementation((query, values, callback) =>
      callback(error)
    );
    await expect(dao.updateSaleBundle(1, '2024-01-01')).rejects.toThrow(
      'Query failed'
    );
    expect(connection.query).toHaveBeenCalledWith(
      'UPDATE SaleBundle SET expiration = ? WHERE id = ?',
      ['2024-01-01', 1],
      expect.any(Function)
    );
  });

  test('deleteSaleBundle should resolve when query is successful', async () => {
    const result = { affectedRows: 1 };
    connection.query.mockImplementation((query, values, callback) =>
      callback(null, result)
    );
    await expect(dao.deleteSaleBundle(1)).resolves.toEqual(result);
    expect(connection.query).toHaveBeenCalledWith(
      'DELETE FROM SaleBundle WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });

  test('deleteSaleBundle should reject when query fails', async () => {
    const error = new Error('Query failed');
    connection.query.mockImplementation((query, values, callback) =>
      callback(error)
    );
    await expect(dao.deleteSaleBundle(1)).rejects.toThrow('Query failed');
    expect(connection.query).toHaveBeenCalledWith(
      'DELETE FROM SaleBundle WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });
});
