import { getSyllabus } from '@/lib/data';
import SyllabusClientPage from './syllabus-client-page';

export default async function SyllabusPage() {
  const syllabus = await getSyllabus();
  return <SyllabusClientPage initialSyllabus={syllabus} />;
}
