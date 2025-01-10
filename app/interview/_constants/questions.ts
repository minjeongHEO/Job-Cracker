import { BadgeShadeType } from '@/app/_types/interview';

export const IMPORTANCE_LEVEL: Record<BadgeShadeType, { title: string; shade: BadgeShadeType }> = {
  '01': { title: '최우선 🚨', shade: '01' },
  '02': { title: '필수 ⭐️⭐️⭐️', shade: '02' },
  '03': { title: '중요 ⭐️⭐️', shade: '03' },
  '04': { title: '기본 ⭐️', shade: '04' },
  '05': { title: '심화', shade: '05' },
};
