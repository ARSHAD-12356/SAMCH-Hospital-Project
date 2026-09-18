/**
 * Central configuration for SAMCH Patna.
 * Content here is placeholder-friendly and easy to replace with real data
 * during the Antigravity integration phase.
 */

export const site = {
  name: 'Shivam Ashoka Medical College & Hospital',
  shortName: 'SAMCH',
  location: 'Belchi, Patna, Bihar',
  domain: 'samchpatna.com',
  tagline: 'Medical Education · Clinical Training · Compassionate Care',
  whatsappNumber: '919031855502',
  whatsappDisplay: '+91 9031855502',
  enquiryMessage:
    'Hello SAMCH, I would like to know more about admissions and courses.',
  phonePlaceholder: '+91 9031855501',
  emailPlaceholder: 'hrsamchpatna@gmail.com',
  addressPlaceholder: 'SAMCH Campus, Belchi, Patna, Bihar — 803213',
}

export function whatsappHref() {
  const text = encodeURIComponent(site.enquiryMessage)
  return `https://wa.me/${site.whatsappNumber}?text=${text}`
}

export type NavLink = {
  label: string
  href: string
  description?: string
}

export type NavItem = {
  label: string
  href?: string
  children?: NavLink[]
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About SAMCH', href: '/about', description: 'The college & teaching hospital' },
      { label: 'Vision & Mission', href: '/about#vision', description: 'Our guiding principles' },
      // { label: 'Mandatory Disclosure', href: '/mandatory-disclosure', description: 'Official institutional information' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'Academic Overview', href: '/academics', description: 'Programs, learning & resources' },
      { label: 'Departments', href: '/departments', description: 'Pre, para & clinical departments' },
      { label: 'Library', href: '/academics#library', description: 'Central medical library' },
      { label: 'Attendance', href: '/attendance', description: 'Academic attendance system' },
    ],
  },
  {
    label: 'Hospital',
    href: '/hospital',
    children: [
      { label: 'Hospital Overview', href: '/hospital', description: 'Teaching hospital & patient care' },
      { label: 'Clinical Services', href: '/hospital#services', description: 'OPD, IPD & diagnostics' },
      { label: 'Emergency & Trauma', href: '/hospital#emergency', description: '24×7 emergency care' },
    ],
  },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Admissions', href: '/admissions' },
  {
    label: 'Committee',
    href: '/committee',
    children: [
      { label: 'Anti-Ragging Committee', href: '/committee/anti-ragging', description: 'Zero-tolerance policy' },
      { label: 'Curriculum Committee', href: '/committee/curriculum', description: 'Academic curriculum oversight' },
      { label: 'Gender Harassment Committee', href: '/committee/gender-harassment', description: 'Safe & equitable campus' },
      { label: 'MEU', href: '/committee/meu', description: 'Medical Education Unit' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const heroStats = [
  { value: '650+', label: 'Hospital Beds' },
  { value: '20+', label: 'Departments' },
  { value: '150+', label: 'Faculty Members' },
  { value: '24×7', label: 'Emergency Care' },
]

export const statistics = [
  { value: '650+', label: 'Hospital Beds', hint: 'Inpatient capacity' },
  { value: '20+', label: 'Medical Departments', hint: 'Pre, para & clinical' },
  { value: '150+', label: 'Faculty & Doctors', hint: 'Teaching staff' },
  { value: '150', label: 'MBBS Seats', hint: 'Per academic batch' },
  { value: '25+', label: 'Clinical Services', hint: 'Specialities' },
  { value: '24×7', label: 'Emergency Services', hint: 'Trauma & critical care' },
]

export type Department = {
  slug: string
  name: string
  group: 'Pre-Clinical' | 'Para-Clinical' | 'Clinical'
  description: string
  image: string
}

export const departments: Department[] = [
  { slug: 'anatomy', name: 'Anatomy', group: 'Pre-Clinical', description: 'Human structure, dissection and embryology foundations for clinical practice.', image: '/assets/departments/anatomy.jpg' },
  { slug: 'physiology', name: 'Physiology', group: 'Pre-Clinical', description: 'Functional mechanisms of the human body and applied physiology.', image: '/assets/departments/physiology.jpg' },
  { slug: 'biochemistry', name: 'Biochemistry', group: 'Pre-Clinical', description: 'Molecular and metabolic basis of health and disease.', image: '/assets/departments/biochemistry.jpg' },
  { slug: 'pathology', name: 'Pathology', group: 'Para-Clinical', description: 'Diagnostic study of disease processes and laboratory medicine.', image: '/assets/departments/pathology.jpg' },
  { slug: 'microbiology', name: 'Microbiology', group: 'Para-Clinical', description: 'Infectious agents, immunology and diagnostic microbiology.', image: '/assets/departments/microbiology.jpg' },
  { slug: 'pharmacology', name: 'Pharmacology', group: 'Para-Clinical', description: 'Drug action, rational prescribing and therapeutics.', image: '/assets/departments/pharmacology.jpg' },
  { slug: 'forensic-medicine', name: 'Forensic Medicine', group: 'Para-Clinical', description: 'Medico-legal science, toxicology and forensic pathology.', image: '/assets/departments/forensic-medicine.jpg' },
  { slug: 'community-medicine', name: 'Community Medicine', group: 'Para-Clinical', description: 'Public health, epidemiology and preventive care.', image: '/assets/departments/community-medicine.jpg' },
  { slug: 'general-medicine', name: 'General Medicine', group: 'Clinical', description: 'Comprehensive diagnosis and management of adult illnesses.', image: '/assets/departments/general-medicine.jpg' },
  { slug: 'general-surgery', name: 'General Surgery', group: 'Clinical', description: 'Surgical care across a broad range of conditions.', image: '/assets/departments/general-surgery.jpg' },
  { slug: 'obstetrics-gynaecology', name: 'Obstetrics & Gynaecology', group: 'Clinical', description: 'Womens health, maternity and reproductive care.', image: '/assets/departments/obstetrics-gynaecology.jpg' },
  { slug: 'paediatrics', name: 'Paediatrics', group: 'Clinical', description: 'Newborn, child and adolescent healthcare.', image: '/assets/departments/paediatrics.jpg' },
  { slug: 'orthopaedics', name: 'Orthopaedics', group: 'Clinical', description: 'Musculoskeletal, trauma and joint care.', image: '/assets/departments/orthopaedics.jpg' },
  { slug: 'ophthalmology', name: 'Ophthalmology', group: 'Clinical', description: 'Comprehensive eye care and vision services.', image: '/assets/departments/ophthalmology.jpg' },
  { slug: 'ent', name: 'ENT', group: 'Clinical', description: 'Ear, nose, throat and head-neck services.', image: '/assets/departments/ent.jpg' },
  { slug: 'dermatology', name: 'Dermatology', group: 'Clinical', description: 'Skin, hair and venereology care.', image: '/assets/departments/dermatology.jpg' },
  { slug: 'psychiatry', name: 'Psychiatry', group: 'Clinical', description: 'Mental health and behavioural sciences.', image: '/assets/departments/psychiatry.jpg' },
  { slug: 'anaesthesiology', name: 'Anaesthesiology', group: 'Clinical', description: 'Peri-operative and critical care anaesthesia.', image: '/assets/departments/anaesthesiology.jpg' },
  { slug: 'radiology', name: 'Radiodiagnosis', group: 'Clinical', description: 'Advanced imaging and diagnostic radiology.', image: '/assets/departments/radiology.jpg' },
  { slug: 'respiratory-medicine', name: 'Respiratory Medicine', group: 'Clinical', description: 'Pulmonary and respiratory disease management.', image: '/assets/departments/respiratory-medicine.jpg' },
]

export const departmentGroups = ['Pre-Clinical', 'Para-Clinical', 'Clinical'] as const

export type Committee = {
  slug: string
  name: string
  short: string
  intro: string
  purpose: string[]
}

export const committees: Committee[] = [
  {
    slug: 'anti-ragging',
    name: 'Anti-Ragging Committee',
    short: 'Anti-Ragging',
    intro:
      'SAMCH maintains a strict zero-tolerance policy against ragging in any form, in line with regulatory guidelines. The Anti-Ragging Committee safeguards a respectful and secure campus for every student.',
    purpose: [
      'Ensure a ragging-free campus and hostel environment',
      'Receive, investigate and act on complaints promptly',
      'Conduct regular awareness and orientation sessions',
      'Coordinate with authorities as per statutory norms',
    ],
  },
  {
    slug: 'curriculum',
    name: 'Curriculum Committee',
    short: 'Curriculum',
    intro:
      'The Curriculum Committee oversees the planning, implementation and continuous improvement of the competency-based medical education curriculum across all phases.',
    purpose: [
      'Align teaching-learning with the prescribed curriculum',
      'Coordinate integrated and phase-wise academic planning',
      'Monitor assessment and feedback mechanisms',
      'Recommend curricular enhancements and reforms',
    ],
  },
  {
    slug: 'gender-harassment',
    name: 'Gender Harassment Committee',
    short: 'Gender Harassment',
    intro:
      'The committee is committed to providing a safe, dignified and equitable environment, and addresses matters relating to prevention and redressal of gender-based harassment.',
    purpose: [
      'Prevent and redress complaints of harassment',
      'Ensure a safe environment for students and staff',
      'Conduct sensitisation and awareness programmes',
      'Maintain confidentiality and fair inquiry',
    ],
  },
  {
    slug: 'meu',
    name: 'Medical Education Unit (MEU)',
    short: 'MEU',
    intro:
      'The Medical Education Unit strengthens teaching capacity through faculty development, and supports modern, learner-centred medical education practices.',
    purpose: [
      'Organise faculty development programmes',
      'Promote innovative teaching-learning methods',
      'Support curriculum implementation and assessment',
      'Foster educational research and quality',
    ],
  },
]

export const infrastructure = [
  { category: 'Academic', title: 'Lecture Theatres', description: 'Fully equipped, tiered lecture halls with modern audio-visual systems.' },
  { category: 'Academic', title: 'Central Library', description: 'Extensive collection of medical texts, journals and digital resources.' },
  { category: 'Academic', title: 'Demonstration Rooms', description: 'Interactive spaces for small-group and integrated teaching.' },
  { category: 'Laboratories', title: 'Pre-Clinical Labs', description: 'Anatomy, physiology and biochemistry laboratories for practical training.' },
  { category: 'Laboratories', title: 'Para-Clinical Labs', description: 'Pathology, microbiology and pharmacology laboratory facilities.' },
  { category: 'Laboratories', title: 'Skills & Simulation Lab', description: 'Simulation-based clinical skills training environment.' },
  { category: 'Hospital', title: 'Modular Operation Theatres', description: 'Advanced OT complex supporting a wide range of surgeries.' },
  { category: 'Hospital', title: 'Critical Care Units', description: 'ICU, ICCU, NICU and PICU with continuous monitoring.' },
  { category: 'Hospital', title: 'Diagnostic Services', description: 'Radiology, imaging and laboratory diagnostics under one roof.' },
  { category: 'Campus', title: 'Student Hostels', description: 'Separate, secure residential facilities for students.' },
  { category: 'Campus', title: 'Sports & Recreation', description: 'Grounds and indoor facilities for a balanced campus life.' },
  { category: 'Campus', title: 'Cafeteria & Amenities', description: 'Hygienic dining and everyday student amenities.' },
]

export const infrastructureCategories = ['Academic', 'Laboratories', 'Hospital', 'Campus'] as const

export const galleryCategories = [
  'All',
  'Campus',
  'College',
  'Hospital',
  'Events',
  'Infrastructure',
  'Students',
] as const

export type GalleryItem = {
  id: number
  category: 'Campus' | 'College' | 'Hospital' | 'Events' | 'Infrastructure' | 'Students'
  caption: string
  image: string
}

export const galleryItems: GalleryItem[] = [
  { id: 1, category: 'Campus', caption: 'Campus — Photo 1', image: '/assets/gallery/campus-1.jpg' },
  { id: 2, category: 'College', caption: 'College — Photo 2', image: '/assets/gallery/college-2.jpg' },
  { id: 3, category: 'Hospital', caption: 'Hospital — Photo 3', image: '/assets/gallery/hospital-3.jpg' },
  { id: 4, category: 'Events', caption: 'Events — Photo 4', image: '/assets/gallery/events-4.jpg' },
  { id: 5, category: 'Infrastructure', caption: 'Infrastructure — Photo 5', image: '/assets/gallery/infrastructure-5.jpg' },
  { id: 6, category: 'Students', caption: 'Students — Photo 6', image: '/assets/gallery/students-6.jpg' },
  { id: 7, category: 'Campus', caption: 'Campus — Photo 7', image: '/assets/gallery/campus-7.jpg' },
  { id: 8, category: 'College', caption: 'College — Photo 8', image: '/assets/gallery/college-8.jpg' },
  { id: 9, category: 'Hospital', caption: 'Hospital — Photo 9', image: '/assets/gallery/hospital-9.jpg' },
  { id: 10, category: 'Events', caption: 'Events — Photo 10', image: '/assets/gallery/events-10.jpg' },
  { id: 11, category: 'Infrastructure', caption: 'Infrastructure — Photo 11', image: '/assets/gallery/infrastructure-11.jpg' },
  { id: 12, category: 'Students', caption: 'Students — Photo 12', image: '/assets/gallery/students-12.jpg' },
]

export type NewsItem = {
  id: number
  category: 'Notice' | 'News' | 'Event' | 'Announcement'
  title: string
  date: string
  excerpt: string
}

export const news: NewsItem[] = [
  { id: 1, category: 'Notice', title: 'Academic calendar for the upcoming academic session', date: '15 Sep 2026', excerpt: 'Comprehensive phase-wise academic schedule and examination timetable released.' },
  { id: 2, category: 'Announcement', title: 'Admissions enquiry window for MBBS batch is now open', date: '10 Sep 2026', excerpt: 'Prospective medical students can reach out through the official admission desk.' },
  { id: 3, category: 'Event', title: 'White Coat Ceremony for new MBBS batch', date: '01 Sep 2026', excerpt: 'An institutional induction ceremony marking the beginning of the medical journey.' },
  { id: 4, category: 'News', title: 'Continuing Medical Education (CME) workshop hosted at SAMCH', date: '25 Aug 2026', excerpt: 'Faculty development and recent advances in clinical medicine discussed by experts.' },
  { id: 5, category: 'Notice', title: 'Internal examination schedule notification', date: '18 Aug 2026', excerpt: 'Phase-wise internal assessment dates and guidelines for students.' },
  { id: 6, category: 'Event', title: 'Health awareness & free medical camp in Belchi', date: '12 Aug 2026', excerpt: 'Community medicine department conducted outreach health screening camp.' },
]

export const admissionPrograms = [
  { name: 'MBBS', duration: '5.5 Years', seats: '150 seats', note: 'Undergraduate medical program.' },
  { name: 'Postgraduate (MD/MS)', duration: '3 Years', seats: '50+ seats', note: 'Postgraduate specialities (as applicable).' },
  { name: 'Allied / Paramedical', duration: '2-3 Years', seats: '60+ seats', note: 'Allied health programs (as applicable).' },
]
