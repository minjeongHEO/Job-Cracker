import Image from 'next/image';
import Link from 'next/link';

import logo from '@/public/images/cracker.png';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.main_container}>
      <div className={styles.logo__image_container}>
        <div className={styles.shadow_box} />
        <Image className={styles.logo__image} src={logo} alt="Job Cracker Logo" width={208} height={208} />
      </div>

      <h1 className={styles.title}>Job-Cracker</h1>
      <div className={styles.description}>취뽀 팔로♾️로미😉</div>
      <div className={styles.sub_title}>AI와 함께하는 맞춤형 면접 준비</div>

      <Link href="/interview/developer" className={styles.button}>
        <span>시작하기</span>
      </Link>
    </div>
  );
}
