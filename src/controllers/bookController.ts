
import { Request, Response } from 'express';
import { pool } from '../config/db';

// 📚 1. ADD NEW BOOK (Create)
export const addBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, description, price } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Book" (title, author, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, description, price]
    );
    
    res.status(201).json({
      message: 'Book Added Successfully',
      book: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 📖 2. GET ALL BOOKS (Read)
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM "Book" ORDER BY "createdAt" DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};