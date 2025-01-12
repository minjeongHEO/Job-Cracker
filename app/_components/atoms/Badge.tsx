import clsx from 'clsx';

import { BadgeShadeType } from '@/app/_types/interview';

import styles from './Badge.module.scss';

interface Props {
  title: string;
  shade?: BadgeShadeType;
}

export default function Badge({ option: { title, shade = '05' } }: { option: Props }) {
  return <div className={badgeClass(shade)}>{title}</div>;
}

function badgeClass(type: BadgeShadeType) {
  return clsx(styles.wrapper, type && styles[`wrapper-${type}`]);
}
