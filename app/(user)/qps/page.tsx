import { getQuestionPapers } from "@/lib/data";
import QPsClientPage from "./qps-client-page";

export default async function QPsPage() {
  const qps = await getQuestionPapers();
  return <QPsClientPage initialQPs={qps} />;
}
