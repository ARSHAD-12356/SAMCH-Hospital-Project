/**
 * app/api/enquiries/[id]/route.ts
 *
 * GET   /api/enquiries/:id  → fetch single enquiry (admin)
 * PATCH /api/enquiries/:id  → update status (admin: new → read → resolved)
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Enquiry from '@/models/Enquiry'

type Params = { params: Promise<{ id: string }> }

/* ── GET ─────────────────────────────────────────────────────────────────── */
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    const enquiry = await Enquiry.findById(id).lean()
    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: enquiry })
  } catch (error) {
    console.error('[GET /api/enquiries/:id]', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch enquiry' },
      { status: 500 }
    )
  }
}

/* ── PATCH ───────────────────────────────────────────────────────────────── */
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params
    const { status } = await req.json()

    const allowed = ['new', 'read', 'resolved']
    if (!allowed.includes(status)) {
      return NextResponse.json(
        { success: false, message: `Status must be one of: ${allowed.join(', ')}` },
        { status: 400 }
      )
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    ).lean()

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: enquiry })
  } catch (error) {
    console.error('[PATCH /api/enquiries/:id]', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update enquiry status' },
      { status: 500 }
    )
  }
}
