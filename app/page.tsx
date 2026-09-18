import { Hero } from '@/components/home/hero'
import { AboutPreview } from '@/components/home/about-preview'
import { DepartmentsPreview } from '@/components/home/departments-preview'
import { HospitalPreview } from '@/components/home/hospital-preview'
import { FacultySection } from '@/components/home/faculty-section'
import { BlogSection } from '@/components/home/blog-section'
import { NewsPreview } from '@/components/home/news-preview'
import { GalleryPreview } from '@/components/home/gallery-preview'
import { CtaBand } from '@/components/site/cta-band'
import { Reveal } from '@/components/site/reveal'

export default function HomePage() {
  return (
    <>
      <Hero />

      <Reveal direction="up" duration={750}>
        <AboutPreview />
      </Reveal>

      <Reveal direction="up" duration={750}>
        <DepartmentsPreview />
      </Reveal>

      <Reveal direction="up" duration={750}>
        <HospitalPreview />
      </Reveal>

      <Reveal direction="up" duration={750}>
        <NewsPreview />
      </Reveal>

      <Reveal direction="up" duration={750}>
        <GalleryPreview />
      </Reveal>

      <Reveal direction="up" duration={750}>
        <FacultySection />
      </Reveal>

      <Reveal direction="up" duration={750}>
        <BlogSection />
      </Reveal>

      <Reveal direction="up" duration={750}>
        <CtaBand />
      </Reveal>
    </>
  )
}

