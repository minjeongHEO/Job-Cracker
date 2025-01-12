import { useState } from 'react';

import { QuestionState } from '@/app/_types/interview';

export default function useQuestionSelection(questions: QuestionState[]) {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | undefined>(undefined);

  /** 클릭한 질문카드 정보 */
  const selectedQuestion = questions.find(({ id }) => id === selectedQuestionId);

  /** 질문카드 클릭 */
  const handleQuestionClick = (id: string) => setSelectedQuestionId(id);

  /** 답변창 닫기 */
  const handleCloseAnswer = () => setSelectedQuestionId(undefined);

  return { selectedQuestionId, selectedQuestion, handleQuestionClick, handleCloseAnswer };
}
