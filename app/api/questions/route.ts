import { NextResponse } from 'next/server';

import { generateQuestion } from '@/app/_lib/interview';

// API 엔드포인트 로직
export async function POST(request: Request) {
  try {
    const { topic } = await request.json();
    const question = await generateQuestion(topic);

    return NextResponse.json({ question });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
