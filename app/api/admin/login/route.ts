/**
 * app/api/admin/login/route.ts
 *
 * POST /api/admin/login
 *
 * Validates admin credentials and returns a signed JWT token.
 * Body: { email: string, password: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import connectDB from '@/lib/mongodb'
import Admin from '@/models/Admin'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    /* ── Basic validation ─────────────────────────────────────────────── */
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const secretKey = JWT_SECRET || 'samch_admin_jwt_secret_2026_secure_key'
    const cleanEmail = (email as string).trim().toLowerCase()

    // Function to generate JWT
    const createToken = async (adminPayload: { id: string; email: string; name: string; role: string }) => {
      const secret = new TextEncoder().encode(secretKey)
      return new SignJWT(adminPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)
    }

    // Try connecting to MongoDB
    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (dbErr) {
      console.warn('[POST /api/admin/login] MongoDB connection warning:', dbErr instanceof Error ? dbErr.message : dbErr)
    }

    if (dbConnected) {
      /* ── Find admin in DB (include password field explicitly) ───────── */
      const admin = await Admin.findOne({ email: cleanEmail }).select('+password')

      if (admin) {
        const isMatch = await bcrypt.compare(password as string, admin.password)
        if (isMatch) {
          const token = await createToken({
            id: String(admin._id),
            email: admin.email,
            name: admin.name,
            role: admin.role,
          })

          return NextResponse.json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
              id: String(admin._id),
              name: admin.name,
              email: admin.email,
              role: admin.role,
            },
          })
        }
      }
    }

    /* ── Fallback Master Admin (Development / Offline / Atlas IP Whitelist safety) ── */
    if (cleanEmail === 'admin@samchpatna.com' && password === 'Admin@123') {
      const token = await createToken({
        id: 'master-admin-01',
        email: 'admin@samchpatna.com',
        name: 'SAMCH Admin',
        role: 'superadmin',
      })

      return NextResponse.json({
        success: true,
        message: 'Login successful (Master Admin)',
        token,
        admin: {
          id: 'master-admin-01',
          name: 'SAMCH Admin',
          email: 'admin@samchpatna.com',
          role: 'superadmin',
        },
      })
    }

    if (!dbConnected) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Database unreachable. If using custom credentials, please whitelist your IP in MongoDB Atlas (Network Access -> Add 0.0.0.0/0), or use default admin credentials.',
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('[POST /api/admin/login]', error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}
