import { Types } from "mongoose";

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

// ─── SECTIONS ────────────────────────────────────────────────────────────────
// Sections are grouped by topic slug for easy mapping
export const javascriptSections: Record<string, Array<{
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
}>> = {
  "js-introduction": [
    {
      title: "What is JavaScript?",
      slug: "what-is-javascript",
      metaDescription: "Learn what JavaScript is, its history, and why it is essential for web development.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 4,
      contentBlocks: [
        {
          type: "heading",
          content: "What is JavaScript?",
          order: 1,
        },
        {
          type: "text",
          content:
            "JavaScript is the world's most popular programming language. It is the programming language of the Web. JavaScript is easy to learn. This tutorial will teach you JavaScript from basic to advanced.",
          order: 2,
        },
        {
          type: "note",
          content:
            "JavaScript and Java are completely different languages, both in concept and design. JavaScript was invented by Brendan Eich in 1995, and became an ECMA standard in 1997.",
          order: 3,
        },
        {
          type: "heading",
          content: "Why Study JavaScript?",
          order: 4,
        },
        {
          type: "list",
          content: "JavaScript is used for:",
          items: [
            "Changing HTML content dynamically",
            "Validating user input in forms",
            "Creating animations and visual effects",
            "Building web applications (React, Vue, Angular)",
            "Server-side programming with Node.js",
            "Building mobile apps with React Native",
            "Building desktop apps with Electron",
          ],
          order: 5,
        },
        {
          type: "code",
          content: `// Your first JavaScript program\nconsole.log("Hello, World!");\n\n// JavaScript in HTML\ndocument.getElementById("demo").innerHTML = "Hello JavaScript!";`,
          language: "javascript",
          order: 6,
        },
        {
          type: "tip",
          content: "JavaScript programs can be written directly in an HTML file using the <script> tag, or in a separate .js file that is linked to the HTML.",
          order: 7,
        },
      ],
    },
    {
      title: "JavaScript Where To",
      slug: "javascript-where-to",
      metaDescription: "Learn how and where to add JavaScript to your HTML pages — inline, internal, and external.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        {
          type: "heading",
          content: "The <script> Tag",
          order: 1,
        },
        {
          type: "text",
          content:
            "In HTML, JavaScript code is inserted between <script> and </script> tags. You can place any number of scripts in an HTML document, both in the <head> and in the <body> section.",
          order: 2,
        },
        {
          type: "code",
          content: `<!DOCTYPE html>\n<html>\n<body>\n\n<h2>My First JavaScript</h2>\n\n<button type="button"\n  onclick="document.getElementById('demo').innerHTML = Date()">Click me!</button>\n\n<p id="demo"></p>\n\n</body>\n</html>`,
          language: "html",
          order: 3,
        },
        {
          type: "heading",
          content: "External JavaScript",
          order: 4,
        },
        {
          type: "text",
          content:
            "Scripts can also be placed in external files. External scripts are practical when the same code is used in many different web pages. Place the script in an external file and refer to it with the src attribute.",
          order: 5,
        },
        {
          type: "code",
          content: `<!-- In your HTML file -->\n<script src="myScript.js"></script>\n\n<!-- Best practice: place scripts at bottom of body -->\n<body>\n  <!-- HTML content here -->\n  <script src="myScript.js"></script>\n</body>`,
          language: "html",
          order: 6,
        },
        {
          type: "warning",
          content: "Placing scripts at the bottom of the <body> element improves display speed because script interpretation slows down the display.",
          order: 7,
        },
      ],
    },
  ],

  "js-basics": [
    {
      title: "JavaScript Variables",
      slug: "javascript-variables",
      metaDescription: "Learn about JavaScript variables — var, let, and const — and when to use each one.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        {
          type: "heading",
          content: "JavaScript Variables",
          order: 1,
        },
        {
          type: "text",
          content:
            "Variables are containers for storing data (values). In JavaScript, there are 3 ways to declare a variable: var, let, and const. Each has different scoping rules and use cases.",
          order: 2,
        },
        {
          type: "code",
          content: `// Using var (old way — function-scoped)\nvar name = "John";\n\n// Using let (block-scoped, can be reassigned)\nlet age = 25;\nage = 26; // ✅ OK\n\n// Using const (block-scoped, cannot be reassigned)\nconst PI = 3.14159;\n// PI = 3; // ❌ TypeError\n\nconsole.log(name, age, PI); // John 26 3.14159`,
          language: "javascript",
          order: 3,
        },
        {
          type: "heading",
          content: "var vs let vs const",
          order: 4,
        },
        {
          type: "list",
          content: "Key differences:",
          items: [
            "var is function-scoped; let and const are block-scoped",
            "var variables are hoisted and initialized as undefined; let and const are hoisted but not initialized",
            "const must be initialized at declaration and cannot be reassigned",
            "Use const by default, let when you need to reassign, avoid var in modern code",
          ],
          order: 5,
        },
        {
          type: "code",
          content: `// Block scoping example\n{\n  var x = 10;  // accessible outside block\n  let y = 20;  // NOT accessible outside block\n  const z = 30; // NOT accessible outside block\n}\n\nconsole.log(x); // 10\n// console.log(y); // ❌ ReferenceError\n// console.log(z); // ❌ ReferenceError`,
          language: "javascript",
          order: 6,
        },
        {
          type: "tip",
          content: "Always prefer const. Use let only when the variable value needs to change. Avoid var in modern JavaScript.",
          order: 7,
        },
      ],
    },
    {
      title: "JavaScript Data Types",
      slug: "javascript-data-types",
      metaDescription: "Explore JavaScript's primitive and reference data types including strings, numbers, booleans, null, undefined, and objects.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        {
          type: "heading",
          content: "JavaScript Data Types",
          order: 1,
        },
        {
          type: "text",
          content:
            "JavaScript has 8 data types: String, Number, BigInt, Boolean, Undefined, Null, Symbol, and Object. The first 7 are primitive data types. Object is a complex data type.",
          order: 2,
        },
        {
          type: "code",
          content: `// String\nlet firstName = "John";       // double quotes\nlet lastName  = 'Doe';        // single quotes\nlet greeting  = \`Hello \${firstName}\`; // template literal\n\n// Number\nlet integer = 42;\nlet float   = 3.14;\nlet negative = -10;\n\n// Boolean\nlet isLoggedIn = true;\nlet hasError   = false;\n\n// Undefined — declared but not assigned\nlet score;\nconsole.log(score); // undefined\n\n// Null — intentional absence of value\nlet selectedUser = null;\n\n// Object\nlet person = { name: "John", age: 30 };\n\n// Array (type of Object)\nlet colors = ["red", "green", "blue"];\n\n// BigInt\nlet bigNumber = 9007199254740991n;\n\n// typeof operator\nconsole.log(typeof firstName);    // "string"\nconsole.log(typeof integer);      // "number"\nconsole.log(typeof isLoggedIn);   // "boolean"\nconsole.log(typeof selectedUser); // "object" (quirk of JS)\nconsole.log(typeof score);        // "undefined"`,
          language: "javascript",
          order: 3,
        },
        {
          type: "warning",
          content: 'typeof null returns "object" — this is a well-known bug in JavaScript that has been kept for backward compatibility. null is NOT an object.',
          order: 4,
        },
        {
          type: "heading",
          content: "Type Coercion",
          order: 5,
        },
        {
          type: "code",
          content: `// JavaScript automatically converts types (type coercion)\nconsole.log("5" + 3);    // "53" (string concatenation)\nconsole.log("5" - 3);    // 2   (numeric subtraction)\nconsole.log(true + 1);   // 2\nconsole.log(false + 1);  // 1\nconsole.log("" == false); // true (loose equality)\nconsole.log("" === false); // false (strict equality — ALWAYS use this)\n\n// Explicit conversion\nconst num = Number("42");     // 42\nconst str = String(42);       // "42"\nconst bool = Boolean(0);      // false`,
          language: "javascript",
          order: 6,
        },
      ],
    },
    {
      title: "JavaScript Operators",
      slug: "javascript-operators",
      metaDescription: "Master JavaScript operators: arithmetic, comparison, logical, assignment, and more.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JavaScript Operators", order: 1 },
        {
          type: "text",
          content: "JavaScript operators are used to perform operations on variables and values. There are several categories of operators.",
          order: 2,
        },
        {
          type: "code",
          content: `// ── Arithmetic Operators ──────────────────────\nlet a = 10, b = 3;\nconsole.log(a + b);  // 13  (addition)\nconsole.log(a - b);  // 7   (subtraction)\nconsole.log(a * b);  // 30  (multiplication)\nconsole.log(a / b);  // 3.33 (division)\nconsole.log(a % b);  // 1   (modulus/remainder)\nconsole.log(a ** b); // 1000 (exponentiation)\nconsole.log(++a);    // 11  (pre-increment)\nconsole.log(b--);    // 3   (post-decrement, b becomes 2)\n\n// ── Comparison Operators ───────────────────────\nconsole.log(5 == "5");   // true  (loose — converts types)\nconsole.log(5 === "5");  // false (strict — no conversion)\nconsole.log(5 !== 6);    // true\nconsole.log(10 > 5);     // true\nconsole.log(10 >= 10);   // true\n\n// ── Logical Operators ──────────────────────────\nconsole.log(true && false); // false (AND)\nconsole.log(true || false); // true  (OR)\nconsole.log(!true);         // false (NOT)\n\n// ── Assignment Operators ───────────────────────\nlet x = 10;\nx += 5;  // x = x + 5 → 15\nx -= 3;  // x = x - 3 → 12\nx *= 2;  // x = x * 2 → 24\nx /= 4;  // x = x / 4 → 6\n\n// ── Nullish Coalescing (??) ────────────────────\nconst username = null ?? "Guest"; // "Guest"\nconst count = 0 ?? 10;           // 0 (0 is not null/undefined)\n\n// ── Optional Chaining (?.) ─────────────────────\nconst user = { profile: { name: "John" } };\nconsole.log(user?.profile?.name);   // "John"\nconsole.log(user?.address?.city);   // undefined (no error!)`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content: "Always use === (strict equality) instead of == (loose equality) to avoid unexpected type coercion bugs.",
          order: 4,
        },
      ],
    },
  ],

  "js-control-flow": [
    {
      title: "if, else, else if",
      slug: "if-else",
      metaDescription: "Learn how to use JavaScript if, else, and else if statements to control program flow.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        { type: "heading", content: "JavaScript if...else Statements", order: 1 },
        {
          type: "text",
          content: "Conditional statements are used to perform different actions based on different conditions. JavaScript supports if, else if, else, and switch statements.",
          order: 2,
        },
        {
          type: "code",
          content: `const hour = new Date().getHours();\nlet greeting;\n\nif (hour < 12) {\n  greeting = "Good Morning!";\n} else if (hour < 18) {\n  greeting = "Good Afternoon!";\n} else {\n  greeting = "Good Evening!";\n}\n\nconsole.log(greeting);\n\n// Ternary operator (shorthand if-else)\nconst age = 20;\nconst canVote = age >= 18 ? "Yes, can vote" : "No, too young";\nconsole.log(canVote); // "Yes, can vote"`,
          language: "javascript",
          order: 3,
        },
      ],
    },
    {
      title: "JavaScript Loops",
      slug: "javascript-loops",
      metaDescription: "Master for, while, do-while, for...of, and for...in loops in JavaScript.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Loops", order: 1 },
        {
          type: "text",
          content: "Loops execute a block of code a number of times. JavaScript has five types of loops: for, while, do-while, for...in, and for...of.",
          order: 2,
        },
        {
          type: "code",
          content: `// ── for loop ──────────────────────────────────\nfor (let i = 0; i < 5; i++) {\n  console.log("Count:", i); // 0, 1, 2, 3, 4\n}\n\n// ── while loop ────────────────────────────────\nlet count = 0;\nwhile (count < 3) {\n  console.log("While:", count);\n  count++;\n}\n\n// ── do...while loop ───────────────────────────\nlet x = 0;\ndo {\n  console.log("Do while:", x); // runs at least once\n  x++;\n} while (x < 3);\n\n// ── for...of (iterates over values) ───────────\nconst fruits = ["apple", "banana", "cherry"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n\n// ── for...in (iterates over object keys) ──────\nconst car = { brand: "Toyota", model: "Corolla", year: 2022 };\nfor (const key in car) {\n  console.log(\`\${key}: \${car[key]}\`);\n}\n\n// ── break and continue ─────────────────────────\nfor (let i = 0; i < 10; i++) {\n  if (i === 3) continue; // skip 3\n  if (i === 6) break;    // stop at 6\n  console.log(i); // 0, 1, 2, 4, 5\n}`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content: "Use for...of to iterate arrays and strings. Use for...in to iterate object keys. Avoid for...in on arrays.",
          order: 4,
        },
      ],
    },
  ],

  "js-functions": [
    {
      title: "JavaScript Functions",
      slug: "javascript-functions",
      metaDescription: "Learn how to declare and call functions in JavaScript using function declarations, expressions, and arrow functions.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Functions", order: 1 },
        {
          type: "text",
          content: "A JavaScript function is a block of code designed to perform a particular task. A function is executed when something invokes it (calls it). Functions allow code reuse — define once, use many times.",
          order: 2,
        },
        {
          type: "code",
          content: `// ── Function Declaration ─────────────────────\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet("Alice")); // Hello, Alice!\n\n// ── Function Expression ───────────────────────\nconst add = function(a, b) {\n  return a + b;\n};\nconsole.log(add(2, 3)); // 5\n\n// ── Arrow Function (ES6) ──────────────────────\nconst multiply = (a, b) => a * b;\nconsole.log(multiply(4, 5)); // 20\n\n// Arrow function with body\nconst divide = (a, b) => {\n  if (b === 0) return "Cannot divide by zero";\n  return a / b;\n};\n\n// ── Default Parameters ────────────────────────\nfunction power(base, exponent = 2) {\n  return base ** exponent;\n}\nconsole.log(power(3));    // 9  (exponent defaults to 2)\nconsole.log(power(3, 3)); // 27\n\n// ── Rest Parameters ───────────────────────────\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sum(1, 2, 3, 4, 5)); // 15`,
          language: "javascript",
          order: 3,
        },
        { type: "heading", content: "Closures", order: 4 },
        {
          type: "text",
          content: "A closure is a function that has access to its outer function's variables even after the outer function has returned. Closures are a powerful feature of JavaScript.",
          order: 5,
        },
        {
          type: "code",
          content: `function makeCounter() {\n  let count = 0; // private variable\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3\n// count cannot be accessed from outside!`,
          language: "javascript",
          order: 6,
        },
      ],
    },
  ],

  "js-objects-arrays": [
    {
      title: "JavaScript Objects",
      slug: "javascript-objects",
      metaDescription: "Learn how to create and work with JavaScript objects, properties, methods, and destructuring.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "JavaScript Objects", order: 1 },
        {
          type: "text",
          content: "Objects are variables that can contain many values. A JavaScript object is a collection of named values called properties. Objects are written with curly braces.",
          order: 2,
        },
        {
          type: "code",
          content: `// ── Creating Objects ─────────────────────────\nconst person = {\n  firstName: "John",\n  lastName: "Doe",\n  age: 30,\n  isEmployed: true,\n  address: {\n    city: "New York",\n    country: "USA"\n  },\n  // Method (function as property)\n  getFullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  }\n};\n\n// Accessing properties\nconsole.log(person.firstName);        // "John" (dot notation)\nconsole.log(person["lastName"]);      // "Doe"  (bracket notation)\nconsole.log(person.address.city);     // "New York" (nested)\nconsole.log(person.getFullName());    // "John Doe"\n\n// Adding / modifying properties\nperson.email = "john@example.com";   // add\nperson.age = 31;                      // modify\ndelete person.isEmployed;             // delete\n\n// ── Object Destructuring ─────────────────────\nconst { firstName, lastName, age } = person;\nconsole.log(firstName, lastName, age); // John Doe 31\n\n// With rename\nconst { firstName: fName, age: years } = person;\nconsole.log(fName, years); // John 31\n\n// With default value\nconst { phone = "N/A" } = person;\nconsole.log(phone); // "N/A"\n\n// ── Spread Operator ──────────────────────────\nconst updatedPerson = { ...person, age: 32, city: "Boston" };\nconsole.log(updatedPerson.age); // 32\n\n// ── Object Methods ───────────────────────────\nconsole.log(Object.keys(person));    // array of keys\nconsole.log(Object.values(person));  // array of values\nconsole.log(Object.entries(person)); // array of [key, value] pairs`,
          language: "javascript",
          order: 3,
        },
      ],
    },
    {
      title: "JavaScript Arrays",
      slug: "javascript-arrays",
      metaDescription: "Master JavaScript arrays — creation, methods, iteration, and array destructuring.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 10,
      contentBlocks: [
        { type: "heading", content: "JavaScript Arrays", order: 1 },
        {
          type: "text",
          content: "An array is a special variable that can hold more than one value. Arrays are zero-indexed and can hold mixed types. JavaScript arrays come with many powerful built-in methods.",
          order: 2,
        },
        {
          type: "code",
          content: `// ── Creating Arrays ──────────────────────────\nconst fruits = ["apple", "banana", "cherry"];\nconst mixed  = [1, "hello", true, null, { x: 1 }];\n\n// Accessing elements\nconsole.log(fruits[0]);           // "apple"\nconsole.log(fruits[fruits.length - 1]); // "cherry" (last)\n\n// ── Adding / Removing ────────────────────────\nfruits.push("date");          // add to end\nfruits.unshift("avocado");    // add to start\nfruits.pop();                  // remove from end\nfruits.shift();                // remove from start\nfruits.splice(1, 1);          // remove 1 item at index 1\n\n// ── Searching ────────────────────────────────\nconsole.log(fruits.includes("banana")); // true\nconsole.log(fruits.indexOf("cherry")); // index or -1\nconsole.log(fruits.find(f => f.startsWith("b"))); // "banana"\nconsole.log(fruits.findIndex(f => f === "cherry")); // index\n\n// ── Transformation Methods ───────────────────\nconst numbers = [1, 2, 3, 4, 5];\n\n// map — transform each element\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// filter — keep elements that pass the test\nconst evens = numbers.filter(n => n % 2 === 0);\nconsole.log(evens); // [2, 4]\n\n// reduce — reduce to single value\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\nconsole.log(sum); // 15\n\n// forEach — loop without return\nnumbers.forEach(n => console.log(n));\n\n// flat & flatMap\nconst nested = [1, [2, 3], [4, [5]]];\nconsole.log(nested.flat());    // [1, 2, 3, 4, [5]]\nconsole.log(nested.flat(2));   // [1, 2, 3, 4, 5]\n\n// ── Array Destructuring ───────────────────────\nconst [first, second, ...rest] = numbers;\nconsole.log(first);  // 1\nconsole.log(second); // 2\nconsole.log(rest);   // [3, 4, 5]\n\n// ── Spread ───────────────────────────────────\nconst combined = [...fruits, ...numbers];\nconst copy     = [...fruits]; // shallow copy`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content: "map, filter, and reduce do not mutate the original array — they return new arrays. This is the functional programming style preferred in modern JavaScript.",
          order: 4,
        },
      ],
    },
  ],

  "js-async": [
    {
      title: "Callbacks",
      slug: "callbacks",
      metaDescription: "Understand JavaScript callbacks and the callback pattern for handling asynchronous code.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JavaScript Callbacks", order: 1 },
        {
          type: "text",
          content: "A callback is a function passed as an argument to another function. This allows a function to call another function after an operation is complete — essential for asynchronous code.",
          order: 2,
        },
        {
          type: "code",
          content: `// Basic callback\nfunction greetUser(name, callback) {\n  console.log("Hello, " + name);\n  callback();\n}\n\ngreetUser("Alice", () => {\n  console.log("Callback executed!");\n});\n\n// Async callback with setTimeout\nconsole.log("Start");\nsetTimeout(() => {\n  console.log("This runs after 2 seconds");\n}, 2000);\nconsole.log("End"); // runs before the timeout!\n\n// Output:\n// Start\n// End\n// This runs after 2 seconds\n\n// Callback Hell (problem)\ngetUser(userId, (user) => {\n  getPosts(user.id, (posts) => {\n    getComments(posts[0].id, (comments) => {\n      // Deeply nested... hard to read and maintain\n    });\n  });\n});`,
          language: "javascript",
          order: 3,
        },
        {
          type: "warning",
          content: "Deeply nested callbacks create \"Callback Hell\" — hard to read and maintain. Use Promises or async/await instead for complex async operations.",
          order: 4,
        },
      ],
    },
    {
      title: "Promises",
      slug: "promises",
      metaDescription: "Learn how JavaScript Promises work for handling asynchronous operations cleanly.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Promises", order: 1 },
        {
          type: "text",
          content: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It solves callback hell with cleaner chaining.",
          order: 2,
        },
        {
          type: "code",
          content: `// Creating a Promise\nconst fetchData = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve({ id: 1, name: "John" }); // success\n  } else {\n    reject(new Error("Failed to fetch data")); // failure\n  }\n});\n\n// Consuming a Promise\nfetchData\n  .then(data => {\n    console.log("Data:", data); // { id: 1, name: "John" }\n    return data.name;\n  })\n  .then(name => console.log("Name:", name)) // chaining\n  .catch(err => console.error("Error:", err.message))\n  .finally(() => console.log("Done")); // always runs\n\n// Promise.all — run multiple promises in parallel\nconst p1 = Promise.resolve("Result 1");\nconst p2 = Promise.resolve("Result 2");\nconst p3 = Promise.resolve("Result 3");\n\nPromise.all([p1, p2, p3]).then(results => {\n  console.log(results); // ["Result 1", "Result 2", "Result 3"]\n});\n\n// Promise.race — resolves/rejects with the first settled\nPromise.race([p1, p2, p3]).then(first => {\n  console.log("First:", first); // "Result 1"\n});`,
          language: "javascript",
          order: 3,
        },
      ],
    },
    {
      title: "Async / Await",
      slug: "async-await",
      metaDescription: "Master async/await — the modern, readable way to write asynchronous JavaScript.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Async / Await", order: 1 },
        {
          type: "text",
          content: "async/await is syntactic sugar built on top of Promises. It makes asynchronous code look and behave like synchronous code, making it much easier to read and write.",
          order: 2,
        },
        {
          type: "code",
          content: `// async function always returns a Promise\nasync function fetchUser(id) {\n  // await pauses execution until the Promise resolves\n  const response = await fetch(\`https://api.example.com/users/\${id}\`);\n  const user = await response.json();\n  return user;\n}\n\n// Using async/await with try-catch for error handling\nasync function loadData() {\n  try {\n    console.log("Fetching...");\n    const user = await fetchUser(1);\n    console.log("User:", user);\n\n    const posts = await fetchPosts(user.id);\n    console.log("Posts:", posts);\n  } catch (error) {\n    console.error("Error:", error.message);\n  } finally {\n    console.log("Loading complete");\n  }\n}\n\nloadData();\n\n// Parallel execution with async/await\nasync function loadAll() {\n  // ❌ Sequential (slow) — one after another\n  const user  = await fetchUser(1);\n  const posts = await fetchPosts(1);\n\n  // ✅ Parallel (fast) — both at the same time\n  const [user2, posts2] = await Promise.all([\n    fetchUser(1),\n    fetchPosts(1)\n  ]);\n}`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content: "When multiple async operations don't depend on each other, use Promise.all() to run them in parallel instead of awaiting them one by one — it's much faster.",
          order: 4,
        },
      ],
    },
  ],
};

// ─── EXAMPLES ────────────────────────────────────────────────────────────────
export const javascriptExamples: Record<string, Array<{
  title: string;
  description: string;
  code: string;
  expectedOutput: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  order: number;
}>> = {
  "what-is-javascript": [
    {
      title: "Hello World",
      description: "The classic first program — output text to the console.",
      code: `console.log("Hello, World!");\nconsole.log("Welcome to JavaScript!");`,
      expectedOutput: `Hello, World!\nWelcome to JavaScript!`,
      difficulty: "beginner",
      tags: ["console", "output", "basics"],
      order: 1,
    },
  ],
  "javascript-variables": [
    {
      title: "Declaring Variables",
      description: "Demonstrating var, let, and const.",
      code: `const PI = 3.14159;\nlet radius = 5;\nlet area = PI * radius * radius;\nconsole.log("Area:", area.toFixed(2));`,
      expectedOutput: `Area: 78.54`,
      difficulty: "beginner",
      tags: ["variables", "const", "let"],
      order: 1,
    },
  ],
  "javascript-arrays": [
    {
      title: "Array methods chaining",
      description: "Chaining map, filter, and reduce together.",
      code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst result = numbers\n  .filter(n => n % 2 === 0)   // keep evens: [2,4,6,8,10]\n  .map(n => n * n)            // square them: [4,16,36,64,100]\n  .reduce((sum, n) => sum + n, 0); // sum: 220\n\nconsole.log(result); // 220`,
      expectedOutput: `220`,
      difficulty: "intermediate",
      tags: ["arrays", "map", "filter", "reduce", "chaining"],
      order: 1,
    },
  ],
  "async-await": [
    {
      title: "Fetch API with async/await",
      description: "Fetching data from a public API using async/await.",
      code: `async function getUser() {\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\n    const user = await res.json();\n    console.log("Name:", user.name);\n    console.log("Email:", user.email);\n    console.log("City:", user.address.city);\n  } catch (err) {\n    console.error("Failed:", err.message);\n  }\n}\n\ngetUser();`,
      expectedOutput: `Name: Leanne Graham\nEmail: Sincere@april.biz\nCity: Gwenborough`,
      difficulty: "intermediate",
      tags: ["fetch", "async", "await", "api"],
      order: 1,
    },
  ],
};

// ─── QUIZZES ─────────────────────────────────────────────────────────────────
export const javascriptQuizzes: Record<string, {
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
}> = {
  "javascript-variables": {
    title: "Variables Quiz",
    description: "Test your knowledge of JavaScript variable declarations.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["var", "let", "const", "int"],
        correctOptionIndex: 1,
        explanation: "let is block-scoped and allows reassignment. const is block-scoped but cannot be reassigned. var is function-scoped.",
        order: 1,
      },
      {
        question: "What will `typeof null` return in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctOptionIndex: 2,
        explanation: "typeof null returns 'object' — this is a well-known bug in JavaScript kept for backward compatibility.",
        order: 2,
      },
      {
        question: "Which of these is NOT a valid variable declaration?",
        options: ["let x = 5;", "const y = 10;", "int z = 15;", "var w = 20;"],
        correctOptionIndex: 2,
        explanation: "int is not a keyword in JavaScript. It is used in languages like C, C++, and Java.",
        order: 3,
      },
      {
        question: "What is the output of: `let a; console.log(a);`",
        options: ["null", "0", "undefined", "ReferenceError"],
        correctOptionIndex: 2,
        explanation: "A variable declared with let but not initialized has a value of undefined.",
        order: 4,
      },
    ],
  },
  "javascript-arrays": {
    title: "Arrays Quiz",
    description: "Test your understanding of JavaScript arrays and array methods.",
    passingScore: 70,
    timeLimit: 8,
    questions: [
      {
        question: "Which method adds an element to the END of an array?",
        options: ["unshift()", "push()", "pop()", "shift()"],
        correctOptionIndex: 1,
        explanation: "push() adds elements to the end. unshift() adds to the start. pop() removes from the end. shift() removes from the start.",
        order: 1,
      },
      {
        question: "What does the `filter()` method return?",
        options: [
          "A single value",
          "A new array with elements that pass the test",
          "The original array modified in place",
          "A boolean",
        ],
        correctOptionIndex: 1,
        explanation: "filter() returns a new array containing only elements for which the callback returns true. It does not mutate the original array.",
        order: 2,
      },
      {
        question: "What is the output of `[1,2,3].map(x => x * 2)`?",
        options: ["[1,2,3]", "[2,4,6]", "6", "[2,3,4]"],
        correctOptionIndex: 1,
        explanation: "map() transforms each element using the callback and returns a new array. Each element is multiplied by 2.",
        order: 3,
      },
    ],
  },
};
