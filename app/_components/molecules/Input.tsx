import { FormEvent, useRef } from 'react';

import ArrowUpIcon from '@/app/_components/icons/ArrowUpIcon';

import styles from './Input.module.scss';

export const TEXT_AREA_MAX_HEIGHT = 200;

interface InputProps {
  handleGenerateFeedbackAnswer: (answer: string) => void;
}
export default function Input({ handleGenerateFeedbackAnswer }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, TEXT_AREA_MAX_HEIGHT)}px`;
    }
  };

  const resetTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.value = '';
    textarea.style.height = 'auto';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const answerText = textareaRef.current?.value;
    if (!answerText) return;

    handleGenerateFeedbackAnswer(answerText);
    if (textareaRef.current) resetTextarea(textareaRef.current);
  };

  return (
    <form className={styles.input} onSubmit={handleSubmit}>
      <textarea
        className={styles['input__text-box']}
        ref={textareaRef}
        onInput={handleInput}
        aria-label="답변 입력"
        placeholder="답변을 입력해주세요"
        rows={1}
      ></textarea>

      <button type="submit" className={styles['input__submit-button']} aria-label="답변 전송">
        <ArrowUpIcon />
      </button>
    </form>
  );
}
