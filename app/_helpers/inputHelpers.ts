import { RefObject } from 'react';

import { TEXT_AREA_MAX_HEIGHT } from '@/app/_constants/questions';
import { LoadingType } from '@/app/_types/interview';

export const getPlaceHolder = (loadingType: LoadingType, isMobile: boolean) => {
  if (loadingType === 'feedback') {
    return '답변을 검토 중 입니다...';
  }
  if (loadingType === 'question') {
    return '질문을 생성 중 입니다...';
  }
  return isMobile ? '답변을 입력해주세요' : '답변을 입력해주세요 (Shift + Enter로 줄바꿈)';
};

export const resetTextarea = (textarea: HTMLTextAreaElement) => {
  textarea.value = '';
  textarea.style.height = 'auto';
};

export const handleInput = (textareaRef: RefObject<HTMLTextAreaElement | null>) => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, TEXT_AREA_MAX_HEIGHT)}px`;
  }
};
