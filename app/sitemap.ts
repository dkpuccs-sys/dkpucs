import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dkpucs.vercel.app'

  const blogs = await prisma.blog.findMany({
    select: { id: true, updatedAt: true },
  })

  const labManuals = await prisma.labManual.findMany({
    select: { id: true, updatedAt: true },
  })

  const qps = await prisma.questionPaper.findMany({
    select: { id: true, updatedAt: true },
  })

  const syllabus = await prisma.syllabus.findMany({
    select: { id: true, updatedAt: true },
  })

  const textbooks = await prisma.textbook.findMany({
    select: { id: true, updatedAt: true },
  })

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: blog.updatedAt,
  }))

  const labManualUrls = labManuals.map((manual) => ({
    url: `${baseUrl}/lab-manuals/${manual.id}`,
    lastModified: manual.updatedAt,
  }))

  const qpUrls = qps.map((qp) => ({
    url: `${baseUrl}/qps/${qp.id}`,
    lastModified: qp.updatedAt,
  }))

  const syllabusUrls = syllabus.map((s) => ({
    url: `${baseUrl}/syllabus/${s.id}`,
    lastModified: s.updatedAt,
  }))

  const textbookUrls = textbooks.map((textbook) => ({
    url: `${baseUrl}/textbooks/${textbook.id}`,
    lastModified: textbook.updatedAt,
  }))

  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date() },
    { url: `${baseUrl}/announcements`, lastModified: new Date() },
    { url: `${baseUrl}/blogs`, lastModified: new Date() },
    { url: `${baseUrl}/lab-manuals`, lastModified: new Date() },
    { url: `${baseUrl}/qps`, lastModified: new Date() },
    { url: `${baseUrl}/syllabus`, lastModified: new Date() },
    { url: `${baseUrl}/textbooks`, lastModified: new Date() },
  ]

  return [
    ...staticUrls,
    ...blogUrls,
    ...labManualUrls,
    ...qpUrls,
    ...syllabusUrls,
    ...textbookUrls,
  ]
}
