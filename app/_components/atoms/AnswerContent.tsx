import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './AnswerContent.module.css';

interface Props {
  type: 'default' | 'answer';
  title: string;
  children: ReactNode;
}

export default function AnswerContent({ type, title, children }: Props) {
  return (
    <div className={styles['answer-contents']}>
      <div className={styles['answer-contents__title']}>{title}</div>
      <p className={contentClass(type)}>{children}</p>
    </div>
  );
}

function contentClass(type: 'default' | 'answer') {
  return clsx({
    [styles['answer-contents__answer']]: type === 'default',
    [styles['answer-contents__answer-me']]: type === 'answer',
  });
}
