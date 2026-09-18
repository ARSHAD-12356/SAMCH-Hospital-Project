/**
 * app/api/seed/route.ts
 *
 * GET /api/seed
 *
 * One-time seed endpoint to create:
 *   1. The default admin account in the `admins` collection.
 *   2. Blog indexes on `blogs`.
 *   3. Enquiry indexes on `enquiries`.
 *
 * Safe to call multiple times — it checks before creating.
 *
 * DISABLE OR REMOVE THIS ROUTE BEFORE GOING TO PRODUCTION.
 */

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Admin from '@/models/Admin'
import Blog from '@/models/Blog'
import Enquiry from '@/models/Enquiry'

export async function GET() {
  try {
    await connectDB()

    const results: string[] = []

    /* ── 1. Create default admin if not exists ────────────────────────── */
    const existingAdmin = await Admin.findOne({
      email: 'admin@samchpatna.com',
    })

    if (existingAdmin) {
      results.push('Admin already exists — skipped creation.')
    } else {
      await Admin.create({
        name: 'SAMCH Admin',
        email: 'admin@samchpatna.com',
        password: 'Admin@123', // will be hashed by the pre-save hook
        role: 'admin',
      })
      results.push('✅ Admin account created: admin@samchpatna.com')
    }

    /* ── 2. Ensure Blog indexes ──────────────────────────────────────── */
    await Blog.createIndexes()
    results.push('✅ Blog indexes ensured.')

    /* ── 3. Ensure Enquiry indexes ───────────────────────────────────── */
    await Enquiry.createIndexes()
    results.push('✅ Enquiry indexes ensured.')

    return NextResponse.json({
      success: true,
      database: 'samch_db',
      collections: ['admins', 'blogs', 'enquiries'],
      results,
    })
  } catch (error) {
    console.error('[GET /api/seed]', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Seed failed',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
