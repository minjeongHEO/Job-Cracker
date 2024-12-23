import type { Metadata } from 'next';
import './_styles/globals.scss';

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
      <body className="container">{children}</body>
    </html>
  );
}
