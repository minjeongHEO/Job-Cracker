import { isFeedbackResponse, isGenerateQuestionResponse } from '@/app/_helpers/typeGuards';
import {
  GenerateAnotherQuestionRequest,
  GenerateFeedbackAnswerRequest,
  GenerateQuestionRequest,
} from '@/app/_types/api/interview';
import { getChatMessage } from '@/services/openAI/service';

import { getAnswerSystemPrompt, getQuestionSystemPrompt } from './prompts';

/** 초기 질문 생성 */
export async function generateQuestion({ devType, subTopics, topics }: GenerateQuestionRequest) {
  const systemPrompt = getQuestionSystemPrompt({ devType, topics, subTopics });
  const userPrompt = `${topics.join(', ')}의 ${subTopics.join(
    ', '
  )}에 관련한 면접 질문을 중요도가 높은걸 우선 순위로 하여 랜덤으로 생성해주세요.`;

  try {
    const parsedResult = await getChatMessage(systemPrompt, userPrompt, isGenerateQuestionResponse);
    return parsedResult;
  } catch (error) {
    throw error;
  }
}

/** 다른 질문 생성 */
export async function generateAnotherQuestion({
  devType,
  subTopics,
  topics,
  questionState,
}: GenerateAnotherQuestionRequest) {
  const systemPrompt = getQuestionSystemPrompt({ devType, topics, subTopics });
  const userPrompt = `이전 질문: "${questionState.question}"
  이전 질문의 주제: "${questionState.titleTopic}"

  ${topics.join(',')}의 ${subTopics.join(',')}에 대해, 이전 질문과 다른 주제의 면접 질문을 생성해주세요.
  특히 ${questionState.titleTopic}을 제외한 다른 주제에서 중요도가 높은 질문을 우선적으로 생성해주세요.`;

  try {
    const parsedResult = await getChatMessage(systemPrompt, userPrompt, isGenerateQuestionResponse);
    return parsedResult;
  } catch (error) {
    throw error;
  }
}

/** 답변에 대한 피드백 생성 */
export async function generateFeedbackAnswer({ question, userAnswer }: GenerateFeedbackAnswerRequest) {
  const systemPrompt = getAnswerSystemPrompt({ question, userAnswer });
  const userPrompt = '답변을 평가와 개선을 해주세요';

  try {
    const parsedResult = await getChatMessage(systemPrompt, userPrompt, isFeedbackResponse);
    return parsedResult;
  } catch (error) {
    throw error;
  }
}
