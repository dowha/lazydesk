// lib/mock.ts

export type Project = {
  id: number
  title: string
  description: string
  image: string
  link: string
}

export type Article = {
  id: number
  title: string
  date: string
  description: string
  slug: string
}

export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'TaskFlow',
    description: 'Minimalist task management application.',
    image: '',
    link: '#',
  },
  {
    id: 2,
    title: 'ContentBlocks',
    description: 'Headless CMS for modern web projects.',
    image: '',
    link: '#',
  },
  {
    id: 3,
    title: 'PhotoGrid',
    description: 'Elegant photo gallery experience.',
    image: '',
    link: '#',
  },
  {
    id: 4,
    title: 'CodeSnippets',
    description: 'Save and organize your favorite code.',
    image: '',
    link: '#',
  },
  {
    id: 5,
    title: 'MicroBlog',
    description: 'A lightweight blogging platform.',
    image: '',
    link: '#',
  },
]

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Launching TaskFlow 2.0',
    date: 'April 10, 2025',
    description: "We've improved performance and added offline support.",
    slug: 'launching-taskflow-2',
  },
  {
    id: 2,
    title: 'Designing with Tailwind',
    date: 'March 25, 2025',
    description: 'How Tailwind CSS shaped our design system.',
    slug: 'designing-with-tailwind',
  },
  {
    id: 3,
    title: 'PhotoGrid: Behind the Scenes',
    date: 'March 5, 2025',
    description: 'What went into building a performant photo viewer.',
    slug: 'photogrid-behind-the-scenes',
  },
  {
    id: 4,
    title: 'Year in Review',
    date: 'January 1, 2025',
    description: 'Looking back at what we shipped in 2024.',
    slug: 'year-in-review-2024',
  },
]
