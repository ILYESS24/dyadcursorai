import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { chats, messages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { appId, title, initialCommitHash } = body;

    if (!appId) {
      return NextResponse.json(
        { error: 'App ID is required' },
        { status: 400 }
      );
    }

    const newChat = await db.insert(chats).values({
      appId: parseInt(appId),
      title: title || 'New Chat',
      initialCommitHash,
      createdAt: new Date(),
    }).returning();

    return NextResponse.json(newChat[0]);
  } catch (error) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Failed to create chat' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const appId = searchParams.get('appId');

    let query = db.select().from(chats);
    
    if (appId) {
      query = query.where(eq(chats.appId, parseInt(appId)));
    }

    const chatsList = await query.orderBy(chats.createdAt);

    return NextResponse.json(chatsList);
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
}
