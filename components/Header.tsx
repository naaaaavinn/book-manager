"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBook } from "react-icons/bi";

export default function Header() {
  const { user, logout } = useAuth();
  const pathName = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#d2d2d7]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-[#1d1d1f]">
          <BiBook fontSize={32} />
        </Link>
        {pathName === "/" && (
          <div className="flex gap-6 items-center">
            <Link
              href="/login"
              className="bg-(--primary) text-white rounded-full text-base px-3 py-1.5 hover:bg-[#0077ed] font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <span className="text-base text-[#424242]">Hello, {user.name}</span>
            <button
              onClick={logout}
              className="text-sm bg-red-500 hover:bg-red-700 p-2 rounded text-white hover:cursor-pointer transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
