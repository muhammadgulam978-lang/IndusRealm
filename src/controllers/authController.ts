import { Request, Response } from 'express';
import { pool } from '../config/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_indusrealm';

export const socialLogin = async (req: Request, res: Response): Promise<void> => {
  // 📥 Flutter se aane waale parameters ko exact read kiya
  const { id, name, email, profilePic, providerType } = req.body;

  // 🛡️ Map provider logic according to your Postgres ENUM type
  // Agar loginWithFacebook se request aayi hai toh 'FACEBOOK', warna default 'GOOGLE'
  const finalProvider = providerType === 'FACEBOOK' ? 'FACEBOOK' : 'GOOGLE';

  try {
    // 💾 Updated according to your exact pgAdmin schema: 
    // profilePic ki jagah "avatar", aur "provider", "updatedAt" explicitly handles.
    const result = await pool.query(
      `INSERT INTO "User" (id, name, email, avatar, role, "updatedAt", "isTwoFactorEnabled", provider) 
       VALUES ($1, $2, $3, $4, 'READER', NOW(), false, $5)
       ON CONFLICT (id) 
       DO UPDATE SET 
         name = $2, 
         avatar = $4, 
         provider = $5,
         "updatedAt" = NOW()
       RETURNING id, name, email, avatar, role`,
      [id, name, email, profilePic || "", finalProvider]
    );

    const user = result.rows[0];

    // 🔑 Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    // 🚀 Clean Response for Flutter
    res.status(200).json({
      message: 'Login Successful via Social',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePic: user.avatar, // Mapping 'avatar' to 'profilePic' for Flutter state
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('🔴 Social Login Schema Crash:', error);
    res.status(500).json({ message: 'Database transaction failed', error: error.message });
  }
};