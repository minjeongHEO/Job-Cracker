import { isGenerateQuestionResponse } from '@/app/_helpers/typeGuards';
import { GenerateAnotherQuestionRequest, GenerateQuestionRequest } from '@/app/_types/api/interview';

import openai from './openai';

const getSystemPrompt = ({ devType, topics, subTopics }: GenerateQuestionRequest) => {
  const topic = topics.join(', ');
  const subTopic = subTopics.join(', ');
  const systemPrompt = `당신은 기술 면접을 통해서 ${devType} 개발자를 뽑는 개발자와 면접관 경력이 10년 이상의 Tech Lead입니다.
다음 형식의 JSON으로 응답해주세요:
{
  "question": "면접 질문",
  "importance": "중요도('01'~'05')",
  "keywords": ["키워드1", "키워드2"],
  "titleTopic": "해당 질문이 속한 주제"
}

중요도 기준:
- 01(⭐⭐⭐⭐⭐): 정확하게 알아야 하며, 모르면 탈락하는 필수 지식
- 02(⭐⭐⭐⭐): 90% 이상 알아야 하는 핵심 지식
- 03(⭐⭐⭐): 프레임워크, 라이브러리 등 중요한 실무 지식
- 04(⭐⭐): 기본적이고 가벼운 지식
- 05(⭐): 알면 좋은 가산점 지식

주어진 topic(${topic})과 subTopic(${subTopic})에 대해 
실제 면접에서 자주 나오는 중요한 질문을 생성해주세요.

응답시 주의사항:
1. 질문은 구체적이고 명확해야 합니다.
2. 키워드는 3-5개 정도가 적당합니다.
3. 키워드는 질문에 대한 답을 연상할 수 있도록 도와줄 수 있는 핵심 키워드거나, 추가 학습을 위한 관련 검색 키워드를 제안해주세요.
4. 난이도는 주어진 기준에 맞게 정확히 판단해주세요.
5. titleTopic은 생성한 질문이 주어진 topic(${topic})중 어느 주제에 해당하는지 명시해주세요.`;

  return systemPrompt;
};

/** 초기 질문 생성 */
export async function generateQuestion({ devType, subTopics, topics }: GenerateQuestionRequest) {
  const systemPrompt = getSystemPrompt({ devType, topics, subTopics });
  const userPrompt = `${topics.join(', ')}의 ${subTopics.join(
    ', '
  )}에 관련한 면접 질문을 중요도가 높은걸 우선 순위로 하여 랜덤으로 생성해주세요.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Failed to generate question');
    }

    const result = JSON.parse(content);
    if (!isGenerateQuestionResponse(result)) {
      throw new Error('Invalid response format');
    }

    return result;
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
  const systemPrompt = getSystemPrompt({ devType, topics, subTopics });

  const userPrompt = `이전 질문: "${questionState.question}"
  이전 질문의 주제: "${questionState.titleTopic}"

  ${topics.join(',')}의 ${subTopics.join(',')}에 대해, 이전 질문과 다른 주제의 면접 질문을 생성해주세요.
  특히 ${questionState.titleTopic}을 제외한 다른 주제에서 중요도가 높은 질문을 우선적으로 생성해주세요.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Failed to generate question');
    }

    const result = JSON.parse(content);
    if (!isGenerateQuestionResponse(result)) {
      throw new Error('Invalid response format');
    }

    return result;
  } catch (error) {
    throw error;
  }
}
