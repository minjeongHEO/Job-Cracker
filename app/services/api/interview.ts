// c:\study\my-project\Job-Cracker\app\services\api\interview.ts
import {
  GenerateAnotherQuestionRequest,
  GenerateFeedbackAnswerRequest,
  GenerateFeedbackAnswerResponse,
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

/** 질문에 대한 답변 피드백 */
export async function generateFeedbackAnswerAPI(
  params: GenerateFeedbackAnswerRequest
): Promise<GenerateFeedbackAnswerResponse> {
  return fetchWithErrorHandling('/api/feedBack', params);
}

/** 공통 fetch 로직 */
async function fetchWithErrorHandling(url: string, params: unknown) {
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
