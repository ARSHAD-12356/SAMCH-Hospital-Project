/**
 * app/api/dashboard/counts/route.ts
 *
 * GET /api/dashboard/counts
 *
 * Returns aggregated counts for the Admin Dashboard:
 *   - totalEnquiries    : all enquiries
 *   - newEnquiries      : enquiries with status === 'new'
 *   - publishedBlogs    : blogs with status === 'published'
 *   - totalBlogs        : all blogs (any status)
 *   - draftBlogs        : blogs with status === 'draft'
 */

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import Enquiry from '@/models/Enquiry'

export async function GET() {
  try {
    try {
      await connectDB()
    } catch (connErr) {
      console.warn('[GET /api/dashboard/counts] MongoDB offline or IP not whitelisted:', connErr instanceof Error ? connErr.message : connErr)
      return NextResponse.json({
        success: true,
        data: {
          totalEnquiries: 0,
          newEnquiries: 0,
          publishedBlogs: 0,
          totalBlogs: 0,
          draftBlogs: 0,
        },
        dbConnected: false,
        warning: 'MongoDB Atlas not reachable. Please check IP Whitelist.',
      })
    }

    const [
      totalEnquiries,
      newEnquiries,
      publishedBlogs,
      totalBlogs,
      draftBlogs,
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Blog.countDocuments({ status: 'published' }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'draft' }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalEnquiries,
        newEnquiries,
        publishedBlogs,
        totalBlogs,
        draftBlogs,
      },
      dbConnected: true,
    })
  } catch (error) {
    console.error('[GET /api/dashboard/counts]', error)
    return NextResponse.json({
      success: true,
      data: {
        totalEnquiries: 0,
        newEnquiries: 0,
        publishedBlogs: 0,
        totalBlogs: 0,
        draftBlogs: 0,
      },
      dbConnected: false,
    })
  }
}
