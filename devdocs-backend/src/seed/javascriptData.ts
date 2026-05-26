// Language & topics metadata. Sections, examples, and quizzes live in javascriptContent.ts

// ─── LANGUAGE ───────────────────────────────────────────────────────────────
export const javascriptLanguage = {
  name: "JavaScript",
  slug: "javascript",
  shortDescription:
    "JavaScript is the world's most popular programming language used to create dynamic and interactive web content.",
  description: `JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.

JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.

JavaScript's dynamic capabilities include runtime object construction, variable parameter lists, function variables, dynamic script creation (via eval), object introspection (via for...in and Object utilities), and source-code recovery (JavaScript functions store their source text and can be retrieved through toString()).`,
  icon: "js",
  color: "#F7DF1E",
  category: "language",
  difficulty: "beginner",
  tags: ["web", "frontend", "backend", "node", "scripting", "es6", "ecmascript"],
  version: "ES2024",
  officialWebsite: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  isPublished: true,
  order: 1,
};

// ─── TOPICS ──────────────────────────────────────────────────────────────────
export const javascriptTopics = [
  {
    title: "JS Introduction",
    slug: "js-introduction",
    description: "Get started with JavaScript — history, usage, and how to add JS to your web pages.",
    icon: "book-open",
    order: 1,
    isPublished: true,
  },
  {
    title: "JS Basics",
    slug: "js-basics",
    description: "Learn the fundamental building blocks: variables, data types, operators, and comments.",
    icon: "code",
    order: 2,
    isPublished: true,
  },
  {
    title: "JS Control Flow",
    slug: "js-control-flow",
    description: "Master if/else, switch, loops, and other control flow structures.",
    icon: "git-branch",
    order: 3,
    isPublished: true,
  },
  {
    title: "JS Functions",
    slug: "js-functions",
    description: "Understand how to define, call, and use functions including arrow functions and closures.",
    icon: "function-square",
    order: 4,
    isPublished: true,
  },
  {
    title: "JS Objects & Arrays",
    slug: "js-objects-arrays",
    description: "Deep dive into objects, arrays, destructuring, and the spread/rest operators.",
    icon: "database",
    order: 5,
    isPublished: true,
  },
  {
    title: "JS DOM",
    slug: "js-dom",
    description: "Interact with HTML using the Document Object Model (DOM).",
    icon: "layout",
    order: 6,
    isPublished: true,
  },
  {
    title: "JS Async",
    slug: "js-async",
    description: "Learn callbacks, Promises, and async/await for asynchronous programming.",
    icon: "clock",
    order: 7,
    isPublished: true,
  },
  {
    title: "JS ES6+",
    slug: "js-es6-plus",
    description: "Modern JavaScript features introduced in ES6 and beyond.",
    icon: "zap",
    order: 8,
    isPublished: true,
  },
];
