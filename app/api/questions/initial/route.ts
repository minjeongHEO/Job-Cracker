import { NextResponse } from 'next/server';

import { GenerateQuestionRequest } from '@/app/_types/api/interview';
import { generateQuestion } from '@/app/services/interview';

// API 엔드포인트 로직
export async function POST(request: Request) {
  try {
    const body: GenerateQuestionRequest = await request.json();
    const question = await generateQuestion(body);

    return NextResponse.json(question);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
