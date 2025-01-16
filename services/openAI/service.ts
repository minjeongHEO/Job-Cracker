import { openai } from './config';

/** 공통 fetch 로직 */
export async function getChatMessage<T>(
  systemPrompt: string,
  userPrompt: string,
  validateResponse: (obj: unknown) => obj is T
): Promise<T> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('GPT 의 질문 생성에 실패하였습니다.');
  }

  const result = JSON.parse(content);
  if (!validateResponse(result)) {
    throw new Error('GPT 응답 형식이 올바르지 않습니다.');
  }
  return result;
}
