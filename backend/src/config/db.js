import pg from "pg"; // Postgres
import dotenv from "dotenv";
dotenv.config(); 

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// DB connection test. Must be here instead of index.js so you know immediately on startup. If on index incase it fail, it'll fail when you hit query
pool.query('SELECT NOW()', (err, res) => {  // SELECT NOW() just returns the current timestamp from Postgres it's the simplest possible query to verify the connection is alive.
    if(err){
        console.error('DB connection failed:', err);
    } else {
        console.log(`DB connected: ${res.rows[0].now}`)
    }
});

export default pool;