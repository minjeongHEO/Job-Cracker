'use client';

import SelectLayout from '@/app/_components/templates/SelectLayout';

import styles from './error.module.scss';

export default function DevTypeError({ error }: { error: Error & { digest?: string } }) {
  return (
    <SelectLayout title={'오류가 발생했습니다😅'}>
      <span>{error.message}</span>

      <button className={styles['go-home']} onClick={() => (window.location.href = '/')}>
        홈으로
      </button>
    </SelectLayout>
  );
}
