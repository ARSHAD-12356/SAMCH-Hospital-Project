/**
 * models/Blog.ts
 *
 * Mongoose model for SAMCH blog posts.
 * Server-side only — never imported by client components.
 */

import mongoose, { Document, Model, Schema } from 'mongoose'

/* ─── TypeScript interface ───────────────────────────────────────────────── */
export interface IBlog extends Document {
  type: string
  category: string
  hindiTitle?: string
  englishTitle: string
  description: string
  image: string
  city?: string
  author?: string
  /**
   * 'published' → shown on the public website
   * 'draft'     → work in progress, hidden from public
   * 'inactive'  → intentionally disabled/archived
   */
  status: 'published' | 'draft' | 'inactive'
  tags?: string[]
  metaTitle?: string
  metaTag?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
}

/* ─── Schema ─────────────────────────────────────────────────────────────── */
const BlogSchema = new Schema<IBlog>(
  {
    type: {
      type: String,
      required: [true, 'Blog type is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    hindiTitle: {
      type: String,
      trim: true,
      default: '',
    },
    englishTitle: {
      type: String,
      required: [true, 'English title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    author: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['published', 'draft', 'inactive'],
        message: 'Status must be published, draft, or inactive',
      },
      required: [true, 'Status is required'],
      default: 'draft',
    },
    tags: {
      type: [String],
      default: [],
    },
    metaTitle: {
      type: String,
      trim: true,
      default: '',
    },
    metaTag: {
      type: String,
      trim: true,
      default: '',
    },
    metaDescription: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
)

/* ─── Indexes ────────────────────────────────────────────────────────────── */
// Public website queries blogs by status; admin queries by category/status
BlogSchema.index({ status: 1, createdAt: -1 })
BlogSchema.index({ category: 1 })

/* ─── Model (prevent re-compilation on hot-reload) ───────────────────────── */
const Blog: Model<IBlog> =
  (mongoose.models.Blog as Model<IBlog>) ||
  mongoose.model<IBlog>('Blog', BlogSchema)

export default Blog
