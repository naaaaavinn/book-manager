import { Input, Select } from "antd";
import { useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: 'want-to-read' | 'reading' | 'completed';
  createdAt: string;
}

export default function BookModal({
  book,
  onClose,
  onSave,
}: {
  book?: Book;
  onClose: () => void;
  onSave: () => void;
}) {
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [tags, setTags] = useState(book?.tags.join(', ') || '');
  const [status, setStatus] = useState(book?.status || 'want-to-read');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { Option } = Select;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t);

      const url = book ? `/api/books/${book._id}` : '/api/books';
      const method = book ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, tags: tagsArray, status }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save book');
      }

      onSave();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-slide-up">
        <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-6">
          {book ? 'Edit Book' : 'Add New Book'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
              Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full h-12 px-4 py-3 bg-white border border-[#d2d2d7] rounded text-[#1d1d1f] placeholder-[#86868b] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
              placeholder="Book title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
              Author
            </label>
            <Input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full h-12 px-4 py-3 bg-white border border-[#d2d2d7] rounded text-[#1d1d1f] placeholder-[#86868b] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
              Tags (comma-separated)
            </label>
            <Input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full h-12 px-4 py-3 bg-white border border-[#d2d2d7] rounded text-[#1d1d1f] placeholder-[#86868b] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
              placeholder="fiction, mystery, thriller"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
              Status
            </label>
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              className="w-full h-12 px-4 py-3 bg-white border border-[#d2d2d7] text-[#1d1d1f] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
            >
              <Option value="want-to-read">Want to Read</Option>
              <Option value="reading">Reading</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#d2d2d7] rounded-full text-[#1d1d1f] hover:bg-[#f5f5f7] transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-(--primary) text-white rounded-full hover:bg-(--primary-hover) transition-all disabled:opacity-50 font-medium shadow-sm hover:shadow-md"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}