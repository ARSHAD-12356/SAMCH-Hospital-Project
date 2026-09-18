import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import dns from 'dns'

// Fix for Windows Node.js SRV DNS lookup issues with MongoDB Atlas
dns.setServers(['8.8.8.8', '1.1.1.1'])

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local')
  process.exit(1)
}

console.log('Connecting to MongoDB Atlas...')
console.log('URI target:', MONGODB_URI.replace(/:([^@]+)@/, ':****@'))

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'samch_db',
    })
    console.log('✅ Connected successfully to database: samch_db')

    const db = mongoose.connection.db

    // 1. Check/Create collections
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)
    console.log('Current collections in samch_db:', collectionNames)

    // Admins Collection
    const AdminSchema = new mongoose.Schema(
      {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
      },
      { timestamps: true }
    )
    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema, 'admins')

    const existingAdmin = await Admin.findOne({ email: 'admin@samchpatna.com' })
    if (existingAdmin) {
      console.log('ℹ️ Admin account (admin@samchpatna.com) already exists.')
    } else {
      const hashedPassword = await bcrypt.hash('Admin@123', 12)
      await Admin.create({
        name: 'SAMCH Admin',
        email: 'admin@samchpatna.com',
        password: hashedPassword,
        role: 'admin',
      })
      console.log('✅ Created default admin account: admin@samchpatna.com')
    }

    // Blogs Collection & Indexes
    const BlogSchema = new mongoose.Schema(
      {
        type: { type: String, required: true },
        category: { type: String, required: true },
        hindiTitle: { type: String, default: '' },
        englishTitle: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        city: { type: String, default: '' },
        author: { type: String, default: '' },
        status: { type: String, enum: ['published', 'draft', 'inactive'], default: 'draft' },
        tags: { type: [String], default: [] },
        metaTitle: { type: String, default: '' },
        metaTag: { type: String, default: '' },
        metaDescription: { type: String, default: '' },
      },
      { timestamps: true }
    )
    BlogSchema.index({ status: 1, createdAt: -1 })
    BlogSchema.index({ category: 1 })
    const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema, 'blogs')
    await Blog.createIndexes()
    console.log('✅ Ensured indexes on `blogs` collection.')

    // Enquiries Collection & Indexes
    const EnquirySchema = new mongoose.Schema(
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        subject: { type: String, default: '' },
        message: { type: String, required: true },
        status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' },
      },
      { timestamps: true }
    )
    EnquirySchema.index({ status: 1, createdAt: -1 })
    const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema, 'enquiries')
    await Enquiry.createIndexes()
    console.log('✅ Ensured indexes on `enquiries` collection.')

    // Final summary
    const updatedCollections = await db.listCollections().toArray()
    console.log('\n--- VERIFICATION SUMMARY ---')
    console.log('Database:', 'samch_db')
    console.log('Collections:', updatedCollections.map((c) => c.name))
    const adminCount = await Admin.countDocuments()
    const blogCount = await Blog.countDocuments()
    const enquiryCount = await Enquiry.countDocuments()
    console.log(`Counts -> admins: ${adminCount}, blogs: ${blogCount}, enquiries: ${enquiryCount}`)
    console.log('--- SETUP COMPLETE ---')

    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('❌ Error during seed:', err)
    process.exit(1)
  }
}

seed()
