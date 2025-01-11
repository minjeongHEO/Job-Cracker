'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

import ArrowUpIcon from '@/app/_components/icons/ArrowUpIcon';

import styles from './Input.module.scss';

export const TEXT_AREA_MAX_HEIGHT = 200;

interface InputProps {
  handleGenerateFeedbackAnswer: (answer: string) => void;
}
export default function Input({ handleGenerateFeedbackAnswer }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent));
  }, []);

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

  const submitForm = () => {
    if (!textareaRef.current) return;
    const answerText = textareaRef.current.value;

    handleGenerateFeedbackAnswer(answerText);
    resetTextarea(textareaRef.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (!isMobile && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitForm();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className={styles.input} onSubmit={handleSubmit}>
      <textarea
        className={styles['input__text-box']}
        ref={textareaRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        aria-label="답변 입력"
        placeholder={isMobile ? '답변을 입력해주세요' : '답변을 입력해주세요 (Shift + Enter로 줄바꿈)'}
        rows={1}
      ></textarea>

      <button type="submit" className={styles['input__submit-button']} aria-label="답변 전송">
        <ArrowUpIcon />
      </button>
    </form>
  );
}
