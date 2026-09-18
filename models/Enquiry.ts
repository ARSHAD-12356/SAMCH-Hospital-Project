/**
 * models/Enquiry.ts
 *
 * Mongoose model for contact / admission enquiries submitted via the
 * public SAMCH website forms.
 * Server-side only — never imported by client components.
 */

import mongoose, { Document, Model, Schema } from 'mongoose'

/* ─── TypeScript interface ───────────────────────────────────────────────── */
export interface IEnquiry extends Document {
  name: string
  email: string
  phone: string
  subject?: string
  message: string
  /**
   * 'new'      → freshly submitted, not yet reviewed
   * 'read'     → admin has opened/read the enquiry
   * 'resolved' → enquiry has been addressed
   */
  status: 'new' | 'read' | 'resolved'
  createdAt: Date
  updatedAt: Date
}

/* ─── Schema ─────────────────────────────────────────────────────────────── */
const EnquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be 100 characters or fewer'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[+]?[\d\s\-().]{7,20}$/,
        'Please provide a valid phone number',
      ],
    },
    subject: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message must be 2000 characters or fewer'],
    },
    status: {
      type: String,
      enum: {
        values: ['new', 'read', 'resolved'],
        message: 'Status must be new, read, or resolved',
      },
      default: 'new',
    },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
)

/* ─── Indexes ────────────────────────────────────────────────────────────── */
EnquirySchema.index({ status: 1, createdAt: -1 })

/* ─── Model (prevent re-compilation on hot-reload) ───────────────────────── */
const Enquiry: Model<IEnquiry> =
  (mongoose.models.Enquiry as Model<IEnquiry>) ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema)

export default Enquiry
