'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { DeveloperType } from '@/app/_types/interview';

import AnswerSection from './AnswerSection';
import styles from './InterviewChat.module.scss';
import QuestionSection from './QuestionSection';

interface InterviewChatProps {
  devType: DeveloperType;
  topics: string[];
  subTopics: string[];
}
export default function InterviewChat({ devType, topics, subTopics }: InterviewChatProps) {
  const [clickedQuestion, setClickedQuestion] = useState<string | null>(null);

  const handleQuestionClick = (question: string | null) => {
    setClickedQuestion(question);
  };

  return (
    <div className={styles['interview-chat']}>
      <div
        className={clsx(styles['interview-chat__container'], {
          [styles['interview-chat__container--with-answer']]: clickedQuestion,
        })}
      >
        <QuestionSection onClick={handleQuestionClick} clickedQuestion={clickedQuestion} />
      </div>

      <AnswerSection
        onClick={handleQuestionClick}
        clickedQuestion={clickedQuestion}
        level={{ title: '최우선 🚨', shade: '01' }}
        keywords={[
          '키워드 1',
          '키워드 2',
          '키워드 3',
          '키워드 4',
          '키워드 5',
          '키워드 6',
          '키워드 7',
          '키워드 8',
          '키워드 9',
          '키워드 10',
        ]}
        score={100}
        answer={'내답변은 이거야'}
        feedback={
          '피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. 피드백 내용은 이렇습니다. '
        }
        improvedAnswer={'100점짜리 답변은 이거다'}
      />
    </div>
  );
}
