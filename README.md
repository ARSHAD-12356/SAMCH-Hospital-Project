🏥 SAMCH Patna — Official College & Hospital Website
<p align="center"> <strong>Shivam Ashoka Medical College & Hospital, Patna</strong><br/> A modern, responsive and production-ready medical college & hospital web platform. </p> <p align="center"> <a href="https://samchpatna.com/"> <img src="https://img.shields.io/badge/Live%20Website-samchpatna.com-005F6B?style=for-the-badge" alt="Live Website"/> </a> <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js"/> <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React"/> <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB"/> <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" alt="Vercel"/> </p>
📌 About The Project

SAMCH Patna is a modern website developed for Shivam Ashoka Medical College & Hospital, Patna as a client project during my work at Promonex Media Pvt. Ltd.

The project focuses on creating a professional digital presence for a medical college and teaching hospital while providing students, patients, faculty and visitors with easy access to important institutional information.

The website was redesigned with a clean deep-teal and white visual identity, responsive layouts and structured navigation across academic, hospital and institutional sections.

✨ Key Features
🎓 College & Academics
College-focused homepage
About SAMCH
Academic information
Medical departments
Faculty information
Admissions section
Attendance information
Institutional infrastructure
🏥 Hospital
Teaching hospital information
Hospital services
Emergency information
Operation theatre information
Clinical departments
Patient-oriented enquiry flow
🏛️ Institutional Information
Mandatory Disclosure
Committee section
Anti-Ragging Committee
Curriculum Committee
Gender Harassment Committee
Medical Education Unit (MEU)
Affiliation information
Infrastructure
Contact information
📰 Blog & News
Dynamic blog listing
Individual blog pages
Blog categories
Blog images
Admin blog management
Published/Draft status
📸 Gallery
Campus photographs
College events
Hospital images
Infrastructure
Student activities
Responsive gallery layout
🔐 Admin Panel
Admin authentication
Dashboard
Enquiry management
Blog management
Add/Edit/Delete blog functionality
Enquiry status management
📩 Enquiry System
Public enquiry form
Enquiry submission
MongoDB storage
Admin enquiry management
📱 Responsive Design

Designed to work across:

💻 Desktop
💻 Laptop
📱 Mobile
📲 Tablet
🛠️ Tech Stack
Technology	Usage
Next.js	Full-stack React framework
React.js	UI development
TypeScript	Type-safe development
Tailwind CSS	Styling & responsive UI
MongoDB	Database
Mongoose	MongoDB object modeling
Node.js	Backend runtime
bcrypt	Password hashing
Vercel	Deployment
Git & GitHub	Version control
🏗️ Project Architecture
SAMCH Website
│
├── Frontend
│   ├── Next.js
│   ├── React
│   ├── TypeScript
│   └── Tailwind CSS
│
├── Backend
│   ├── Next.js API Routes
│   ├── MongoDB
│   └── Mongoose
│
├── Authentication
│   └── Admin Authentication
│
├── Content Management
│   ├── Blogs
│   └── Enquiries
│
└── Deployment
    ├── GitHub
    └── Vercel
📂 Main Website Sections
/
├── About
├── Academics
├── Departments
├── Hospital
├── Infrastructure
├── Admissions
├── Committee
│   ├── Anti-Ragging Committee
│   ├── Curriculum Committee
│   ├── Gender Harassment Committee
│   └── MEU
├── Mandatory Disclosure
├── Attendance
├── Gallery
├── News / Blog
└── Contact
🗄️ Database

MongoDB is used to manage dynamic website data.

Collections
samch_db
│
├── admins
├── blogs
└── enquiries
Admin

Stores:

Name
Email
Hashed Password
Role
Timestamps
Blogs

Stores:

English Title
Hindi Title
Description
Category
Image
Author
Tags
Metadata
Status
Timestamps
Enquiries

Stores:

Name
Email
Phone
Subject
Message
Status
Timestamps
🚀 Deployment

The website is deployed on Vercel with a custom domain.

Production Website:

https://samchpatna.com

Deployment workflow:

Local Development
       ↓
Git
       ↓
GitHub
       ↓
Vercel
       ↓
Production
       ↓
samchpatna.com
⚙️ Local Installation
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
2. Navigate into the project
cd samch-website-frontend-development
3. Install dependencies
npm install
4. Configure environment variables

Create:

.env.local

Add your MongoDB connection string:

MONGODB_URI=your_mongodb_connection_string
5. Start development server
npm run dev

Open:

http://localhost:3000
🔐 Environment Variables

Never commit sensitive credentials to GitHub.

Required environment variable:

MONGODB_URI=your_mongodb_connection_string

Make sure .env.local is included in .gitignore.

🎨 Design System

The website uses a clean medical/institutional visual language.

Primary Colors
Deep Teal   #005F6B
Teal       #007B8A
Blue       #3A9AD9
Light Blue #6BCBEB
Soft Blue  #A2DFF7
White      #FFFFFF

The primary visual combination is:

Deep Teal + White

to maintain a clean, trustworthy and professional institutional appearance.

📸 Project Preview

A recorded walkthrough of the completed website is included with this project showcase.

Live Preview:
SAMCH Patna — Live Website

👨‍💻 Developed By
Md Arshad Raza

Full Stack Developer

Developed as a client project during my work at:

Promonex Media Pvt. Ltd.

This project provided hands-on experience with:

Client requirements
Modern UI development
Next.js development
MongoDB integration
Admin panel development
API development
Asset management
Git/GitHub workflow
Vercel deployment
Custom domain & DNS configuration
Production debugging
⭐ Acknowledgement

This project was built as part of a real-world client development workflow, with the goal of creating a modern and useful digital platform for Shivam Ashoka Medical College & Hospital, Patna.
