import { NextResponse } from 'next/server';

import { GenerateFeedbackAnswerRequest } from '@/app/_types/api/interview';
import { generateFeedbackAnswer } from '@/app/services/interview';

// API 엔드포인트 로직
export async function POST(request: Request) {
  try {
    const body: GenerateFeedbackAnswerRequest = await request.json();
    const question = await generateFeedbackAnswer(body);

    return NextResponse.json(question);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate question' }, { status: 500 });
  }
}
