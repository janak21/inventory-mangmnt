const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Connect to MySQL database
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Middleware to parse JSON requests
app.use(express.json());

// GET endpoint to fetch ProductID for a specific product name
app.get('/getProductID/:productName', (req, res) => {
  const { productName } = req.params;
  const sql = 'SELECT ProductID FROM Products WHERE ProductName = ?';
  
  db.query(sql, [productName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      res.json({ ProductID: results[0].ProductID });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});


// API endpoint to fetch inventory for a specific product
app.get('/inventory/:productID', (req, res) => {
  const { productID } = req.params;
  const sql = 'SELECT InStockQuantity FROM Inventory WHERE ProductID = ?';
  
  db.query(sql, [productID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      res.json({ InStockQuantity: results[0].InStockQuantity });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});

// POST endpoint to update inventory for a specific product
app.post('/inventory/update', (req, res) => {
  const { productID, newQuantity } = req.body;
  const sql = 'UPDATE Inventory SET InStockQuantity = ? WHERE ProductID = ?';
  
  // Debugging: Log the SQL query and parameters
  console.log("Executing SQL Query:", sql);
  console.log("With Parameters:", [newQuantity, productID]);
  
  db.query(sql, [newQuantity, productID], (err, results) => {
    // Debugging: Log the query results
    console.log("Query Results:", results);
    
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Check if any rows were affected
    if (results.affectedRows > 0) {
      res.json({ message: 'Inventory updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found or no update needed' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
