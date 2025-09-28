
import prisma from './prisma';

export async function getTextbooks() {
  try {
    const textbooks = await prisma.textbook.findMany();
    return textbooks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch textbooks.');
  }
}

export async function getSyllabus() {
  try {
    const syllabus = await prisma.syllabus.findMany();
    return syllabus;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch syllabus.');
  }
}

export async function getQuestionPapers() {
  try {
    const questionPapers = await prisma.questionPaper.findMany();
    return questionPapers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch question papers.');
  }
}

export async function getBlogs() {
  try {
    const blogs = await prisma.blog.findMany();
    return blogs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch blogs.');
  }
}
