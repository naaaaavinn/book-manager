"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-[#00d8e3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-14">
        <section className=" bg-[#00d8e3] border-b border-b-gray-400 mx-auto px-6 py-20 text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-6">
            Keep your reading life in order
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Minimal design. Maximum focus on reading.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="px-6 py-3 bg-white text-[#00d8e3] rounded-full text-base font-medium hover:bg-[#0077ed] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            >
              JOIN
            </Link>
          </div>
        </section>

        <section className="max-w-6xl border-b border-b-gray-400 mx-auto px-6 py-20 animate-slide-up">
          <div className="rounded-3xl p-12 md:p-16">
            <h1 className="uppercase text-4xl mb-4"> Features</h1>
            <div className="grid gap-12">
              <div className="text-center border-b border-b-gray-400 md:text-left p-4">
                <div className="w-12 h-12 bg-[#00d8e3] rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2 uppercase">
                  Want to Read
                </h3>
                <p className="text-[#86868b] leading-relaxed">
                  Keep track of books you want to read and never miss a recommendation.
                </p>
              </div>
              <div className="text-center border-b border-b-gray-400 md:text-left p-4">
                <div className="w-12 h-12 bg-[#00d8e3] rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2 uppercase">
                  Currently Reading
                </h3>
                <p className="text-[#86868b] leading-relaxed">
                  Track your progress on books you're actively reading.
                </p>
              </div>
              <div className="text-center md:text-left p-4">
                <div className="w-12 h-12 bg-[#00d8e3] rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2 uppercase">
                  Completed
                </h3>
                <p className="text-[#86868b] leading-relaxed">
                  Track completed books and expand your library.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-6">
            Join today and organize your reading life
          </h2>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-[#00d8e3] text-white rounded-full text-lg font-medium hover:bg-[#0077ed] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            CREATE NEW
          </Link>
        </section>
      </main>

      <footer className="border-t border-[#d2d2d7] py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-[#86868b]">
          <p>© 2026 Personal Book Manager.</p>
        </div>
      </footer>
    </div>
  );
}
