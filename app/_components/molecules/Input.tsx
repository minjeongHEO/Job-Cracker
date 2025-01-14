'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

import ArrowUpIcon from '@/app/_components/icons/ArrowUpIcon';

import { getPlaceHolder, handleInput, resetTextarea } from '@/app/_helpers/inputHelpers';
import { LoadingType } from '@/app/_types/interview';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps {
  handleGenerateFeedbackAnswer: (answer: string) => void;
  loadingType: LoadingType;
}
export default function Input({ handleGenerateFeedbackAnswer, loadingType }: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent));
  }, []);

  const submitForm = () => {
    if (!textareaRef.current) return;
    try {
    } catch (error) {}
    const answerText = textareaRef.current.value;

    resetTextarea(textareaRef.current);
    handleGenerateFeedbackAnswer(answerText);
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
    <form className={loadingClass(loadingType)} onSubmit={handleSubmit}>
      <textarea
        className={styles['input__text-box']}
        ref={textareaRef}
        onInput={() => handleInput(textareaRef)}
        onKeyDown={handleKeyDown}
        aria-label="답변 입력"
        placeholder={getPlaceHolder(loadingType, isMobile)}
        rows={1}
        disabled={loadingType !== null}
      ></textarea>

      <button
        type="submit"
        className={styles['input__submit-button']}
        aria-label="답변 전송"
        disabled={loadingType !== null}
      >
        <ArrowUpIcon className={styles['input__submit-button__icon']} />
      </button>
    </form>
  );
}

function loadingClass(loadingType: LoadingType) {
  return clsx(styles.input, {
    [styles['input--loading']]: loadingType !== null,
  });
}
