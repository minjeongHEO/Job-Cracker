import { GenerateQuestionRequest, GenerateQuestionResponse } from '@/app/_types/api/interview';

/** 첫 질문 */
export async function generateQuestionAPI(params: GenerateQuestionRequest): Promise<GenerateQuestionResponse> {
  try {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server Error:', errorData);
      throw new Error(errorData.error || 'Failed to generate question');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
