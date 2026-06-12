// import express from 'express';
// import cors from 'cors';
// import rateLimit from 'express-rate-limit';
// import { authRoutes } from './routes/authRoutes';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Security Rate Limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests, please try again later."
// });
// app.use('/api', limiter);

// // Base Routes
// app.use('/api/auth', authRoutes);

// // Health Check Route
// app.get('/', (req, res) => {
//   res.send("IndusRealm Minimalist Backend Engine is Running Live...");
// });

// // Server Listen
// app.listen(PORT, () => {
//   console.log(`===================================================`);
//   console.log(`🚀 SERVER IS RUNNING BEAUTIFULLY ON PORT: ${PORT}`);
//   console.log(`🌐 TEST HEALTH: http://localhost:${PORT}/`);
//   console.log(`===================================================`);
// });

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { authRoutes } from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes'; // 📚 1. Book routes ko top par import kiya

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
// app.use(cors());

// Purane app.use(cors()) ko hata kar ye likhein:
app.use(cors({
  origin: '*', // Kisi bhi port/origin se request accept karo
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Security Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later."
});
app.use('/api', limiter);

// Base Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // 📚 2. Books API endpoint ko yahan register kiya

// Health Check Route
app.get('/', (req, res) => {
  res.send("IndusRealm Minimalist Backend Engine is Running Live...");
});

// Server Listen
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 SERVER IS RUNNING BEAUTIFULLY ON PORT: ${PORT}`);
  console.log(`🌐 TEST HEALTH: http://localhost:${PORT}/`);
  console.log(`===================================================`);
});