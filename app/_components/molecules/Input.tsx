import { useRef } from 'react';

import ArrowUpIcon from '@/app/_components/icons/ArrowUpIcon';

import styles from './Input.module.scss';

export const TEXT_AREA_MAX_HEIGHT = 200;

export default function Input() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, TEXT_AREA_MAX_HEIGHT)}px`;
    }
  };

  return (
    <form className={styles.input}>
      <textarea
        className={styles['input__text-box']}
        ref={textareaRef}
        onInput={handleInput}
        aria-label="답변 입력"
        placeholder="답변을 입력해주세요"
        rows={1}
      ></textarea>

      <button className={styles['input__submit-button']}>
        <ArrowUpIcon />
      </button>
    </form>
  );
}
