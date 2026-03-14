'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Input } from 'antd';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(name, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex items-center justify-center px-4 pt-14">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-[#1d1d1f] mb-2 uppercase">Create New Account</h1>
            <p className="text-lg text-[#86868b] uppercase">Start Your Journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 bg-(--primary) p-8 rounded-md">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-12">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Name*
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 px-4 py-3 bg-white border border-[#d2d2d7] rounded-md text-[#1d1d1f] placeholder-[#86868b] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email*
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 py-3 bg-white border border-[#d2d2d7] rounded-md text-[#1d1d1f] placeholder-[#86868b] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password*
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-12 px-4 py-3 bg-white border border-[#d2d2d7] rounded-md text-[#1d1d1f] placeholder-[#86868b] focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-white text-(--primary) hover:text-white rounded-full text-base font-medium hover:bg-(--primary-hover) transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-[#86868b]">
                Already have an account?{' '}
                <Link href="/login" className="text-white hover:underline hover:text-(--primary-hover) font-medium transition-colors">
                  SIGN IN
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
