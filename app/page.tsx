import Image from 'next/image';

import logo from '@/public/images/cracker.png';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles['main']}>
      <div className={styles['main__logo']}>
        <div className={styles['logo__shadow']} />
        <Image className={styles['logo__image']} src={logo} alt="Job Cracker Logo" width={208} height={208} />
      </div>

      <h1 className={styles['main__title']}>Job-Cracker</h1>
      <div className={styles['main__description']}>취뽀 팔로♾️로미😉</div>
      <div className={styles['main__sub-title']}>AI와 함께하는 맞춤형 면접 준비</div>

      <button className={styles['main__button']}>시작하기</button>
    </div>
  );
}
