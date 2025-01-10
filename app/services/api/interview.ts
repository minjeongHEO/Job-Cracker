import {
  GenerateAnotherQuestionRequest,
  GenerateFeedbackAnswerRequest,
  GenerateFeedbackAnswerResponse,
  GenerateQuestionRequest,
  GenerateQuestionResponse,
} from '@/app/_types/api/interview';

import { fetchWithErrorHandling } from './client';

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
