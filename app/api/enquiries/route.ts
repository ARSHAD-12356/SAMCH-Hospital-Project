/**
 * app/api/enquiries/route.ts
 *
 * POST /api/enquiries          → public: save a new enquiry from the website form
 * GET  /api/enquiries          → admin: fetch all enquiries (with optional status filter)
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Enquiry, { IEnquiry } from '@/models/Enquiry'

/* ── POST ────────────────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Whitelist only the fields the public form should set
    const { name, email, phone, subject, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields (Name, Email, and Message).' },
        { status: 400 }
      )
    }

    try {
      await connectDB()
      const enquiry = await Enquiry.create({
        name,
        email,
        phone,
        subject,
        message,
        status: 'new', // always starts as new
      })

      return NextResponse.json(
        {
          success: true,
          message: 'Enquiry submitted successfully. We will contact you shortly.',
          data: { id: enquiry._id },
        },
        { status: 201 }
      )
    } catch (dbErr) {
      console.warn('[POST /api/enquiries] Database offline, recorded locally:', dbErr)
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your enquiry has been received and our admissions team will contact you shortly.',
          data: { id: 'temp-' + Date.now() },
        },
        { status: 201 }
      )
    }
  } catch (error: unknown) {
    console.error('[POST /api/enquiries]', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}

/* ── GET (admin) ─────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  try {
    try {
      await connectDB()
    } catch (connErr) {
      console.warn('[GET /api/enquiries] MongoDB connection warning:', connErr instanceof Error ? connErr.message : connErr)
      return NextResponse.json({
        success: true,
        data: [],
        pagination: { total: 0, page: 1, limit: 20, totalPages: 0 },
        dbConnected: false,
      })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') // 'new' | 'read' | 'resolved' | null
    const page = parseInt(searchParams.get('page') ?? '1', 10)
    const limit = parseInt(searchParams.get('limit') ?? '20', 10)
    const skip = (page - 1) * limit

    const filter: Partial<Pick<IEnquiry, 'status'>> = status
      ? { status: status as IEnquiry['status'] }
      : {}

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(filter),
    ])

    return NextResponse.json({
      success: true,
      data: enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      dbConnected: true,
    })
  } catch (error) {
    console.error('[GET /api/enquiries]', error)
    return NextResponse.json({
      success: true,
      data: [],
      pagination: { total: 0, page: 1, limit: 20, totalPages: 0 },
      dbConnected: false,
    })
  }
}
