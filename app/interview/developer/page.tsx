'use client';
import Link from 'next/link';
import { useState } from 'react';

import SelectButton from '@/app/_components/SelectButton';
import { DeveloperType } from '@/app/_types/interview';
import { typedEntries } from '@/app/_utils/typeUtils';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';

import styles from './DeveloperPage.module.scss';

export default function DeveloperPage() {
  const [selectedDev, setSelectedDev] = useState<DeveloperType | null>();

  return (
    <div className={styles.main}>
      <div className={styles['main__description']}>
        <div className={styles['main__title']}>당신은 어떤 개발자인가요?</div>
        <div className={styles['main__sub-title']}>관심 있는 개발 분야를 선택해주세요.</div>
      </div>

      <div className={styles['main__selectBox']}>
        {typedEntries(DEVELOPER_OPTIONS).map(([key, option]) => (
          <Link key={key} href={`/interview/developer/${key}`}>
            <SelectButton
              variant="detailed"
              option={option}
              isSelected={selectedDev === key}
              onClick={() => setSelectedDev(key)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
