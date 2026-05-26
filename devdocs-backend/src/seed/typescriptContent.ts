// TypeScript tutorial content — sections, runnable examples, and quizzes.
// Web/Node focused (W3Schools style). Grouped by topic slug. No _id fields.

// ─── SECTIONS ────────────────────────────────────────────────────────────────
export const typescriptSections: Record<
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
  "ts-introduction": [
    {
      title: "What is TypeScript?",
      slug: "what-is-typescript",
      metaDescription:
        "Learn what TypeScript is, why teams use it, and how it improves JavaScript development.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "What is TypeScript?", order: 1 },
        {
          type: "text",
          content:
            "TypeScript is a typed superset of JavaScript developed by Microsoft. It adds optional static types, modern ECMAScript features, and rich tooling on top of plain JavaScript. TypeScript code is compiled (transpiled) to JavaScript, so it runs anywhere JavaScript runs — browsers, Node.js, Deno, and cloud functions.",
          order: 2,
        },
        {
          type: "note",
          content:
            "TypeScript is not a separate runtime. The tsc compiler removes types and outputs standard JavaScript (.js files) that engines execute.",
          order: 3,
        },
        { type: "heading", content: "Why Use TypeScript?", order: 4 },
        {
          type: "list",
          content: "Teams adopt TypeScript because it helps you:",
          items: [
            "Catch type errors before code reaches production",
            "Get autocomplete and inline docs in VS Code and other editors",
            "Refactor large React, Angular, or Node.js codebases safely",
            "Document APIs through types instead of comments alone",
            "Scale teams without losing clarity in shared code",
          ],
          order: 5,
        },
        {
          type: "code",
          content: `// TypeScript adds types to JavaScript\nlet username: string = "Ada";\nlet score: number = 100;\n\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet(username));`,
          language: "typescript",
          order: 6,
        },
        {
          type: "tip",
          content:
            "You can adopt TypeScript gradually — rename .js files to .ts one at a time and fix type errors as you go.",
          order: 7,
        },
      ],
    },
    {
      title: "TypeScript vs JavaScript",
      slug: "typescript-vs-javascript",
      metaDescription:
        "Compare TypeScript and JavaScript — syntax, tooling, compilation, and when to choose each.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "TypeScript vs JavaScript", order: 1 },
        {
          type: "text",
          content:
            "Every valid JavaScript program is valid TypeScript (with very few exceptions). TypeScript extends JavaScript with type annotations, interfaces, enums, and compile-time checks. Browsers and Node.js never run TypeScript directly — they always run the compiled JavaScript output.",
          order: 2,
        },
        { type: "heading", content: "Key Differences", order: 3 },
        {
          type: "list",
          content: "At a glance:",
          items: [
            "JavaScript is interpreted or JIT-compiled at runtime; TypeScript is checked at compile time",
            "JavaScript files use .js; TypeScript source uses .ts (or .tsx for React)",
            "TypeScript requires a build step (tsc, Vite, webpack, or esbuild)",
            "JavaScript allows implicit any; strict TypeScript flags catch unsafe code",
            "Both share the same npm ecosystem and runtime APIs",
          ],
          order: 4,
        },
        {
          type: "code",
          content: `// JavaScript — no compile-time type checking\nfunction add(a, b) {\n  return a + b;\n}\nadd("2", 3); // "23" — silent bug\n\n// TypeScript — error at compile time\nfunction addTyped(a: number, b: number): number {\n  return a + b;\n}\n// addTyped("2", 3); // Error: Argument of type 'string' is not assignable`,
          language: "typescript",
          order: 5,
        },
        {
          type: "warning",
          content:
            "TypeScript does not make your app faster at runtime. Performance gains come from fewer bugs and faster development, not from typed execution.",
          order: 6,
        },
        {
          type: "tip",
          content:
            "Use JavaScript for tiny scripts or quick prototypes. Choose TypeScript when the project will grow, involve multiple developers, or use a framework like React or Angular.",
          order: 7,
        },
      ],
    },
    {
      title: "Installing TypeScript",
      slug: "installing-typescript",
      metaDescription:
        "Install TypeScript globally or locally with npm, initialize tsconfig.json, and run the compiler.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Installing TypeScript", order: 1 },
        {
          type: "text",
          content:
            "TypeScript is distributed as an npm package. For real projects, install it locally in your project so every teammate uses the same compiler version.",
          order: 2,
        },
        { type: "heading", content: "Local Installation (Recommended)", order: 3 },
        {
          type: "code",
          content: `# Create a new Node.js project\nnpm init -y\n\n# Install TypeScript as a dev dependency\nnpm install --save-dev typescript\n\n# Generate tsconfig.json\nnpx tsc --init`,
          language: "bash",
          order: 4,
        },
        { type: "heading", content: "Global Installation (Optional)", order: 5 },
        {
          type: "code",
          content: `npm install -g typescript\n\ntsc --version`,
          language: "bash",
          order: 6,
        },
        {
          type: "note",
          content:
            "Use npx tsc in npm scripts so CI and collaborators always invoke the project's local TypeScript version.",
          order: 7,
        },
        { type: "heading", content: "package.json Scripts", order: 8 },
        {
          type: "code",
          content: `{\n  "scripts": {\n    "build": "tsc",\n    "watch": "tsc --watch",\n    "dev": "tsx src/index.ts"\n  },\n  "devDependencies": {\n    "typescript": "^5.4.0",\n    "tsx": "^4.7.0"\n  }\n}`,
          language: "json",
          order: 9,
        },
        {
          type: "tip",
          content:
            "For frontend apps, Vite and Create React App already include TypeScript support — run npm create vite@latest and choose the TypeScript template.",
          order: 10,
        },
      ],
    },
    {
      title: "Your First TypeScript Program",
      slug: "first-typescript-program",
      metaDescription:
        "Write, compile, and run your first TypeScript program with tsc and Node.js.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        { type: "heading", content: "Your First TypeScript Program", order: 1 },
        {
          type: "text",
          content:
            "Create a src folder, write a .ts file, compile it with tsc, and run the output with Node.js. This is the core workflow before bundlers or dev servers enter the picture.",
          order: 2,
        },
        {
          type: "code",
          content: `// src/index.ts\nconst appName: string = "DevDocs";\nconst version: number = 1;\n\nfunction banner(name: string, ver: number): void {\n  console.log(\`\${name} v\${ver} — TypeScript is working!\`);\n}\n\nbanner(appName, version);`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "Compile and Run", order: 4 },
        {
          type: "code",
          content: `# Compile TypeScript to JavaScript in dist/\nnpx tsc\n\n# Run the compiled output\nnode dist/index.js`,
          language: "bash",
          order: 5,
        },
        {
          type: "code",
          content: `{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "commonjs",\n    "outDir": "./dist",\n    "rootDir": "./src",\n    "strict": true\n  },\n  "include": ["src/**/*"]\n}`,
          language: "json",
          order: 6,
        },
        {
          type: "tip",
          content:
            "Use tsx or ts-node during development to run .ts files directly without a separate compile step: npx tsx src/index.ts",
          order: 7,
        },
      ],
    },
  ],

  "ts-basics": [
    {
      title: "TypeScript Variables",
      slug: "typescript-variables",
      metaDescription:
        "Declare typed variables with let and const in TypeScript for safer web and Node.js code.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "TypeScript Variables", order: 1 },
        {
          type: "text",
          content:
            "TypeScript uses the same let and const keywords as modern JavaScript. You can add explicit types after the variable name, or let the compiler infer types from the initial value.",
          order: 2,
        },
        {
          type: "code",
          content: `// Explicit types\nlet pageTitle: string = "Home";\nconst maxItems: number = 50;\nlet isLoggedIn: boolean = false;\n\n// const must be assigned immediately\nconst apiBase = "https://api.example.com"; // inferred as string`,
          language: "typescript",
          order: 3,
        },
        {
          type: "note",
          content:
            "TypeScript discourages var. Prefer const by default and use let only when you need to reassign the variable.",
          order: 4,
        },
        { type: "heading", content: "Typing DOM and API Values", order: 5 },
        {
          type: "code",
          content: `// Browser example\nconst button = document.querySelector<HTMLButtonElement>("#submit");\nif (button) {\n  button.disabled = true;\n}\n\n// Node.js example\nconst port: number = Number(process.env.PORT) || 3000;`,
          language: "typescript",
          order: 6,
        },
        {
          type: "warning",
          content:
            "Avoid reassigning a variable to a different type. TypeScript will error if you try to store a number in a string-typed variable.",
          order: 7,
        },
      ],
    },
    {
      title: "Type Annotations",
      slug: "type-annotations",
      metaDescription:
        "Add explicit type annotations to variables, parameters, and return values in TypeScript.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Type Annotations", order: 1 },
        {
          type: "text",
          content:
            "A type annotation tells TypeScript what kind of value a variable or function expects. Syntax: name: Type. Annotations are optional when the compiler can infer the type safely.",
          order: 2,
        },
        {
          type: "code",
          content: `let email: string = "user@example.com";\nlet age: number = 28;\nlet tags: string[] = ["web", "typescript"];\n\nfunction formatPrice(amount: number, currency: string): string {\n  return \`\${currency}\${amount.toFixed(2)}\`;\n}\n\nconsole.log(formatPrice(19.5, "$"));`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "Object Annotations", order: 4 },
        {
          type: "code",
          content: `type User = {\n  id: number;\n  name: string;\n  active: boolean;\n};\n\nconst user: User = {\n  id: 1,\n  name: "Zain",\n  active: true,\n};`,
          language: "typescript",
          order: 5,
        },
        {
          type: "tip",
          content:
            "Annotate function parameters and public API boundaries. Let TypeScript infer local variables and simple return types when obvious.",
          order: 6,
        },
        {
          type: "list",
          content: "Common annotation mistakes to avoid:",
          items: [
            "Using string for a value that can be null — use string | null instead",
            "Annotating with overly broad types like any",
            "Duplicating large object shapes — extract an interface or type alias",
          ],
          order: 7,
        },
      ],
    },
    {
      title: "Type Inference",
      slug: "type-inference",
      metaDescription:
        "Understand how TypeScript infers types automatically and when to add explicit annotations.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Type Inference", order: 1 },
        {
          type: "text",
          content:
            "When you initialize a variable, TypeScript figures out its type without an annotation. This is type inference — it keeps code concise while still catching mistakes.",
          order: 2,
        },
        {
          type: "code",
          content: `const framework = "React";     // inferred: string\nconst count = 0;                 // inferred: number\nconst settings = { theme: "dark" }; // inferred: { theme: string }\n\n// Error — cannot assign number to inferred string\n// framework = 42;`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "Best Common Type", order: 4 },
        {
          type: "text",
          content:
            "When an array holds mixed literals, TypeScript widens to a common type. Use as const or explicit annotations when you need literal types preserved.",
          order: 5,
        },
        {
          type: "code",
          content: `const roles = ["admin", "editor", "viewer"]; // string[]\nconst sizes = ["sm", "md", "lg"] as const;   // readonly ["sm", "md", "lg"]`,
          language: "typescript",
          order: 6,
        },
        {
          type: "note",
          content:
            "Function return types are usually inferred. Add an explicit return type on exported functions to document the contract and catch accidental changes.",
          order: 7,
        },
      ],
    },
    {
      title: "Strict Mode & tsconfig",
      slug: "strict-mode-tsconfig",
      metaDescription:
        "Enable strict compiler options in tsconfig.json for maximum type safety in production apps.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Strict Mode & tsconfig", order: 1 },
        {
          type: "text",
          content:
            "The strict flag in tsconfig.json enables a family of checks that catch the most common JavaScript pitfalls. New projects should always start with strict: true.",
          order: 2,
        },
        {
          type: "code",
          content: `{\n  "compilerOptions": {\n    "strict": true,\n    "noImplicitAny": true,\n    "strictNullChecks": true,\n    "strictFunctionTypes": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "noImplicitReturns": true\n  }\n}`,
          language: "json",
          order: 3,
        },
        { type: "heading", content: "What strictNullChecks Changes", order: 4 },
        {
          type: "code",
          content: `// Without strictNullChecks, null slips through\n// With strictNullChecks:\nfunction getTitle(el: HTMLElement | null): string {\n  if (!el) return "";\n  return el.textContent ?? "";\n}`,
          language: "typescript",
          order: 5,
        },
        {
          type: "list",
          content: "Other useful compilerOptions for web/Node projects:",
          items: [
            "target and module — match your runtime (ES2020 + ESNext for Vite)",
            "moduleResolution: bundler — for Vite and modern bundlers",
            "jsx: react-jsx — for React 17+ without importing React",
            "esModuleInterop: true — smoother default imports from CommonJS",
            "skipLibCheck: true — faster builds in large monorepos",
          ],
          order: 6,
        },
        {
          type: "warning",
          content:
            "Turning off strict to silence errors hides real bugs. Fix types or use unknown and narrowing instead of disabling checks.",
          order: 7,
        },
      ],
    },
  ],

  "ts-types": [
    {
      title: "Primitive Types",
      slug: "primitive-types",
      metaDescription:
        "Use string, number, boolean, bigint, symbol, null, and undefined in TypeScript.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Primitive Types", order: 1 },
        {
          type: "text",
          content:
            "TypeScript models JavaScript primitives: string, number, boolean, bigint, symbol, null, and undefined. These are the building blocks for function parameters, API responses, and component props.",
          order: 2,
        },
        {
          type: "code",
          content: `let label: string = "Submit";\nlet price: number = 29.99;\nlet inStock: boolean = true;\nlet bigId: bigint = 9007199254740991n;\nlet sym: symbol = Symbol("id");\n\nlet notSet: undefined = undefined;\nlet empty: null = null;`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "Union with Primitives", order: 4 },
        {
          type: "code",
          content: `type Status = "idle" | "loading" | "success" | "error";\n\nfunction setStatus(s: Status): void {\n  console.log("Status:", s);\n}\n\nlet retryCount: number | null = null;`,
          language: "typescript",
          order: 5,
        },
        {
          type: "tip",
          content:
            "Use template literal types (e.g. `#${string}`) for CSS colors or route paths when you need stricter strings than plain string.",
          order: 6,
        },
      ],
    },
    {
      title: "any, unknown & never",
      slug: "any-unknown-never",
      metaDescription:
        "Learn when to use any, unknown, and never — and why unknown is safer than any.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "any, unknown & never", order: 1 },
        {
          type: "text",
          content:
            "any opts out of type checking — use sparingly. unknown represents values you must narrow before use — ideal for JSON and user input. never is for functions that never return normally (throw or infinite loop).",
          order: 2,
        },
        {
          type: "code",
          content: `// any — no checking (escape hatch)\nlet data: any = fetchSomething();\n// data.foo.bar(); // compiles — risky\n\n// unknown — must narrow first\nlet input: unknown = JSON.parse('{"name":"Ada"}');\nif (typeof input === "object" && input !== null && "name" in input) {\n  console.log((input as { name: string }).name);\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `// never — exhaustive checks\nfunction assertNever(x: never): never {\n  throw new Error("Unexpected: " + x);\n}\n\ntype Shape = "circle" | "square";\nfunction area(shape: Shape) {\n  switch (shape) {\n    case "circle": return Math.PI;\n    case "square": return 1;\n    default: return assertNever(shape);\n  }\n}`,
          language: "typescript",
          order: 4,
        },
        {
          type: "warning",
          content:
            "Avoid any in application code. Prefer unknown plus type guards, or generics, so mistakes are caught at compile time.",
          order: 5,
        },
      ],
    },
    {
      title: "Arrays & Tuples",
      slug: "arrays-tuples",
      metaDescription:
        "Type arrays, readonly arrays, and fixed-length tuples for structured data in TypeScript.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Arrays & Tuples", order: 1 },
        {
          type: "text",
          content:
            "Arrays hold homogenous lists. Tuples describe fixed-length arrays where each position has a specific type — perfect for coordinates, RGB colors, or [error, result] pairs.",
          order: 2,
        },
        {
          type: "code",
          content: `// Array syntax\nconst tags: string[] = ["html", "css", "ts"];\nconst scores: Array<number> = [90, 85, 88];\n\n// Readonly arrays\nconst readonlyTags: readonly string[] = tags;`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `// Tuple — fixed length and types\ntype Point = [number, number];\nconst origin: Point = [0, 0];\n\ntype ApiResult<T> = [Error | null, T | null];\nfunction ok<T>(data: T): ApiResult<T> {\n  return [null, data];\n}`,
          language: "typescript",
          order: 4,
        },
        {
          type: "tip",
          content:
            "Use tuples for React useState when state is a pair: const [count, setCount] = useState<number>(0) — the return type is a tuple.",
          order: 5,
        },
      ],
    },
    {
      title: "Enums & Literal Types",
      slug: "enums-literal-types",
      metaDescription:
        "Model fixed sets of values with enums, string literal unions, and as const objects.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Enums & Literal Types", order: 1 },
        {
          type: "text",
          content:
            "Literal types restrict a value to an exact string or number. Enums group related constants. Modern codebases often prefer string union types or as const objects over numeric enums.",
          order: 2,
        },
        {
          type: "code",
          content: `// String literal union (preferred for many teams)\ntype Theme = "light" | "dark" | "system";\n\nconst theme: Theme = "dark";\n\n// Enum\nenum HttpMethod {\n  GET = "GET",\n  POST = "POST",\n  PUT = "PUT",\n  DELETE = "DELETE",\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `// const object pattern\nconst Routes = {\n  Home: "/",\n  Docs: "/docs",\n  Login: "/login",\n} as const;\n\ntype Route = (typeof Routes)[keyof typeof Routes];`,
          language: "typescript",
          order: 4,
        },
        {
          type: "note",
          content:
            "const enum inlines values at compile time but can complicate bundler setups. Prefer regular string unions unless you need enum ergonomics.",
          order: 5,
        },
      ],
    },
  ],

  "ts-interfaces-classes": [
    {
      title: "TypeScript Interfaces",
      slug: "typescript-interfaces",
      metaDescription:
        "Define object shapes and contracts with interfaces for APIs, props, and services.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "TypeScript Interfaces", order: 1 },
        {
          type: "text",
          content:
            "An interface describes the shape of an object — which properties exist and their types. Use interfaces for React component props, REST API payloads, and service contracts.",
          order: 2,
        },
        {
          type: "code",
          content: `interface Product {\n  id: number;\n  name: string;\n  price: number;\n  inStock?: boolean; // optional property\n}\n\nfunction displayProduct(p: Product): string {\n  return \`\${p.name} — $\${p.price}\`;\n}`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "Extending Interfaces", order: 4 },
        {
          type: "code",
          content: `interface User {\n  id: number;\n  email: string;\n}\n\ninterface Admin extends User {\n  role: "admin";\n  permissions: string[];\n}`,
          language: "typescript",
          order: 5,
        },
        {
          type: "tip",
          content:
            "Interfaces can be merged (declaration merging) — useful for augmenting global types like Window or Express Request in .d.ts files.",
          order: 6,
        },
      ],
    },
    {
      title: "Type Aliases",
      slug: "type-aliases",
      metaDescription:
        "Create reusable type aliases for unions, intersections, and complex object shapes.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Type Aliases", order: 1 },
        {
          type: "text",
          content:
            "The type keyword creates an alias for any type — objects, unions, intersections, tuples, or primitives. type and interface overlap for object shapes; choose one style and stay consistent.",
          order: 2,
        },
        {
          type: "code",
          content: `type ID = string | number;\n\ntype ApiResponse<T> = {\n  data: T;\n  status: number;\n  message?: string;\n};\n\ntype LoadingState =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: unknown }\n  | { status: "error"; error: string };`,
          language: "typescript",
          order: 3,
        },
        {
          type: "list",
          content: "When to prefer type over interface:",
          items: [
            "Union or intersection types",
            "Mapped or conditional types",
            "Tuple aliases",
            "Primitives or utility-type compositions",
          ],
          order: 4,
        },
        {
          type: "note",
          content:
            "Interfaces are often preferred for public object contracts because they support extends and declaration merging.",
          order: 5,
        },
      ],
    },
    {
      title: "TypeScript Classes",
      slug: "typescript-classes",
      metaDescription:
        "Build typed classes with constructors, methods, and implements for OOP in TypeScript.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "TypeScript Classes", order: 1 },
        {
          type: "text",
          content:
            "Classes in TypeScript add visibility modifiers and typed fields to standard ES6 classes. They compile to JavaScript classes and work in browsers and Node.js.",
          order: 2,
        },
        {
          type: "code",
          content: `class ShoppingCart {\n  private items: { id: string; qty: number }[] = [];\n\n  add(id: string, qty: number = 1): void {\n    this.items.push({ id, qty });\n  }\n\n  count(): number {\n    return this.items.reduce((sum, i) => sum + i.qty, 0);\n  }\n}\n\nconst cart = new ShoppingCart();\ncart.add("book", 2);\nconsole.log(cart.count());`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "implements", order: 4 },
        {
          type: "code",
          content: `interface Logger {\n  log(message: string): void;\n}\n\nclass ConsoleLogger implements Logger {\n  log(message: string): void {\n    console.log(\`[LOG] \${message}\`);\n  }\n}`,
          language: "typescript",
          order: 5,
        },
        {
          type: "tip",
          content:
            "In React, prefer functions and hooks over classes for components. Classes remain useful for services, models, and some Node.js libraries.",
          order: 6,
        },
      ],
    },
    {
      title: "Access Modifiers",
      slug: "access-modifiers",
      metaDescription:
        "Control visibility with public, private, protected, and readonly in TypeScript classes.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Access Modifiers", order: 1 },
        {
          type: "text",
          content:
            "TypeScript adds public, private, and protected modifiers to class members. public is the default. private restricts access to the declaring class; protected allows subclasses.",
          order: 2,
        },
        {
          type: "code",
          content: `class BankAccount {\n  public readonly id: string;\n  private balance: number;\n\n  constructor(id: string, initial: number) {\n    this.id = id;\n    this.balance = initial;\n  }\n\n  deposit(amount: number): void {\n    if (amount > 0) this.balance += amount;\n  }\n\n  getBalance(): number {\n    return this.balance;\n  }\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "note",
          content:
            "private and protected are enforced at compile time only. They do not create true runtime privacy — use # private fields in JavaScript if you need runtime enforcement.",
          order: 4,
        },
        {
          type: "code",
          content: `// Parameter properties shorthand\nclass User {\n  constructor(\n    public name: string,\n    private passwordHash: string\n  ) {}\n}`,
          language: "typescript",
          order: 5,
        },
        {
          type: "warning",
          content:
            "Do not rely on private for security secrets. It prevents accidental access from other TypeScript code, not malicious runtime inspection.",
          order: 6,
        },
      ],
    },
  ],

  "ts-functions": [
    {
      title: "Typed Functions",
      slug: "typed-functions",
      metaDescription:
        "Write functions with typed parameters and return values in TypeScript.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Typed Functions", order: 1 },
        {
          type: "text",
          content:
            "Every function parameter and return value can have a type. Arrow functions, function declarations, and methods share the same typing rules.",
          order: 2,
        },
        {
          type: "code",
          content: `function slugify(text: string): string {\n  return text.toLowerCase().replace(/\\s+/g, "-");\n}\n\nconst fetchJson = async (url: string): Promise<unknown> => {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(res.statusText);\n  return res.json();\n};`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "Void and Never Returns", order: 4 },
        {
          type: "code",
          content: `function logEvent(name: string): void {\n  console.log(name);\n  // no return value\n}\n\nfunction fail(msg: string): never {\n  throw new Error(msg);\n}`,
          language: "typescript",
          order: 5,
        },
        {
          type: "tip",
          content:
            "Type callback props in React as (value: string) => void. Use Promise<T> for async handlers that return data.",
          order: 6,
        },
      ],
    },
    {
      title: "Optional & Default Parameters",
      slug: "optional-default-params",
      metaDescription:
        "Use optional parameters, default values, and rest parameters in TypeScript functions.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Optional & Default Parameters", order: 1 },
        {
          type: "text",
          content:
            "Optional parameters use a ? suffix and may be undefined. Default parameters provide fallback values when an argument is omitted.",
          order: 2,
        },
        {
          type: "code",
          content: `function buildUrl(path: string, base?: string): string {\n  const root = base ?? "https://example.com";\n  return \`\${root}\${path}\`;\n}\n\nfunction greet(name: string, greeting: string = "Hello"): string {\n  return \`\${greeting}, \${name}!\`;\n}\n\nconsole.log(greet("World"));\nconsole.log(buildUrl("/docs"));`,
          language: "typescript",
          order: 3,
        },
        { type: "heading", content: "Rest Parameters", order: 4 },
        {
          type: "code",
          content: `function sum(...numbers: number[]): number {\n  return numbers.reduce((a, b) => a + b, 0);\n}\n\nconsole.log(sum(1, 2, 3, 4)); // 10`,
          language: "typescript",
          order: 5,
        },
        {
          type: "note",
          content:
            "Required parameters cannot follow optional ones. Put optional and default parameters after required parameters.",
          order: 6,
        },
      ],
    },
    {
      title: "Function Overloads",
      slug: "function-overloads",
      metaDescription:
        "Define multiple call signatures with function overloads for flexible APIs.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Function Overloads", order: 1 },
        {
          type: "text",
          content:
            "Overloads let you describe several ways to call the same function. You write multiple signature lines, then one implementation that handles all cases.",
          order: 2,
        },
        {
          type: "code",
          content: `function formatInput(input: string): string;\nfunction formatInput(input: number): string;\nfunction formatInput(input: string | number): string {\n  if (typeof input === "number") {\n    return input.toFixed(2);\n  }\n  return input.trim().toLowerCase();\n}\n\nconsole.log(formatInput(3.14159));\nconsole.log(formatInput("  Hello  "));`,
          language: "typescript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "Prefer union types and generics when overloads become hard to read. Overloads shine for DOM APIs and legacy JavaScript wrappers.",
          order: 4,
        },
        {
          type: "warning",
          content:
            "The implementation signature is not visible to callers — only the overload signatures appear in autocomplete.",
          order: 5,
        },
      ],
    },
  ],

  "ts-generics": [
    {
      title: "Generics Introduction",
      slug: "generics-introduction",
      metaDescription:
        "Write reusable, type-safe functions and data structures with TypeScript generics.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Generics Introduction", order: 1 },
        {
          type: "text",
          content:
            "Generics let you write code that works with many types while preserving type information. Instead of any, you use a type parameter like T that callers specify.",
          order: 2,
        },
        {
          type: "code",
          content: `function firstElement<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst n = firstElement([1, 2, 3]);       // number | undefined\nconst s = firstElement(["a", "b"]);     // string | undefined\n\nfunction wrap<T>(value: T): { value: T } {\n  return { value };\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "list",
          content: "Generics appear everywhere in web development:",
          items: [
            "React useState<User>() and useRef<HTMLInputElement>(null)",
            "fetch().then(res => res.json() as Promise<T>)",
            "Array methods: map, filter, reduce preserve element types",
            "Axios AxiosResponse<T> and similar HTTP clients",
          ],
          order: 4,
        },
        {
          type: "tip",
          content:
            "Start with inference — TypeScript often picks T from arguments. Add explicit <Type> when inference fails or for clarity in public APIs.",
          order: 5,
        },
      ],
    },
    {
      title: "Generic Constraints",
      slug: "generic-constraints",
      metaDescription:
        "Restrict generic type parameters with extends constraints for safer reusable code.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Generic Constraints", order: 1 },
        {
          type: "text",
          content:
            "Use extends to limit what types can be passed to a generic. This lets you access specific properties inside the function body.",
          order: 2,
        },
        {
          type: "code",
          content: `interface HasLength {\n  length: number;\n}\n\nfunction logLength<T extends HasLength>(item: T): T {\n  console.log(item.length);\n  return item;\n}\n\nlogLength("hello");\nlogLength([1, 2, 3]);\n// logLength(42); // Error — number has no length`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { id: 1, name: "Ada" };\nconst name = getProperty(user, "name"); // string`,
          language: "typescript",
          order: 4,
        },
        {
          type: "note",
          content:
            "keyof T produces a union of property names — essential for typed form libraries and state pickers.",
          order: 5,
        },
      ],
    },
    {
      title: "Generic Interfaces & Classes",
      slug: "generic-interfaces-classes",
      metaDescription:
        "Build generic interfaces and classes for APIs, repositories, and React components.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Generic Interfaces & Classes", order: 1 },
        {
          type: "text",
          content:
            "Interfaces and classes can declare their own type parameters. This pattern models paginated API responses, caches, and data stores.",
          order: 2,
        },
        {
          type: "code",
          content: `interface Paginated<T> {\n  items: T[];\n  page: number;\n  totalPages: number;\n}\n\ninterface Repository<T extends { id: string }> {\n  findById(id: string): Promise<T | null>;\n  save(entity: T): Promise<T>;\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `class MemoryCache<T> {\n  private store = new Map<string, T>();\n\n  set(key: string, value: T): void {\n    this.store.set(key, value);\n  }\n\n  get(key: string): T | undefined {\n    return this.store.get(key);\n  }\n}\n\nconst userCache = new MemoryCache<{ id: string; name: string }>();`,
          language: "typescript",
          order: 4,
        },
        {
          type: "tip",
          content:
            "React functional components often use generics via a wrapper: function List<T>(props: { items: T[]; render: (item: T) => ReactNode }) { ... }",
          order: 5,
        },
      ],
    },
  ],

  "ts-utility-types": [
    {
      title: "Partial, Pick & Omit",
      slug: "partial-pick-omit",
      metaDescription:
        "Transform types with Partial, Pick, and Omit for forms, updates, and DTOs.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Partial, Pick & Omit", order: 1 },
        {
          type: "text",
          content:
            "TypeScript ships built-in utility types that transform existing types. They save you from duplicating interface fields for PATCH requests, form drafts, and public views.",
          order: 2,
        },
        {
          type: "code",
          content: `interface Article {\n  id: number;\n  title: string;\n  body: string;\n  publishedAt: string;\n}\n\n// All fields optional — great for PATCH\ntype ArticleUpdate = Partial<Article>;\n\n// Subset of fields\ntype ArticlePreview = Pick<Article, "id" | "title">;\n\n// Everything except sensitive fields\ntype PublicArticle = Omit<Article, "body">;`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `function updateArticle(id: number, patch: Partial<Article>): void {\n  console.log("Updating", id, patch);\n}\n\nupdateArticle(1, { title: "New headline" });`,
          language: "typescript",
          order: 4,
        },
        {
          type: "tip",
          content:
            'Combine utilities: Partial<Pick<User, "name" | "email">> for a profile edit form with only some fields editable.',
          order: 5,
        },
      ],
    },
    {
      title: "Record, Required & Readonly",
      slug: "record-required-readonly",
      metaDescription:
        "Use Record, Required, and Readonly utility types for maps and immutable data.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "Record, Required & Readonly", order: 1 },
        {
          type: "text",
          content:
            "Record builds object types with known keys. Required makes optional properties mandatory. Readonly prevents reassignment of properties.",
          order: 2,
        },
        {
          type: "code",
          content: `type Role = "admin" | "editor" | "viewer";\n\nconst permissions: Record<Role, string[]> = {\n  admin: ["read", "write", "delete"],\n  editor: ["read", "write"],\n  viewer: ["read"],\n};\n\ntype Config = Readonly<{\n  apiUrl: string;\n  timeout: number;\n}>;\n\nconst config: Config = {\n  apiUrl: "https://api.example.com",\n  timeout: 5000,\n};`,
          language: "typescript",
          order: 3,
        },
        {
          type: "note",
          content:
            "Readonly is shallow — nested objects can still be mutated unless you use deep readonly patterns or immutable libraries.",
          order: 4,
        },
      ],
    },
    {
      title: "Type Narrowing Basics",
      slug: "type-narrowing-basics",
      metaDescription:
        "Narrow union types with typeof, instanceof, in, and discriminated unions.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Type Narrowing Basics", order: 1 },
        {
          type: "text",
          content:
            "Narrowing refines a broad type to a specific type inside a conditional block. TypeScript tracks typeof checks, instanceof, in operators, and discriminant fields.",
          order: 2,
        },
        {
          type: "code",
          content: `function printId(id: string | number): void {\n  if (typeof id === "string") {\n    console.log(id.toUpperCase());\n  } else {\n    console.log(id.toFixed(0));\n  }\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `type ApiEvent =\n  | { kind: "success"; data: unknown }\n  | { kind: "error"; message: string };\n\nfunction handle(event: ApiEvent): void {\n  switch (event.kind) {\n    case "success":\n      console.log("Data:", event.data);\n      break;\n    case "error":\n      console.log("Error:", event.message);\n      break;\n  }\n}`,
          language: "typescript",
          order: 4,
        },
        {
          type: "tip",
          content:
            "Discriminated unions (shared literal field like kind or type) are the cleanest pattern for Redux actions, API results, and form state machines.",
          order: 5,
        },
      ],
    },
  ],

  "ts-modules": [
    {
      title: "ES Modules in TypeScript",
      slug: "es-modules-typescript",
      metaDescription:
        "Use import and export in TypeScript with ES modules for browser and Node.js projects.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "ES Modules in TypeScript", order: 1 },
        {
          type: "text",
          content:
            "TypeScript supports ES module syntax: import and export. The module setting in tsconfig.json controls the output format — ESNext for Vite, NodeNext for modern Node.js.",
          order: 2,
        },
        {
          type: "code",
          content: `// utils/format.ts\nexport function formatCurrency(amount: number): string {\n  return new Intl.NumberFormat("en-US", {\n    style: "currency",\n    currency: "USD",\n  }).format(amount);\n}\n\nexport default formatCurrency;`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `// app.ts\nimport formatCurrency, { formatCurrency as fmt } from "./utils/format.js";\n\nconsole.log(formatCurrency(42));`,
          language: "typescript",
          order: 4,
        },
        {
          type: "note",
          content:
            "With NodeNext resolution, include .js extensions in import paths even in .ts source files — they refer to the emitted JavaScript files.",
          order: 5,
        },
        {
          type: "tip",
          content:
            "Use export type { User } for type-only exports. This helps bundlers tree-shake and avoids runtime import errors.",
          order: 6,
        },
      ],
    },
    {
      title: "tsconfig.json Explained",
      slug: "tsconfig-explained",
      metaDescription:
        "Understand the most important tsconfig.json options for frontend and Node.js TypeScript projects.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "tsconfig.json Explained", order: 1 },
        {
          type: "text",
          content:
            "tsconfig.json tells the TypeScript compiler how to type-check and emit JavaScript. One config usually covers an entire project; monorepos may use project references.",
          order: 2,
        },
        {
          type: "code",
          content: `{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": ["ES2022", "DOM", "DOM.Iterable"],\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "jsx": "react-jsx",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true,\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "noEmit": true,\n    "baseUrl": ".",\n    "paths": {\n      "@/*": ["src/*"]\n    }\n  },\n  "include": ["src"],\n  "exclude": ["node_modules", "dist"]\n}`,
          language: "json",
          order: 3,
        },
        {
          type: "list",
          content: "Common presets by project type:",
          items: [
            "Vite + React: module ESNext, moduleResolution bundler, jsx react-jsx, noEmit true",
            "Node.js ESM: module NodeNext, moduleResolution NodeNext, outDir dist",
            "Library package: declaration true, declarationMap true for .d.ts output",
          ],
          order: 4,
        },
        {
          type: "warning",
          content:
            "Changing module or target after launch can break imports. Align tsconfig with your bundler or Node version from day one.",
          order: 5,
        },
      ],
    },
    {
      title: "Project Structure",
      slug: "project-structure",
      metaDescription:
        "Organize TypeScript web and Node.js projects with src, types, and barrel exports.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Project Structure", order: 1 },
        {
          type: "text",
          content:
            "A clear folder layout helps teams navigate TypeScript codebases. Keep source in src/, compiled output in dist/, and shared types close to the features that use them.",
          order: 2,
        },
        {
          type: "code",
          content: `my-app/\n├── src/\n│   ├── components/\n│   ├── hooks/\n│   ├── services/\n│   │   └── api.ts\n│   ├── types/\n│   │   └── user.ts\n│   ├── utils/\n│   └── main.ts\n├── public/\n├── tsconfig.json\n├── package.json\n└── vite.config.ts`,
          language: "bash",
          order: 3,
        },
        {
          type: "list",
          content: "Best practices:",
          items: [
            "Colocate component .tsx files with styles and tests",
            "Put shared interfaces in src/types or next to domain modules",
            "Use index.ts barrel files sparingly — they can slow builds",
            "Keep environment types in src/env.d.ts or vite-env.d.ts",
            "Never commit dist/ — add it to .gitignore",
          ],
          order: 4,
        },
        {
          type: "tip",
          content:
            "For Node.js APIs, split routes, controllers, and services — each folder exports typed functions consumed by Express or Fastify.",
          order: 5,
        },
      ],
    },
  ],

  "ts-with-javascript": [
    {
      title: "Gradual Adoption",
      slug: "gradual-adoption",
      metaDescription:
        "Migrate JavaScript projects to TypeScript incrementally without rewriting everything at once.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Gradual Adoption", order: 1 },
        {
          type: "text",
          content:
            "You do not need to convert an entire codebase overnight. TypeScript supports allowJs and checkJs so .js and .ts files coexist while you add types file by file.",
          order: 2,
        },
        {
          type: "code",
          content: `{\n  "compilerOptions": {\n    "allowJs": true,\n    "checkJs": false,\n    "strict": true,\n    "outDir": "dist"\n  },\n  "include": ["src/**/*"]\n}`,
          language: "json",
          order: 3,
        },
        {
          type: "list",
          content: "Recommended migration steps:",
          items: [
            "Add TypeScript and tsconfig.json with allowJs: true",
            "Rename leaf utilities from .js to .ts first",
            "Install @types packages for libraries (e.g. @types/express)",
            "Enable checkJs on critical folders once JSDoc types exist",
            "Turn on strict and fix errors module by module",
          ],
          order: 4,
        },
        {
          type: "tip",
          content:
            "Use // @ts-check at the top of a .js file to opt into type checking without renaming the file.",
          order: 5,
        },
      ],
    },
    {
      title: "Declaration Files (.d.ts)",
      slug: "declaration-files",
      metaDescription:
        "Write and consume .d.ts declaration files to type JavaScript libraries and globals.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Declaration Files (.d.ts)", order: 1 },
        {
          type: "text",
          content:
            "Declaration files describe the shape of JavaScript code without implementation. They power autocomplete for untyped npm packages and let you augment global objects.",
          order: 2,
        },
        {
          type: "code",
          content: `// types/legacy-widget.d.ts\ndeclare module "legacy-widget" {\n  export function init(selector: string): void;\n  export function destroy(): void;\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `// global augmentation\nexport {};\n\ndeclare global {\n  interface Window {\n    analytics: {\n      track(event: string, props?: Record<string, unknown>): void;\n    };\n  }\n}`,
          language: "typescript",
          order: 4,
        },
        {
          type: "note",
          content:
            "DefinitelyTyped publishes @types/* packages for popular libraries. Install them as devDependencies: npm i -D @types/node @types/react.",
          order: 5,
        },
        {
          type: "warning",
          content:
            "Do not hand-write .d.ts for libraries that already ship their own types — import from the package directly.",
          order: 6,
        },
      ],
    },
    {
      title: "Type Guards",
      slug: "type-guards",
      metaDescription:
        "Write custom type guards and use built-in narrowing for safe TypeScript code.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Type Guards", order: 1 },
        {
          type: "text",
          content:
            "A type guard is a function or expression that tells TypeScript a value is a specific type in a branch. User-defined guards use the value is Type return annotation.",
          order: 2,
        },
        {
          type: "code",
          content: `interface Cat {\n  type: "cat";\n  meow(): void;\n}\n\ninterface Dog {\n  type: "dog";\n  bark(): void;\n}\n\ntype Pet = Cat | Dog;\n\nfunction isDog(pet: Pet): pet is Dog {\n  return pet.type === "dog";\n}\n\nfunction speak(pet: Pet): void {\n  if (isDog(pet)) {\n    pet.bark();\n  } else {\n    pet.meow();\n  }\n}`,
          language: "typescript",
          order: 3,
        },
        {
          type: "code",
          content: `function isNonNull<T>(value: T | null | undefined): value is T {\n  return value !== null && value !== undefined;\n}\n\nconst maybeName: string | null = getName();\nif (isNonNull(maybeName)) {\n  console.log(maybeName.toUpperCase());\n}`,
          language: "typescript",
          order: 4,
        },
        {
          type: "tip",
          content:
            "Array.filter with a type guard removes nulls: arr.filter(isNonNull) gives a typed array without undefined elements.",
          order: 5,
        },
      ],
    },
  ],
};

// ─── EXAMPLES ────────────────────────────────────────────────────────────────
export const typescriptExamples: Record<
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
  "what-is-typescript": [
    {
      title: "Hello from TypeScript workflow",
      description:
        "Plain JavaScript output — what runs after TypeScript compiles away types.",
      code: `const appName = "DevDocs";\nconst version = 1;\n\nfunction banner(name, ver) {\n  console.log(\`\${name} v\${ver} — TypeScript compiles to this!\`);\n}\n\nbanner(appName, version);`,
      expectedOutput: `DevDocs v1 — TypeScript compiles to this!`,
      difficulty: "beginner",
      tags: ["basics", "output", "introduction"],
      order: 1,
    },
  ],
  "first-typescript-program": [
    {
      title: "Typed greeting function",
      description: "A minimal typed function — compile-time checks, runtime JS output.",
      code: `function greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("TypeScript"));`,
      expectedOutput: `Hello, TypeScript!`,
      difficulty: "beginner",
      tags: ["functions", "types", "basics"],
      order: 1,
    },
  ],
  "typescript-variables": [
    {
      title: "Typed variables",
      description: "Explicit string and number types on variables.",
      code: `let title: string = "Dashboard";\nconst maxRows: number = 100;\nlet active: boolean = true;\n\nconsole.log(title, maxRows, active);`,
      expectedOutput: `Dashboard 100 true`,
      difficulty: "beginner",
      tags: ["variables", "types"],
      order: 1,
    },
  ],
  "type-annotations": [
    {
      title: "Annotate function parameters",
      description: "Type parameters and return values for a price formatter.",
      code: `function formatPrice(amount: number, currency: string): string {\n  return \`\${currency}\${amount.toFixed(2)}\`;\n}\n\nconsole.log(formatPrice(9.5, "$"));`,
      expectedOutput: `$9.50`,
      difficulty: "beginner",
      tags: ["annotations", "functions"],
      order: 1,
    },
  ],
  "primitive-types": [
    {
      title: "String literal union",
      description: "Restrict a variable to specific string values.",
      code: `type Theme = "light" | "dark";\nconst theme: Theme = "dark";\nconsole.log("Theme:", theme);`,
      expectedOutput: `Theme: dark`,
      difficulty: "beginner",
      tags: ["primitives", "literals", "union"],
      order: 1,
    },
  ],
  "typed-functions": [
    {
      title: "Slugify with types",
      description: "A typed utility function for URL-friendly strings.",
      code: `function slugify(text: string): string {\n  return text.toLowerCase().trim().replace(/\\s+/g, "-");\n}\n\nconsole.log(slugify("Hello World"));`,
      expectedOutput: `hello-world`,
      difficulty: "beginner",
      tags: ["functions", "strings"],
      order: 1,
    },
  ],
  "optional-default-params": [
    {
      title: "Greet with default parameter",
      description: "Default parameter values work like JavaScript at runtime.",
      code: `function greet(name, greeting = "Hello") {\n  return \`\${greeting}, \${name}!\`;\n}\n\nconsole.log(greet("World"));\nconsole.log(greet("Ada", "Hi"));`,
      expectedOutput: `Hello, World!\nHi, Ada!`,
      difficulty: "beginner",
      tags: ["functions", "defaults", "parameters"],
      order: 1,
    },
  ],
  "typescript-classes": [
    {
      title: "Simple Counter class",
      description: "ES6 class compiled from TypeScript — runs as plain JavaScript.",
      code: `class Counter {\n  constructor() { this.value = 0; }\n  increment() { this.value++; return this.value; }\n}\n\nconst c = new Counter();\nconsole.log(c.increment());\nconsole.log(c.increment());`,
      expectedOutput: `1\n2`,
      difficulty: "beginner",
      tags: ["classes", "oop"],
      order: 1,
    },
  ],
  "generics-introduction": [
    {
      title: "Generic first element",
      description: "Preserve array element type with a generic function.",
      code: `function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconsole.log(first([10, 20, 30]));\nconsole.log(first(["a", "b"]));`,
      expectedOutput: `10\na`,
      difficulty: "intermediate",
      tags: ["generics", "arrays"],
      order: 1,
    },
  ],
  "partial-pick-omit": [
    {
      title: "Partial update object",
      description: "Use Partial to type a PATCH-style update payload.",
      code: `interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction patchUser(id: number, data: Partial<User>): void {\n  console.log("Patch", id, data);\n}\n\npatchUser(1, { name: "New Name" });`,
      expectedOutput: `Patch 1 { name: 'New Name' }`,
      difficulty: "intermediate",
      tags: ["utility-types", "partial"],
      order: 1,
    },
  ],
  "type-narrowing-basics": [
    {
      title: "typeof narrowing",
      description: "Narrow string | number with typeof checks.",
      code: `function printId(id: string | number): void {\n  if (typeof id === "string") {\n    console.log(id.toUpperCase());\n  } else {\n    console.log("ID:", id);\n  }\n}\n\nprintId("abc");\nprintId(42);`,
      expectedOutput: `ABC\nID: 42`,
      difficulty: "intermediate",
      tags: ["narrowing", "typeof", "union"],
      order: 1,
    },
  ],
  "es-modules-typescript": [
    {
      title: "Named exports pattern",
      description: "Module-style code illustrating export syntax (single-file demo).",
      code: `const taxRate = 0.08;\n\nfunction withTax(price: number): number {\n  return price * (1 + taxRate);\n}\n\nconsole.log("Price with tax:", withTax(100).toFixed(2));`,
      expectedOutput: `Price with tax: 108.00`,
      difficulty: "beginner",
      tags: ["modules", "functions"],
      order: 1,
    },
  ],
  "type-guards": [
    {
      title: "Custom type guard",
      description: "User-defined type guard with pet is Dog.",
      code: `function isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nfunction shout(input: unknown): void {\n  if (isString(input)) {\n    console.log(input.toUpperCase());\n  } else {\n    console.log("Not a string");\n  }\n}\n\nshout("hello");\nshout(42);`,
      expectedOutput: `HELLO\nNot a string`,
      difficulty: "intermediate",
      tags: ["type-guards", "narrowing"],
      order: 1,
    },
  ],
};

// ─── QUIZZES ─────────────────────────────────────────────────────────────────
export const typescriptQuizzes: Record<
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
  "what-is-typescript": {
    title: "What is TypeScript? Quiz",
    description: "Test your understanding of TypeScript fundamentals.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "TypeScript is:",
        options: [
          "A completely separate language that replaces JavaScript",
          "A typed superset of JavaScript that compiles to JavaScript",
          "A browser-only scripting language",
          "A database query language",
        ],
        correctOptionIndex: 1,
        explanation:
          "TypeScript extends JavaScript with types and compiles to plain JavaScript for execution.",
        order: 1,
      },
      {
        question: "Who developed TypeScript?",
        options: ["Google", "Mozilla", "Microsoft", "Apple"],
        correctOptionIndex: 2,
        explanation: "Microsoft created and maintains TypeScript.",
        order: 2,
      },
      {
        question: "TypeScript types exist:",
        options: [
          "At runtime in all browsers",
          "Only during development and compile time",
          "Only in .d.ts files at runtime",
          "In the JavaScript VM permanently",
        ],
        correctOptionIndex: 1,
        explanation: "Types are erased when TypeScript compiles to JavaScript.",
        order: 3,
      },
      {
        question: "TypeScript code can run in Node.js because:",
        options: [
          "Node.js has a built-in TypeScript interpreter",
          "It is compiled to JavaScript first",
          "Types are required at runtime",
          "Node.js only accepts .ts files",
        ],
        correctOptionIndex: 1,
        explanation: "Node.js runs the compiled JavaScript output, not .ts source directly.",
        order: 4,
      },
    ],
  },
  "typescript-vs-javascript": {
    title: "TypeScript vs JavaScript Quiz",
    description: "Compare TypeScript and JavaScript behavior and tooling.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Valid JavaScript is generally:",
        options: [
          "Invalid TypeScript",
          "Valid TypeScript with possible type errors",
          "Only valid if written in strict mode",
          "Required to use classes",
        ],
        correctOptionIndex: 1,
        explanation: "JS is valid TS syntax; TypeScript may still report type issues under strict settings.",
        order: 1,
      },
      {
        question: "A main benefit of TypeScript over JavaScript is:",
        options: [
          "Faster runtime execution in all browsers",
          "Compile-time error detection",
          "No build step required",
          "Smaller bundle size always",
        ],
        correctOptionIndex: 1,
        explanation: "TypeScript catches many bugs before code runs.",
        order: 2,
      },
      {
        question: "TypeScript file extension for React components is:",
        options: [".jsx", ".tsx", ".tsreact", ".typescript"],
        correctOptionIndex: 1,
        explanation: ".tsx allows JSX syntax inside TypeScript files.",
        order: 3,
      },
    ],
  },
  "type-annotations": {
    title: "Type Annotations Quiz",
    description: "Check your knowledge of explicit TypeScript type annotations.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Correct syntax for a string variable annotation is:",
        options: [
          "string name = 'Ada';",
          "let name: string = 'Ada';",
          "let name = string('Ada');",
          "string let name = 'Ada';",
        ],
        correctOptionIndex: 1,
        explanation: "Type annotations use name: Type after the variable name.",
        order: 1,
      },
      {
        question: "A function returning nothing should use return type:",
        options: ["null", "undefined", "void", "never"],
        correctOptionIndex: 2,
        explanation: "void indicates the function does not return a meaningful value.",
        order: 2,
      },
      {
        question: "string[] means:",
        options: [
          "An array of characters only",
          "An array of strings",
          "A string that contains brackets",
          "Optional string",
        ],
        correctOptionIndex: 1,
        explanation: "string[] is array syntax for a list of strings.",
        order: 3,
      },
      {
        question: "When are explicit annotations most valuable?",
        options: [
          "On every local variable always",
          "On function parameters and public APIs",
          "Never — inference replaces them",
          "Only in .js files",
        ],
        correctOptionIndex: 1,
        explanation: "Annotate boundaries; let inference handle obvious locals.",
        order: 4,
      },
    ],
  },
  "any-unknown-never": {
    title: "any, unknown & never Quiz",
    description: "Understand safe and unsafe top types in TypeScript.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Which type disables type checking?",
        options: ["unknown", "never", "any", "void"],
        correctOptionIndex: 2,
        explanation: "any opts out of checking — use sparingly.",
        order: 1,
      },
      {
        question: "Before using an unknown value you must:",
        options: [
          "Cast it to any immediately",
          "Narrow or assert its type",
          "Convert it to never",
          "Store it in global scope",
        ],
        correctOptionIndex: 1,
        explanation: "unknown forces you to validate before use — safer than any.",
        order: 2,
      },
      {
        question: "never is used for functions that:",
        options: [
          "Return undefined",
          "Always throw or never return",
          "Accept any argument",
          "Have optional parameters",
        ],
        correctOptionIndex: 1,
        explanation: "never represents unreachable code paths like throw or infinite loops.",
        order: 3,
      },
    ],
  },
  "typescript-interfaces": {
    title: "Interfaces Quiz",
    description: "Test your knowledge of TypeScript interfaces.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Optional properties in interfaces use:",
        options: ["! suffix", "? suffix", "* prefix", "optional keyword"],
        correctOptionIndex: 1,
        explanation: "property?: Type marks a property as optional.",
        order: 1,
      },
      {
        question: "interface Admin extends User means:",
        options: [
          "Admin replaces User entirely",
          "Admin includes all User properties plus its own",
          "User inherits from Admin",
          "They must be identical",
        ],
        correctOptionIndex: 1,
        explanation: "extends copies the base interface shape into the derived interface.",
        order: 2,
      },
      {
        question: "Interfaces are best suited for:",
        options: [
          "Union of string literals only",
          "Describing object shapes and contracts",
          "Runtime encryption",
          "Replacing npm packages",
        ],
        correctOptionIndex: 1,
        explanation: "Interfaces define object structures — props, API models, services.",
        order: 3,
      },
      {
        question: "Declaration merging applies to:",
        options: ["type aliases only", "interfaces", "enums only", "never types"],
        correctOptionIndex: 1,
        explanation: "Multiple interface declarations with the same name merge together.",
        order: 4,
      },
    ],
  },
  "generics-introduction": {
    title: "Generics Quiz",
    description: "Quiz on TypeScript generic type parameters.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Generics allow functions to:",
        options: [
          "Run faster at runtime",
          "Work with multiple types while keeping type safety",
          "Avoid using interfaces",
          "Skip compilation",
        ],
        correctOptionIndex: 1,
        explanation: "Generics preserve type information across reusable code.",
        order: 1,
      },
      {
        question: "function identity<T>(arg: T): T uses T as:",
        options: [
          "A runtime variable",
          "A type parameter placeholder",
          "A namespace",
          "A JavaScript class",
        ],
        correctOptionIndex: 1,
        explanation: "T is a type parameter filled in when the function is called.",
        order: 2,
      },
      {
        question: "firstElement<number>([1,2]) returns type:",
        options: ["number[]", "number | undefined", "any", "unknown"],
        correctOptionIndex: 1,
        explanation: "Returning arr[0] from T[] yields T | undefined.",
        order: 3,
      },
    ],
  },
  "partial-pick-omit": {
    title: "Utility Types Quiz",
    description: "Partial, Pick, and Omit transformations.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Partial<T> makes all properties:",
        options: ["Readonly", "Required", "Optional", "Deleted"],
        correctOptionIndex: 2,
        explanation: "Partial marks every property in T as optional.",
        order: 1,
      },
      {
        question: "Pick<User, 'id' | 'name'> produces:",
        options: [
          "User without id and name",
          "Only id and name from User",
          "A new runtime class",
          "An array of keys",
        ],
        correctOptionIndex: 1,
        explanation: "Pick selects a subset of properties from a type.",
        order: 2,
      },
      {
        question: "Omit is useful when you want to:",
        options: [
          "Add new properties only",
          "Exclude specific properties from a type",
          "Convert types to any",
          "Merge two interfaces at runtime",
        ],
        correctOptionIndex: 1,
        explanation: "Omit removes listed keys — handy for hiding sensitive fields.",
        order: 3,
      },
      {
        question: "Partial<Article> is ideal for:",
        options: [
          "Creating a full Article from scratch",
          "PATCH/update payloads with only changed fields",
          "Runtime validation only",
          "Deleting articles",
        ],
        correctOptionIndex: 1,
        explanation: "Updates often send only some fields — Partial models that.",
        order: 4,
      },
    ],
  },
  "tsconfig-explained": {
    title: "tsconfig.json Quiz",
    description: "Key compiler options for TypeScript projects.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "strict: true enables:",
        options: [
          "Faster downloads from npm",
          "A set of strict type-checking options",
          "Automatic deployment",
          "JSX in .js files only",
        ],
        correctOptionIndex: 1,
        explanation: "strict turns on strictNullChecks, noImplicitAny, and related flags.",
        order: 1,
      },
      {
        question: "noEmit: true means:",
        options: [
          "TypeScript will not emit JavaScript files",
          "The project has no types",
          "Node.js cannot run the code",
          "Imports are disabled",
        ],
        correctOptionIndex: 0,
        explanation: "Common in Vite projects where the bundler handles transpilation.",
        order: 2,
      },
      {
        question: "moduleResolution: bundler is used with:",
        options: [
          "Legacy Node CommonJS only",
          "Modern bundlers like Vite",
          "SQL databases",
          "CSS modules only",
        ],
        correctOptionIndex: 1,
        explanation: "bundler resolution matches how Vite and similar tools resolve imports.",
        order: 3,
      },
    ],
  },
  "type-guards": {
    title: "Type Guards Quiz",
    description: "Custom and built-in type narrowing in TypeScript.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "A user-defined type guard return type looks like:",
        options: ["boolean", "value is Type", "Type | null", "unknown"],
        correctOptionIndex: 1,
        explanation: "pet is Dog tells TypeScript the narrowing in true branches.",
        order: 1,
      },
      {
        question: "typeof x === 'string' is a:",
        options: [
          "Runtime-only check with no TS effect",
          "Built-in type guard",
          "Generic constraint",
          "Module import",
        ],
        correctOptionIndex: 1,
        explanation: "typeof checks narrow primitives in conditional blocks.",
        order: 2,
      },
      {
        question: "Discriminated unions use:",
        options: [
          "A shared literal field to distinguish variants",
          "Only any types",
          "Runtime reflection",
          "Global variables",
        ],
        correctOptionIndex: 0,
        explanation: "A common field like kind or type enables exhaustive switch narrowing.",
        order: 3,
      },
      {
        question: "After if (isDog(pet)), pet is typed as:",
        options: ["Cat", "Dog", "any", "unknown"],
        correctOptionIndex: 1,
        explanation: "The type guard narrows the union to Dog inside the if block.",
        order: 4,
      },
    ],
  },
};
