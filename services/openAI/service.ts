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
    throw new Error('Failed to generate question');
  }

  const result = JSON.parse(content);

  if (!validateResponse(result)) {
    throw new Error('Invalid response format');
  }

  return result;
}
