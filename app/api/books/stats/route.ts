import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Book from '@/models/Book';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userPayload = getUserFromRequest(request);

    if (!userPayload) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();

    const totalBooks = await Book.countDocuments({ userId: userPayload.userId });
    const wantToRead = await Book.countDocuments({ userId: userPayload.userId, status: 'want-to-read' });
    const reading = await Book.countDocuments({ userId: userPayload.userId, status: 'reading' });
    const completed = await Book.countDocuments({ userId: userPayload.userId, status: 'completed' });

    const allBooks = await Book.find({ userId: userPayload.userId });
    const allTags = [...new Set(allBooks.flatMap(book => book.tags))];

    return NextResponse.json(
      {
        stats: {
          total: totalBooks,
          wantToRead,
          reading,
          completed,
          tags: allTags,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
