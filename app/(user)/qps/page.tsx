import { getQuestionPapers } from "@/lib/data";
import QPsClientPage from "./qps-client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question Papers",
  description: "Access a comprehensive collection of previous year question papers for all courses. Download and practice for your exams with DKPUCS question paper repository.",
  keywords: [
    "question papers",
    "previous year papers",
    "exam papers",
    "DKPUCS",
    "study material",
    "exam preparation",
    "university papers",
    "semester papers",
  ],
  openGraph: {
    title: "Question Papers - DKPUCS",
    description: "Access previous year question papers for all courses. Download and practice for your exams.",
    url: "https://dkpucs.vercel.app/qps",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/qps",
  },
};

export default async function QPsPage() {
  const qps = await getQuestionPapers();
  return <QPsClientPage initialQPs={qps} />;
}
