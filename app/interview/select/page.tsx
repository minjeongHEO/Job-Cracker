'use client';

import Link from 'next/link';
import { useState } from 'react';

import SelectButton from '@/app/_components/SelectButton';
import { DeveloperType } from '@/app/_types/interview';
import { typedEntries } from '@/app/_utils/typeUtils';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';

import SelectLayout from './_components/SelectLayout';

export default function SelectPage() {
  const [selectedDev, setSelectedDev] = useState<DeveloperType | null>();

  return (
    <SelectLayout title={'당신은 어떤 개발자인가요?'} subtitle={'관심 있는 개발 분야를 선택해주세요'}>
      {typedEntries(DEVELOPER_OPTIONS).map(([key, option]) => (
        <Link key={key} href={`/interview/select/${key}`}>
          <SelectButton
            variant="detailed"
            option={option}
            isSelected={selectedDev === key}
            onClick={() => setSelectedDev(key)}
          />
        </Link>
      ))}
    </SelectLayout>
  );
}
