'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { galleryCategories, galleryItems } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
  }
  const next = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }

  return (
    <>
      {/* Category filter */}
      <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Gallery categories">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all',
              activeCategory === cat
                ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => openLightbox(i)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted transition-all hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View ${item.caption}`}
          >
            <Image
              src={item.image}
              alt={item.caption}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-primary/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
              <ZoomIn className="size-6 text-white" aria-hidden />
              <span className="text-center text-xs font-semibold text-white">{item.caption}</span>
            </div>
            {/* Category badge */}
            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Showing {filtered.length} of {galleryItems.length} photos
      </p>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="size-5" aria-hidden />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>

          {/* Image */}
          <div
            className="mx-20 max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-card border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={filtered[lightboxIndex]?.image ?? ''}
                alt={filtered[lightboxIndex]?.caption ?? ''}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
            <div className="bg-black/80 px-6 py-3 text-center">
              <p className="text-sm font-medium text-white">{filtered[lightboxIndex]?.caption}</p>
              <p className="text-xs text-white/60">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </div>
      )}
    </>
  )
}
