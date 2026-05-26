// Language & topics metadata. Sections, examples, and quizzes live in typescriptContent.ts

export const typescriptLanguage = {
  name: "TypeScript",
  slug: "typescript",
  shortDescription:
    "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript — built for scalable web and Node.js apps.",
  description: `TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

TypeScript adds optional static typing, classes, and modules to JavaScript. It is developed by Microsoft and is fully compatible with existing JavaScript code. TypeScript code is compiled (transpiled) to JavaScript so it runs anywhere JavaScript runs — browsers, Node.js, Deno, and more.

Why teams choose TypeScript:
- Catch errors during development instead of in production
- Rich editor support: autocomplete, refactoring, and inline documentation
- Safer refactoring in large codebases
- First-class support in React, Angular, Vue, and Node.js ecosystems

This tutorial teaches TypeScript from fundamentals through generics, utility types, modules, and integrating with JavaScript projects.`,
  icon: "ts",
  color: "#3178C6",
  category: "language",
  difficulty: "intermediate",
  tags: ["typescript", "web", "frontend", "backend", "node", "react", "types", "static-typing"],
  version: "5.x",
  officialWebsite: "https://www.typescriptlang.org/",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  isPublished: true,
  order: 2,
};

export const typescriptTopics = [
  {
    title: "TS Introduction",
    slug: "ts-introduction",
    description: "What TypeScript is, why it exists, and how to set up your first project.",
    icon: "book-open",
    order: 1,
    isPublished: true,
  },
  {
    title: "TS Basics",
    slug: "ts-basics",
    description: "Variables, type annotations, inference, and strict compiler options.",
    icon: "code",
    order: 2,
    isPublished: true,
  },
  {
    title: "TS Types",
    slug: "ts-types",
    description: "Primitive types, any, unknown, never, arrays, tuples, enums, and literals.",
    icon: "layers",
    order: 3,
    isPublished: true,
  },
  {
    title: "Interfaces & Classes",
    slug: "ts-interfaces-classes",
    description: "Interfaces, type aliases, classes, and access modifiers in TypeScript.",
    icon: "box",
    order: 4,
    isPublished: true,
  },
  {
    title: "TS Functions",
    slug: "ts-functions",
    description: "Typed functions, optional parameters, defaults, and overloads.",
    icon: "function-square",
    order: 5,
    isPublished: true,
  },
  {
    title: "Generics",
    slug: "ts-generics",
    description: "Write reusable, type-safe functions, interfaces, and classes with generics.",
    icon: "repeat",
    order: 6,
    isPublished: true,
  },
  {
    title: "Utility Types",
    slug: "ts-utility-types",
    description: "Built-in helpers like Partial, Pick, Omit, Record, and mapped types.",
    icon: "tool",
    order: 7,
    isPublished: true,
  },
  {
    title: "Modules & Config",
    slug: "ts-modules",
    description: "ES modules, tsconfig.json, and organizing TypeScript projects.",
    icon: "folder",
    order: 8,
    isPublished: true,
  },
  {
    title: "TS with JavaScript",
    slug: "ts-with-javascript",
    description: "Gradual adoption, .d.ts files, type guards, and narrowing.",
    icon: "link",
    order: 9,
    isPublished: true,
  },
];
