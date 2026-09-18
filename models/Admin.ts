/**
 * models/Admin.ts
 *
 * Mongoose model for SAMCH admin users.
 * Passwords are always stored as bcrypt hashes — never plain text.
 * Server-side only — never imported by client components.
 */

import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

/* ─── TypeScript interface ───────────────────────────────────────────────── */
export interface IAdmin extends Document {
  name: string
  email: string
  password: string
  role: 'admin' | 'superadmin'
  createdAt: Date
  updatedAt: Date
  /** Compares a plain-text password against the stored hash */
  comparePassword(plain: string): Promise<boolean>
}

/* ─── Schema ─────────────────────────────────────────────────────────────── */
const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Never returned in queries unless explicitly requested
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
)

/* ─── Pre-save hook: hash password before saving ─────────────────────────── */
AdminSchema.pre<IAdmin>('save', async function () {
  if (!this.isModified('password')) {
    return
  }
  const saltRounds = 12
  this.password = await bcrypt.hash(this.password, saltRounds)
})

/* ─── Instance method: compare password ─────────────────────────────────── */
AdminSchema.methods.comparePassword = function (
  plain: string
): Promise<boolean> {
  return bcrypt.compare(plain, this.password as string)
}

/* ─── Model (prevent re-compilation on hot-reload) ───────────────────────── */
const Admin: Model<IAdmin> =
  (mongoose.models.Admin as Model<IAdmin>) ||
  mongoose.model<IAdmin>('Admin', AdminSchema)

export default Admin
