import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: eslintPluginImport,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            // Next.js 관련 import를 최상단에 배치
            {
              pattern: 'next/**',
              group: 'builtin',
              position: 'before',
            },
            // next/navigation은 별도로 최상단에 배치
            {
              pattern: 'next/navigation',
              group: 'builtin',
              position: 'before',
            },
            // React 관련 import를 그 다음에 배치
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            // app 디렉토리 내부 파일들
            {
              pattern: '@/app/**',
              group: 'internal',
              position: 'after',
            },
            // 컴포넌트
            {
              pattern: '@/app/_components/**',
              group: 'internal',
              position: 'after',
            },
            // 기타 내부 모듈
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
