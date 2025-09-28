
import { getQuestionPapers } from '@/lib/data';

export default async function QPsPage() {
  const qps = await getQuestionPapers();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Question Papers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qps.length > 0 ? (
          qps.map((qp) => (
            <div key={qp.id} className="p-4 border rounded-lg text-center">
              <h2 className="text-xl font-semibold">{qp.subject} - {qp.year}</h2>
              <a href={qp.hyperlink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Download
              </a>
            </div>
          ))
        ) : (
          <p>No question papers found.</p>
        )}
      </div>
    </div>
  );
}
