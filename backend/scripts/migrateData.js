// Script to migrate data from MySQL to MongoDB
import mysql from 'mysql2/promise';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/UserModel.js';
import Food from '../models/FoodModel.js';
import BillStatus from '../models/BillStatusModel.js';
import BillDetails from '../models/BillDetailsModel.js';
import BookTable from '../models/BookTableModel.js';
import Cart from '../models/CartModel.js';

// Load environment variables
dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://username:password@cluster0.mongodb.net/restaurant?retryWrites=true&w=majority";

// MySQL connection
const MYSQL_CONFIG = {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "db_restaurant"
};

// Store ID mappings between MySQL and MongoDB
const idMappings = {
    users: {},
    foods: {},
    billStatus: {}
};

async function connectDatabases() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB Atlas");

        // Connect to MySQL
        const mysqlConnection = await mysql.createConnection(MYSQL_CONFIG);
        console.log("Connected to MySQL database");

        return { mysqlConnection };
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

async function migrateUsers(mysqlConnection) {
    try {
        console.log("Migrating users...");

        // Get users from MySQL
        const [rows] = await mysqlConnection.execute('SELECT * FROM user');

        // Insert users into MongoDB
        for (const row of rows) {
            const user = new User({
                user_name: row.user_name,
                user_email: row.user_email,
                user_password: row.user_password
            });

            const savedUser = await user.save();
            idMappings.users[row.user_id] = savedUser._id;
        }

        console.log(`Migrated ${rows.length} users successfully`);
    } catch (error) {
        console.error("Error migrating users:", error);
    }
}

async function migrateFoods(mysqlConnection) {
    try {
        console.log("Migrating food items...");

        // Get foods from MySQL
        const [rows] = await mysqlConnection.execute('SELECT * FROM food');

        // Insert foods into MongoDB
        for (const row of rows) {
            const food = new Food({
                food_name: row.food_name,
                food_price: row.food_price,
                food_image: row.food_image || '',
                food_description: row.food_description || '',
                food_category: row.food_category || ''
            });

            const savedFood = await food.save();
            idMappings.foods[row.food_id] = savedFood._id;
        }

        console.log(`Migrated ${rows.length} food items successfully`);
    } catch (error) {
        console.error("Error migrating food items:", error);
    }
}

async function migrateBillStatus(mysqlConnection) {
    try {
        console.log("Migrating bill status records...");

        // Get bill status from MySQL
        const [rows] = await mysqlConnection.execute('SELECT * FROM billstatus');

        // Insert bill status into MongoDB
        for (const row of rows) {
            // Skip if no user mapping exists
            if (!idMappings.users[row.user_id]) {
                console.warn(`Skipping bill with user_id ${row.user_id} - no mapping found`);
                continue;
            }

            const billStatus = new BillStatus({
                user_id: idMappings.users[row.user_id],
                bill_date: row.bill_date || new Date(),
                bill_status: row.bill_status || 1,
                bill_paid: row.bill_paid === 'true' || false,
                bill_total: row.bill_total || 0
            });

            const savedBillStatus = await billStatus.save();
            idMappings.billStatus[row.bill_id] = savedBillStatus._id;
        }

        console.log(`Migrated ${rows.length} bill status records successfully`);
    } catch (error) {
        console.error("Error migrating bill status:", error);
    }
}

async function migrateBillDetails(mysqlConnection) {
    try {
        console.log("Migrating bill details...");

        // Get bill details from MySQL
        const [rows] = await mysqlConnection.execute('SELECT * FROM billdetails');

        // Insert bill details into MongoDB
        for (const row of rows) {
            // Skip if no bill or food mapping exists
            if (!idMappings.billStatus[row.bill_id] || !idMappings.foods[row.food_id]) {
                console.warn(`Skipping bill detail - missing mapping`);
                continue;
            }

            const billDetail = new BillDetails({
                bill_id: idMappings.billStatus[row.bill_id],
                food_id: idMappings.foods[row.food_id],
                item_qty: row.item_qty || 1,
                item_price: row.item_price || 0
            });

            await billDetail.save();
        }

        console.log(`Migrated ${rows.length} bill details successfully`);
    } catch (error) {
        console.error("Error migrating bill details:", error);
    }
}

async function migrateBookings(mysqlConnection) {
    try {
        console.log("Migrating table bookings...");

        // Get bookings from MySQL
        const [rows] = await mysqlConnection.execute('SELECT * FROM booktable');

        // Insert bookings into MongoDB
        for (const row of rows) {
            // Skip if no user mapping exists
            if (!idMappings.users[row.user_id]) {
                console.warn(`Skipping booking with user_id ${row.user_id} - no mapping found`);
                continue;
            }

            const booking = new BookTable({
                user_id: idMappings.users[row.user_id],
                booking_date: row.booking_date || new Date(),
                booking_time: row.booking_time || "12:00",
                booking_guests: row.booking_guests || 1,
                booking_request: row.booking_request || ""
            });

            await booking.save();
        }

        console.log(`Migrated ${rows.length} table bookings successfully`);
    } catch (error) {
        console.error("Error migrating bookings:", error);
    }
}

async function migrateCart(mysqlConnection) {
    try {
        console.log("Migrating cart items...");

        // Get cart items from MySQL
        const [rows] = await mysqlConnection.execute('SELECT * FROM cart');

        // Insert cart items into MongoDB
        for (const row of rows) {
            // Skip if no user or food mapping exists
            if (!idMappings.users[row.user_id] || !idMappings.foods[row.food_id]) {
                console.warn(`Skipping cart item - missing mapping`);
                continue;
            }

            const cart = new Cart({
                user_id: idMappings.users[row.user_id],
                food_id: idMappings.foods[row.food_id],
                item_qty: row.item_qty || 1,
                item_price: row.item_price || 0
            });

            await cart.save();
        }

        console.log(`Migrated ${rows.length} cart items successfully`);
    } catch (error) {
        console.error("Error migrating cart items:", error);
    }
}

async function run() {
    let mysqlConnection;

    try {
        // Connect to databases
        const connections = await connectDatabases();
        mysqlConnection = connections.mysqlConnection;

        // Migrate data
        await migrateUsers(mysqlConnection);
        await migrateFoods(mysqlConnection);
        await migrateBillStatus(mysqlConnection);
        await migrateBillDetails(mysqlConnection);
        await migrateBookings(mysqlConnection);
        await migrateCart(mysqlConnection);

        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        // Close connections
        if (mysqlConnection) await mysqlConnection.end();
        await mongoose.connection.close();
        console.log("Database connections closed");
    }
}

// Run migration
run();