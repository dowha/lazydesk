'use client'

import { useEffect, useCallback, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
} from 'framer-motion'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  summary: string
  icon_url?: string
  screenshot_url?: string
  external_url: string
}

export default function ProjectBadge({
  project,
  isSelected,
  onToggle,
}: {
  project: Project
  isSelected: boolean
  onToggle: () => void
}) {
  const controls = useAnimation()
  const x = useMotionValue(0)
  const summaryRef = useRef<HTMLSpanElement>(null)

  const startScrolling = useCallback(
    (delay = 0, reset = false) => {
      if (reset) x.set(0)

      requestAnimationFrame(() => {
        if (!summaryRef.current) return

        const scrollWidth = summaryRef.current.scrollWidth
        const clientWidth = summaryRef.current.clientWidth

        if (scrollWidth <= clientWidth + 5) return // 약간의 여유

        const baseDuration = 10
        const lengthFactor = (project.summary.length || 20) / 20
        const dynamicDuration = baseDuration * lengthFactor
        const clampedDuration = Math.min(Math.max(dynamicDuration, 5), 30)

        const scrollDistance = scrollWidth - clientWidth

        controls.start({
          x: -scrollDistance,
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: clampedDuration,
            ease: 'linear',
            delay,
          },
        })
      })
    },
    [x, controls, project.summary.length]
  )

  const stopScrolling = useCallback(() => {
    controls.stop()
  }, [controls])

  useEffect(() => {
    if (!isSelected) stopScrolling()
  }, [isSelected, stopScrolling])

  return (
    <motion.div
      layout
      onClick={onToggle}
      initial={false}
      animate={{
        backgroundColor: '#fff',
        borderColor: isSelected ? '#ff9066' : '#e5e7eb',
      }}
      whileHover={{
        borderColor: '#ff9066',
        backgroundColor: isSelected ? '#fff' : '#FFF9DB',
      }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      className={`group relative inline-flex items-center px-4 py-2 rounded-full text-sm sm:text-base font-medium overflow-visible border transition-all duration-300 ${
        isSelected ? 'text-gray-800' : 'text-gray-600'
      } cursor-pointer hover:text-gray-800`}
    >
      {project.icon_url && (
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center mr-2">
          <Image
            src={project.icon_url}
            alt="icon"
            width={20}
            height={20}
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <span className="mr-2 text-md">{project.title}</span>

      {/* summary */}
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: 'auto', marginLeft: '0.75rem' }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onAnimationComplete={() => {
              const el = summaryRef.current
              if (el && el.scrollWidth - el.clientWidth > 10) {
                startScrolling(0.5, true)
              }
            }}
            className="relative text-xs sm:text-sm text-gray-500 overflow-hidden whitespace-nowrap"
          >
            <motion.span
              ref={summaryRef}
              style={{ x }}
              animate={controls}
              onMouseEnter={stopScrolling}
              onMouseLeave={() => startScrolling(0, false)}
              className="inline-block"
            >
              {project.summary}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 열기 버튼 */}
      {isSelected && (
        <a
          href={project.external_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="ml-3 px-2 py-0.5 text-xs bg-white text-gray-500 border border-gray-300 rounded-full hover:text-gray-700 hover:bg-gray-100 transition"
        >
          열기
        </a>
      )}

      {/* 스크린샷 툴팁 */}
      {isSelected && project.screenshot_url && (
        <a
          href={project.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 border border-gray-500 bg-white rounded-md shadow-lg overflow-hidden z-10"
        >
          <Image
            src={project.screenshot_url}
            alt={`${project.title} screenshot`}
            width={256}
            height={160}
            className="object-cover w-full h-full"
            unoptimized
          />
        </a>
      )}
    </motion.div>
  )
}
