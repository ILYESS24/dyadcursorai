import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { apps } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allApps = await db.select().from(apps);
    return NextResponse.json(allApps);
  } catch (error) {
    console.error('Error fetching apps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch apps' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, path, githubOrg, githubRepo, githubBranch } = body;

    if (!name || !path) {
      return NextResponse.json(
        { error: 'Name and path are required' },
        { status: 400 }
      );
    }

    const newApp = await db.insert(apps).values({
      name,
      path,
      githubOrg,
      githubRepo,
      githubBranch,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(newApp[0]);
  } catch (error) {
    console.error('Error creating app:', error);
    return NextResponse.json(
      { error: 'Failed to create app' },
      { status: 500 }
    );
  }
}
