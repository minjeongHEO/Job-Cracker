import clsx from 'clsx';
import { FC, SVGProps } from 'react';

import styles from './SelectButton.module.scss';

interface SelectButtonProps {
  variant: 'simple' | 'detailed'; // 버튼 스타일 구분
  title: string;
  description?: string;
  subTitles?: string[];
  Icon?: FC<SVGProps<SVGSVGElement>>; // SVG 컴포넌트 타입
  isSelected?: boolean;
  onClick?: () => void;
}

export default function SelectButton({
  variant = 'simple',
  title,
  description,
  subTitles,
  Icon,
  isSelected = false,
  onClick,
}: SelectButtonProps) {
  return (
    <div className={clsx(styles.wrapper, { [styles['wrapper--selected']]: isSelected })} onClick={onClick}>
      <div className={styles['wrapper__title']}>
        {/* {variant === 'detailed' && Icon && <Icon />} //TODO: SVGR설정하여 아이콘 처리*/}
        <div>{title}</div>
      </div>

      {variant === 'detailed' && (
        <>
          <div className={styles['wrapper__description']}>{description}</div>
          <div className={styles['wrapper__sub-title']}>
            {subTitles && subTitles.length > 0 && subTitles?.map((e, idx) => <span key={`subTitle-${idx}`}>{e}</span>)}
          </div>
        </>
      )}
    </div>
  );
}
