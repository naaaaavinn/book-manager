"use client";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import BookModal from "@/components/BookModal";
import { Book } from "@/types";
import BookRow from "@/components/BookRow";

interface Stats {
  total: number;
  wantToRead: number;
  reading: number;
  completed: number;
  tags: string[];
}

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("all");

  const { Option } = Select;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchBooks();
      fetchStats();
    }
  }, [user, filterStatus, filterTag]);

  const fetchBooks = async () => {
    try {
      let url = "/api/books";
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.append("status", filterStatus);
      if (filterTag !== "all") params.append("tag", filterTag);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/books/stats");
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await fetch(`/api/books/${id}`, { method: "DELETE" });
      fetchBooks();
      fetchStats();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleStatusChange = async (book: Book, newStatus: string) => {
    try {
      await fetch(`/api/books/${book._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...book, status: newStatus }),
      });
      fetchBooks();
      fetchStats();
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-(--primary) border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f7] mt-12">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {stats && (
          <div className="bg-white rounded p-4 mb-8 animate-fade-in border border-[#d2d2d7]">
            <p className="text-sm mr-2 rounded text-white inline-block uppercase bg-green-600 py-2 px-4 mt-2">
              Completed:{" "}
              <span className="text-2xl font-semibold">
                {stats.completed}
              </span>{" "}
            </p>
            <p className="text-sm mr-2 rounded uppercase text-white inline-block bg-blue-500 py-2 px-4 mt-2">
              Reading:{" "}
              <span className="text-2xl font-semibold">
                {stats.reading}
              </span>{" "}
            </p>
            <p className="text-sm uppercase rounded inline-block text-white bg-(--primary) py-2 px-4 mt-2">
              Want to Read:{" "}
              <span className="text-2xl font-semibold">
                {stats.wantToRead}
              </span>{" "}
            </p>
            <p className="text-sm uppercase text-[#4f4f4f] mt-2">
              Total Books:{" "}
              <span className="text-2xl font-semibold text-[#353535]">
                {stats.total}
              </span>{" "}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            <Select
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)}
              className="px-4 py-2 w-48 h-10 bg-white border border-[#d2d2d7] rounded-xl text-sm text-[#1d1d1f] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
            >
              <Option value="all">All Status</Option>
              <Option value="want-to-read">Want to Read</Option>
              <Option value="reading">Reading</Option>
              <Option value="completed">Completed</Option>
            </Select>

            {stats && stats.tags.length > 0 && (
              <Select
                allowClear
                onChange={(value) => setFilterTag(value ? value : 'all')}
                className="w-48 h-10 bg-[#f5f5f7] rounded-lg border border-[#d2d2d7] text-sm cursor-pointer hover:bg-white transition-all"
                placeholder='Select Tags'
              >
                {stats.tags.map((tag) => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
            )}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1 bg-(--primary) hover:cursor-pointer text-white rounded text-sm font-medium hover:bg-(--primary-hover) transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-xl">+</span> Book
          </button>
        </div>

        <div className="">
          {books.length === 0 ? (
            <div className="text-center py-20 border bg-white border-[#d2d2d7]/30 overflow-hidden text-[#86868b]">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-[#d2d2d7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-lg mb-1 text-[#1d1d1f]">No books yet</p>
              <p className="text-sm">Click "Add Book" to get started</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {books.map((book) => (
                <BookRow
                  key={book._id}
                  book={book}
                  onDelete={handleDeleteBook}
                  onEdit={setEditingBook}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <BookModal
          onClose={() => setShowAddModal(false)}
          onSave={() => {
            setShowAddModal(false);
            fetchBooks();
            fetchStats();
          }}
        />
      )}

      {editingBook && (
        <BookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={() => {
            setEditingBook(null);
            fetchBooks();
            fetchStats();
          }}
        />
      )}
    </div>
  );
}
