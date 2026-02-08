import { getSyllabus } from "@/lib/data";
import SyllabusClientPage from "./syllabus-client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syllabus",
  description:
    "Access detailed syllabus for all courses and subjects. Download course outlines, curriculum, and subject syllabus for exam preparation.",
  keywords: [
    "syllabus",
    "course syllabus",
    "curriculum",
    "DKPUCS",
    "subject syllabus",
    "course outline",
    "study material",
    "university syllabus",
  ],
  openGraph: {
    title: "Syllabus - DKPUCS",
    description: "Access detailed syllabus for all courses and subjects.",
    url: "https://dkpucs.vercel.app/syllabus",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/syllabus",
  },
};

export default async function SyllabusPage() {
  const syllabus = await getSyllabus();
  return <SyllabusClientPage initialSyllabus={syllabus} />;
}
