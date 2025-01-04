import {
  GenerateAnotherQuestionRequest,
  GenerateQuestionRequest,
  GenerateQuestionResponse,
} from '@/app/_types/api/interview';

/** 첫 질문 */
export async function generateQuestionAPI(params: GenerateQuestionRequest): Promise<GenerateQuestionResponse> {
  return fetchWithErrorHandling('/api/questions/initial', params);
}

/** 다른 주제 */
export async function generateAnotherQuestionAPI(
  params: GenerateAnotherQuestionRequest
): Promise<GenerateQuestionResponse> {
  return fetchWithErrorHandling('/api/questions/another', params);
}

/** 공통 fetch 로직 */
async function fetchWithErrorHandling(url: string, params: unknown): Promise<GenerateQuestionResponse> {
  try {
    const response = await fetch(url, {
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
