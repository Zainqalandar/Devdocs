// React tutorial content — sections, examples, and quizzes.
// W3Schools-style practical guide. React 18/19 function components and hooks only.

// ─── SECTIONS ────────────────────────────────────────────────────────────────
export const reactSections: Record<
  string,
  Array<{
    title: string;
    slug: string;
    metaDescription: string;
    order: number;
    isPublished: boolean;
    isFree: boolean;
    readingTimeMinutes: number;
    contentBlocks: Array<{
      type: string;
      content: string;
      language?: string;
      items?: string[];
      order: number;
    }>;
  }>
> = {
  "react-introduction": [
    {
      title: "What is React?",
      slug: "what-is-react",
      metaDescription:
        "Learn what React is, how it works, and why it powers modern web applications.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "What is React?", order: 1 },
        {
          type: "text",
          content:
            "React is a JavaScript library for building user interfaces. Created by Meta, it lets you compose complex UIs from small, reusable pieces called components. You describe what the screen should look like for a given state — React updates the DOM efficiently when that state changes.",
          order: 2,
        },
        {
          type: "note",
          content:
            "React is a library, not a full framework. You often pair it with React Router, a bundler (Vite), and your own data-fetching approach.",
          order: 3,
        },
        { type: "heading", content: "How React Works", order: 4 },
        {
          type: "list",
          content: "Core ideas you will use every day:",
          items: [
            "Components — functions that return UI (JSX)",
            "Props — read-only inputs passed from parent to child",
            "State — data that can change and triggers re-renders",
            "Virtual DOM — React compares trees and updates only what changed",
            "Hooks — useState, useEffect, and more for logic in function components",
          ],
          order: 5,
        },
        {
          type: "code",
          content: `import { createRoot } from 'react-dom/client';\n\nfunction App() {\n  return <h1>Hello, React!</h1>;\n}\n\ncreateRoot(document.getElementById('root')).render(<App />);`,
          language: "jsx",
          order: 6,
        },
        {
          type: "tip",
          content:
            "Modern React uses function components and hooks. Class components still exist in old codebases but are not required for new projects.",
          order: 7,
        },
      ],
    },
    {
      title: "Why Use React?",
      slug: "why-use-react",
      metaDescription:
        "Discover why developers choose React for SPAs, dashboards, and large frontends.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Why Use React?", order: 1 },
        {
          type: "text",
          content:
            "React is one of the most popular choices for frontend development. Teams use it because components encourage reuse, the ecosystem is huge, and hiring demand is strong. React also works well with TypeScript, design systems, and mobile (React Native).",
          order: 2,
        },
        {
          type: "list",
          content: "Benefits for real projects:",
          items: [
            "Declarative UI — describe the result, not every DOM step",
            "Component model — build once, use everywhere",
            "Strong tooling — Vite, React DevTools, ESLint plugins",
            "Large community — tutorials, UI kits, and Stack Overflow answers",
            "Flexible — use as much or as little as you need",
          ],
          order: 3,
        },
        {
          type: "warning",
          content:
            "React does not include routing, global state, or HTTP by default. You add libraries (React Router, TanStack Query, etc.) as your app grows.",
          order: 4,
        },
        {
          type: "text",
          content:
            "Alternatives like Vue and Svelte are excellent too. React wins when your team already knows it, you need React Native, or job requirements list it.",
          order: 5,
        },
      ],
    },
    {
      title: "Create a React App with Vite",
      slug: "create-react-app-vite",
      metaDescription:
        "Set up a new React project with Vite — fast dev server and modern tooling.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Create a React App with Vite", order: 1 },
        {
          type: "text",
          content:
            "Vite is the recommended way to start new React projects. It provides instant hot module replacement (HMR), fast builds, and a simple config. Create React App (CRA) is legacy; use Vite for greenfield apps.",
          order: 2,
        },
        {
          type: "code",
          content: `npm create vite@latest my-react-app -- --template react\n\ncd my-react-app\nnpm install\nnpm run dev`,
          language: "bash",
          order: 3,
        },
        {
          type: "text",
          content:
            "Open the URL shown in the terminal (usually http://localhost:5173). Edit src/App.jsx and save — the browser updates instantly.",
          order: 4,
        },
        {
          type: "code",
          content: `{\n  "name": "my-react-app",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0"\n  }\n}`,
          language: "json",
          order: 5,
        },
        {
          type: "tip",
          content:
            'Add TypeScript with the react-ts template: npm create vite@latest my-app -- --template react-ts',
          order: 6,
        },
      ],
    },
    {
      title: "React Folder Structure",
      slug: "react-folder-structure",
      metaDescription:
        "Understand a typical Vite React project layout and where to put components.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "React Folder Structure", order: 1 },
        {
          type: "text",
          content:
            "A default Vite React app keeps source code in src/. You will add folders as the app grows — there is no single official structure, but conventions help teams navigate code.",
          order: 2,
        },
        {
          type: "list",
          content: "Common folders in src/:",
          items: [
            "components/ — reusable UI pieces (Button, Card, Navbar)",
            "pages/ or routes/ — screen-level components tied to URLs",
            "hooks/ — custom hooks (useAuth, useLocalStorage)",
            "context/ — React Context providers",
            "assets/ — images, fonts, static files",
            "utils/ or lib/ — pure helpers with no React imports",
          ],
          order: 3,
        },
        {
          type: "code",
          content: `src/\n  main.jsx       # Entry — mounts <App /> to #root\n  App.jsx        # Root component\n  index.css      # Global styles\n  components/\n    Header.jsx\n    Footer.jsx`,
          language: "bash",
          order: 4,
        },
        {
          type: "note",
          content:
            "Keep components small and colocate styles or tests next to the component file when it helps readability.",
          order: 5,
        },
      ],
    },
  ],

  "react-jsx": [
    {
      title: "JSX Syntax",
      slug: "jsx-syntax",
      metaDescription:
        "Learn JSX syntax — how to write HTML-like markup inside JavaScript.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "JSX Syntax", order: 1 },
        {
          type: "text",
          content:
            "JSX (JavaScript XML) lets you write UI that looks like HTML inside JavaScript. Under the hood, tools like Vite compile JSX to React.createElement calls. Every JSX expression must have one parent element (or a Fragment).",
          order: 2,
        },
        {
          type: "code",
          content: `function Welcome() {\n  return (\n    <div>\n      <h1>Welcome</h1>\n      <p>Learn React step by step.</p>\n    </div>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "warning",
          content:
            "Use className instead of class, and htmlFor instead of for — JSX uses camelCase for DOM attributes.",
          order: 4,
        },
        {
          type: "code",
          content: `// Self-closing tags must be closed\n<img src="/logo.png" alt="Logo" />\n<input type="text" />`,
          language: "jsx",
          order: 5,
        },
        {
          type: "tip",
          content:
            "VS Code with the ES7+ React snippet extension speeds up writing components.",
          order: 6,
        },
      ],
    },
    {
      title: "JSX Expressions",
      slug: "jsx-expressions",
      metaDescription:
        "Embed JavaScript values in JSX with curly braces — variables, calls, and ternaries.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JSX Expressions", order: 1 },
        {
          type: "text",
          content:
            "Put any valid JavaScript expression inside curly braces { } to render dynamic content. You can use variables, function calls, arithmetic, and ternary operators.",
          order: 2,
        },
        {
          type: "code",
          content: `function Greeting({ name }) {\n  const year = new Date().getFullYear();\n  return (\n    <p>\n      Hello, {name}! &copy; {year}\n    </p>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "code",
          content: `const items = ['Apple', 'Banana'];\n\n<ul>\n  {items.map((item) => (\n    <li key={item}>{item}</li>\n  ))}\n</ul>`,
          language: "jsx",
          order: 4,
        },
        {
          type: "note",
          content:
            "You cannot use if/else statements directly inside JSX — use a ternary, &&, or compute the value above the return.",
          order: 5,
        },
      ],
    },
    {
      title: "JSX Attributes and className",
      slug: "jsx-attributes-classname",
      metaDescription:
        "Set attributes, styles, and CSS classes on JSX elements.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "JSX Attributes and className", order: 1 },
        {
          type: "text",
          content:
            "Pass strings to attributes in quotes or expressions in braces. Boolean attributes like disabled can be written as disabled={true} or simply disabled.",
          order: 2,
        },
        {
          type: "code",
          content: `function Avatar({ src, alt, size }) {\n  return (\n    <img\n      src={src}\n      alt={alt}\n      className={\`avatar avatar-\${size}\`}\n      style={{ width: size, height: size, borderRadius: '50%' }}\n    />\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "text",
          content:
            "The style prop expects a JavaScript object with camelCase keys (backgroundColor, not background-color).",
          order: 4,
        },
        {
          type: "code",
          content: `const isActive = true;\n\n<button className={isActive ? 'btn active' : 'btn'}>\n  Click me\n</button>`,
          language: "jsx",
          order: 5,
        },
      ],
    },
    {
      title: "React Fragments",
      slug: "react-fragments",
      metaDescription:
        "Return multiple elements without extra DOM nodes using React Fragments.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        { type: "heading", content: "React Fragments", order: 1 },
        {
          type: "text",
          content:
            "Components must return a single parent. Fragments let you group children without adding a wrapper <div> to the DOM — useful for tables, lists, and semantic HTML.",
          order: 2,
        },
        {
          type: "code",
          content: `function Article() {\n  return (\n    <>\n      <h1>Title</h1>\n      <p>Paragraph one.</p>\n      <p>Paragraph two.</p>\n    </>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "code",
          content: `import { Fragment } from 'react';\n\nfunction List() {\n  return (\n    <Fragment>\n      <li>Item A</li>\n      <li>Item B</li>\n    </Fragment>\n  );\n}`,
          language: "jsx",
          order: 4,
        },
        {
          type: "tip",
          content:
            "Use <Fragment key={id}> when mapping — the shorthand <> does not accept keys.",
          order: 5,
        },
      ],
    },
  ],

  "react-components": [
    {
      title: "Function Components",
      slug: "function-components",
      metaDescription:
        "Create React UI with function components — the standard in React 18 and 19.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Function Components", order: 1 },
        {
          type: "text",
          content:
            "A function component is a JavaScript function that returns JSX. Name it with PascalCase (UserCard, not userCard). Export it and use it like an HTML tag: <UserCard />.",
          order: 2,
        },
        {
          type: "code",
          content: `function Button({ label, onClick }) {\n  return (\n    <button type="button" onClick={onClick}>\n      {label}\n    </button>\n  );\n}\n\nexport default function App() {\n  return <Button label="Save" onClick={() => alert('Saved!')} />;\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "note",
          content:
            "Class components (class App extends React.Component) are legacy. You may see them in old tutorials; new code should use functions and hooks.",
          order: 4,
        },
      ],
    },
    {
      title: "React Props",
      slug: "react-props",
      metaDescription:
        "Pass data into components with props — read-only inputs from parent to child.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "React Props", order: 1 },
        {
          type: "text",
          content:
            "Props (properties) are arguments to your component. The parent passes them; the child reads them. Props are immutable — never modify props inside the child.",
          order: 2,
        },
        {
          type: "code",
          content: `function ProductCard({ name, price, inStock }) {\n  return (\n    <article>\n      <h2>{name}</h2>\n      <p>\${price}</p>\n      <span>{inStock ? 'In stock' : 'Sold out'}</span>\n    </article>\n  );\n}\n\n<ProductCard name="Keyboard" price={79} inStock={true} />`,
          language: "jsx",
          order: 3,
        },
        {
          type: "code",
          content: `// Default props with default parameters\nfunction Badge({ text = 'New' }) {\n  return <span className="badge">{text}</span>;\n}`,
          language: "jsx",
          order: 4,
        },
        {
          type: "warning",
          content:
            "Spreading props (<Component {...user} />) is convenient but hides which props a component expects — use sparingly in large codebases.",
          order: 5,
        },
      ],
    },
    {
      title: "Children and Composition",
      slug: "children-and-composition",
      metaDescription:
        "Use the special children prop to compose flexible, reusable components.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Children and Composition", order: 1 },
        {
          type: "text",
          content:
            "When you nest JSX inside a component, React passes it as props.children. This pattern powers layout components, cards, modals, and providers.",
          order: 2,
        },
        {
          type: "code",
          content: `function Card({ title, children }) {\n  return (\n    <div className="card">\n      <header>{title}</header>\n      <div className="card-body">{children}</div>\n    </div>\n  );\n}\n\n<Card title="Profile">\n  <p>Name: Alex</p>\n  <button>Edit</button>\n</Card>`,
          language: "jsx",
          order: 3,
        },
        {
          type: "tip",
          content:
            "Prefer composition (wrapping children) over deep prop drilling when building flexible UI kits.",
          order: 4,
        },
      ],
    },
    {
      title: "Component Best Practices",
      slug: "component-best-practices",
      metaDescription:
        "Write maintainable React components — naming, size, and separation of concerns.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Component Best Practices", order: 1 },
        {
          type: "list",
          content: "Guidelines used in production codebases:",
          items: [
            "One main responsibility per component",
            "Extract repeated UI into smaller components",
            "Keep business logic in hooks or utils, not huge JSX blocks",
            "Use descriptive prop names (isLoading, not flag)",
            "Colocate files: Button.jsx next to Button.css if needed",
          ],
          order: 2,
        },
        {
          type: "code",
          content: `// Split a large page into pieces\nfunction Dashboard() {\n  return (\n    <div>\n      <DashboardHeader />\n      <StatsRow />\n      <RecentActivity />\n    </div>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "note",
          content:
            "Do not optimize prematurely with React.memo until you measure a performance problem.",
          order: 4,
        },
      ],
    },
  ],

  "react-state-events": [
    {
      title: "The useState Hook",
      slug: "useState-hook",
      metaDescription:
        "Add local state to function components with the useState hook.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "The useState Hook", order: 1 },
        {
          type: "text",
          content:
            "useState lets a function component remember values between renders. Call it at the top level of your component. It returns the current state and a setter function.",
          order: 2,
        },
        {
          type: "code",
          content: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+1</button>\n    </div>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "code",
          content: `// Lazy initial state — runs once\nconst [items, setItems] = useState(() => {\n  const saved = localStorage.getItem('items');\n  return saved ? JSON.parse(saved) : [];\n});`,
          language: "jsx",
          order: 4,
        },
      ],
    },
    {
      title: "Updating State",
      slug: "updating-state",
      metaDescription:
        "Update React state correctly — objects, arrays, and functional updates.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "Updating State", order: 1 },
        {
          type: "text",
          content:
            "State updates may be asynchronous and batched. When the new state depends on the previous state, pass a function to the setter: setCount((c) => c + 1).",
          order: 2,
        },
        {
          type: "code",
          content: `function TodoList() {\n  const [todos, setTodos] = useState([]);\n\n  function addTodo(text) {\n    setTodos((prev) => [...prev, { id: Date.now(), text }]);\n  }\n\n  function toggleDone(id) {\n    setTodos((prev) =>\n      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))\n    );\n  }\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "warning",
          content:
            "Never mutate state directly (todos.push(...)) — always create a new array or object so React detects the change.",
          order: 4,
        },
      ],
    },
    {
      title: "Lifting State Up",
      slug: "lifting-state-up",
      metaDescription:
        "Share state between sibling components by lifting it to their common parent.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Lifting State Up", order: 1 },
        {
          type: "text",
          content:
            "When two components need the same data, move state to their closest common ancestor. Pass state down as props and pass callbacks to update it — single source of truth.",
          order: 2,
        },
        {
          type: "code",
          content: `function Parent() {\n  const [celsius, setCelsius] = useState(0);\n\n  return (\n    <>\n      <CelsiusInput value={celsius} onChange={setCelsius} />\n      <FahrenheitDisplay celsius={celsius} />\n    </>\n  );\n}\n\nfunction FahrenheitDisplay({ celsius }) {\n  return <p>{(celsius * 9) / 5 + 32} °F</p>;\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "tip",
          content:
            "If many levels need the same state, consider Context API instead of drilling props through every layer.",
          order: 4,
        },
      ],
    },
    {
      title: "Events and Controlled Forms",
      slug: "react-events-controlled-forms",
      metaDescription:
        "Handle clicks and input with React events and controlled form components.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "Events and Controlled Forms", order: 1 },
        {
          type: "text",
          content:
            "React events use camelCase (onClick, onChange). Pass a function reference, not a string. Controlled inputs tie value to state so React owns the form data.",
          order: 2,
        },
        {
          type: "code",
          content: `function LoginForm() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    console.log({ email, password });\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input\n        type="email"\n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n      />\n      <input\n        type="password"\n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n      <button type="submit">Log in</button>\n    </form>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "note",
          content:
            "Call e.preventDefault() in onSubmit to stop the browser from reloading the page.",
          order: 4,
        },
      ],
    },
  ],

  "react-lists": [
    {
      title: "Rendering Lists and Keys",
      slug: "rendering-lists-keys",
      metaDescription:
        "Render arrays in JSX with map() and stable key props for list items.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Rendering Lists and Keys", order: 1 },
        {
          type: "text",
          content:
            "Use array.map() to transform data into JSX. Each child in a list needs a unique key prop so React can reconcile items efficiently when the list changes.",
          order: 2,
        },
        {
          type: "code",
          content: `const users = [\n  { id: 'u1', name: 'Sam' },\n  { id: 'u2', name: 'Jordan' },\n];\n\nfunction UserList() {\n  return (\n    <ul>\n      {users.map((user) => (\n        <li key={user.id}>{user.name}</li>\n      ))}\n    </ul>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "warning",
          content:
            "Avoid using array index as key when items can be reordered, added, or removed — use stable IDs from your data.",
          order: 4,
        },
      ],
    },
    {
      title: "Conditional Rendering",
      slug: "conditional-rendering",
      metaDescription:
        "Show or hide UI with if/else, ternary operators, and logical && in React.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Conditional Rendering", order: 1 },
        {
          type: "text",
          content:
            "React has no special if syntax in JSX. Use JavaScript: early return, ternary (? :), or short-circuit (condition && <Component />).",
          order: 2,
        },
        {
          type: "code",
          content: `function Status({ isOnline }) {\n  if (!isOnline) {\n    return <p className="offline">You are offline</p>;\n  }\n  return <p className="online">Connected</p>;\n}\n\nfunction Inbox({ count }) {\n  return (\n    <div>\n      {count > 0 && <span className="badge">{count}</span>}\n      {count === 0 ? <p>No messages</p> : <MessageList count={count} />}\n    </div>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
      ],
    },
    {
      title: "Styling React Components",
      slug: "styling-react-components",
      metaDescription:
        "Style React apps with CSS files, CSS Modules, and inline style objects.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Styling React Components", order: 1 },
        {
          type: "list",
          content: "Popular styling approaches:",
          items: [
            "Global CSS — import './App.css' in a component",
            "CSS Modules — import styles from './Button.module.css'",
            "Inline styles — style={{ color: 'red' }} for one-off tweaks",
            "Utility CSS — Tailwind classes in className",
            "CSS-in-JS libraries — styled-components, Emotion (optional)",
          ],
          order: 2,
        },
        {
          type: "code",
          content: `import './Card.css';\n\nfunction Card({ highlighted, children }) {\n  return (\n    <div className={highlighted ? 'card card--highlight' : 'card'}>\n      {children}\n    </div>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "tip",
          content:
            "Keep design tokens (colors, spacing) in CSS variables or a theme file for consistency.",
          order: 4,
        },
      ],
    },
  ],

  "react-use-effect": [
    {
      title: "useEffect Introduction",
      slug: "useEffect-introduction",
      metaDescription:
        "Run side effects in function components with the useEffect hook.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "useEffect Introduction", order: 1 },
        {
          type: "text",
          content:
            "useEffect runs code after render — fetching data, subscribing to events, or syncing with non-React systems. It replaces class lifecycle methods like componentDidMount.",
          order: 2,
        },
        {
          type: "code",
          content: `import { useState, useEffect } from 'react';\n\nfunction PageTitle({ title }) {\n  useEffect(() => {\n    document.title = title;\n  }, [title]);\n\n  return <h1>{title}</h1>;\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "note",
          content:
            "Effects run after the browser paints. For urgent updates before paint, use useLayoutEffect (less common).",
          order: 4,
        },
      ],
    },
    {
      title: "Fetching Data with useEffect",
      slug: "fetching-data-useEffect",
      metaDescription:
        "Load API data in React with fetch, useEffect, and loading/error state.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "Fetching Data with useEffect", order: 1 },
        {
          type: "text",
          content:
            "A typical pattern: store data, loading, and error in state; fetch inside useEffect when a dependency (like userId) changes.",
          order: 2,
        },
        {
          type: "code",
          content: `function UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let cancelled = false;\n    setLoading(true);\n\n    fetch(\`/api/users/\${userId}\`)\n      .then((res) => {\n        if (!res.ok) throw new Error('Failed to load');\n        return res.json();\n      })\n      .then((data) => {\n        if (!cancelled) setUser(data);\n      })\n      .catch((err) => {\n        if (!cancelled) setError(err.message);\n      })\n      .finally(() => {\n        if (!cancelled) setLoading(false);\n      });\n\n    return () => {\n      cancelled = true;\n    };\n  }, [userId]);\n\n  if (loading) return <p>Loading...</p>;\n  if (error) return <p>Error: {error}</p>;\n  return <h2>{user?.name}</h2>;\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "tip",
          content:
            "For larger apps, libraries like TanStack Query handle caching, retries, and deduplication.",
          order: 4,
        },
      ],
    },
    {
      title: "useEffect Cleanup",
      slug: "useEffect-cleanup",
      metaDescription:
        "Return a cleanup function from useEffect to avoid memory leaks and stale updates.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "useEffect Cleanup", order: 1 },
        {
          type: "text",
          content:
            "If your effect sets up a subscription, timer, or listener, return a cleanup function. React runs it before the effect runs again and when the component unmounts.",
          order: 2,
        },
        {
          type: "code",
          content: `useEffect(() => {\n  const id = setInterval(() => {\n    console.log('tick');\n  }, 1000);\n\n  return () => clearInterval(id);\n}, []);`,
          language: "jsx",
          order: 3,
        },
        {
          type: "code",
          content: `useEffect(() => {\n  function onResize() {\n    setWidth(window.innerWidth);\n  }\n  window.addEventListener('resize', onResize);\n  return () => window.removeEventListener('resize', onResize);\n}, []);`,
          language: "jsx",
          order: 4,
        },
      ],
    },
    {
      title: "useEffect Dependencies",
      slug: "useEffect-dependencies",
      metaDescription:
        "Control when useEffect runs with the dependency array — [], [dep], or omitted.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "useEffect Dependencies", order: 1 },
        {
          type: "list",
          content: "Dependency array behavior:",
          items: [
            "No array — runs after every render (rare, often a mistake)",
            "[] — runs once after mount (like componentDidMount)",
            "[a, b] — runs when a or b changes between renders",
            "Include every value from the component scope that the effect reads",
          ],
          order: 2,
        },
        {
          type: "warning",
          content:
            "Missing dependencies can cause stale closures — ESLint react-hooks/exhaustive-deps warns you.",
          order: 3,
        },
        {
          type: "code",
          content: `useEffect(() => {\n  localStorage.setItem('theme', theme);\n}, [theme]);`,
          language: "jsx",
          order: 4,
        },
      ],
    },
  ],

  "react-context": [
    {
      title: "React Context API",
      slug: "react-context-api",
      metaDescription:
        "Share global data with createContext and useContext in React.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "React Context API", order: 1 },
        {
          type: "text",
          content:
            "Context passes data through the tree without passing props at every level. Create a context, wrap subtrees in a Provider, and read values with useContext.",
          order: 2,
        },
        {
          type: "code",
          content: `import { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext('light');\n\nfunction ThemeToggle() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  return (\n    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\n      Current: {theme}\n    </button>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
      ],
    },
    {
      title: "Context Provider Pattern",
      slug: "context-provider-pattern",
      metaDescription:
        "Wrap your app in a Provider component that supplies context value and state.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Context Provider Pattern", order: 1 },
        {
          type: "code",
          content: `const AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n\n  const value = {\n    user,\n    login: (u) => setUser(u),\n    logout: () => setUser(null),\n  };\n\n  return (\n    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>\n  );\n}\n\nexport function useAuth() {\n  const ctx = useContext(AuthContext);\n  if (!ctx) throw new Error('useAuth must be inside AuthProvider');\n  return ctx;\n}`,
          language: "jsx",
          order: 2,
        },
        {
          type: "code",
          content: `// main.jsx\n<AuthProvider>\n  <App />\n</AuthProvider>`,
          language: "jsx",
          order: 3,
        },
        {
          type: "note",
          content:
            "Split contexts by concern (theme, auth, locale) so unrelated updates do not re-render the whole app.",
          order: 4,
        },
      ],
    },
    {
      title: "Avoid Prop Drilling",
      slug: "avoid-prop-drilling",
      metaDescription:
        "When to use Context instead of passing props through many intermediate components.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Avoid Prop Drilling", order: 1 },
        {
          type: "text",
          content:
            "Prop drilling means passing data through components that do not use it, only to reach a deep child. Context or composition fixes this when it hurts readability.",
          order: 2,
        },
        {
          type: "list",
          content: "When to use Context:",
          items: [
            "Theme, language, or auth used in many places",
            "Logged-in user available across the app",
            "Feature flags or app configuration",
          ],
          order: 3,
        },
        {
          type: "warning",
          content:
            "Context is not a replacement for all state — local state and lifting still belong in most components.",
          order: 4,
        },
      ],
    },
  ],

  "react-router": [
    {
      title: "React Router Setup",
      slug: "react-router-setup",
      metaDescription:
        "Install and configure React Router v6+ for client-side navigation.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "React Router Setup", order: 1 },
        {
          type: "text",
          content:
            "React Router adds URL-based navigation to SPAs without full page reloads. Install react-router-dom and wrap your app in BrowserRouter.",
          order: 2,
        },
        {
          type: "code",
          content: `npm install react-router-dom`,
          language: "bash",
          order: 3,
        },
        {
          type: "code",
          content: `import { BrowserRouter, Routes, Route } from 'react-router-dom';\nimport Home from './pages/Home';\nimport About from './pages/About';\n\nexport default function App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<Home />} />\n        <Route path="/about" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}`,
          language: "jsx",
          order: 4,
        },
      ],
    },
    {
      title: "Routes, Links, and Navigate",
      slug: "routes-links-navigate",
      metaDescription:
        "Define routes, navigate with Link, and redirect programmatically with useNavigate.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Routes, Links, and Navigate", order: 1 },
        {
          type: "code",
          content: `import { Link, NavLink, useNavigate } from 'react-router-dom';\n\nfunction Navbar() {\n  const navigate = useNavigate();\n\n  return (\n    <nav>\n      <Link to="/">Home</Link>\n      <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>\n        About\n      </NavLink>\n      <button onClick={() => navigate('/login')}>Log in</button>\n    </nav>\n  );\n}`,
          language: "jsx",
          order: 2,
        },
        {
          type: "tip",
          content:
            "Use <Link> instead of <a href> for internal routes to avoid full page reloads.",
          order: 3,
        },
      ],
    },
    {
      title: "URL Params and Search",
      slug: "url-params-search",
      metaDescription:
        "Read dynamic route parameters and query strings with React Router hooks.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "URL Params and Search", order: 1 },
        {
          type: "code",
          content: `// Route: /products/:id\nimport { useParams, useSearchParams } from 'react-router-dom';\n\nfunction ProductPage() {\n  const { id } = useParams();\n  const [searchParams, setSearchParams] = useSearchParams();\n  const tab = searchParams.get('tab') ?? 'details';\n\n  return (\n    <div>\n      <h1>Product {id}</h1>\n      <button onClick={() => setSearchParams({ tab: 'reviews' })}>\n        Reviews\n      </button>\n      <p>Active tab: {tab}</p>\n    </div>\n  );\n}`,
          language: "jsx",
          order: 2,
        },
        {
          type: "code",
          content: `<Route path="/products/:id" element={<ProductPage />} />`,
          language: "jsx",
          order: 3,
        },
      ],
    },
  ],

  "react-hooks-patterns": [
    {
      title: "Custom Hooks",
      slug: "custom-hooks",
      metaDescription:
        "Extract reusable stateful logic into custom hooks — functions starting with use.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Custom Hooks", order: 1 },
        {
          type: "text",
          content:
            "A custom hook is a function whose name starts with use and that may call other hooks. Share logic between components without duplicating useEffect and useState blocks.",
          order: 2,
        },
        {
          type: "code",
          content: `function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initial;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}`,
          language: "jsx",
          order: 3,
        },
      ],
    },
    {
      title: "useReducer Basics",
      slug: "useReducer-basics",
      metaDescription:
        "Manage complex state updates with useReducer — actions and a reducer function.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "useReducer Basics", order: 1 },
        {
          type: "text",
          content:
            "useReducer is like useState for state that involves multiple sub-values or the next state depends on the previous one in a structured way.",
          order: 2,
        },
        {
          type: "code",
          content: `const initial = { count: 0 };\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    case 'reset':\n      return initial;\n    default:\n      return state;\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, initial);\n  return (\n    <>\n      <p>{state.count}</p>\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n    </>\n  );\n}`,
          language: "jsx",
          order: 3,
        },
      ],
    },
    {
      title: "React Composition",
      slug: "react-composition",
      metaDescription:
        "Build flexible UIs with composition — slots, render props, and compound components.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "React Composition", order: 1 },
        {
          type: "text",
          content:
            "Composition means building features by combining simple pieces instead of giant components with dozens of boolean props.",
          order: 2,
        },
        {
          type: "code",
          content: `function Modal({ isOpen, onClose, children }) {\n  if (!isOpen) return null;\n  return (\n    <div className="modal-backdrop" onClick={onClose}>\n      <div className="modal" onClick={(e) => e.stopPropagation()}>\n        {children}\n      </div>\n    </div>\n  );\n}\n\n<Modal isOpen={open} onClose={() => setOpen(false)}>\n  <h2>Confirm delete</h2>\n  <button onClick={handleDelete}>Delete</button>\n</Modal>`,
          language: "jsx",
          order: 3,
        },
      ],
    },
    {
      title: "Rules of Hooks",
      slug: "react-rules-of-hooks",
      metaDescription:
        "Follow the Rules of Hooks — only call hooks at the top level of React functions.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Rules of Hooks", order: 1 },
        {
          type: "list",
          content: "React enforces two rules:",
          items: [
            "Only call hooks at the top level — not inside loops, conditions, or nested functions",
            "Only call hooks from React function components or custom hooks",
          ],
          order: 2,
        },
        {
          type: "code",
          content: `// Wrong — hook inside condition\nfunction Bad({ show }) {\n  if (show) {\n    const [x, setX] = useState(0); // breaks rules\n  }\n}\n\n// Right — call hook unconditionally\nfunction Good({ show }) {\n  const [x, setX] = useState(0);\n  if (!show) return null;\n  return <p>{x}</p>;\n}`,
          language: "jsx",
          order: 3,
        },
        {
          type: "note",
          content:
            "The eslint-plugin-react-hooks package catches most violations automatically.",
          order: 4,
        },
      ],
    },
  ],
};

// ─── EXAMPLES ────────────────────────────────────────────────────────────────
export const reactExamples: Record<
  string,
  Array<{
    title: string;
    description: string;
    code: string;
    expectedOutput: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    tags: string[];
    order: number;
    isRunnable?: boolean;
  }>
> = {
  "what-is-react": [
    {
      title: "Minimal React mount",
      description: "Entry point pattern — createRoot and render (conceptual).",
      code: `import { createRoot } from 'react-dom/client';\n\nfunction App() {\n  return <h1>Hello, React!</h1>;\n}\n\ncreateRoot(document.getElementById('root')).render(<App />);`,
      expectedOutput: "Renders: Hello, React! in the browser",
      difficulty: "beginner",
      tags: ["introduction", "mount", "jsx"],
      order: 1,
      isRunnable: false,
    },
  ],
  "jsx-syntax": [
    {
      title: "JSX element tree",
      description: "Nested JSX with one parent div.",
      code: `function Card() {\n  return (\n    <div className="card">\n      <h2>Title</h2>\n      <p>Body text</p>\n    </div>\n  );\n}`,
      expectedOutput: "A card with heading and paragraph in the DOM",
      difficulty: "beginner",
      tags: ["jsx", "syntax"],
      order: 1,
      isRunnable: false,
    },
  ],
  "jsx-expressions": [
    {
      title: "Dynamic greeting",
      description: "Embed a variable inside JSX curly braces.",
      code: `function Greeting({ name }) {\n  const message = \`Welcome, \${name}!\`;\n  return <p>{message}</p>;\n}\n\n// Usage: <Greeting name="Alex" />`,
      expectedOutput: "Welcome, Alex!",
      difficulty: "beginner",
      tags: ["jsx", "expressions"],
      order: 1,
      isRunnable: false,
    },
  ],
  "function-components": [
    {
      title: "Reusable Button component",
      description: "PascalCase function component with props.",
      code: `function Button({ label, variant = 'primary' }) {\n  return <button className={\`btn btn-\${variant}\`}>{label}</button>;\n}`,
      expectedOutput: "Renders a styled button with the given label",
      difficulty: "beginner",
      tags: ["components", "props"],
      order: 1,
      isRunnable: false,
    },
  ],
  "react-props": [
    {
      title: "Product card props",
      description: "Pass name, price, and stock status as props.",
      code: `function Product({ name, price, inStock }) {\n  return (\n    <div>\n      <h3>{name}</h3>\n      <p>\${price}</p>\n      <span>{inStock ? 'Available' : 'Out of stock'}</span>\n    </div>\n  );\n}`,
      expectedOutput: "Product card showing name, price, and availability",
      difficulty: "beginner",
      tags: ["props", "components"],
      order: 1,
      isRunnable: false,
    },
  ],
  "useState-hook": [
    {
      title: "Click counter",
      description: "Increment state on button click.",
      code: `import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}`,
      expectedOutput: "Button label updates: Clicks: 1, 2, 3...",
      difficulty: "beginner",
      tags: ["useState", "events"],
      order: 1,
      isRunnable: false,
    },
  ],
  "updating-state": [
    {
      title: "Functional state update",
      description: "Use updater function when next state depends on previous.",
      code: `const [count, setCount] = useState(0);\n\nfunction handleDouble() {\n  setCount((c) => c + 1);\n  setCount((c) => c + 1);\n}\n// After one click, count increases by 2`,
      expectedOutput: "count increases by 2 per handleDouble call",
      difficulty: "intermediate",
      tags: ["useState", "updater"],
      order: 1,
      isRunnable: false,
    },
  ],
  "rendering-lists-keys": [
    {
      title: "Todo list with keys",
      description: "Map array to list items with stable id keys.",
      code: `const todos = [\n  { id: 1, text: 'Learn JSX' },\n  { id: 2, text: 'Learn useState' },\n];\n\n<ul>\n  {todos.map((todo) => (\n    <li key={todo.id}>{todo.text}</li>\n  ))}\n</ul>`,
      expectedOutput: "Two list items: Learn JSX, Learn useState",
      difficulty: "beginner",
      tags: ["lists", "keys", "map"],
      order: 1,
      isRunnable: false,
    },
  ],
  "conditional-rendering": [
    {
      title: "Login status message",
      description: "Ternary and && for conditional UI.",
      code: `function Alert({ error }) {\n  return (\n    <div>\n      {error && <p className="error">{error}</p>}\n      {!error ? <p>All good</p> : null}\n    </div>\n  );\n}`,
      expectedOutput: "Shows error paragraph only when error is truthy",
      difficulty: "beginner",
      tags: ["conditional", "rendering"],
      order: 1,
      isRunnable: false,
    },
  ],
  "useEffect-introduction": [
    {
      title: "Sync document title",
      description: "Update page title when a prop changes.",
      code: `useEffect(() => {\n  document.title = \`\${title} | My App\`;\n}, [title]);`,
      expectedOutput: "Browser tab title updates when title changes",
      difficulty: "beginner",
      tags: ["useEffect", "side-effects"],
      order: 1,
      isRunnable: false,
    },
  ],
  "react-context-api": [
    {
      title: "Theme context consumer",
      description: "Read theme from context with useContext.",
      code: `const ThemeContext = createContext('light');\n\nfunction Toolbar() {\n  const theme = useContext(ThemeContext);\n  return <div className={\`toolbar-\${theme}\`}>Toolbar</div>;\n}`,
      expectedOutput: "Toolbar div uses class toolbar-light or toolbar-dark",
      difficulty: "intermediate",
      tags: ["context", "useContext"],
      order: 1,
      isRunnable: false,
    },
  ],
  "react-router-setup": [
    {
      title: "Two-route app",
      description: "Basic Routes with Home and About pages.",
      code: `<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/about" element={<About />} />\n  </Routes>\n</BrowserRouter>`,
      expectedOutput: "URL / shows Home; /about shows About component",
      difficulty: "beginner",
      tags: ["router", "routes"],
      order: 1,
      isRunnable: false,
    },
  ],
  "custom-hooks": [
    {
      title: "useToggle hook",
      description: "Custom hook encapsulating boolean toggle state.",
      code: `function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = () => setOn((v) => !v);\n  return [on, toggle];\n}`,
      expectedOutput: "Returns [boolean, toggleFn] for components to use",
      difficulty: "intermediate",
      tags: ["custom-hooks", "useState"],
      order: 1,
      isRunnable: false,
    },
  ],
  "useReducer-basics": [
    {
      title: "Counter with dispatch",
      description: "Increment via useReducer actions.",
      code: `function reducer(state, action) {\n  if (action.type === 'add') return { n: state.n + 1 };\n  return state;\n}\n\nconst [state, dispatch] = useReducer(reducer, { n: 0 });\ndispatch({ type: 'add' });`,
      expectedOutput: "state.n becomes 1 after dispatch",
      difficulty: "intermediate",
      tags: ["useReducer", "state"],
      order: 1,
      isRunnable: false,
    },
  ],
  "lifting-state-up": [
    {
      title: "Shared input value",
      description: "Parent holds state; child displays it.",
      code: `function Parent() {\n  const [text, setText] = useState('');\n  return (\n    <>\n      <input value={text} onChange={(e) => setText(e.target.value)} />\n      <Preview text={text} />\n    </>\n  );\n}`,
      expectedOutput: "Preview updates as user types in the input",
      difficulty: "beginner",
      tags: ["state", "lifting"],
      order: 1,
      isRunnable: false,
    },
  ],
};

// ─── QUIZZES ─────────────────────────────────────────────────────────────────
export const reactQuizzes: Record<
  string,
  {
    title: string;
    description: string;
    passingScore: number;
    timeLimit: number;
    questions: Array<{
      question: string;
      options: string[];
      correctOptionIndex: number;
      explanation: string;
      order: number;
    }>;
  }
> = {
  "what-is-react": {
    title: "What is React? Quiz",
    description: "Test your understanding of React fundamentals.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "React is primarily:",
        options: [
          "A database",
          "A JavaScript library for building UIs",
          "A CSS framework",
          "A Node.js runtime",
        ],
        correctOptionIndex: 1,
        explanation: "React focuses on the view layer — components and UI state.",
        order: 1,
      },
      {
        question: "Modern React components are usually written as:",
        options: [
          "Class components only",
          "Function components with hooks",
          "Web Components only",
          "jQuery plugins",
        ],
        correctOptionIndex: 1,
        explanation: "Function components and hooks are the standard since React 16.8+.",
        order: 2,
      },
      {
        question: "React updates the DOM using:",
        options: [
          "Full page reloads on every change",
          "A virtual DOM diffing algorithm",
          "SQL queries",
          "Server-side only rendering with no client JS",
        ],
        correctOptionIndex: 1,
        explanation: "React compares virtual trees and patches the real DOM efficiently.",
        order: 3,
      },
      {
        question: "createRoot().render() is used to:",
        options: [
          "Compile TypeScript",
          "Mount a React tree into a DOM node",
          "Install npm packages",
          "Define CSS variables",
        ],
        correctOptionIndex: 1,
        explanation: "React 18+ uses createRoot from react-dom/client to mount apps.",
        order: 4,
      },
    ],
  },
  "jsx-syntax": {
    title: "JSX Syntax Quiz",
    description: "JSX rules, attributes, and syntax basics.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "In JSX, CSS classes are set with:",
        options: ["class", "className", "cssClass", "styleClass"],
        correctOptionIndex: 1,
        explanation: "class is a reserved word in JavaScript — JSX uses className.",
        order: 1,
      },
      {
        question: "JavaScript expressions in JSX are wrapped in:",
        options: ["( )", "{ }", "[ ]", "< >"],
        correctOptionIndex: 1,
        explanation: "Curly braces embed any JavaScript expression in JSX.",
        order: 2,
      },
      {
        question: "JSX must return:",
        options: [
          "Multiple root elements without a wrapper",
          "A single parent element or Fragment",
          "Only strings",
          "null always",
        ],
        correctOptionIndex: 1,
        explanation: "One parent (or Fragment) is required per return statement.",
        order: 3,
      },
      {
        question: "Self-closing JSX tags like <img /> must:",
        options: [
          "Omit the slash",
          "Include the closing slash",
          "Use closing tag <img></img> only",
          "Never use alt attribute",
        ],
        correctOptionIndex: 1,
        explanation: "Void elements in JSX must be self-closed: <br />, <input />.",
        order: 4,
      },
    ],
  },
  "function-components": {
    title: "Function Components Quiz",
    description: "Components, naming, and structure.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "React component names should be:",
        options: [
          "camelCase like button",
          "PascalCase like UserCard",
          "ALL CAPS like USER",
          "snake_case like user_card",
        ],
        correctOptionIndex: 1,
        explanation: "PascalCase distinguishes components from HTML tags in JSX.",
        order: 1,
      },
      {
        question: "A function component must:",
        options: [
          "Extend React.Component",
          "Return JSX (or null)",
          "Define a render() method",
          "Use only class syntax",
        ],
        correctOptionIndex: 1,
        explanation: "Function components return the UI description as JSX.",
        order: 2,
      },
      {
        question: "props.children contains:",
        options: [
          "Only string literals",
          "Nested JSX passed between opening and closing tags",
          "The parent component state",
          "CSS module imports",
        ],
        correctOptionIndex: 1,
        explanation: "Content between <Card>...</Card> is available as props.children.",
        order: 3,
      },
    ],
  },
  "useState-hook": {
    title: "useState Quiz",
    description: "State basics and setter behavior.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "useState returns:",
        options: [
          "Only the current value",
          "A pair: current state and a setter function",
          "A Promise",
          "The DOM node",
        ],
        correctOptionIndex: 1,
        explanation: "const [value, setValue] = useState(initial) is the standard pattern.",
        order: 1,
      },
      {
        question: "You should update object state by:",
        options: [
          "Mutating the object in place",
          "Creating a new object (e.g. spread)",
          "Deleting the state variable",
          "Using document.getElementById",
        ],
        correctOptionIndex: 1,
        explanation: "Immutability lets React detect changes and re-render.",
        order: 2,
      },
      {
        question: "setCount((c) => c + 1) is useful when:",
        options: [
          "You never need the previous value",
          "The new state depends on the previous state",
          "You want to skip re-renders always",
          "You are in a class component only",
        ],
        correctOptionIndex: 1,
        explanation: "Functional updates avoid stale state when multiple updates batch.",
        order: 3,
      },
      {
        question: "Calling useState inside an if block:",
        options: [
          "Is recommended for performance",
          "Breaks the Rules of Hooks",
          "Is required for forms",
          "Only works in class components",
        ],
        correctOptionIndex: 1,
        explanation: "Hooks must be called in the same order every render — top level only.",
        order: 4,
      },
    ],
  },
  "rendering-lists-keys": {
    title: "Lists and Keys Quiz",
    description: "map(), keys, and list rendering.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "The key prop helps React:",
        options: [
          "Style elements automatically",
          "Identify which items changed in a list",
          "Encrypt props",
          "Compile JSX faster only",
        ],
        correctOptionIndex: 1,
        explanation: "Keys stabilize identity across re-renders when lists change.",
        order: 1,
      },
      {
        question: "Best key for a list of database records:",
        options: [
          "Math.random() on each render",
          "Stable unique id from the record",
          "Always the array index when items reorder",
          "The string 'key'",
        ],
        correctOptionIndex: 1,
        explanation: "Stable IDs prevent bugs when items are inserted or reordered.",
        order: 2,
      },
      {
        question: "To render a list in JSX you typically use:",
        options: ["for loop inside JSX", "array.map()", "switch only", "document.write"],
        correctOptionIndex: 1,
        explanation: "map() returns an array of elements React can render.",
        order: 3,
      },
    ],
  },
  "useEffect-introduction": {
    title: "useEffect Quiz",
    description: "Side effects, dependencies, and cleanup.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "useEffect runs:",
        options: [
          "Before React renders anything",
          "After render is committed to the screen",
          "Only on the server",
          "Never in function components",
        ],
        correctOptionIndex: 1,
        explanation: "Effects run after paint unless using useLayoutEffect.",
        order: 1,
      },
      {
        question: "useEffect(() => {}, []) means:",
        options: [
          "Run after every render",
          "Run once after initial mount",
          "Never run",
          "Run only on unmount",
        ],
        correctOptionIndex: 1,
        explanation: "An empty dependency array limits the effect to mount (and cleanup on unmount).",
        order: 2,
      },
      {
        question: "Returning a function from useEffect:",
        options: [
          "Is invalid syntax",
          "Provides cleanup before re-run or unmount",
          "Replaces useState",
          "Only works in class components",
        ],
        correctOptionIndex: 1,
        explanation: "Cleanup clears timers, subscriptions, and abort flags.",
        order: 3,
      },
      {
        question: "Fetching data in useEffect should handle:",
        options: [
          "No loading or error state",
          "Loading, error, and race conditions (e.g. cancelled flag)",
          "Only CSS",
          "Replacing keys in lists",
        ],
        correctOptionIndex: 1,
        explanation: "Async effects need loading UI and cleanup to ignore stale responses.",
        order: 4,
      },
    ],
  },
  "react-context-api": {
    title: "React Context Quiz",
    description: "Context, Provider, and useContext.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Context is mainly used to:",
        options: [
          "Replace all useState in every component",
          "Pass data deep without intermediate props",
          "Compile JSX",
          "Style components with CSS modules only",
        ],
        correctOptionIndex: 1,
        explanation: "Context avoids prop drilling for widely shared values.",
        order: 1,
      },
      {
        question: "useContext(ThemeContext) returns:",
        options: [
          "The nearest Provider value above the component",
          "Always null",
          "The npm package version",
          "A DOM element",
        ],
        correctOptionIndex: 0,
        explanation: "React walks up the tree to find the matching Provider value.",
        order: 2,
      },
      {
        question: "createContext(defaultValue) default is used when:",
        options: [
          "A component has no matching Provider above it",
          "The app is in production only",
          "useState is called",
          "Keys are missing in lists",
        ],
        correctOptionIndex: 0,
        explanation: "The default applies only if no Provider wraps the consumer.",
        order: 3,
      },
    ],
  },
  "react-router-setup": {
    title: "React Router Quiz",
    description: "Routing, links, and navigation.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "For internal SPA navigation you should use:",
        options: ["<a href> for all routes", "<Link to>", "<form action>", "<iframe>"],
        correctOptionIndex: 1,
        explanation: "Link updates the URL without a full document reload.",
        order: 1,
      },
      {
        question: "BrowserRouter wraps:",
        options: [
          "Only one Route",
          "The part of the app that uses routing",
          "The Node.js server only",
          "CSS files",
        ],
        correctOptionIndex: 1,
        explanation: "Router provides context for Route, Link, and hooks.",
        order: 2,
      },
      {
        question: "useParams() is used to read:",
        options: [
          "Query string only",
          "Dynamic URL segments like :id",
          "npm scripts",
          "Component props from parent only",
        ],
        correctOptionIndex: 1,
        explanation: "Params match placeholders defined in the Route path.",
        order: 3,
      },
      {
        question: "useNavigate() allows:",
        options: [
          "Programmatic navigation in event handlers",
          "Deleting the virtual DOM",
          "Installing Vite",
          "Defining CSS variables",
        ],
        correctOptionIndex: 0,
        explanation: "navigate('/path') changes the route from JavaScript code.",
        order: 4,
      },
    ],
  },
  "custom-hooks": {
    title: "Custom Hooks Quiz",
    description: "Extracting and naming custom hooks.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Custom hooks must be named:",
        options: [
          "Starting with use (e.g. useFetch)",
          "Starting with get",
          "In ALL CAPS",
          "Ending with Hook only",
        ],
        correctOptionIndex: 0,
        explanation: "The use prefix tells React and ESLint it follows hook rules.",
        order: 1,
      },
      {
        question: "Custom hooks can call:",
        options: [
          "Other hooks like useState and useEffect",
          "Only console.log",
          "Only class lifecycle methods",
          "document.write only",
        ],
        correctOptionIndex: 0,
        explanation: "Custom hooks compose built-in hooks to share logic.",
        order: 2,
      },
      {
        question: "Sharing logic via custom hooks:",
        options: [
          "Duplicates state between components automatically",
          "Each call gets its own isolated state",
          "Uses one global variable for all components",
          "Requires Redux always",
        ],
        correctOptionIndex: 1,
        explanation: "Each component calling useToggle() has independent state.",
        order: 3,
      },
    ],
  },
  "react-rules-of-hooks": {
    title: "Rules of Hooks Quiz",
    description: "Valid hook usage in React function components.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Hooks must be called:",
        options: [
          "Inside loops for flexibility",
          "At the top level of a React function",
          "Inside any nested helper without use prefix",
          "Only in index.html",
        ],
        correctOptionIndex: 1,
        explanation: "Top-level calls keep hook order consistent across renders.",
        order: 1,
      },
      {
        question: "Valid places to call useState:",
        options: [
          "React function components and custom hooks",
          "Regular utility functions with no use prefix",
          "Class render methods",
          "Global script outside React",
        ],
        correctOptionIndex: 0,
        explanation: "Only React functions and custom hooks may call hooks.",
        order: 2,
      },
      {
        question: "eslint-plugin-react-hooks helps:",
        options: [
          "Format JSON package files",
          "Warn about missing effect dependencies and invalid hook calls",
          "Replace Vite",
          "Compile Sass only",
        ],
        correctOptionIndex: 1,
        explanation: "The exhaustive-deps rule catches common useEffect mistakes.",
        order: 3,
      },
      {
        question: "Calling hooks conditionally:",
        options: [
          "Is fine if the condition is rare",
          "Violates the Rules of Hooks",
          "Is required for useReducer",
          "Only applies to useContext",
        ],
        correctOptionIndex: 1,
        explanation: "Conditions change hook order between renders and break React.",
        order: 4,
      },
    ],
  },
};
