import { pool } from "./database.js";
import './dotenv.js';

const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `
    try {
        const res = await pool.query(createUsersTableQuery)
        console.log('🎉 users table created successfully')
    } catch (error) {
        console.error('⚠️ error creating users table', error)
    }
}

// createUsersTable()

// const createOrdersTable = async () => {
//     const createOrdersTableQuery = `
//         CREATE TABLE IF NOT EXISTS orders (
//             id SERIAL PRIMARY KEY,
//             user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//             total_amount NUMERIC(10,2) NOT NULL,
//             status VARCHAR(50) DEFAULT 'PENDING',
//             payment_id TEXT,                     
//             payment_status TEXT,                 
//             payment_receipt_url TEXT,             
//             created_at TIMESTAMP DEFAULT NOW(),
//             updated_at TIMESTAMP DEFAULT NOW()
//         );
//     `
//     try {
//         const res = await pool.query(createOrdersTableQuery)
//         console.log('🎉 orders table created successfully')
//     } catch (error) {
//         console.error('⚠️ error creating orders table', error)
//     }
// }

// // createOrdersTable();

// const createOrderItemsTable = async () => {
//     const createOrderItemsTableQuery = `
//         CREATE TABLE IF NOT EXISTS order_items (
//             id SERIAL PRIMARY KEY,
//             order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
//             item_id INTEGER REFERENCES items(id),
//             quantity INTEGER NOT NULL,
//             unit_price NUMERIC(10,2) NOT NULL,
//             created_at TIMESTAMP DEFAULT NOW(),
//             updated_at TIMESTAMP DEFAULT NOW()
//         );
//     `
//     // ON DELETE CASCADE means if you delete an order, the related order items are deleted automatically.
//     try {
//         const res = await pool.query(createOrderItemsTableQuery)
//         console.log('🎉 order_items table created successfully')
//     } catch (error) {
//         console.error('⚠️ error creating order_items table', error)
//     }
// }


const createCartsTable = async () => {
    const createCartsTableQuery = `
        DROP TABLE IF EXISTS carts CASCADE;
        CREATE TABLE IF NOT EXISTS carts (
            id SERIAL PRIMARY KEY,
            session_id VARCHAR(128) UNIQUE NOT NULL,
            cart_data JSONB NOT NULL DEFAULT '{}'::jsonb,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `
    try {
        const res = await pool.query(createCartsTableQuery)
        console.log('🎉 carts table created successfully')
    } catch (error) {
        console.error('⚠️ error creating carts table', error)
    }
}

// createCartsTable();

const createOrdersTable = async () => {
    // const createOrdersTableQuery = `
    //     DROP TABLE IF EXISTS orders CASCADE;
    //     DROP TABLE IF EXISTS order_items CASCADE;
    //     CREATE TABLE IF NOT EXISTS orders (
    //         id SERIAL PRIMARY KEY,
    //         session_id VARCHAR(128) NOT NULL,
    //         email TEXT,          
    //         square_order_id TEXT,                       
    //         square_payment_id TEXT,                     
    //         square_receipt_url TEXT,                    
    //         payment_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED, REFUNDED
    //         total_amount NUMERIC(10,2) NOT NULL,
    //         currency VARCHAR(10) DEFAULT 'USD',
    //         -- shipping address (optional, for mailing prints/negatives)
    //         shipping_name TEXT,
    //         shipping_address_line1 TEXT,
    //         shipping_address_line2 TEXT,
    //         shipping_city TEXT,
    //         shipping_state TEXT,
    //         shipping_zip TEXT,
    //         shipping_country TEXT DEFAULT 'US',
    //         shipping_requested BOOLEAN DEFAULT FALSE,   
    //         notes TEXT,                                 
    //         created_at TIMESTAMP DEFAULT NOW(),
    //         updated_at TIMESTAMP DEFAULT NOW()
    //     );
    // `
    const createOrdersTableQuery = `
        DROP TABLE IF EXISTS items CASCADE;
        DROP TABLE IF EXISTS cart_items CASCADE;
    `
    try {
        const res = await pool.query(createOrdersTableQuery)
        console.log('🎉 orders table created successfully')
    } catch (error) {
        console.error('⚠️ error creating orders table', error)
    }
}

// createOrdersTable();