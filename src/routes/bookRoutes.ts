import { Router } from 'express';
import { addBook, getAllBooks } from '../controllers/bookController';

const router = Router();

router.post('/', addBook);    // POST http://localhost:5000/api/books (Add Book)
router.get('/', getAllBooks);  // GET http://localhost:5000/api/books (Get All Books)

export default router;