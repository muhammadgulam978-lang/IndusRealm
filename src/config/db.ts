import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Simple Pool Configuration using your connection string
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:GM123@localhost:5432/indusrealm?schema=public",
});

// Database connectivity check
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Database connection error:', err.stack);
  }
  console.log('⚡ DATABASE CONNECTED SUCCESSFULLY TO POSTGRESQL');
  release();
});