/**
 * app/api/blogs/route.ts
 *
 * GET  /api/blogs          → public: returns only published blogs
 * GET  /api/blogs?admin=1  → admin: returns all blogs (any status)
 * POST /api/blogs          → admin: create a new blog
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog, { IBlog } from '@/models/Blog'

/* ── GET ─────────────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  try {
    try {
      await connectDB()
    } catch (connErr) {
      console.warn('[GET /api/blogs] MongoDB connection warning:', connErr instanceof Error ? connErr.message : connErr)
      return NextResponse.json({
        success: true,
        data: [],
        pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
        dbConnected: false,
      })
    }

    const { searchParams } = new URL(req.url)
    const isAdmin = searchParams.get('admin') === '1'
    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '10', 10)
    const skip = (page - 1) * limit

    const filter: Partial<Pick<IBlog, 'status'>> = isAdmin ? {} : { status: 'published' as const }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(filter),
    ])

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      dbConnected: true,
    })
  } catch (error) {
    console.error('[GET /api/blogs]', error)
    return NextResponse.json({
      success: true,
      data: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
      dbConnected: false,
    })
  }
}

/* ── POST ────────────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    const blog = await Blog.create(body)

    return NextResponse.json(
      { success: true, data: blog },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('[POST /api/blogs]', error)

    // Mongoose validation error
    if (
      error !== null &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'ValidationError'
    ) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 422 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
