import { pool } from "./database.js";
import './dotenv.js';

// const createUsersTable = async () => {
//     const createUsersTableQuery = `
//         CREATE TABLE IF NOT EXISTS users (
//             id SERIAL PRIMARY KEY,
//             email TEXT UNIQUE NOT NULL,
//             password TEXT NOT NULL,
//             created_at TIMESTAMP DEFAULT NOW(),
//             updated_at TIMESTAMP DEFAULT NOW()
//         );
//     `
//     try {
//         const res = await pool.query(createUsersTableQuery)
//         console.log('🎉 users table created successfully')
//     } catch (error) {
//         console.error('⚠️ error creating users table', error)
//     }
// }

// createUsersTable()


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
    const createOrdersTableQuery = `
        DROP TABLE IF EXISTS orders CASCADE;
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            session_id VARCHAR(128) NOT NULL,
            email TEXT,          
            square_order_id TEXT,                       
            square_payment_id TEXT,                     
            square_receipt_url TEXT,                    
            payment_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED, REFUNDED
            total_amount NUMERIC(10,2) NOT NULL,
            currency VARCHAR(10) DEFAULT 'USD',
            phone_number VARCHAR(30),
            -- shipping address (optional, for mailing prints/negatives)
            shipping_address_line1 TEXT,
            shipping_address_line2 TEXT,
            shipping_city TEXT,
            shipping_state TEXT,
            shipping_zip TEXT,
            shipping_country TEXT DEFAULT 'US',
            shipping_requested BOOLEAN DEFAULT FALSE,   
            notes TEXT,                                 
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            -- billing address
            full_name TEXT,
            billing_address_line1 TEXT,
            billing_address_line2 TEXT,
            billing_city TEXT,
            billing_state TEXT,
            billing_zip TEXT,
            billing_country TEXT
        );
    `;
    try {
        const res = await pool.query(createOrdersTableQuery)
        console.log('🎉 orders table created successfully')
    } catch (error) {
        console.error('⚠️ error creating orders table', error)
    }
}

// createOrdersTable();


const createOrderItemsTable = async () => {
    const createOrderItemsTableQuery = `
        CREATE TABLE IF NOT EXISTS order_items (
            id SERIAL PRIMARY KEY,
            order_id INTEGER NOT NULL
                REFERENCES orders(id)
                ON DELETE CASCADE,
            catalog_item_id TEXT,
            variation_id TEXT,
            product_name TEXT NOT NULL,
            unit_price NUMERIC(10,2) NOT NULL,
            quantity INTEGER NOT NULL,
            line_total NUMERIC(10,2) NOT NULL,
            modifiers JSONB DEFAULT '{}'::jsonb,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `
    try {
        const res = await pool.query(createOrderItemsTableQuery)
        console.log('🎉 order_items table created successfully')
    } catch (error) {
        console.error('⚠️ error creating order_items table', error)
    }
}

// createOrderItemsTable();
