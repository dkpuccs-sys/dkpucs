import { getQuestionPapers } from "@/lib/data";
import QPsClientPage from "./qps-client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Question Papers",
  description: "Find previous year question papers for your courses.",
};

export default async function QPsPage() {
  const qps = await getQuestionPapers();
  return <QPsClientPage initialQPs={qps} />;
}
