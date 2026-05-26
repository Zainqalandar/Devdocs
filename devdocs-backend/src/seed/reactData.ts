// Language & topics metadata. Sections, examples, and quizzes live in reactContent.ts

export const reactLanguage = {
  name: "React",
  slug: "react",
  shortDescription:
    "React is a JavaScript library for building user interfaces with components, declarative UI, and a rich ecosystem.",
  description: `React is a free and open-source JavaScript library for building user interfaces (UI). It is maintained by Meta and a large community of developers.

React lets you build encapsulated components that manage their own state, then compose them into complex UIs. Instead of manually updating the DOM, you describe what the UI should look like for a given state — React efficiently updates the browser when data changes.

Why learn React:
- Component-based architecture that scales from small widgets to full applications
- Huge ecosystem: React Router, Next.js, React Native, testing libraries, and UI kits
- Strong job market demand for frontend and full-stack roles
- Works with plain JavaScript or TypeScript

This tutorial covers React fundamentals: JSX, components, props, state, events, lists, useEffect, Context, React Router basics, and common patterns — with practical examples you can use in real projects.`,
  icon: "react",
  color: "#61DAFB",
  category: "library",
  difficulty: "intermediate",
  tags: ["react", "frontend", "ui", "components", "hooks", "jsx", "spa", "web"],
  version: "19.x",
  officialWebsite: "https://react.dev/",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  isPublished: true,
  order: 3,
};

export const reactTopics = [
  {
    title: "React Introduction",
    slug: "react-introduction",
    description: "What React is, why teams use it, and how to create your first project.",
    icon: "book-open",
    order: 1,
    isPublished: true,
  },
  {
    title: "React JSX",
    slug: "react-jsx",
    description: "Write UI with JSX — syntax, expressions, attributes, and fragments.",
    icon: "code",
    order: 2,
    isPublished: true,
  },
  {
    title: "Components & Props",
    slug: "react-components",
    description: "Build reusable function components and pass data with props.",
    icon: "box",
    order: 3,
    isPublished: true,
  },
  {
    title: "State & Events",
    slug: "react-state-events",
    description: "useState, event handling, controlled forms, and lifting state up.",
    icon: "zap",
    order: 4,
    isPublished: true,
  },
  {
    title: "Lists & Rendering",
    slug: "react-lists",
    description: "Render lists with keys, conditional UI, and styling components.",
    icon: "list",
    order: 5,
    isPublished: true,
  },
  {
    title: "useEffect",
    slug: "react-use-effect",
    description: "Side effects, data fetching, cleanup, and dependency arrays.",
    icon: "clock",
    order: 6,
    isPublished: true,
  },
  {
    title: "Context API",
    slug: "react-context",
    description: "Share global state with createContext and useContext.",
    icon: "share-2",
    order: 7,
    isPublished: true,
  },
  {
    title: "React Router",
    slug: "react-router",
    description: "Client-side routing with React Router — routes, links, and params.",
    icon: "map",
    order: 8,
    isPublished: true,
  },
  {
    title: "Hooks & Patterns",
    slug: "react-hooks-patterns",
    description: "Custom hooks, useReducer, composition patterns, and best practices.",
    icon: "layers",
    order: 9,
    isPublished: true,
  },
];
