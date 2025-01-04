import clsx from 'clsx';

import { BadgeShadeType } from '@/app/_types/interview';

import styles from './Badge.module.scss';

export default function Badge({
  option: { title, shade = '05' },
}: {
  option: { title: string; shade?: BadgeShadeType };
}) {
  return <div className={clsx(styles.wrapper, shade && styles[`wrapper-${shade}`])}>{title}</div>;
}
