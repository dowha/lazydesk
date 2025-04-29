'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectBadge from './ProjectBadge'

interface Project {
  id: string
  title: string
  summary: string
  icon_url?: string
  screenshot_url?: string
  external_url: string
}

export default function ProjectSelector({ projects }: { projects: Project[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleProject = (project: Project) => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      window.open(project.external_url, '_blank', 'noopener,noreferrer')
      return
    }

    if (selectedIds.includes(project.id)) {
      setSelectedIds((prev) => prev.filter((c) => c !== project.id))
    } else {
      setSelectedIds((prev) => [...prev, project.id])
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-6 p-4 sm:p-6 justify-center">
      <motion.div
        layout
        className="flex flex-wrap gap-2 sm:gap-3 w-full justify-center"
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      >
        {projects.map((project) => (
          <ProjectBadge
            key={project.id}
            project={project}
            isSelected={selectedIds.includes(project.id)}
            onToggle={() => toggleProject(project)}
          />
        ))}
      </motion.div>
    </div>
  )
}
