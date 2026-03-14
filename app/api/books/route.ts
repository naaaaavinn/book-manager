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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');

    let query: any = { userId: userPayload.userId };

    if (status) {
      query.status = status;
    }

    if (tag) {
      query.tags = tag;
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ books }, { status: 200 });
  } catch (error: any) {
    console.error('Get books error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userPayload = getUserFromRequest(request);

    if (!userPayload) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { title, author, tags, status } = await request.json();

    if (!title || !author) {
      return NextResponse.json(
        { error: 'Title and author are required' },
        { status: 400 }
      );
    }

    const book = await Book.create({
      userId: userPayload.userId,
      title,
      author,
      tags: tags || [],
      status: status || 'want-to-read',
    });

    return NextResponse.json({ book }, { status: 201 });
  } catch (error: any) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
