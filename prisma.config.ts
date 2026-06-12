import { Pool } from 'pg';

// Seedha direct connection string, koi extra natak nahi
const pool = new Pool({
  connectionString: "postgresql://postgres:GM123@localhost:5432/indusrealm?schema=public"
});

// Purana naam hi export kar rahe hain taaki aapke baqi controllers na tootey
export const prisma = {
  $queryRawUnsafe: async (query: string, ...values: any[]) => {
    const res = await pool.query(query, values);
    return res.rows;
  }
};