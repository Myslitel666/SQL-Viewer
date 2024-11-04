import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
    // ssl: {
    //     rejectUnauthorized: false, // Включите это для Vercel, если требуется
    // },
});

export default pool;