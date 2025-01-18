<div align="center">
<img src="https://github.com/user-attachments/assets/09732a35-8018-4926-a66f-f9dfab724863" alt="cracked-cracker" width="200">

# Job Cracker

### AI와 함께하는 맞춤형 면접 준비로 **취**업 **뽀**개자!

</div>

## 😎 프로젝트 소개

`Job Cracker`는 `AI`를 활용한 꼬리질문 면접 준비 서비스입니다.  
**♾️꼬리질문**과 **💯피드백**으로 기술면접을 준비할 수 있습니다.  
취뽀 팔로♾️로미😉

### AI와 함께하는 맞춤형 면접 준비

**개발 기간**: 2024.12 ~ (3주 + 진행 중)

**타겟**: 기술 면접을 앞두고 있는 개발자 누구나!

<br/>

## 🔗 [서비스 바로가기](https://jobcracker.site/)

<br/>

## 📱 주요 기능

### 1. 메인

![image](https://github.com/user-attachments/assets/f0e45049-da4e-4a77-a9bc-3d2b1fe3ff43)
![readme-main](https://github.com/user-attachments/assets/3db63d30-b98b-4b5b-bf06-e964394cd039)

### 2. 개발자, 면접 주제, 면접 상세 주제 선택

![readme-select](https://github.com/user-attachments/assets/bff2b054-3f64-4900-9668-4bd3b6cc90fb)

### 3. 카드 형식의 질문

- 선택한 개발자 타입과 주제에 따라 질문
- 답변에 따른 꼬리질문
- 질문의 중요도를 5가지로 나눠 질문의 중요도 표기
- 다른 주제로 변경 가능

![readme-input](https://github.com/user-attachments/assets/147b664d-f614-4c67-b54b-32e6a020a17c)
![readme-anotherquestion](https://github.com/user-attachments/assets/29026ab4-9edf-4f1c-8173-062418dac7e7)

### 4. 피드백

- 답변에 따른 피드백 제공
- 점수, 키워드, 개선답안 제공
  ![readme-feedback](https://github.com/user-attachments/assets/387c7bb1-2eca-4940-b5e6-51e2da32bf7a)

## 💻 UI/UX

### 반응형 디자인

![readme-responsive-feedback](https://github.com/user-attachments/assets/f0839d5a-7e87-44d2-b230-6696b5d877c3)

<br/>

## 🔧 기술 스택

### Frontend

**Framework**  
 <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>

**Language**  
 <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/CSS Module-000000?style=flat-square&logo=css modules&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/>

### Package Manager

<img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white"/>

### Testing

<img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=Vitest&logoColor=white"/>

### DevOps

<img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat-square&logo=GitHub Actions&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=white"/>

### Linting & Formatting

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white"/>

<br/>

## 📁 Directory Structure

</div>

```
📦 Root
├── .vscode/                     # VSCode 설정
│   └── settings.json           # 저장 시 자동 포맷팅 설정
│
├── app/                         # Next.js 앱 디렉토리
│   ├── _assets/                # 프로젝트 에셋 (SVG 등)
│   ├── _components/            # React 컴포넌트
│   │   ├── atoms/             # 원자 단위 컴포넌트
│   │   ├── molecules/         # 분자 단위 컴포넌트
│   │   ├── pages/             # 페이지 단위 컴포넌트
│   │   └── templates/         # 템플릿 컴포넌트
│   ├── _constants/            # 상수 값 관리
│   ├── _helpers/              # 헬퍼 함수
│   ├── _hooks/               # 커스텀 훅
│   ├── _styles/              # 스타일 관련 파일
│   │   └── _abstracts/        # Mixins, 변수 등 SCSS 추상화
│   ├── _types/               # TypeScript 타입 정의
│   ├── _utils/               # 유틸리티 함수
│   ├── api/                  # API 라우트
│   └── interview/            # 인터뷰 관련 페이지
│       └── select/[devType]  # 개발자 유형별 동적 라우팅
│
├── public/                     # 정적 파일 (폰트, 이미지)
│
└── services/                   # 서비스 로직
    ├── api/                   # API 클라이언트
    ├── interview/             # 인터뷰 관련 서비스
    └── openAI/                # OpenAI 설정 및 서비스
```

### 주요 특징

- **Atomic Design Pattern**: components 폴더에서 atoms, molecules, pages, templates 구조로 컴포넌트 관리
- **SCSS 추상화**: \_abstracts 폴더에서 mixins과 변수를 통해 일관된 스타일 패턴 관리
- **Dynamic Routing**: [devType]을 통해 frontend, backend, ios 등 개발자 유형별 페이지 동적 라우팅
- **모듈화**: 기능별로 분리된 폴더 구조로 코드 관리 (\_hooks, \_helpers, \_utils 등)
- **IDE 설정**: VSCode 설정을 통한 일관된 코드 포맷팅 자동화
