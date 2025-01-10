import { NextResponse } from 'next/server';

import { GenerateAnotherQuestionRequest } from '@/app/_types/api/interview';

import { generateAnotherQuestion } from '@/services/interview/service';

// API 엔드포인트 로직
export async function POST(request: Request) {
  try {
    const body: GenerateAnotherQuestionRequest = await request.json();
    const question = await generateAnotherQuestion(body);

    return NextResponse.json(question);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
