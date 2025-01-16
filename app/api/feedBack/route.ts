import { NextResponse } from 'next/server';

import { GenerateFeedbackAnswerRequest } from '@/app/_types/api/interview';

import { generateFeedbackAnswer } from '@/services/interview/service';

// API 엔드포인트 로직
export async function POST(request: Request) {
  try {
    const body: GenerateFeedbackAnswerRequest = await request.json();
    const question = await generateFeedbackAnswer(body);
    return NextResponse.json(question);
  } catch (error) {
    // SyntaxError(JSON.parse()가 실패할 때)
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          message: 'GPT 응답을 처리할 수 없습니다.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: '피드백 생성 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
