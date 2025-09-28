
import { getSyllabus } from '@/lib/data';

export default async function SyllabusPage() {
  const syllabusData = await getSyllabus();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Syllabus</h1>
      <div className="space-y-4">
        {syllabusData.length > 0 ? (
          syllabusData.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg">
              <h2 className="text-2xl font-semibold">{item.course}</h2>
              <p className="mt-2 text-gray-700">{item.content}</p>
            </div>
          ))
        ) : (
          <p>No syllabus data found.</p>
        )}
      </div>
    </div>
  );
}
