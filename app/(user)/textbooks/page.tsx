import { getTextbooks } from "@/lib/data";
import TextbooksClientPage from "./textbooks-client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textbooks",
  description:
    "Access and download textbooks for all your courses. Find comprehensive study materials, reference books, and course textbooks for exam preparation.",
  keywords: [
    "textbooks",
    "course books",
    "reference books",
    "DKPUCS",
    "study material",
    "ebooks",
    "academic books",
    "university textbooks",
  ],
  openGraph: {
    title: "Textbooks - DKPUCS",
    description: "Access and download textbooks for all your courses.",
    url: "https://dkpucs.vercel.app/textbooks",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/textbooks",
  },
};

export default async function TextbooksPage() {
  const textbooks = await getTextbooks();
  return <TextbooksClientPage initialTextbooks={textbooks} />;
}
