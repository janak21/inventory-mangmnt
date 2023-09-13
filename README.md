# Inventory Management API

This is a simple Node.js API for managing an inventory system. It uses Express.js for handling HTTP requests and MySQL for database operations.

## Setup

1. Install Node.js on your system.
2. Clone this repository.
3. Run `npm install` to install the necessary dependencies.

## Environment Variables

You need to set up the following environment variables in a `.env` file:

- `DB_HOST`: Your MySQL host
- `DB_USER`: Your MySQL user
- `DB_PASS`: Your MySQL password
- `DB_NAME`: Your MySQL database name

You can use the `dotenv` package to load these variables into your application. This is already done in the `app.js` file:

javascript
require('dotenv').config();

const db = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME
});


## Database Setup

You need to create a MySQL database and tables as shown in the `Inventory-mngmnt.txt` file. This includes creating a `Products` table and an `Inventory` table, and inserting some initial data.

## API Endpoints

The API has the following endpoints:

- `GET /getProductID/:productName`: Fetches the ProductID for a specific product name.
- `GET /inventory/:productID`: Fetches the inventory for a specific product.
- `POST /inventory/update`: Updates the inventory for a specific product. The request body should be a JSON object with `productID` and `newQuantity` properties.

## Running the Server

The server listens on port 3001 and accepts traffic from anywhere. You can start it with `node app.js`. Once the server is running, you can test your API at `http://<Your-EC2-IP-Address>:3001`.
```javascript
app.listen(port, () => {
console.log(Server running on http://localhost:${port});
});
```
## Dependencies

The application has the following dependencies:

- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `mysql`: A pure node.js JavaScript Client implementing the MySQL protocol.

```json
{
"dependencies": {
"dotenv": "^16.3.1",
"express": "^4.18.2",
"mysql": "^2.18.1"
}
}
```
