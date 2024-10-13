# Inventory Management System

## Overview

This is a backend system built to manage inventory data and supplier information. The system allows for CRUD operations on inventory items and suppliers, bulk data import/export using CSV files, and low stock alerts for efficient inventory management.

## Features

- **Inventory Management API:**
  - Add, update, and delete inventory items.
  - Link inventory items to suppliers.
- **Supplier Management API:**
  - Add and manage supplier information.
- **Bulk Import/Export:**
  - CSV export for downloading all inventory data.
  - CSV import for bulk adding/updating of inventory items.
- **Low Stock Alerts:**
  - Alerts for items that fall below a specified stock level.
  
## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing inventory and supplier data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Multer**: Middleware for handling file uploads.
- **CSV Parser**: For reading CSV files during import operations.
- **JSON2CSV**: For converting JSON to CSV for export.

## Prerequisites

- **Node.js** installed (v14+)
- **MongoDB** running locally or use a cloud database like MongoDB Atlas.
- **Postman** (optional) for API testing.

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/vrajpatel0007/inventory-management
    ```

2. Navigate into the project directory:
    ```bash
    cd inventory-management
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up your environment variables in a `.env` file:
    ```bash
    MONGO_URI=<your_mongo_database_uri>
    PORT=3000
    ```

5. Start the server:
    ```bash
    npm start
    ```

### API Endpoints

#### Inventory Routes

- **POST** `/inventory/add` - Add a new inventory item.
- **GET** `/inventory/export` - Export all inventory data as a CSV file.
- **POST** `/inventory/import` - Import inventory data from a CSV file (use `multipart/form-data` for file upload).
- **GET** `/inventory/low-stock` - Get all items marked as low stock.

#### Supplier Routes

- **POST** `/supplier/add` - Add a new supplier.

### File Upload Example

- Use `POST /inventory/import` to upload a CSV file containing inventory data. The CSV should have the following fields:
  ```
  name,quantity,price,supplier
  ```



## Running Tests

Use **Postman** or **cURL** to test the API routes. For example, to test adding an inventory item:

```bash
POST /inventory/add
Content-Type: application/json

{
  "name": "Item 1",
  "quantity": 20,
  "price": 15.99,
  "supplierId": "supplier-id"
}
```

