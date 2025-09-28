
import { getTextbooks } from '@/lib/data';

export default async function TextbooksPage() {
  const textbooks = await getTextbooks();

  const textbooksBySection: { [key: string]: typeof textbooks } = {};
  textbooks.forEach(book => {
    if (!textbooksBySection[book.section]) {
      textbooksBySection[book.section] = [];
    }
    textbooksBySection[book.section].push(book);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Textbooks</h1>
      <div className="space-y-12">
        {Object.keys(textbooksBySection).length > 0 ? (
          Object.keys(textbooksBySection).map(section => (
            <div key={section}>
              <h2 className="text-3xl font-semibold border-b-2 pb-2 mb-6">{section}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {textbooksBySection[section].map(book => (
                  <div key={book.id} className="p-4 border rounded-lg flex flex-col">
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    {book.author && <p className="text-sm text-gray-600 mt-1">by {book.author}</p>}
                    <p className="text-md text-gray-800 my-2">Subject: {book.subject}</p>
                    <a href={book.hyperlink} target="_blank" rel="noopener noreferrer" className="mt-auto text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                      Get Book
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No textbooks found.</p>
        )}
      </div>
    </div>
  );
}
