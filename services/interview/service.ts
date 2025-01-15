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

  const parsedResult = await getChatMessage(systemPrompt, userPrompt, isGenerateQuestionResponse);
  return parsedResult;
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

  const parsedResult = await getChatMessage(systemPrompt, userPrompt, isGenerateQuestionResponse);
  return parsedResult;
}

/** 답변에 대한 피드백 생성 */
export async function generateFeedbackAnswer({ topics, question, userAnswer }: GenerateFeedbackAnswerRequest) {
  const systemPrompt = getAnswerSystemPrompt({ topics, question, userAnswer });
  const userPrompt =
    '답변에 대한 점수 평가, 피드백, 개선된 답변을 제시하고, 답변에서 언급된 개념이나 기술에 대해 더 깊이 있게 확인할 수 있는 꼬리 질문도 함께 생성해주세요.';

  const parsedResult = await getChatMessage(systemPrompt, userPrompt, isFeedbackResponse);
  return parsedResult;
}
