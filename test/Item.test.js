const mysql = require('mysql2');
const ItemDAO = require('../Entities/Item');

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

describe('ItemDAO', () => {
  let itemDAO;
  let connection;

  beforeEach(() => {
    connection = mysql.createConnection();
    itemDAO = new ItemDAO({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should connect to the database', async () => {
    connection.connect.mockImplementation((callback) => callback(null));
    await expect(itemDAO.connect()).resolves.toBeUndefined();
    expect(connection.connect).toHaveBeenCalledTimes(1);
  });

  test('should fail to connect to the database', async () => {
    const error = new Error('Connection failed');
    connection.connect.mockImplementation((callback) => callback(error));
    await expect(itemDAO.connect()).rejects.toThrow('Connection failed');
    expect(connection.connect).toHaveBeenCalledTimes(1);
  });

  test('should disconnect from the database', async () => {
    connection.end.mockImplementation((callback) => callback(null));
    await expect(itemDAO.disconnect()).resolves.toBeUndefined();
    expect(connection.end).toHaveBeenCalledTimes(1);
  });

  test('should fail to disconnect from the database', async () => {
    const error = new Error('Disconnection failed');
    connection.end.mockImplementation((callback) => callback(error));
    await expect(itemDAO.disconnect()).rejects.toThrow('Disconnection failed');
    expect(connection.end).toHaveBeenCalledTimes(1);
  });

  test('should create a new item', async () => {
    const insertId = 1;
    connection.query.mockImplementation((query, values, callback) => {
      callback(null, { insertId });
    });
    await expect(itemDAO.createItem('item1', 'description1')).resolves.toBe(
      insertId
    );
    expect(connection.query).toHaveBeenCalledWith(
      'INSERT INTO Item (name, description) VALUES (?, ?)',
      ['item1', 'description1'],
      expect.any(Function)
    );
  });

  test('should fail to create a new item', async () => {
    const error = new Error('Insert failed');
    connection.query.mockImplementation((query, values, callback) => {
      callback(error);
    });
    await expect(itemDAO.createItem('item1', 'description1')).rejects.toThrow(
      'Insert failed'
    );
    expect(connection.query).toHaveBeenCalledWith(
      'INSERT INTO Item (name, description) VALUES (?, ?)',
      ['item1', 'description1'],
      expect.any(Function)
    );
  });

  test('should get an item by id', async () => {
    const item = { id: 1, name: 'item1', description: 'description1' };
    connection.query.mockImplementation((query, values, callback) => {
      callback(null, [item]);
    });
    await expect(itemDAO.getItemById(1)).resolves.toEqual(item);
    expect(connection.query).toHaveBeenCalledWith(
      'SELECT * FROM Item WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });

  test('should fail to get an item by id', async () => {
    const error = new Error('Select failed');
    connection.query.mockImplementation((query, values, callback) => {
      callback(error);
    });
    await expect(itemDAO.getItemById(1)).rejects.toThrow('Select failed');
    expect(connection.query).toHaveBeenCalledWith(
      'SELECT * FROM Item WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });

  test('should update an item', async () => {
    const affectedRows = 1;
    connection.query.mockImplementation((query, values, callback) => {
      callback(null, { affectedRows });
    });
    await expect(itemDAO.updateItem(1, 'item1', 'description1')).resolves.toBe(
      affectedRows
    );
    expect(connection.query).toHaveBeenCalledWith(
      'UPDATE Item SET name = ?, description = ? WHERE id = ?',
      ['item1', 'description1', 1],
      expect.any(Function)
    );
  });

  test('should fail to update an item', async () => {
    const error = new Error('Update failed');
    connection.query.mockImplementation((query, values, callback) => {
      callback(error);
    });
    await expect(
      itemDAO.updateItem(1, 'item1', 'description1')
    ).rejects.toThrow('Update failed');
    expect(connection.query).toHaveBeenCalledWith(
      'UPDATE Item SET name = ?, description = ? WHERE id = ?',
      ['item1', 'description1', 1],
      expect.any(Function)
    );
  });

  test('should delete an item', async () => {
    const affectedRows = 1;
    connection.query.mockImplementation((query, values, callback) => {
      callback(null, { affectedRows });
    });
    await expect(itemDAO.deleteItem(1)).resolves.toBe(affectedRows);
    expect(connection.query).toHaveBeenCalledWith(
      'DELETE FROM Item WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });

  test('should fail to delete an item', async () => {
    const error = new Error('Delete failed');
    connection.query.mockImplementation((query, values, callback) => {
      callback(error);
    });
    await expect(itemDAO.deleteItem(1)).rejects.toThrow('Delete failed');
    expect(connection.query).toHaveBeenCalledWith(
      'DELETE FROM Item WHERE id = ?',
      [1],
      expect.any(Function)
    );
  });
});
