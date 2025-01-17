import type { Metadata } from 'next';
import Link from 'next/link';

import PaperAirplaneIcon from '@/app/_components/icons/PaperAirplaneIcon';
import { GOOGLE_FORM_URL } from '@/app/_constants/form';

import './_styles/globals.scss';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Job Cracker',
  description: 'AI와 함께하는 맞춤형 면접 준비',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <Link href={GOOGLE_FORM_URL} target="_blank" className={styles['google-form']}>
          <PaperAirplaneIcon />
        </Link>
        {children}
      </body>
    </html>
  );
}
