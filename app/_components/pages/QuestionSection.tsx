'use client';

import QuestionCard from '../molecules/QuestionCard';

export default function QuestionSection() {
  return (
    <div>
      <QuestionCard isSelected={false} level={'01'} />
      <QuestionCard isSelected={false} level={'02'} />
      <QuestionCard isSelected={false} level={'03'} />
    </div>
  );
}
