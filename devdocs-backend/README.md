# DevDocs Backend API

W3Schools-style documentation platform backend built with **TypeScript**, **Express**, and **Mongoose**.

---

## 🗂️ Project Structure

```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── controllers/
│   ├── authController.ts    # Register, login, progress, bookmarks
│   ├── languageController.ts
│   ├── topicController.ts
│   ├── sectionController.ts # Documentation pages + search
│   ├── exampleController.ts # Code examples
│   └── quizController.ts    # MCQ quizzes with auto-grading
├── middleware/
│   ├── auth.ts              # JWT protect + role restrict
│   └── errorHandler.ts      # Global error handling
├── models/
│   ├── Language.ts          # e.g. JavaScript, Python, React
│   ├── Topic.ts             # e.g. "JS Basics", "JS Functions"
│   ├── Section.ts           # Individual doc pages with content blocks
│   ├── Example.ts           # Runnable code examples
│   ├── Quiz.ts              # MCQ quizzes per section
│   └── User.ts              # Auth + progress tracking
├── routes/                  # Nested RESTful routes
├── seed/
│   ├── javascriptData.ts    # Full JS docs seed data
│   └── index.ts             # Seed runner
├── types/
│   └── apiResponse.ts       # Typed response helpers
├── app.ts                   # Express app setup
└── index.ts                 # Server entry point
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET
```

### 3. Seed the database (JavaScript docs)
```bash
npm run seed
```

### 4. Start development server
```bash
npm run dev
```

Server starts at: `http://localhost:5000`

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication
```
POST /api/auth/register     { name, email, password }
POST /api/auth/login        { email, password }
GET  /api/auth/me           [JWT required]
PATCH /api/auth/me          [JWT required] { name, avatar }
POST /api/auth/progress     [JWT required] { sectionId }
POST /api/auth/bookmark     [JWT required] { sectionId }
```

### Languages
```
GET    /api/languages                    List all languages
GET    /api/languages/stats              Category stats
GET    /api/languages/:slug              Language + topics
POST   /api/languages                    [admin] Create
PATCH  /api/languages/:slug              [admin] Update
DELETE /api/languages/:slug              [admin] Delete
```

### Topics
```
GET    /api/languages/:langSlug/topics
GET    /api/languages/:langSlug/topics/:topicSlug
POST   /api/languages/:langSlug/topics                    [admin]
PATCH  /api/languages/:langSlug/topics/:topicSlug         [admin]
DELETE /api/languages/:langSlug/topics/:topicSlug         [admin]
```

### Sections (Documentation Pages)
```
GET    /api/languages/:langSlug/topics/:topicSlug/sections
GET    /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug
POST   /api/languages/:langSlug/topics/:topicSlug/sections    [admin]
PATCH  /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug  [admin]
DELETE /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug  [admin]
```

### Examples
```
GET    /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/examples
POST   /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/examples  [admin]
POST   /api/examples/:id/like
PATCH  /api/examples/:id    [admin]
DELETE /api/examples/:id    [admin]
```

### Quizzes
```
GET    /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/quiz
POST   /api/languages/:langSlug/topics/:topicSlug/sections/:sectionSlug/quiz   [admin]
POST   /api/quiz/:id/submit    { answers: [{ questionId, selectedOptionIndex }] }
PATCH  /api/quiz/:id           [admin]
DELETE /api/quiz/:id           [admin]
```

### Search
```
GET /api/search?q=variables&lang=javascript
```

---

## 📄 Section Content Blocks

Each section page is composed of content blocks:

| type         | Description                         |
|--------------|-------------------------------------|
| `heading`    | H2/H3 heading                       |
| `text`       | Plain paragraph                     |
| `code`       | Syntax-highlighted code block       |
| `note`       | Info box (blue)                     |
| `tip`        | Tip box (green)                     |
| `warning`    | Warning box (orange/red)            |
| `list`       | Bullet list with `items[]`          |
| `table`      | Table with `headers[]` + `rows[][]` |
| `image`      | Image with `caption`                |

---

## 🌱 Seeded Data (JavaScript)

After running `npm run seed`:

- **1 Language**: JavaScript (ES2024)
- **8 Topics**: Introduction, Basics, Control Flow, Functions, Objects & Arrays, DOM, Async, ES6+
- **Sections** with full content blocks including text, code, notes, warnings, lists
- **Code Examples** with expected output
- **MCQ Quizzes** with explanations and auto-grading

---

## 🔐 Authentication

- JWT-based authentication
- Roles: `user` (default) and `admin`
- Admin-only routes: create/update/delete languages, topics, sections, examples, quizzes
- User features: mark sections complete, bookmark sections

---

## 🛡️ Security Features

- `helmet` — HTTP security headers
- `cors` — Configurable CORS
- `express-rate-limit` — 200 requests / 15 min per IP
- `bcryptjs` — Password hashing (12 rounds)
- JWT token verification on protected routes
- Input validation via Mongoose schema validators

---

## 🔧 Scripts

| Script        | Description                        |
|---------------|------------------------------------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start`   | Run compiled production server     |
| `npm run seed` | Seed database with JS docs data   |
