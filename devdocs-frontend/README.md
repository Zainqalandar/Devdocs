# DevDocs Frontend

W3Schools-style documentation platform built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**.

## Quick Start

```bash
# 1. Start backend first (port 5000)
cd ../devdocs-backend && npm run dev

# 2. Install & run frontend
npm install
cp .env.local.example .env.local
npm run dev          # http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── search/page.tsx                   # Full-text search
│   ├── auth/login/page.tsx
│   ├── auth/register/page.tsx
│   └── docs/
│       ├── page.tsx                      # All languages
│       └── [lang]/
│           ├── layout.tsx                # Sidebar + topbar wrapper
│           ├── page.tsx                  # Language overview
│           ├── loading.tsx + error.tsx
│           └── topics/[topic]/
│               ├── page.tsx
│               └── sections/[section]/page.tsx   # Main doc page
├── components/
│   ├── layout/
│   │   ├── DocsSidebar.tsx              # Collapsible topic tree
│   │   ├── DocsTopbar.tsx               # Breadcrumb + search + auth
│   │   └── DocsLayoutClient.tsx         # Pathname-aware client wrapper
│   └── docs/
│       ├── ContentRenderer.tsx          # All block types (code/note/tip/table...)
│       ├── ExamplesPanel.tsx            # Runnable examples + like button
│       ├── QuizPanel.tsx                # MCQ quiz with timer + grading
│       └── SectionActions.tsx           # Prev/next + bookmark + complete
├── api/client.ts                        # Full typed API client
├── store/authStore.ts                   # Zustand (JWT persisted)
└── types/index.ts                       # All interfaces
```

## Pages

| Route | Page |
|---|---|
| `/` | Landing with featured languages |
| `/docs` | All languages grid |
| `/docs/javascript` | Language overview + topics |
| `/docs/javascript/topics/js-basics` | Section list |
| `/docs/javascript/topics/js-basics/sections/javascript-variables` | Full doc page |
| `/search` | Full-text search |
| `/auth/login` | Login |
| `/auth/register` | Register |
