import { getBlogs } from '@/lib/data';

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>
      <div className="space-y-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="p-6 border rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-4">By {blog.author || 'Anonymous'} on {new Date(blog.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-800">{blog.content}</p>
            </div>
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
