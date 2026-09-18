'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay in ms for a subtle stagger effect */
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
  id?: string
  once?: boolean
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 850,
  direction = 'up',
  as = 'div',
  id,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  const Tag = as as React.ElementType

  const getHiddenTransform = () => {
    switch (direction) {
      case 'down':
        return '-translate-y-8 opacity-0'
      case 'left':
        return 'translate-x-8 opacity-0'
      case 'right':
        return '-translate-x-8 opacity-0'
      case 'zoom':
        return 'scale-[0.94] opacity-0'
      case 'fade':
        return 'opacity-0'
      case 'up':
      default:
        return 'translate-y-8 opacity-0'
    }
  }

  const getVisibleTransform = () => {
    switch (direction) {
      case 'zoom':
        return 'scale-100 opacity-100'
      case 'fade':
        return 'opacity-100'
      default:
        return 'translate-x-0 translate-y-0 opacity-100'
    }
  }

  return (
    <Tag
      ref={ref}
      id={id}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={cn(
        'transition-all ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        visible ? getVisibleTransform() : getHiddenTransform(),
        className,
      )}
    >
      {children}
    </Tag>
  )
}
