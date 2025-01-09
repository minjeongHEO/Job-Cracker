import clsx from 'clsx';

import Input from '@/app/_components/molecules/Input';
import QuestionCard from '@/app/_components/molecules/QuestionCard';
import { QuestionState } from '@/app/_types/interview';

import styles from './QuestionSection.module.scss';

interface QuestionSectionProps {
  handleQuestionClick: (question: string) => void;
  selectedQuestionId: string | null;
  questions: QuestionState[];
  handleGenerateAnotherQuestion: () => void;
}

export default function QuestionSection({
  handleQuestionClick,
  selectedQuestionId,
  questions,
  handleGenerateAnotherQuestion,
}: QuestionSectionProps) {
  return (
    <div
      className={clsx(styles['question_section'], { [styles['question_section--with-answer']]: selectedQuestionId })}
    >
      <header className={styles['question_section__header']}>
        <p className="title">면접 질문에 답변해보세요</p>
        <p className={styles['sub-title']}>꼬리 질문으로 실력 레벨업! 팔로♾️로미 😉</p>
      </header>
      <section className={styles['question_section__cards']}>
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            titleTopic={question.titleTopic}
            question={question}
            isSelected={question.id === selectedQuestionId}
            handleQuestionClick={handleQuestionClick}
            level={question.importance}
            isLastQuestion={questions[questions.length - 1].id === question.id}
            handleGenerateAnotherQuestion={handleGenerateAnotherQuestion}
          />
        ))}
      </section>

      <div className={styles['question_section__input-container']}>
        <Input />
      </div>
    </div>
  );
}
