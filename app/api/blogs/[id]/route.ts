/**
 * app/api/blogs/[id]/route.ts
 *
 * GET    /api/blogs/:id  → fetch a single blog by MongoDB _id
 * PUT    /api/blogs/:id  → replace/update a blog (admin)
 * DELETE /api/blogs/:id  → delete a blog (admin)
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'

type Params = { params: Promise<{ id: string }> }

/* ── GET ─────────────────────────────────────────────────────────────────── */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    const blog = await Blog.findById(id).lean()
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: blog })
  } catch (error) {
    console.error('[GET /api/blogs/:id]', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

/* ── PUT ─────────────────────────────────────────────────────────────────── */
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()

    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean()

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: blog })
  } catch (error: unknown) {
    console.error('[PUT /api/blogs/:id]', error)

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
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

/* ── PATCH (partial update / status toggle) ──────────────────────────────── */
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params
    const body = await req.json()

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean()

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: blog })
  } catch (error) {
    console.error('[PATCH /api/blogs/:id]', error)
    return NextResponse.json(
      { success: false, message: 'Failed to patch blog' },
      { status: 500 }
    )
  }
}

/* ── DELETE ──────────────────────────────────────────────────────────────── */
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    const blog = await Blog.findByIdAndDelete(id).lean()
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error) {
    console.error('[DELETE /api/blogs/:id]', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
