// JavaScript tutorial content — sections, runnable examples, and quizzes.
// Web-focused (W3Schools style). Grouped by topic slug. No _id fields.

// ─── SECTIONS ────────────────────────────────────────────────────────────────
export const javascriptSections: Record<
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
  "js-introduction": [
    {
      title: "What is JavaScript?",
      slug: "what-is-javascript",
      metaDescription:
        "Learn what JavaScript is, its history, and why it is essential for web development.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        { type: "heading", content: "What is JavaScript?", order: 1 },
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
        { type: "heading", content: "Why Study JavaScript?", order: 4 },
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
          content:
            "JavaScript programs can be written directly in an HTML file using the <script> tag, or in a separate .js file that is linked to the HTML.",
          order: 7,
        },
      ],
    },
    {
      title: "JavaScript Where To",
      slug: "javascript-where-to",
      metaDescription:
        "Learn how and where to add JavaScript to your HTML pages — inline, internal, and external.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        { type: "heading", content: "The <script> Tag", order: 1 },
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
        { type: "heading", content: "External JavaScript", order: 4 },
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
          content:
            "Placing scripts at the bottom of the <body> element improves display speed because script interpretation slows down the display.",
          order: 7,
        },
      ],
    },
    {
      title: "JavaScript Output",
      slug: "javascript-output",
      metaDescription:
        "Learn how to display data in JavaScript using innerHTML, document.write, and the console.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JavaScript Display Possibilities", order: 1 },
        {
          type: "text",
          content:
            "JavaScript can display data in several ways on a web page or in developer tools. The most common methods are writing into an HTML element, writing directly to the document, showing an alert box, or logging to the browser console.",
          order: 2,
        },
        {
          type: "list",
          content: "Common output methods:",
          items: [
            "innerHTML — change the content of an HTML element",
            "document.write() — write directly to the HTML document (use sparingly)",
            "window.alert() — display a popup alert box",
            "console.log() — write to the browser developer console",
          ],
          order: 3,
        },
        {
          type: "code",
          content: `// 1. innerHTML — update an element by id\nconst el = document.getElementById("demo");\nel.innerHTML = "Hello from innerHTML!";\n\n// 2. console.log — for debugging (most used by developers)\nconsole.log("Debugging message");\nconsole.table([{ name: "Ada" }, { name: "Grace" }]);\n\n// 3. alert — blocks the page until dismissed\n// alert("Welcome to our site!");\n\n// 4. document.write — overwrites the page if called after load\n// document.write("Only use during initial page load");`,
          language: "javascript",
          order: 4,
        },
        {
          type: "warning",
          content:
            "Avoid document.write() after the page has finished loading — it can overwrite the entire document. Prefer innerHTML or DOM methods for dynamic updates.",
          order: 5,
        },
        {
          type: "code",
          content: `<!DOCTYPE html>\n<html>\n<body>\n  <h2>JavaScript Output</h2>\n  <p id="demo"></p>\n  <button onclick="document.getElementById('demo').innerHTML = 'Button clicked!'">\n    Click Me\n  </button>\n  <script>\n    document.getElementById("demo").innerHTML = "Page loaded.";\n  </script>\n</body>\n</html>`,
          language: "html",
          order: 6,
        },
        {
          type: "tip",
          content:
            "Use console.log() while learning and building features. Open DevTools with F12 (or right-click → Inspect → Console) to see output.",
          order: 7,
        },
      ],
    },
    {
      title: "JavaScript Syntax",
      slug: "javascript-syntax",
      metaDescription:
        "Understand JavaScript syntax: statements, semicolons, literals, identifiers, and code structure.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "JavaScript Syntax", order: 1 },
        {
          type: "text",
          content:
            "Programs consist of statements that the browser executes one after another. JavaScript is case-sensitive: myVariable and myvariable are different names. Whitespace (spaces, tabs, new lines) is generally ignored between tokens.",
          order: 2,
        },
        {
          type: "code",
          content: `// A statement ends with a semicolon (recommended)\nlet x = 5;\nlet y = 6;\nlet z = x + y;\n\n// Multiple statements on one line (avoid in real projects)\nlet a = 1; let b = 2;\n\n// Identifiers: letters, digits, _, $ — cannot start with a digit\nlet userName = "Sam";\nlet _private = true;\nlet $price = 9.99;\n\n// Literals: fixed values written in code\nconst count = 42;           // number literal\nconst message = "Hello";    // string literal\nconst active = true;        // boolean literal\nconst nothing = null;`,
          language: "javascript",
          order: 3,
        },
        { type: "heading", content: "Code Blocks", order: 4 },
        {
          type: "text",
          content:
            "Curly braces { } define a block of code. Blocks are used in functions, if statements, loops, and classes. Always use blocks for multi-line logic — even when a single line is allowed.",
          order: 5,
        },
        {
          type: "code",
          content: `if (true) {\n  console.log("Inside block");\n}\n\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\n// Comments explain code — ignored by the engine\n// Single-line comment\n/* Multi-line\n   comment */`,
          language: "javascript",
          order: 6,
        },
        {
          type: "note",
          content:
            "JavaScript automatically inserts semicolons in some cases (ASI). Still write them explicitly to avoid subtle bugs.",
          order: 7,
        },
      ],
    },
  ],

  "js-basics": [
    {
      title: "JavaScript Variables",
      slug: "javascript-variables",
      metaDescription:
        "Learn about JavaScript variables — var, let, and const — and when to use each one.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JavaScript Variables", order: 1 },
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
        { type: "heading", content: "var vs let vs const", order: 4 },
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
          content:
            "Always prefer const. Use let only when the variable value needs to change. Avoid var in modern JavaScript.",
          order: 7,
        },
      ],
    },
    {
      title: "JavaScript Data Types",
      slug: "javascript-data-types",
      metaDescription:
        "Explore JavaScript's primitive and reference data types including strings, numbers, booleans, null, undefined, and objects.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "JavaScript Data Types", order: 1 },
        {
          type: "text",
          content:
            "JavaScript has 8 data types: String, Number, BigInt, Boolean, Undefined, Null, Symbol, and Object. The first 7 are primitive data types. Object is a complex data type.",
          order: 2,
        },
        {
          type: "code",
          content: `// String\nlet firstName = "John";\nlet lastName  = 'Doe';\nlet greeting  = \`Hello \${firstName}\`;\n\n// Number\nlet integer = 42;\nlet float   = 3.14;\n\n// Boolean\nlet isLoggedIn = true;\n\n// Undefined — declared but not assigned\nlet score;\nconsole.log(score); // undefined\n\n// Null — intentional absence of value\nlet selectedUser = null;\n\n// Object & Array\nlet person = { name: "John", age: 30 };\nlet colors = ["red", "green", "blue"];\n\n// typeof operator\nconsole.log(typeof firstName);    // "string"\nconsole.log(typeof integer);      // "number"\nconsole.log(typeof selectedUser); // "object" (quirk)`,
          language: "javascript",
          order: 3,
        },
        {
          type: "warning",
          content:
            'typeof null returns "object" — this is a well-known bug in JavaScript that has been kept for backward compatibility. null is NOT an object.',
          order: 4,
        },
        { type: "heading", content: "Type Coercion", order: 5 },
        {
          type: "code",
          content: `console.log("5" + 3);    // "53" (string concatenation)\nconsole.log("5" - 3);    // 2   (numeric subtraction)\nconsole.log("" == false); // true (loose equality)\nconsole.log("" === false); // false (strict — ALWAYS use this)\n\nconst num = Number("42");\nconst str = String(42);\nconst bool = Boolean(0);`,
          language: "javascript",
          order: 6,
        },
      ],
    },
    {
      title: "JavaScript Operators",
      slug: "javascript-operators",
      metaDescription:
        "Master JavaScript operators: arithmetic, comparison, logical, assignment, and more.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JavaScript Operators", order: 1 },
        {
          type: "text",
          content:
            "JavaScript operators are used to perform operations on variables and values. There are several categories of operators.",
          order: 2,
        },
        {
          type: "code",
          content: `// Arithmetic\nlet a = 10, b = 3;\nconsole.log(a + b, a - b, a * b, a / b, a % b, a ** b);\n\n// Comparison — use === and !==\nconsole.log(5 === "5");  // false\nconsole.log(5 !== 6);    // true\n\n// Logical\nconsole.log(true && false);\nconsole.log(true || false);\nconsole.log(!true);\n\n// Assignment\nlet x = 10;\nx += 5;\n\n// Nullish coalescing & optional chaining\nconst username = null ?? "Guest";\nconst city = user?.address?.city;`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "Always use === (strict equality) instead of == (loose equality) to avoid unexpected type coercion bugs.",
          order: 4,
        },
      ],
    },
    {
      title: "JavaScript Comments",
      slug: "javascript-comments",
      metaDescription:
        "Learn how to write single-line and multi-line comments in JavaScript to document your code.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        { type: "heading", content: "JavaScript Comments", order: 1 },
        {
          type: "text",
          content:
            "Comments are ignored by JavaScript and are not executed. They make code easier to read and maintain. Use comments to explain why something is done, not what every obvious line does.",
          order: 2,
        },
        {
          type: "code",
          content: `// This is a single-line comment\nlet price = 19.99; // price in USD\n\n/*\n  This is a\n  multi-line comment\n*/\nconst taxRate = 0.08;\n\n/**\n * JSDoc-style comment — documents a function\n * @param {number} total - order total before tax\n * @returns {number} total with tax\n */\nfunction addTax(total) {\n  return total * (1 + taxRate);\n}\n\nconsole.log(addTax(100)); // 108`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "Many editors use JSDoc comments for autocomplete and type hints. They are especially helpful in larger web projects.",
          order: 4,
        },
        {
          type: "warning",
          content:
            "Do not comment out large blocks of code permanently — use version control (Git) instead. Remove dead code before shipping.",
          order: 5,
        },
      ],
    },
    {
      title: "JavaScript Strings",
      slug: "javascript-strings",
      metaDescription:
        "Work with JavaScript strings: creation, template literals, escape characters, and common string methods.",
      order: 5,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Strings", order: 1 },
        {
          type: "text",
          content:
            "Strings store text. You can use single quotes, double quotes, or backticks for template literals. Strings are immutable — methods return new strings rather than changing the original.",
          order: 2,
        },
        {
          type: "code",
          content: `const first = "Hello";\nconst last = 'World';\nconst full = \`\${first}, \${last}!\`; // template literal\n\n// Escape characters\nconst quote = 'It\\'s a sunny day.';\nconst path = "C:\\\\Users\\\\Dev";\n\n// Length and access\nconsole.log(full.length);\nconsole.log(full[0]); // "H"\n\n// Useful methods\nconst email = "  USER@Example.COM  ";\nconsole.log(email.trim().toLowerCase());\nconsole.log("javascript".includes("script")); // true\nconsole.log("hello-world".split("-")); // ["hello", "world"]\nconsole.log("banana".replace("a", "o")); // "bonana"`,
          language: "javascript",
          order: 3,
        },
        {
          type: "heading",
          content: "Strings in the Browser",
          order: 4,
        },
        {
          type: "code",
          content: `const title = "My Blog Post";\nconst slug = title.toLowerCase().replace(/\\s+/g, "-");\ndocument.getElementById("post-title").textContent = title;\ndocument.getElementById("post-slug").textContent = slug;\n// Useful for URLs, search, and form labels`,
          language: "javascript",
          order: 5,
        },
        {
          type: "note",
          content:
            "For user-visible text in HTML, prefer textContent over innerHTML when you only need plain text — it avoids XSS risks.",
          order: 6,
        },
      ],
    },
  ],

  "js-control-flow": [
    {
      title: "if, else, else if",
      slug: "if-else",
      metaDescription:
        "Learn how to use JavaScript if, else, and else if statements to control program flow.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 5,
      contentBlocks: [
        { type: "heading", content: "JavaScript if...else Statements", order: 1 },
        {
          type: "text",
          content:
            "Conditional statements are used to perform different actions based on different conditions. JavaScript supports if, else if, else, and switch statements.",
          order: 2,
        },
        {
          type: "code",
          content: `const hour = new Date().getHours();\nlet greeting;\n\nif (hour < 12) {\n  greeting = "Good Morning!";\n} else if (hour < 18) {\n  greeting = "Good Afternoon!";\n} else {\n  greeting = "Good Evening!";\n}\n\nconsole.log(greeting);\n\nconst age = 20;\nconst canVote = age >= 18 ? "Yes, can vote" : "No, too young";\nconsole.log(canVote);`,
          language: "javascript",
          order: 3,
        },
      ],
    },
    {
      title: "JavaScript Loops",
      slug: "javascript-loops",
      metaDescription:
        "Master for, while, do-while, for...of, and for...in loops in JavaScript.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Loops", order: 1 },
        {
          type: "text",
          content:
            "Loops execute a block of code a number of times. JavaScript has five types of loops: for, while, do-while, for...in, and for...of.",
          order: 2,
        },
        {
          type: "code",
          content: `for (let i = 0; i < 5; i++) {\n  console.log("Count:", i);\n}\n\nlet count = 0;\nwhile (count < 3) {\n  console.log("While:", count++);\n}\n\nconst fruits = ["apple", "banana", "cherry"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n\nconst car = { brand: "Toyota", model: "Corolla" };\nfor (const key in car) {\n  console.log(\`\${key}: \${car[key]}\`);\n}`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "Use for...of to iterate arrays and strings. Use for...in to iterate object keys. Avoid for...in on arrays.",
          order: 4,
        },
      ],
    },
    {
      title: "JavaScript switch",
      slug: "javascript-switch",
      metaDescription:
        "Use the switch statement to select one of many code blocks based on a value.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "The switch Statement", order: 1 },
        {
          type: "text",
          content:
            "The switch statement evaluates an expression and matches its value against case labels. Use break to stop execution from falling through to the next case. Use default when no case matches.",
          order: 2,
        },
        {
          type: "code",
          content: `const day = new Date().getDay();\nlet dayName;\n\nswitch (day) {\n  case 0:\n    dayName = "Sunday";\n    break;\n  case 1:\n    dayName = "Monday";\n    break;\n  case 2:\n    dayName = "Tuesday";\n    break;\n  case 6:\n    dayName = "Saturday";\n    break;\n  default:\n    dayName = "Weekday";\n}\n\nconsole.log(dayName);\n\n// switch with strings (theme picker)\nconst theme = "dark";\nlet bgColor;\nswitch (theme) {\n  case "light":\n    bgColor = "#ffffff";\n    break;\n  case "dark":\n    bgColor = "#1a1a1a";\n    break;\n  default:\n    bgColor = "#f0f0f0";\n}`,
          language: "javascript",
          order: 3,
        },
        {
          type: "warning",
          content:
            "Forgetting break causes fall-through — the next case runs too. Sometimes fall-through is intentional; document it with a comment.",
          order: 4,
        },
      ],
    },
    {
      title: "JavaScript try / catch",
      slug: "javascript-try-catch",
      metaDescription:
        "Handle runtime errors gracefully with try, catch, finally, and throw in JavaScript.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Error Handling", order: 1 },
        {
          type: "text",
          content:
            "The try block runs code that might fail. catch runs if an error is thrown. finally always runs — useful for cleanup. Use throw to create your own errors when validation fails.",
          order: 2,
        },
        {
          type: "code",
          content: `function parseUserAge(input) {\n  const age = Number(input);\n  if (Number.isNaN(age)) {\n    throw new Error("Age must be a number");\n  }\n  if (age < 0 || age > 120) {\n    throw new Error("Age out of range");\n  }\n  return age;\n}\n\ntry {\n  const age = parseUserAge(document.getElementById("age").value);\n  console.log("Valid age:", age);\n} catch (err) {\n  console.error("Form error:", err.message);\n  document.getElementById("error").textContent = err.message;\n} finally {\n  console.log("Validation attempt finished");\n}`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "Combine try/catch with async/await when calling fetch or other APIs — network failures are common on the web.",
          order: 4,
        },
      ],
    },
  ],

  "js-functions": [
    {
      title: "JavaScript Functions",
      slug: "javascript-functions",
      metaDescription:
        "Learn how to declare and call functions in JavaScript using function declarations, expressions, and arrow functions.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Functions", order: 1 },
        {
          type: "text",
          content:
            "A JavaScript function is a block of code designed to perform a particular task. A function is executed when something invokes it (calls it). Functions allow code reuse — define once, use many times.",
          order: 2,
        },
        {
          type: "code",
          content: `function greet(name) {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet("Alice"));\n\nconst add = function(a, b) {\n  return a + b;\n};\n\nconst multiply = (a, b) => a * b;\n\nfunction power(base, exponent = 2) {\n  return base ** exponent;\n}\n\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sum(1, 2, 3, 4, 5));`,
          language: "javascript",
          order: 3,
        },
        { type: "heading", content: "Closures", order: 4 },
        {
          type: "text",
          content:
            "A closure is a function that has access to its outer function's variables even after the outer function has returned.",
          order: 5,
        },
        {
          type: "code",
          content: `function makeCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`,
          language: "javascript",
          order: 6,
        },
      ],
    },
    {
      title: "JavaScript Scope",
      slug: "javascript-scope",
      metaDescription:
        "Understand global, function, and block scope, plus hoisting in JavaScript.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Scope in JavaScript", order: 1 },
        {
          type: "text",
          content:
            "Scope determines where variables are accessible. JavaScript has global scope, function scope (var), and block scope (let and const). Understanding scope prevents bugs when building interactive pages.",
          order: 2,
        },
        {
          type: "code",
          content: `// Global scope\nlet siteName = "DevDocs";\n\nfunction initApp() {\n  // Function scope\n  var legacyFlag = true;\n  let pageTitle = "Home";\n\n  if (true) {\n    // Block scope\n    const apiUrl = "/api/v1";\n    console.log(siteName, pageTitle, apiUrl);\n  }\n  // console.log(apiUrl); // ReferenceError\n}\n\ninitApp();`,
          language: "javascript",
          order: 3,
        },
        { type: "heading", content: "Hoisting", order: 4 },
        {
          type: "code",
          content: `// Function declarations are fully hoisted\nsayHi(); // works\nfunction sayHi() {\n  console.log("Hi!");\n}\n\n// let/const are hoisted but in "temporal dead zone"\n// console.log(x); // ReferenceError\nlet x = 10;`,
          language: "javascript",
          order: 5,
        },
        {
          type: "tip",
          content: "Declare variables at the top of the block where they are used. Avoid polluting the global scope.",
          order: 6,
        },
      ],
    },
    {
      title: "JavaScript Callback Functions",
      slug: "javascript-callback-functions",
      metaDescription:
        "Pass functions as arguments — callbacks for timers, events, and array methods.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "What is a Callback?", order: 1 },
        {
          type: "text",
          content:
            "A callback is a function passed into another function as an argument, to be executed later. Callbacks are everywhere in web development: button clicks, timers, array methods, and fetching data.",
          order: 2,
        },
        {
          type: "code",
          content: `// Callback as argument\nfunction processUser(name, callback) {\n  console.log("Processing:", name);\n  callback(name);\n}\n\nprocessUser("Alex", (n) => console.log("Done:", n));\n\n// Array methods use callbacks\nconst prices = [10, 25, 8];\nconst withTax = prices.map(price => price * 1.2);\nconsole.log(withTax);\n\n// setTimeout callback\ndocument.getElementById("save").addEventListener("click", () => {\n  console.log("Save clicked");\n});`,
          language: "javascript",
          order: 3,
        },
        {
          type: "note",
          content:
            "For complex async workflows (multiple API calls), Promises and async/await are easier to read than deeply nested callbacks.",
          order: 4,
        },
      ],
    },
  ],

  "js-objects-arrays": [
    {
      title: "JavaScript Objects",
      slug: "javascript-objects",
      metaDescription:
        "Learn how to create and work with JavaScript objects, properties, methods, and destructuring.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "JavaScript Objects", order: 1 },
        {
          type: "text",
          content:
            "Objects are variables that can contain many values. A JavaScript object is a collection of named values called properties.",
          order: 2,
        },
        {
          type: "code",
          content: `const person = {\n  firstName: "John",\n  lastName: "Doe",\n  age: 30,\n  address: { city: "New York", country: "USA" },\n  getFullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  }\n};\n\nconsole.log(person.firstName);\nconsole.log(person["lastName"]);\nconsole.log(person.getFullName());\n\nperson.email = "john@example.com";\n\nconst { firstName, age } = person;\nconst updated = { ...person, age: 31 };`,
          language: "javascript",
          order: 3,
        },
      ],
    },
    {
      title: "JavaScript Arrays",
      slug: "javascript-arrays",
      metaDescription:
        "Master JavaScript arrays — creation, methods, iteration, and array destructuring.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "JavaScript Arrays", order: 1 },
        {
          type: "text",
          content:
            "An array is a special variable that can hold more than one value. JavaScript arrays come with many powerful built-in methods.",
          order: 2,
        },
        {
          type: "code",
          content: `const fruits = ["apple", "banana", "cherry"];\nfruits.push("date");\n\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconst evens = numbers.filter(n => n % 2 === 0);\nconst sum = numbers.reduce((acc, n) => acc + n, 0);\n\nconst [first, second, ...rest] = numbers;\nconst copy = [...fruits];`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "map, filter, and reduce do not mutate the original array — they return new arrays or values.",
          order: 4,
        },
      ],
    },
    {
      title: "JavaScript JSON",
      slug: "javascript-json",
      metaDescription:
        "Convert between JavaScript objects and JSON strings for APIs and local storage.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JSON — JavaScript Object Notation", order: 1 },
        {
          type: "text",
          content:
            "JSON is a text format for storing and transporting data. It is commonly used when data is sent from a server to a web page. JSON syntax is derived from JavaScript object notation, but JSON is stricter (keys must be double-quoted strings).",
          order: 2,
        },
        {
          type: "code",
          content: `const user = { id: 1, name: "Sam", roles: ["editor"] };\n\n// Object → JSON string\nconst jsonString = JSON.stringify(user);\nconsole.log(jsonString);\n// {"id":1,"name":"Sam","roles":["editor"]}\n\n// JSON string → Object\nconst parsed = JSON.parse(jsonString);\nconsole.log(parsed.name); // Sam\n\n// Pretty-print for debugging\nconsole.log(JSON.stringify(user, null, 2));\n\n// localStorage example\nlocalStorage.setItem("user", JSON.stringify(user));\nconst saved = JSON.parse(localStorage.getItem("user"));`,
          language: "javascript",
          order: 3,
        },
        {
          type: "warning",
          content:
            "JSON.parse throws if the string is invalid. Wrap it in try/catch when parsing user input or API responses.",
          order: 4,
        },
      ],
    },
  ],

  "js-dom": [
    {
      title: "DOM Introduction",
      slug: "dom-introduction",
      metaDescription:
        "Learn what the DOM is and how JavaScript connects to HTML and CSS in the browser.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "What is the DOM?", order: 1 },
        {
          type: "text",
          content:
            "When a browser loads a page, it creates a Document Object Model (DOM) — a tree of objects representing the HTML. JavaScript can read and change the DOM to make pages interactive without reloading.",
          order: 2,
        },
        {
          type: "list",
          content: "The DOM lets you:",
          items: [
            "Change HTML content and attributes",
            "Change CSS styles dynamically",
            "React to user events (clicks, input, keyboard)",
            "Create and remove elements",
          ],
          order: 3,
        },
        {
          type: "code",
          content: `<!DOCTYPE html>\n<html>\n<body>\n  <h1 id="title">Welcome</h1>\n  <p class="intro">Learn the DOM.</p>\n  <script>\n    // document is the entry point to the DOM\n    console.log(document.title);\n    console.log(document.body.children.length);\n  </script>\n</body>\n</html>`,
          language: "html",
          order: 4,
        },
        {
          type: "note",
          content:
            "The DOM is a live representation of the page. Changes you make with JavaScript appear immediately in the browser.",
          order: 5,
        },
      ],
    },
    {
      title: "DOM Selecting Elements",
      slug: "dom-selecting-elements",
      metaDescription:
        "Select HTML elements with getElementById, querySelector, and querySelectorAll.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Finding Elements", order: 1 },
        {
          type: "text",
          content:
            "Before you can change the page, you must select the right element. Modern code uses querySelector and querySelectorAll with CSS selectors. Older methods like getElementById still work and are fast for simple cases.",
          order: 2,
        },
        {
          type: "code",
          content: `// By id\nconst title = document.getElementById("title");\n\n// CSS selectors (recommended)\nconst firstBtn = document.querySelector(".btn-primary");\nconst allItems = document.querySelectorAll(".nav-item");\n\n// By tag or class\nconst paragraphs = document.getElementsByTagName("p");\nconst cards = document.getElementsByClassName("card");\n\nallItems.forEach(item => {\n  item.classList.add("active");\n});`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "querySelector returns the first match or null. querySelectorAll returns a NodeList — use forEach or [...list] to loop.",
          order: 4,
        },
      ],
    },
    {
      title: "DOM Changing HTML & CSS",
      slug: "dom-changing-html-css",
      metaDescription:
        "Update text, HTML, attributes, and styles of DOM elements with JavaScript.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Changing Content and Style", order: 1 },
        {
          type: "text",
          content:
            "Use textContent for plain text, innerHTML when you need HTML markup, and style or classList for CSS. Prefer classList over inline styles when working with stylesheets.",
          order: 2,
        },
        {
          type: "code",
          content: `const heading = document.querySelector("#main-title");\nheading.textContent = "Updated Title";\n\nconst box = document.querySelector("#content");\nbox.innerHTML = "<p>New <strong>paragraph</strong></p>";\n\n// Attributes\nconst link = document.querySelector("a");\nlink.setAttribute("href", "https://example.com");\nlink.target = "_blank";\n\n// Styles\nbox.style.backgroundColor = "#f0f0f0";\nbox.style.padding = "16px";\n\n// Classes (toggle dark mode)\ndocument.body.classList.toggle("dark-mode");`,
          language: "javascript",
          order: 3,
        },
        {
          type: "code",
          content: `// Create and append elements\nconst li = document.createElement("li");\nli.textContent = "New item";\ndocument.querySelector("#todo-list").appendChild(li);\n\n// Remove\nli.remove();`,
          language: "javascript",
          order: 4,
        },
        {
          type: "warning",
          content:
            "Only use innerHTML with trusted content. User-supplied HTML can lead to XSS attacks — use textContent or sanitize input.",
          order: 5,
        },
      ],
    },
    {
      title: "DOM Events",
      slug: "dom-events",
      metaDescription:
        "Handle clicks, input, keyboard, and form events with addEventListener.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "HTML DOM Events", order: 1 },
        {
          type: "text",
          content:
            "An event is something that happens in the browser — a click, key press, form submit, or page load. You register an event listener with addEventListener to run JavaScript when the event occurs.",
          order: 2,
        },
        {
          type: "code",
          content: `const btn = document.querySelector("#submit");\n\nbtn.addEventListener("click", (event) => {\n  event.preventDefault(); // stop form reload if inside <form>\n  console.log("Button clicked!", event.target);\n});\n\nconst input = document.querySelector("#email");\ninput.addEventListener("input", (e) => {\n  console.log("Typing:", e.target.value);\n});\n\ndocument.addEventListener("keydown", (e) => {\n  if (e.key === "Escape") closeModal();\n});`,
          language: "javascript",
          order: 3,
        },
        {
          type: "heading",
          content: "Event Delegation",
          order: 4,
        },
        {
          type: "code",
          content: `// One listener on parent for many dynamic children\nconst list = document.querySelector("#menu");\nlist.addEventListener("click", (e) => {\n  if (e.target.matches("li")) {\n    console.log("Selected:", e.target.textContent);\n  }\n});`,
          language: "javascript",
          order: 5,
        },
        {
          type: "tip",
          content:
            "Use { once: true } for listeners that should run only once, or removeEventListener when cleaning up single-page app routes.",
          order: 6,
        },
      ],
    },
  ],

  "js-async": [
    {
      title: "Callbacks",
      slug: "callbacks",
      metaDescription:
        "Understand JavaScript callbacks and the callback pattern for handling asynchronous code.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 6,
      contentBlocks: [
        { type: "heading", content: "JavaScript Callbacks", order: 1 },
        {
          type: "text",
          content:
            "A callback is a function passed as an argument to another function. This allows a function to call another function after an operation is complete — essential for asynchronous code.",
          order: 2,
        },
        {
          type: "code",
          content: `function greetUser(name, callback) {\n  console.log("Hello, " + name);\n  callback();\n}\n\ngreetUser("Alice", () => {\n  console.log("Callback executed!");\n});\n\nconsole.log("Start");\nsetTimeout(() => {\n  console.log("This runs after 2 seconds");\n}, 2000);\nconsole.log("End");`,
          language: "javascript",
          order: 3,
        },
        {
          type: "warning",
          content:
            'Deeply nested callbacks create "Callback Hell" — hard to read and maintain. Use Promises or async/await instead for complex async operations.',
          order: 4,
        },
      ],
    },
    {
      title: "Promises",
      slug: "promises",
      metaDescription:
        "Learn how JavaScript Promises work for handling asynchronous operations cleanly.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Promises", order: 1 },
        {
          type: "text",
          content:
            "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It solves callback hell with cleaner chaining.",
          order: 2,
        },
        {
          type: "code",
          content: `const fetchData = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve({ id: 1, name: "John" });\n  } else {\n    reject(new Error("Failed to fetch data"));\n  }\n});\n\nfetchData\n  .then(data => console.log("Data:", data))\n  .catch(err => console.error("Error:", err.message))\n  .finally(() => console.log("Done"));\n\nPromise.all([Promise.resolve(1), Promise.resolve(2)])\n  .then(results => console.log(results));`,
          language: "javascript",
          order: 3,
        },
      ],
    },
    {
      title: "Async / Await",
      slug: "async-await",
      metaDescription:
        "Master async/await — the modern, readable way to write asynchronous JavaScript.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "Async / Await", order: 1 },
        {
          type: "text",
          content:
            "async/await is syntactic sugar built on top of Promises. It makes asynchronous code look and behave like synchronous code.",
          order: 2,
        },
        {
          type: "code",
          content: `async function fetchUser(id) {\n  const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);\n  const user = await response.json();\n  return user;\n}\n\nasync function loadData() {\n  try {\n    const user = await fetchUser(1);\n    console.log("User:", user.name);\n  } catch (error) {\n    console.error("Error:", error.message);\n  }\n}\n\nloadData();`,
          language: "javascript",
          order: 3,
        },
        {
          type: "tip",
          content:
            "When multiple async operations don't depend on each other, use Promise.all() to run them in parallel.",
          order: 4,
        },
      ],
    },
    {
      title: "Fetch API — Practical Guide",
      slug: "fetch-api-practical",
      metaDescription:
        "Load data from REST APIs with fetch, handle errors, and update the DOM.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 9,
      contentBlocks: [
        { type: "heading", content: "Fetching Data from APIs", order: 1 },
        {
          type: "text",
          content:
            "The Fetch API provides a modern way to request resources across the network. It returns a Promise and is the standard approach for loading JSON from backends in browser apps.",
          order: 2,
        },
        {
          type: "code",
          content: `async function loadPosts() {\n  const res = await fetch("https://jsonplaceholder.typicode.com/posts");\n  if (!res.ok) {\n    throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);\n  }\n  const posts = await res.json();\n  const list = document.querySelector("#post-list");\n  list.innerHTML = posts.slice(0, 5).map(p =>\n    \`<li><strong>\${p.title}</strong></li>\`\n  ).join("");\n}\n\nloadPosts().catch(err => {\n  document.querySelector("#error").textContent = err.message;\n});`,
          language: "javascript",
          order: 3,
        },
        {
          type: "code",
          content: `// POST JSON to an API\nasync function createPost(title, body) {\n  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify({ title, body, userId: 1 })\n  });\n  return res.json();\n}`,
          language: "javascript",
          order: 4,
        },
        {
          type: "note",
          content:
            "fetch only rejects on network failure — check res.ok for HTTP errors like 404 or 500.",
          order: 5,
        },
      ],
    },
  ],

  "js-es6-plus": [
    {
      title: "let, const & Arrow Functions",
      slug: "es6-let-const-arrow",
      metaDescription:
        "Modern variable declarations and concise arrow function syntax from ES6.",
      order: 1,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "let and const (ES6)", order: 1 },
        {
          type: "text",
          content:
            "ES6 introduced let and const for block-scoped variables. const prevents reassignment of the binding (but object properties can still change). Arrow functions provide shorter syntax and lexical this.",
          order: 2,
        },
        {
          type: "code",
          content: `const MAX_ITEMS = 10;\nlet cartCount = 0;\ncartCount++;\n\n// Arrow functions\nconst double = n => n * 2;\nconst greet = name => \`Hello, \${name}\`;\n\nconst btn = document.querySelector("#inc");\nbtn.addEventListener("click", () => {\n  cartCount++;\n  console.log(cartCount);\n});`,
          language: "javascript",
          order: 3,
        },
        {
          type: "warning",
          content:
            "Arrow functions do not have their own this — avoid them for object methods that need this, or use regular functions.",
          order: 4,
        },
      ],
    },
    {
      title: "Destructuring & Spread",
      slug: "es6-destructuring-spread",
      metaDescription:
        "Unpack values from arrays and objects and copy or merge with spread syntax.",
      order: 2,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "Destructuring", order: 1 },
        {
          type: "code",
          content: `const user = { name: "Lee", role: "admin", country: "UK" };\nconst { name, role } = user;\n\nconst colors = ["red", "green", "blue"];\nconst [primary, secondary] = colors;\n\n// Defaults\nconst { theme = "light" } = userConfig;`,
          language: "javascript",
          order: 2,
        },
        { type: "heading", content: "Spread & Rest", order: 3 },
        {
          type: "code",
          content: `const defaults = { theme: "light", lang: "en" };\nconst settings = { ...defaults, theme: "dark" };\n\nconst a = [1, 2];\nconst b = [...a, 3, 4];\n\nfunction logAll(...args) {\n  console.log(args);\n}\nlogAll("click", 42, true);`,
          language: "javascript",
          order: 4,
        },
        {
          type: "tip",
          content: "Spread creates shallow copies — nested objects are still shared references.",
          order: 5,
        },
      ],
    },
    {
      title: "ES6 Modules",
      slug: "es6-modules",
      metaDescription:
        "Organize code with import and export in separate JavaScript module files.",
      order: 3,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 7,
      contentBlocks: [
        { type: "heading", content: "JavaScript Modules", order: 1 },
        {
          type: "text",
          content:
            "Modules let you split code into files with explicit exports and imports. In the browser, use type=\"module\" on script tags. Build tools (Vite, webpack) also use this syntax.",
          order: 2,
        },
        {
          type: "code",
          content: `// utils.js\nexport const API_URL = "/api";\nexport function formatPrice(n) {\n  return \`$\${n.toFixed(2)}\`;\n}\nexport default function init() {\n  console.log("App initialized");\n}`,
          language: "javascript",
          order: 3,
        },
        {
          type: "code",
          content: `// main.js\nimport init, { formatPrice, API_URL } from "./utils.js";\n\ninit();\nconsole.log(formatPrice(9.5), API_URL);`,
          language: "javascript",
          order: 4,
        },
        {
          type: "code",
          content: `<script type="module" src="main.js"></script>`,
          language: "html",
          order: 5,
        },
      ],
    },
    {
      title: "ES6 Classes",
      slug: "es6-classes",
      metaDescription:
        "Define reusable object blueprints with class, constructor, methods, and extends.",
      order: 4,
      isPublished: true,
      isFree: true,
      readingTimeMinutes: 8,
      contentBlocks: [
        { type: "heading", content: "JavaScript Classes", order: 1 },
        {
          type: "text",
          content:
            "Classes are syntactic sugar over JavaScript's prototypal inheritance. They are useful for modeling UI components, API clients, and domain objects in larger apps.",
          order: 2,
        },
        {
          type: "code",
          content: `class Product {\n  constructor(name, price) {\n    this.name = name;\n    this.price = price;\n  }\n\n  getLabel() {\n    return \`\${this.name} — $\${this.price}\`;\n  }\n\n  applyDiscount(percent) {\n    this.price *= (1 - percent / 100);\n  }\n}\n\nconst item = new Product("Keyboard", 79);\nitem.applyDiscount(10);\nconsole.log(item.getLabel());`,
          language: "javascript",
          order: 3,
        },
        {
          type: "code",
          content: `class DigitalProduct extends Product {\n  constructor(name, price, downloadUrl) {\n    super(name, price);\n    this.downloadUrl = downloadUrl;\n  }\n\n  getLabel() {\n    return super.getLabel() + " (digital)";\n  }\n}`,
          language: "javascript",
          order: 4,
        },
        {
          type: "note",
          content:
            "Classes in JavaScript are still prototypes under the hood — methods are shared on the prototype for memory efficiency.",
          order: 5,
        },
      ],
    },
  ],
};

// ─── EXAMPLES ────────────────────────────────────────────────────────────────
export const javascriptExamples: Record<
  string,
  Array<{
    title: string;
    description: string;
    code: string;
    expectedOutput: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    tags: string[];
    order: number;
  }>
> = {
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
  "javascript-output": [
    {
      title: "Console and innerHTML",
      description: "Display messages in the console and update a paragraph.",
      code: `console.log("Learning output methods");\nconst msg = "Updated from JavaScript";\nconsole.log(msg);`,
      expectedOutput: `Learning output methods\nUpdated from JavaScript`,
      difficulty: "beginner",
      tags: ["output", "console"],
      order: 1,
    },
  ],
  "javascript-syntax": [
    {
      title: "Statements and literals",
      description: "Combine variables with literals and log the result.",
      code: `const price = 9.99;\nconst quantity = 3;\nconst total = price * quantity;\nconsole.log("Total:", total.toFixed(2));`,
      expectedOutput: `Total: 29.97`,
      difficulty: "beginner",
      tags: ["syntax", "literals"],
      order: 1,
    },
  ],
  "javascript-variables": [
    {
      title: "Declaring Variables",
      description: "Demonstrating const, let, and a simple calculation.",
      code: `const PI = 3.14159;\nlet radius = 5;\nlet area = PI * radius * radius;\nconsole.log("Area:", area.toFixed(2));`,
      expectedOutput: `Area: 78.54`,
      difficulty: "beginner",
      tags: ["variables", "const", "let"],
      order: 1,
    },
  ],
  "javascript-strings": [
    {
      title: "Template literals",
      description: "Build a greeting with template literals and string methods.",
      code: `const first = "Ada";\nconst last = "Lovelace";\nconst full = \`\${first} \${last}\`;\nconsole.log(full.toUpperCase());\nconsole.log("chars:", full.length);`,
      expectedOutput: `ADA LOVELACE\nchars: 12`,
      difficulty: "beginner",
      tags: ["strings", "template-literals"],
      order: 1,
    },
  ],
  "javascript-operators": [
    {
      title: "Strict comparison",
      description: "Compare values with === and combine with logical operators.",
      code: `const age = 21;\nconst hasId = true;\nconst canEnter = age >= 18 && hasId;\nconsole.log("Can enter:", canEnter);\nconsole.log(5 === "5", 5 === 5);`,
      expectedOutput: `Can enter: true\nfalse true`,
      difficulty: "beginner",
      tags: ["operators", "comparison"],
      order: 1,
    },
  ],
  "javascript-loops": [
    {
      title: "Sum with for loop",
      description: "Add numbers 1 through 10 using a for loop.",
      code: `let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}\nconsole.log("Sum:", sum);`,
      expectedOutput: `Sum: 55`,
      difficulty: "beginner",
      tags: ["loops", "for"],
      order: 1,
    },
  ],
  "javascript-functions": [
    {
      title: "Arrow function calculator",
      description: "Use arrow functions for simple math helpers.",
      code: `const add = (a, b) => a + b;\nconst square = n => n * n;\nconsole.log(add(4, 6));\nconsole.log(square(7));`,
      expectedOutput: `10\n49`,
      difficulty: "beginner",
      tags: ["functions", "arrow"],
      order: 1,
    },
  ],
  "javascript-arrays": [
    {
      title: "Array methods chaining",
      description: "Chaining map, filter, and reduce together.",
      code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst result = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * n)\n  .reduce((sum, n) => sum + n, 0);\n\nconsole.log(result);`,
      expectedOutput: `220`,
      difficulty: "intermediate",
      tags: ["arrays", "map", "filter", "reduce"],
      order: 1,
    },
  ],
  "javascript-json": [
    {
      title: "Parse and stringify",
      description: "Round-trip an object through JSON.",
      code: `const product = { id: 42, name: "Mouse", inStock: true };\nconst json = JSON.stringify(product);\nconst copy = JSON.parse(json);\nconsole.log(copy.name, copy.inStock);`,
      expectedOutput: `Mouse true`,
      difficulty: "beginner",
      tags: ["json", "parse", "stringify"],
      order: 1,
    },
  ],
  "dom-events": [
    {
      title: "Simulate event handler logic",
      description: "Model click handling with a callback function.",
      code: `function onClick(label) {\n  return () => console.log("Clicked:", label);\n}\n\nconst handler = onClick("Submit");\nhandler();`,
      expectedOutput: `Clicked: Submit`,
      difficulty: "beginner",
      tags: ["dom", "events", "callbacks"],
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
  "fetch-api-practical": [
    {
      title: "List first three posts",
      description: "Fetch posts and print titles (requires network).",
      code: `async function showTitles() {\n  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");\n  const posts = await res.json();\n  posts.forEach((p, i) => console.log(\`\${i + 1}. \${p.title}\`));\n}\nshowTitles();`,
      expectedOutput: `1. sunt aut facere...\n2. qui est esse\n3. ea molestias...`,
      difficulty: "intermediate",
      tags: ["fetch", "api", "json"],
      order: 1,
    },
  ],
  "es6-classes": [
    {
      title: "Create a simple class",
      description: "Instantiate a class and call a method.",
      code: `class Counter {\n  constructor() { this.value = 0; }\n  increment() { this.value++; return this.value; }\n}\nconst c = new Counter();\nconsole.log(c.increment());\nconsole.log(c.increment());`,
      expectedOutput: `1\n2`,
      difficulty: "beginner",
      tags: ["classes", "es6"],
      order: 1,
    },
  ],
};

// ─── QUIZZES ─────────────────────────────────────────────────────────────────
export const javascriptQuizzes: Record<
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
  "what-is-javascript": {
    title: "JavaScript Introduction Quiz",
    description: "Test your knowledge of what JavaScript is and where it runs.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "JavaScript is primarily used to make web pages:",
        options: ["Static only", "Interactive and dynamic", "Print-ready only", "Database-only"],
        correctOptionIndex: 1,
        explanation: "JavaScript runs in the browser and enables interactivity, validation, and dynamic content.",
        order: 1,
      },
      {
        question: "Who created JavaScript?",
        options: ["Brendan Eich", "James Gosling", "Guido van Rossum", "Bjarne Stroustrup"],
        correctOptionIndex: 0,
        explanation: "Brendan Eich created JavaScript in 1995 at Netscape.",
        order: 2,
      },
      {
        question: "JavaScript and Java are:",
        options: [
          "The same language with different names",
          "Completely different languages",
          "Both compiled only to bytecode",
          "Only usable on Android",
        ],
        correctOptionIndex: 1,
        explanation: "Despite similar names, JavaScript and Java are unrelated in design and usage.",
        order: 3,
      },
      {
        question: "Which environment can run JavaScript besides the browser?",
        options: ["Node.js", "Microsoft Word only", "Photoshop layers", "BIOS firmware only"],
        correctOptionIndex: 0,
        explanation: "Node.js is a popular runtime for running JavaScript on servers and tooling.",
        order: 4,
      },
    ],
  },
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
        explanation: "let is block-scoped and allows reassignment. const cannot be reassigned.",
        order: 1,
      },
      {
        question: "What will `typeof null` return in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctOptionIndex: 2,
        explanation: "typeof null returns 'object' — a long-standing quirk kept for compatibility.",
        order: 2,
      },
      {
        question: "Which of these is NOT a valid variable declaration?",
        options: ["let x = 5;", "const y = 10;", "int z = 15;", "var w = 20;"],
        correctOptionIndex: 2,
        explanation: "int is not a keyword in JavaScript.",
        order: 3,
      },
      {
        question: "What is the output of: `let a; console.log(a);`",
        options: ["null", "0", "undefined", "ReferenceError"],
        correctOptionIndex: 2,
        explanation: "A variable declared with let but not initialized has the value undefined.",
        order: 4,
      },
    ],
  },
  "javascript-operators": {
    title: "Operators Quiz",
    description: "Check your understanding of comparison and logical operators.",
    passingScore: 70,
    timeLimit: 6,
    questions: [
      {
        question: "What is the result of `5 === '5'`?",
        options: ["true", "false", "undefined", "SyntaxError"],
        correctOptionIndex: 1,
        explanation: "=== compares value and type without coercion, so number 5 is not equal to string '5'.",
        order: 1,
      },
      {
        question: "Which operator returns the first operand if it is not null/undefined?",
        options: ["||", "??", "&&", "??="],
        correctOptionIndex: 1,
        explanation: "The nullish coalescing operator (??) only falls back for null or undefined.",
        order: 2,
      },
      {
        question: "What does `!true` evaluate to?",
        options: ["true", "false", "null", "1"],
        correctOptionIndex: 1,
        explanation: "The logical NOT operator inverts the boolean value.",
        order: 3,
      },
      {
        question: "What is `10 % 3`?",
        options: ["3", "1", "3.33", "0"],
        correctOptionIndex: 1,
        explanation: "The modulus operator returns the remainder of division (10 divided by 3 leaves remainder 1).",
        order: 4,
      },
    ],
  },
  "if-else": {
    title: "Conditionals Quiz",
    description: "Questions on if, else, and the ternary operator.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Which is shorthand for if/else?",
        options: ["switch", "Ternary operator (? :)", "for loop", "typeof"],
        correctOptionIndex: 1,
        explanation: "condition ? exprIfTrue : exprIfFalse is the ternary conditional operator.",
        order: 1,
      },
      {
        question: "How many else blocks can follow a single if?",
        options: ["Unlimited", "Exactly one else", "At most one else", "None"],
        correctOptionIndex: 2,
        explanation: "You can have many else if branches but only one final else.",
        order: 2,
      },
      {
        question: "`0` in an if condition is treated as:",
        options: ["Truthy", "Falsy", "Syntax error", "Always true"],
        correctOptionIndex: 1,
        explanation: "The number 0 is falsy in JavaScript boolean contexts.",
        order: 3,
      },
    ],
  },
  "javascript-switch": {
    title: "Switch Statement Quiz",
    description: "Test knowledge of switch, case, break, and default.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "What does `break` do in a switch case?",
        options: [
          "Stops the switch and prevents fall-through",
          "Pauses the browser",
          "Deletes the variable",
          "Converts case to if",
        ],
        correctOptionIndex: 0,
        explanation: "break exits the switch so the next case does not run unintentionally.",
        order: 1,
      },
      {
        question: "The `default` case runs when:",
        options: [
          "No case matches",
          "Every case matches",
          "The switch is empty",
          "break is missing",
        ],
        correctOptionIndex: 0,
        explanation: "default is optional and executes when no case value matches.",
        order: 2,
      },
      {
        question: "switch compares values using:",
        options: ["=== (strict equality)", "== only", "Reference only", "Alphabetical order"],
        correctOptionIndex: 0,
        explanation: "Switch uses strict comparison (===) against case labels.",
        order: 3,
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
        explanation: "push() adds to the end. unshift() adds to the start.",
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
        explanation: "filter() returns a new array of elements for which the callback returns true.",
        order: 2,
      },
      {
        question: "What is the output of `[1,2,3].map(x => x * 2)`?",
        options: ["[1,2,3]", "[2,4,6]", "6", "[2,3,4]"],
        correctOptionIndex: 1,
        explanation: "map() transforms each element and returns a new array.",
        order: 3,
      },
    ],
  },
  "promises": {
    title: "Promises Quiz",
    description: "Understand Promise states and chaining.",
    passingScore: 70,
    timeLimit: 6,
    questions: [
      {
        question: "A Promise can be in which states?",
        options: [
          "pending, fulfilled, rejected",
          "open, closed, locked",
          "sync, async, idle",
          "start, stop, pause",
        ],
        correctOptionIndex: 0,
        explanation: "Promises start pending, then settle as fulfilled (resolved) or rejected.",
        order: 1,
      },
      {
        question: "Which method handles errors in a Promise chain?",
        options: [".then()", ".catch()", ".map()", ".filter()"],
        correctOptionIndex: 1,
        explanation: ".catch() registers a handler for rejected promises.",
        order: 2,
      },
      {
        question: "Promise.all resolves when:",
        options: [
          "All promises fulfill",
          "The first promise rejects only",
          "Any single promise fulfills",
          "Never",
        ],
        correctOptionIndex: 0,
        explanation: "Promise.all waits for all inputs to fulfill, or rejects if any input rejects.",
        order: 3,
      },
      {
        question: ".finally() runs:",
        options: [
          "Only on success",
          "Only on failure",
          "Always, after settle",
          "Never in browsers",
        ],
        correctOptionIndex: 2,
        explanation: "finally executes whether the promise fulfilled or rejected.",
        order: 4,
      },
    ],
  },
  "dom-selecting-elements": {
    title: "DOM Selection Quiz",
    description: "Quiz on selecting elements in the document.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "Which method returns the first element matching a CSS selector?",
        options: ["getElementById", "querySelector", "querySelectorAll", "getElementsByTagName"],
        correctOptionIndex: 1,
        explanation: "querySelector returns the first match or null.",
        order: 1,
      },
      {
        question: "getElementById selects by:",
        options: ["Class name", "Tag name", "The id attribute", "CSS path only"],
        correctOptionIndex: 2,
        explanation: "getElementById('myId') finds the element with id=\"myId\".",
        order: 2,
      },
      {
        question: "querySelectorAll returns:",
        options: ["A single element", "A NodeList", "Always null", "A Promise"],
        correctOptionIndex: 1,
        explanation: "querySelectorAll returns a static NodeList of all matching elements.",
        order: 3,
      },
    ],
  },
  "es6-let-const-arrow": {
    title: "ES6 Basics Quiz",
    description: "let, const, and arrow functions.",
    passingScore: 70,
    timeLimit: 5,
    questions: [
      {
        question: "const prevents:",
        options: [
          "Reassigning the variable binding",
          "Changing object properties",
          "Using the variable in a block",
          "Importing modules",
        ],
        correctOptionIndex: 0,
        explanation: "const cannot be reassigned, but object/array contents may still be mutated.",
        order: 1,
      },
      {
        question: "Arrow functions inherit `this` from:",
        options: ["The enclosing lexical scope", "Always window", "The callee", "Random scope"],
        correctOptionIndex: 0,
        explanation: "Arrow functions do not bind their own this — they use the surrounding this.",
        order: 2,
      },
      {
        question: "Which is valid arrow syntax?",
        options: ["const f = x => x * 2;", "const f = x -> x * 2;", "arrow f(x) { }", "fn => x {}"],
        correctOptionIndex: 0,
        explanation: "Single-parameter arrows can omit parentheses: x => x * 2.",
        order: 3,
      },
    ],
  },
};
