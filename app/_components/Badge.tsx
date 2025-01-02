import clsx from 'clsx';

import styles from './Badge.module.scss';

export default function Badge({
  option: { title, shade },
}: {
  option: { title: string; shade?: '01' | '02' | '03' | '04' | '05' };
}) {
  return <div className={clsx(styles.wrapper, shade && styles[`wrapper-${shade}`])}>{title}</div>;
}
