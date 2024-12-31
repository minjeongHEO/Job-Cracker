import clsx from 'clsx';
import { FC, SVGProps } from 'react';

import styles from './SelectButton.module.scss';

interface OptionType {
  title: string;
  description?: string;
  topics?: { [key: string]: string[] };
  Icon?: FC<SVGProps<SVGSVGElement>>; // SVG 컴포넌트 타입
}

interface SelectButtonProps {
  variant: 'simple' | 'detailed';
  option: OptionType;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function SelectButton({
  variant = 'simple',
  option: { title, description, topics = {} },
  isSelected = false,
  onClick,
}: SelectButtonProps) {
  return (
    <button className={wrapperClass(isSelected)} onClick={onClick} aria-label={title}>
      <div className={styles['wrapper__title']}>
        {/* {variant === 'detailed' && Icon && <Icon />} //TODO: SVGR설정하여 아이콘 처리*/}
        <div className={styles['wrapper__title-text']}>{title}</div>
      </div>

      {variant === 'detailed' && (
        <>
          <div className={styles['wrapper__description']}>{description}</div>
          <div className={styles['wrapper__topics']}>
            {Object.keys(topics).map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        </>
      )}
    </button>
  );
}

function wrapperClass(selected: boolean) {
  return clsx(styles.wrapper, {
    [styles['wrapper--selected']]: selected,
  });
}
