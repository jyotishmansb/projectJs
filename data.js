export const typeData = {
    string: {
        name: 'String',
        desc:'Stores text',
        typeof: 'typeof x === "string"',
        examples: ['let name = "John"', 'let a = "JavaScript is easy"', '`template ${literal}`', '"" (empty)']
    },
    number: {
        name: 'Number',
        desc:'Stores numeric values (integers and decimals)',
        typeof: 'typeof x === "number"',
        examples: ['let age = 22', 'let num = 3.14', 'let a = -7', 'NaN (also a number!)']
    },
    boolean: {
        name: 'Boolean',
        desc:'Stores true or false',
        typeof: 'typeof x === "boolean"',
        examples: ['true', 'false', 'let isLoggedIn = true']
    },
    null: {
        name: 'Null',
        desc:'Represents an intentional absence of a value',
        typeof: 'typeof null === "object" (bug!)',
        examples: ['null', '// intentional absence of value']
    },
    undefined: {
        name: 'Undefined',
        desc:'A variable that has been declared but not assigned a value',
        typeof: 'typeof x === "undefined"',
        examples: ['undefined', 'let x; // x is undefined', 'void 0']
    },
    symbol: {
        name: 'Symbol',
        desc:'Stores a unique and immutable identifier',
        typeof: 'typeof x === "symbol"',
        examples: ['const id1 = Symbol("user")', 'const id2 = Symbol("user")', 'console.log(id1 === id2); // false','Symbol.iterator', '// always unique']
    },
    bigint: {
        name: 'BigInt',
        desc:'Stores very large integers beyond the safe Number limit',
        typeof: 'typeof x === "bigint"',
        examples: ['9007199254740991n', 'BigInt(123)', '// for huge integers']
    },
    object: {
        name: 'Object',
        desc:'Stores data as key-value pairs',
        typeof: 'typeof x === "object"',
        examples: ['person = { name: "Alice" }', 'employee = { key: "value", num: 42 }', 'null (also "object"!)']
    },
    array: {
        name: 'Array',
        desc:'Stores an ordered list of values',
        typeof: 'typeof x === "object" (Array!)',
        examples: ['arr = [1, 2, 3]', 'c = ["a", "b"]', 'Array.isArray(x) // true check']
    },
    function: {
        name: 'Function',
        desc:'A reusable block of code that can be called',
        typeof: 'typeof x === "function"',
        examples: ['function foo() {}', 'const bar = () => {}', '// functions are objects']
    }
};

export const fnPanels = {
    declaration: {
        title: 'Function Declaration',
        desc: 'The classic way. Defined with the <code>function</code> keyword. <strong>Hoisted</strong> — you can call it before its definition in code.',
        bullets: ['Available throughout its scope (hoisted)', 'Has its own <code>this</code> binding', 'Can be recursive by name'],
        code: `<span class="cm">// Can be called BEFORE definition</span><br>
<span class="fn">greet</span>(<span class="str">"World"</span>); <span class="cm">// ✅ Works!</span> <br>

<span class="kw">function</span> <span class="fn">greet</span>(name) { <br>
  <span class="kw">return</span> <span class="str">\`Hello, \${name}!\`</span>; <br>
} <br>

<span class="cm">// Named — shows in stack traces</span> <br>
<span class="fn">greet</span>(<span class="str">"JS"</span>); <span class="cm">// "Hello, JS!"</span>`
    },
    expression: {
        title: 'Function Expression',
        desc: 'A function assigned to a variable. <strong>Not hoisted</strong> — must be defined before use. Can be anonymous or named.',
        bullets: ['Not hoisted — order matters', 'Can be anonymous or named', 'Useful for conditional function assignment'],
        code: `<span class="cm">// NOT hoisted — this would fail:</span> <br>
<span class="cm"> greet(); ❌ ReferenceError</span> <br>

<span class="kw">const</span> greet = <span class="kw">function</span>(name) { <br>
  <span class="kw">return</span> <span class="str">\`Hi, \${name}!\`</span>;
};
<br>
<span class="cm">// Named function expression:</span> <br>
<span class="kw">const</span> factorial = <span class="kw">function</span> <span class="fn">fact</span>(n) { <br>
  <span class="kw">return</span> n <= <span class="val">1</span> ? <span class="val">1</span> : n * <span class="fn">fact</span>(n - <span class="val">1</span>);
};`
    },
    arrow: {
        title: 'Arrow Function',
        desc: 'Concise syntax introduced in ES6. Does <strong>not</strong> have its own <code>this</code> — it inherits from the enclosing scope (lexical <code>this</code>).',
        bullets: ['No own <code>this</code> binding (lexical)', 'Cannot be used as constructors', 'Implicit return for single expressions'],
        code: `<span class="cm">// Full syntax</span>
<span class="kw">const</span> add = (a, b) => {
  <span class="kw">return</span> a + b;
};

<span class="cm">// Implicit return (one expression)</span>
<span class="kw">const</span> square = n => n * n;

<span class="cm">// No params</span>
<span class="kw">const</span> getRandom = () => Math.<span class="fn">random</span>();

square(<span class="val">5</span>); <span class="cm">// 25</span>`
    },
    hof: {
        title: 'Higher-Order Functions',
        desc: 'Functions that <strong>accept other functions as arguments</strong> or <strong>return functions</strong>. This is what makes JavaScript so powerful.',
        bullets: ['map(), filter(), reduce() are HOFs', 'Enable functional programming patterns', 'Callbacks are a form of HOF usage'],
        code: `<span class="cm">// Accepts a function as argument</span>
<span class="kw">const</span> nums = [<span class="val">1</span>, <span class="val">2</span>, <span class="val">3</span>, <span class="val">4</span>, <span class="val">5</span>];

<span class="kw">const</span> doubled = nums.<span class="fn">map</span>(n => n * <span class="val">2</span>);
<span class="cm">// [2, 4, 6, 8, 10]</span>

<span class="kw">const</span> evens = nums.<span class="fn">filter</span>(n => n % <span class="val">2</span> === <span class="val">0</span>);
<span class="cm">// [2, 4]</span>

<span class="kw">const</span> sum = nums.<span class="fn">reduce</span>((acc, n) => acc + n, <span class="val">0</span>);
<span class="cm">// 15</span>`
    },
    closure: {
        title: 'Closures',
        desc: 'A function that <strong>remembers the variables from its outer scope</strong> even after the outer function has returned. One of JS\'s most powerful features.',
        bullets: ['Inner function retains outer scope', 'Used for data privacy / encapsulation', 'Foundation of module patterns'],
        code: `<span class="kw">function</span> <span class="fn">makeCounter</span>() {
  <span class="kw">let</span> count = <span class="val">0</span>; <span class="cm">// private!</span>
  
  <span class="kw">return</span> {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}

<span class="kw">const</span> counter = <span class="fn">makeCounter</span>();
counter.<span class="fn">increment</span>(); <span class="cm">// 1</span>
counter.<span class="fn">increment</span>(); <span class="cm">// 2</span>
counter.<span class="fn">get</span>();       <span class="cm">// 2</span>`
    }
};

export const condPanels = {
    'if-else': {
        title: 'if / else if / else',
        desc: 'The most fundamental control flow. Runs a block of code only when a condition is <strong>truthy</strong>. Chain with <code>else if</code> for multiple branches.',
        bullets: ['Condition can be any expression', 'Uses truthy/falsy evaluation — no strict boolean needed', '<code>else</code> is optional; catches everything that didn\'t match'],
        code: `<span class="kw">const</span> score = <span class="val">72</span>;

<span class="kw">if</span> (score >= <span class="val">90</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"A — Excellent!"</span>);
} <span class="kw">else if</span> (score >= <span class="val">70</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"B — Good job!"</span>);
} <span class="kw">else if</span> (score >= <span class="val">50</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"C — Passing"</span>);
} <span class="kw">else</span> {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"F — Try again"</span>);
}
<span class="cm">// Output: "B — Good job!"</span>`
    },
    ternary: {
        title: 'Ternary Operator',
        desc: 'A compact one-liner for simple if/else. Format: <code>condition ? valueIfTrue : valueIfFalse</code>. Great for assignments, bad for complex logic.',
        bullets: ['Returns a value — can be used in expressions', 'Nestable but becomes unreadable quickly', 'Perfect for JSX and template literals'],
        code: `<span class="kw">const</span> age = <span class="val">20</span>;

<span class="cm">// Ternary instead of if/else</span>
<span class="kw">const</span> status = age >= <span class="val">18</span>
  ? <span class="str">"adult"</span>
  : <span class="str">"minor"</span>;

<span class="fn">console</span>.<span class="fn">log</span>(status); <span class="cm">// "adult"</span>

<span class="cm">// In template literals</span>
<span class="fn">console</span>.<span class="fn">log</span>(\`You are \${age >= 18 ? "allowed" : "not allowed"} in.\`);`
    },
    switch: {
        title: 'switch Statement',
        desc: 'Compares a value against multiple cases using <strong>strict equality (===)</strong>. Cleaner than long if/else chains. Don\'t forget <code>break</code>!',
        bullets: ['Uses strict equality — no type coercion', 'Without <code>break</code>, execution "falls through" to next case', '<code>default</code> is the catch-all (like else)'],
        code: `<span class="kw">const</span> day = <span class="str">"Monday"</span>;

<span class="kw">switch</span> (day) {
  <span class="kw">case</span> <span class="str">"Monday"</span>:
  <span class="kw">case</span> <span class="str">"Tuesday"</span>:
    <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Early week"</span>);
    <span class="kw">break</span>;
  <span class="kw">case</span> <span class="str">"Friday"</span>:
    <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Almost weekend!"</span>);
    <span class="kw">break</span>;
  <span class="kw">default</span>:
    <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Midweek grind"</span>);
}
<span class="cm">// Output: "Early week"</span>`
    },
    nullish: {
        title: 'Nullish (??) & Logical OR (||)',
        desc: '<code>??</code> returns the right side only when left is <strong>null or undefined</strong>. <code>||</code> returns the right when left is <strong>any falsy value</strong>. A subtle but critical difference.',
        bullets: ['<code>??</code> only triggers on null/undefined — safe for 0 and ""', '<code>||</code> triggers on all falsy values (0, "", false…)', 'Use <code>??=</code> for nullish assignment'],
        code: `<span class="kw">const</span> userInput = <span class="val">0</span>;

<span class="cm">// || treats 0 as falsy — wrong!</span>
<span class="kw">const</span> a = userInput <span class="op">||</span> <span class="val">42</span>; <span class="cm">// 42 😱</span>

<span class="cm">// ?? only checks null/undefined — correct!</span>
<span class="kw">const</span> b = userInput <span class="op">??</span> <span class="val">42</span>; <span class="cm">// 0 ✅</span>

<span class="cm">// Nullish assignment</span>
<span class="kw">let</span> config = <span class="kw">null</span>;
config <span class="op">??=</span> { theme: <span class="str">"dark"</span> };
<span class="cm">// config = { theme: "dark" }</span>`
    }
};

export const loopPanels = {
    for: {
        title: 'for Loop',
        desc: 'The classic loop. Runs while a condition is true, with explicit <strong>init, condition, and increment</strong>. Best when you know how many iterations you need.',
        bullets: ['Full control over start, end, step size', 'Can iterate backwards or by custom increments', '<code>break</code> exits early, <code>continue</code> skips to next iteration'],
        code: `<span class="cm">// Count up</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="val">0</span>; i < <span class="val">5</span>; i++) {
  <span class="fn">console</span>.<span class="fn">log</span>(\`Step \${i}\`);
}

<span class="cm">// Count down</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="val">5</span>; i > <span class="val">0</span>; i--) {
  <span class="fn">console</span>.<span class="fn">log</span>(i); <span class="cm">// 5, 4, 3, 2, 1</span>
}

<span class="cm">// Skip evens with continue</span>
<span class="kw">for</span> (<span class="kw">let</span> i = <span class="val">0</span>; i < <span class="val">6</span>; i++) {
  <span class="kw">if</span> (i % <span class="val">2</span> === <span class="val">0</span>) <span class="kw">continue</span>;
  <span class="fn">console</span>.<span class="fn">log</span>(i); <span class="cm">// 1, 3, 5</span>
}`
    },
    while: {
        title: 'while Loop',
        desc: 'Runs as long as the condition is truthy. Checks condition <strong>before</strong> each iteration. Best when the number of iterations is unknown.',
        bullets: ['Condition checked before every iteration', 'Could run 0 times if condition is false initially', 'Risk of infinite loop — always ensure exit condition'],
        code: `<span class="kw">let</span> fuel = <span class="val">100</span>;

<span class="kw">while</span> (fuel > <span class="val">0</span>) {
  <span class="fn">console</span>.<span class="fn">log</span>(\`Fuel: \${fuel}\`);
  fuel -= <span class="val">25</span>;
}
<span class="cm">// Fuel: 100, 75, 50, 25</span>

<span class="cm">// Search example</span>
<span class="kw">let</span> num = <span class="val">1</span>;
<span class="kw">while</span> (num * num < <span class="val">100</span>) { num++; }
<span class="fn">console</span>.<span class="fn">log</span>(num); <span class="cm">// 10 (first where n²≥100)</span>`
    },
    dowhile: {
        title: 'do...while Loop',
        desc: 'Like <code>while</code>, but checks the condition <strong>after</strong> each iteration. Guarantees the body runs <em>at least once</em>.',
        bullets: ['Body always executes at least once', 'Good for user input prompts and menus', 'Condition at the bottom — different reading flow'],
        code: `<span class="kw">let</span> attempts = <span class="val">0</span>;

<span class="kw">do</span> {
  attempts++;
  <span class="fn">console</span>.<span class="fn">log</span>(\`Attempt #\${attempts}\`);
} <span class="kw">while</span> (attempts < <span class="val">3</span>);
<span class="cm">// Attempt #1, #2, #3</span>

<span class="cm">// Runs even if condition is false from start!</span>
<span class="kw">let</span> x = <span class="val">10</span>;
<span class="kw">do</span> {
  <span class="fn">console</span>.<span class="fn">log</span>(<span class="str">"Runs once!"</span>);
} <span class="kw">while</span> (x < <span class="val">5</span>); <span class="cm">// false — still runs once</span>`
    },
    forof: {
        title: 'for...of Loop',
        desc: 'Iterates over <strong>iterable values</strong> (arrays, strings, Maps, Sets). Gives you the <em>value</em> at each step — clean and modern.',
        bullets: ['Works with any iterable: array, string, Map, Set', 'Gives values — not indices', 'Supports <code>break</code> and <code>continue</code>'],
        code: `<span class="kw">const</span> fruits = [<span class="str">"apple"</span>, <span class="str">"banana"</span>, <span class="str">"cherry"</span>];

<span class="kw">for</span> (<span class="kw">const</span> fruit <span class="kw">of</span> fruits) {
  <span class="fn">console</span>.<span class="fn">log</span>(fruit);
}
<span class="cm">// apple, banana, cherry</span>

<span class="cm">// With index via entries()</span>
<span class="kw">for</span> (<span class="kw">const</span> [i, val] <span class="kw">of</span> fruits.<span class="fn">entries</span>()) {
  <span class="fn">console</span>.<span class="fn">log</span>(\`\${i}: \${val}\`);
}`
    },
    forin: {
        title: 'for...in Loop',
        desc: 'Iterates over the <strong>enumerable property keys</strong> of an object. Use it for objects, not arrays.',
        bullets: ['Gives property <em>keys</em>, not values', 'Iterates inherited properties too', 'Avoid on arrays — use for...of instead'],
        code: `<span class="kw">const</span> person = {
  name: <span class="str">"Alice"</span>,
  age: <span class="val">25</span>,
  city: <span class="str">"Paris"</span>
};

<span class="kw">for</span> (<span class="kw">const</span> key <span class="kw">in</span> person) {
  <span class="fn">console</span>.<span class="fn">log</span>(\`\${key}: \${person[key]}\`);
}
<span class="cm">// name: Alice | age: 25 | city: Paris</span>

Object.<span class="fn">keys</span>(person);   <span class="cm">// ["name","age","city"]</span>
Object.<span class="fn">values</span>(person); <span class="cm">// ["Alice", 25, "Paris"]</span>`
    },
    foreach: {
        title: 'Array.forEach()',
        desc: 'A higher-order method that runs a callback for each array element. Cannot be stopped with <code>break</code>.',
        bullets: ['Callback receives: value, index, array', 'Cannot break out early — use for...of for that', 'Returns undefined — not chainable like .map()'],
        code: `<span class="kw">const</span> scores = [<span class="val">85</span>, <span class="val">92</span>, <span class="val">78</span>, <span class="val">95</span>];

scores.<span class="fn">forEach</span>((score, index) => {
  <span class="fn">console</span>.<span class="fn">log</span>(\`#\${index + 1}: \${score}\`);
});
<span class="cm">// #1: 85, #2: 92, #3: 78, #4: 95</span>

<span class="cm">// Use .map() when you need a new array:</span>
<span class="kw">const</span> doubled = scores.<span class="fn">map</span>(s => s * <span class="val">2</span>);
<span class="cm">// [170, 184, 156, 190]</span>`
    }
};

// ── Operator Section Data ────────────────────────────────

export const opPanels = {
    arithmetic: {
        title: 'Arithmetic Operators',
        desc: 'Perform mathematical calculations. JS follows standard math precedence: parentheses → exponents → multiply/divide → add/subtract (<strong>PEMDAS</strong>).',
        bullets: [
            '<code>+</code> add &nbsp; <code>-</code> subtract &nbsp; <code>*</code> multiply &nbsp; <code>/</code> divide',
            '<code>%</code> modulo (remainder) — great for even/odd checks',
            '<code>**</code> exponentiation (ES2016) &nbsp; <code>++</code> / <code>--</code> increment / decrement'
        ],
        code: `<span class="kw">let</span> x = <span class="val">10</span>;

<span class="fn">console</span>.<span class="fn">log</span>(x + <span class="val">3</span>);  <span class="cm">// 13 — addition</span>
<span class="fn">console</span>.<span class="fn">log</span>(x - <span class="val">3</span>);  <span class="cm">// 7  — subtraction</span>
<span class="fn">console</span>.<span class="fn">log</span>(x * <span class="val">3</span>);  <span class="cm">// 30 — multiplication</span>
<span class="fn">console</span>.<span class="fn">log</span>(x / <span class="val">3</span>);  <span class="cm">// 3.33... — division</span>
<span class="fn">console</span>.<span class="fn">log</span>(x % <span class="val">3</span>);  <span class="cm">// 1  — modulo (remainder)</span>
<span class="fn">console</span>.<span class="fn">log</span>(x ** <span class="val">3</span>); <span class="cm">// 1000 — exponentiation</span>

x++; <span class="cm">// x is now 11 (post-increment)</span>
x--; <span class="cm">// x is now 10 (post-decrement)</span>`
    },
    assignment: {
        title: 'Assignment Operators',
        desc: 'Assign values to variables. Compound assignment operators are shortcuts that combine an operation with assignment (<code>a += b</code> means <code>a = a + b</code>).',
        bullets: [
            '<code>=</code> basic assignment',
            '<code>+=</code> <code>-=</code> <code>*=</code> <code>/=</code> <code>%=</code> <code>**=</code> — compound arithmetic assignment',
            '<code>&&=</code> <code>||=</code> <code>??=</code> — logical assignment (ES2021)'
        ],
        code: `<span class="kw">let</span> score = <span class="val">100</span>;

score += <span class="val">10</span>;  <span class="cm">// score = 110</span>
score -= <span class="val">20</span>;  <span class="cm">// score = 90</span>
score *= <span class="val">2</span>;   <span class="cm">// score = 180</span>
score /= <span class="val">4</span>;   <span class="cm">// score = 45</span>
score **= <span class="val">2</span>;  <span class="cm">// score = 2025</span>

<span class="cm">// Logical assignment (ES2021)</span>
<span class="kw">let</span> user = <span class="kw">null</span>;
user <span class="op">??=</span> <span class="str">"Guest"</span>; <span class="cm">// "Guest" (was null)</span>

<span class="kw">let</span> isAdmin = <span class="kw">true</span>;
isAdmin <span class="op">&&=</span> <span class="kw">false</span>; <span class="cm">// false (both truthy)</span>`
    },
    comparison: {
        title: 'Comparison Operators',
        desc: 'Compare two values and return a boolean. The most important distinction is <strong>==</strong> (loose, coerces types) vs <strong>===</strong> (strict, no coercion). <em>Always prefer ===.</em>',
        bullets: [
            '<code>==</code> loose equality — type coercion happens!',
            '<code>===</code> strict equality — type AND value must match',
            '<code>!=</code> / <code>!==</code> — loose / strict inequality'
        ],
        code: `<span class="cm">// Loose equality (==) — coerces types</span>
<span class="val">5</span>  <span class="op">==</span>  <span class="str">"5"</span>  <span class="cm">// true  😱 (string "5" coerced to number)</span>
<span class="val">0</span>  <span class="op">==</span>  <span class="kw">false</span> <span class="cm">// true  😱</span>
<span class="kw">null</span> <span class="op">==</span> <span class="kw">undefined</span> <span class="cm">// true  😱</span>

<span class="cm">// Strict equality (===) — no coercion ✅</span>
<span class="val">5</span>  <span class="op">===</span> <span class="str">"5"</span>  <span class="cm">// false ✅ (different types)</span>
<span class="val">5</span>  <span class="op">===</span>  <span class="val">5</span>   <span class="cm">// true  ✅</span>

<span class="cm">// Relational</span>
<span class="val">10</span> <span class="op">></span> <span class="val">5</span>    <span class="cm">// true</span>
<span class="val">10</span> <span class="op">>=</span> <span class="val">10</span>  <span class="cm">// true</span>
<span class="val">3</span>  <span class="op"><</span> <span class="val">2</span>    <span class="cm">// false</span>`
    },
    logical: {
        title: 'Logical Operators',
        desc: 'Combine boolean expressions or use short-circuit evaluation. JS logical operators can work with any value — they return one of the <em>operands themselves</em>, not just true/false.',
        bullets: [
            '<code>&&</code> — AND: returns the first falsy value, or the last value',
            '<code>||</code> — OR: returns the first truthy value, or the last value',
            '<code>!</code> — NOT: flips boolean &nbsp; <code>!!</code> — converts to boolean'
        ],
        code: `<span class="cm">// Short-circuit evaluation</span>
<span class="kw">true</span>  <span class="op">&&</span> <span class="str">"hello"</span>  <span class="cm">// "hello" (last value)</span>
<span class="kw">false</span> <span class="op">&&</span> <span class="str">"hello"</span>  <span class="cm">// false  (first falsy)</span>

<span class="kw">false</span> <span class="op">||</span> <span class="str">"world"</span>  <span class="cm">// "world" (first truthy)</span>
<span class="kw">true</span>  <span class="op">||</span> <span class="str">"world"</span>  <span class="cm">// true   (first truthy)</span>

<span class="cm">// NOT operator</span>
<span class="op">!</span><span class="kw">true</span>   <span class="cm">// false</span>
<span class="op">!</span><span class="val">0</span>      <span class="cm">// true  (0 is falsy)</span>
<span class="op">!!</span><span class="str">"hi"</span>  <span class="cm">// true  (convert to boolean)</span>`
    },
    string: {
        title: 'String Operators',
        desc: 'The <code>+</code> operator doubles as <strong>string concatenation</strong>. When either operand is a string, JS converts the other to a string too. Use <strong>template literals</strong> for clean multi-value strings.',
        bullets: [
            '<code>+</code> concatenates strings — but beware of type coercion!',
            'Template literals: <code>`Hello, ${name}!`</code> — cleaner and more powerful',
            '<code>+=</code> works on strings too: append to a string'
        ],
        code: `<span class="cm">// Concatenation with +</span>
<span class="str">"Hello"</span> + <span class="str">" World"</span>   <span class="cm">// "Hello World"</span>
<span class="str">"Age: "</span> + <span class="val">25</span>       <span class="cm">// "Age: 25"</span>

<span class="cm">// Coercion trap!</span>
<span class="val">1</span> + <span class="val">2</span> + <span class="str">"3"</span>         <span class="cm">// "33"  (1+2=3, then "3"+"3")</span>
<span class="str">"3"</span> + <span class="val">1</span> + <span class="val">2</span>         <span class="cm">// "312" (string first!)</span>

<span class="cm">// Template literals ✅ Preferred</span>
<span class="kw">const</span> name = <span class="str">"Alice"</span>;
<span class="kw">const</span> age = <span class="val">25</span>;
<span class="fn">console</span>.<span class="fn">log</span>(\`\${name} is \${age} years old.\`);
<span class="fn">console</span>.<span class="fn">log</span>(\`2 + 2 = \${<span class="val">2</span> + <span class="val">2</span>}\`); <span class="cm">// expressions work!</span>`
    },
    typeof: {
        title: 'typeof & instanceof',
        desc: '<code>typeof</code> returns a string describing a value\'s type. <code>instanceof</code> checks if an object was created from a specific constructor — useful for class instances and arrays.',
        bullets: [
            '<code>typeof null === "object"</code> — a famous 30-year-old bug',
            '<code>typeof function(){} === "function"</code> — functions have their own typeof',
            '<code>instanceof</code> checks the prototype chain'
        ],
        code: `<span class="cm">// typeof — returns a string</span>
<span class="kw">typeof</span> <span class="val">42</span>          <span class="cm">// "number"</span>
<span class="kw">typeof</span> <span class="str">"hello"</span>    <span class="cm">// "string"</span>
<span class="kw">typeof</span> <span class="kw">true</span>       <span class="cm">// "boolean"</span>
<span class="kw">typeof</span> <span class="kw">undefined</span>  <span class="cm">// "undefined"</span>
<span class="kw">typeof</span> {}         <span class="cm">// "object"</span>
<span class="kw">typeof</span> []         <span class="cm">// "object" (not "array"!)</span>
<span class="kw">typeof</span> <span class="kw">null</span>       <span class="cm">// "object" 🐛 (historical bug)</span>
<span class="kw">typeof</span> <span class="fn">function</span>(){} <span class="cm">// "function"</span>

<span class="cm">// instanceof — checks prototype chain</span>
[] <span class="kw">instanceof</span> Array  <span class="cm">// true ✅</span>
[] <span class="kw">instanceof</span> Object <span class="cm">// true (arrays are objects)</span>`
    },
    spread: {
        title: 'Spread & Rest (...)',
        desc: 'The three-dot <code>...</code> operator does two opposite things depending on context: <strong>Spread</strong> expands an iterable into individual elements. <strong>Rest</strong> collects multiple elements into an array.',
        bullets: [
            'Spread: <code>[...arr]</code> or <code>{...obj}</code> — expand / shallow copy',
            'Rest in functions: <code>function fn(...args)</code> — capture all arguments',
            'Rest in destructuring: <code>const [first, ...rest] = arr</code>'
        ],
        code: `<span class="cm">// SPREAD — expand outward</span>
<span class="kw">const</span> a = [<span class="val">1</span>, <span class="val">2</span>, <span class="val">3</span>];
<span class="kw">const</span> b = [<span class="val">0</span>, ...a, <span class="val">4</span>]; <span class="cm">// [0, 1, 2, 3, 4]</span>

<span class="kw">const</span> obj1 = { x: <span class="val">1</span> };
<span class="kw">const</span> obj2 = { ...obj1, y: <span class="val">2</span> }; <span class="cm">// { x:1, y:2 }</span>

<span class="cm">// REST — collect inward</span>
<span class="kw">function</span> <span class="fn">sum</span>(...nums) {
  <span class="kw">return</span> nums.<span class="fn">reduce</span>((a, b) => a + b, <span class="val">0</span>);
}
<span class="fn">sum</span>(<span class="val">1</span>, <span class="val">2</span>, <span class="val">3</span>, <span class="val">4</span>); <span class="cm">// 10</span>

<span class="cm">// Destructuring rest</span>
<span class="kw">const</span> [first, ...rest] = [<span class="val">10</span>, <span class="val">20</span>, <span class="val">30</span>];
<span class="cm">// first=10, rest=[20,30]</span>`
    }
};

export const opRefCards = {
    arithmetic: [
        { sym: '+',  name: 'Add',          ex: '5 + 3',   res: '8' },
        { sym: '-',  name: 'Subtract',     ex: '5 - 3',   res: '2' },
        { sym: '*',  name: 'Multiply',     ex: '5 * 3',   res: '15' },
        { sym: '/',  name: 'Divide',       ex: '9 / 2',   res: '4.5' },
        { sym: '%',  name: 'Modulo',       ex: '7 % 3',   res: '1' },
        { sym: '**', name: 'Power',        ex: '2 ** 8',  res: '256' },
        { sym: '++', name: 'Increment',    ex: 'let x=5; x++', res: '6' },
        { sym: '--', name: 'Decrement',    ex: 'let x=5; x--', res: '4' },
    ],
    assignment: [
        { sym: '=',   name: 'Assign',        ex: 'x = 5',    res: '5' },
        { sym: '+=',  name: 'Add & Assign',  ex: 'x += 3',   res: 'x+3' },
        { sym: '-=',  name: 'Sub & Assign',  ex: 'x -= 3',   res: 'x-3' },
        { sym: '*=',  name: 'Mul & Assign',  ex: 'x *= 3',   res: 'x*3' },
        { sym: '/=',  name: 'Div & Assign',  ex: 'x /= 3',   res: 'x/3' },
        { sym: '**=', name: 'Pow & Assign',  ex: 'x **= 2',  res: 'x²' },
        { sym: '??=', name: 'Nullish Assign',ex: 'x ??= 5',  res: '5 if null' },
        { sym: '||=', name: 'OR Assign',     ex: 'x ||= 5',  res: '5 if falsy' },
    ],
    comparison: [
        { sym: '==',  name: 'Loose Equal',    ex: '5 == "5"',    res: 'true' },
        { sym: '===', name: 'Strict Equal',   ex: '5 === "5"',   res: 'false' },
        { sym: '!=',  name: 'Loose Not Equal',ex: '5 != "5"',    res: 'false' },
        { sym: '!==', name: 'Strict Not Equal',ex: '5 !== "5"',  res: 'true' },
        { sym: '>',   name: 'Greater Than',   ex: '10 > 5',      res: 'true' },
        { sym: '<',   name: 'Less Than',      ex: '3 < 5',       res: 'true' },
        { sym: '>=',  name: 'Greater or Eq',  ex: '5 >= 5',      res: 'true' },
        { sym: '<=',  name: 'Less or Eq',     ex: '4 <= 5',      res: 'true' },
    ],
    logical: [
        { sym: '&&',  name: 'AND',         ex: 'true && false',  res: 'false' },
        { sym: '||',  name: 'OR',          ex: 'false || true',  res: 'true' },
        { sym: '!',   name: 'NOT',         ex: '!true',          res: 'false' },
        { sym: '??',  name: 'Nullish',     ex: 'null ?? "hi"',   res: '"hi"' },
        { sym: '!!',  name: 'To Boolean',  ex: '!!"hello"',      res: 'true' },
        { sym: '&&=', name: 'AND Assign',  ex: 'x &&= y',        res: 'x if falsy, else y' },
        { sym: '||=', name: 'OR Assign',   ex: 'x ||= y',        res: 'x if truthy, else y' },
        { sym: '?.',  name: 'Optional Chain', ex: 'obj?.prop',   res: 'undefined (no error)' },
    ],
    string: [
        { sym: '+',   name: 'Concatenate', ex: '"Hi" + " JS"',     res: '"Hi JS"' },
        { sym: '+=',  name: 'Append',      ex: 's += "!"',         res: 'appends' },
        { sym: '``',  name: 'Template Lit',ex: '`${a} ${b}`',      res: 'interpolated' },
        { sym: '\\n', name: 'Newline',     ex: '"line1\\nline2"',   res: 'two lines' },
    ],
    typeof: [
        { sym: 'typeof',     name: 'Type Check',    ex: 'typeof 42',      res: '"number"' },
        { sym: 'instanceof', name: 'Instance Check',ex: '[] instanceof Array', res: 'true' },
        { sym: 'in',         name: 'Property Check',ex: '"x" in {x:1}',   res: 'true' },
        { sym: 'void',       name: 'Returns undef', ex: 'void 0',         res: 'undefined' },
        { sym: 'delete',     name: 'Delete property',ex: 'delete obj.x',  res: 'true' },
    ],
    spread: [
        { sym: '...arr',  name: 'Spread Array',  ex: '[...a, ...b]',     res: 'merged array' },
        { sym: '...obj',  name: 'Spread Object', ex: '{...o1, ...o2}',   res: 'merged object' },
        { sym: '...args', name: 'Rest Params',   ex: 'fn(...args)',       res: 'array of args' },
        { sym: '[a,...r]',name: 'Destructure',   ex: '[x, ...rest]=arr', res: 'head & tail' },
    ],
};
// ── Math Section Data ────────────────────────────────────

export const mathConstants = [
    { name: 'Math.PI',      val: Math.PI.toFixed(10),    desc: 'π — ratio of circumference to diameter',  color: '#f59e0b' },
    { name: 'Math.E',       val: Math.E.toFixed(10),     desc: 'Euler\'s number — base of natural log',   color: '#3b82f6' },
    { name: 'Math.SQRT2',   val: Math.SQRT2.toFixed(10), desc: '√2 — square root of 2',                  color: '#8b5cf6' },
    { name: 'Math.LN2',     val: Math.LN2.toFixed(10),   desc: 'Natural log of 2',                        color: '#ec4899' },
    { name: 'Math.LN10',    val: Math.LN10.toFixed(10),  desc: 'Natural log of 10',                       color: '#10b981' },
    { name: 'Math.LOG2E',   val: Math.LOG2E.toFixed(10), desc: 'Log base-2 of E',                         color: '#06b6d4' },
];

export const mathPanels = {
    rounding: {
        title: 'Rounding Methods',
        desc: 'JS provides four distinct rounding methods. Understanding the difference — especially around <strong>negative numbers</strong> and <strong>.5 values</strong> — is critical for precise calculations.',
        bullets: [
            '<code>Math.floor(x)</code> — always rounds <em>down</em> (toward −∞)',
            '<code>Math.ceil(x)</code> — always rounds <em>up</em> (toward +∞)',
            '<code>Math.round(x)</code> — rounds to nearest integer (.5 rounds up)',
            '<code>Math.trunc(x)</code> — removes the decimal, toward zero'
        ],
        code: `<span class="cm">// Positive numbers</span>
Math.<span class="fn">floor</span>(<span class="val">4.9</span>);  <span class="cm">// 4  — always down</span>
Math.<span class="fn">ceil</span>(<span class="val">4.1</span>);   <span class="cm">// 5  — always up</span>
Math.<span class="fn">round</span>(<span class="val">4.5</span>);  <span class="cm">// 5  — .5 rounds up</span>
Math.<span class="fn">trunc</span>(<span class="val">4.9</span>);  <span class="cm">// 4  — toward zero</span>

<span class="cm">// Negative numbers — watch out!</span>
Math.<span class="fn">floor</span>(<span class="val">-4.1</span>); <span class="cm">// -5  — still toward -∞</span>
Math.<span class="fn">ceil</span>(<span class="val">-4.9</span>);  <span class="cm">// -4  — still toward +∞</span>
Math.<span class="fn">round</span>(<span class="val">-4.5</span>); <span class="cm">// -4  — .5 still rounds up</span>
Math.<span class="fn">trunc</span>(<span class="val">-4.9</span>); <span class="cm">// -4  — strips decimal</span>`
    },
    minmax: {
        title: 'Math.min() & Math.max()',
        desc: '<code>Math.min()</code> returns the smallest value and <code>Math.max()</code> returns the largest from a list of arguments. Use the <strong>spread operator</strong> to apply them to arrays.',
        bullets: [
            'Accept any number of arguments: <code>Math.min(1, 2, 3)</code>',
            'With no arguments: <code>Math.min()</code> returns <code>Infinity</code>, <code>Math.max()</code> returns <code>-Infinity</code>',
            'Use spread to find min/max in an array: <code>Math.max(...arr)</code>'
        ],
        code: `<span class="cm">// Basic usage</span>
Math.<span class="fn">min</span>(<span class="val">5</span>, <span class="val">2</span>, <span class="val">9</span>, <span class="val">1</span>);  <span class="cm">// 1</span>
Math.<span class="fn">max</span>(<span class="val">5</span>, <span class="val">2</span>, <span class="val">9</span>, <span class="val">1</span>);  <span class="cm">// 9</span>

<span class="cm">// With arrays using spread</span>
<span class="kw">const</span> scores = [<span class="val">88</span>, <span class="val">95</span>, <span class="val">72</span>, <span class="val">100</span>, <span class="val">65</span>];
Math.<span class="fn">min</span>(...scores); <span class="cm">// 65</span>
Math.<span class="fn">max</span>(...scores); <span class="cm">// 100</span>

<span class="cm">// Edge cases</span>
Math.<span class="fn">min</span>();          <span class="cm">// Infinity</span>
Math.<span class="fn">max</span>();          <span class="cm">// -Infinity</span>
Math.<span class="fn">min</span>(<span class="val">5</span>, <span class="str">"abc"</span>); <span class="cm">// NaN</span>`
    },
    power: {
        title: 'Power, Roots & Logarithms',
        desc: 'Math provides methods for exponentiation, square/cube roots, and logarithms. These are essential for algorithms, geometry, and financial calculations.',
        bullets: [
            '<code>Math.pow(base, exp)</code> — same as <code>base ** exp</code> (ES6)',
            '<code>Math.sqrt(x)</code> — square root &nbsp; <code>Math.cbrt(x)</code> — cube root',
            '<code>Math.log(x)</code> natural log &nbsp; <code>Math.log2(x)</code> &nbsp; <code>Math.log10(x)</code>'
        ],
        code: `<span class="cm">// Power</span>
Math.<span class="fn">pow</span>(<span class="val">2</span>, <span class="val">10</span>);   <span class="cm">// 1024 (same as 2**10)</span>
Math.<span class="fn">pow</span>(<span class="val">9</span>, <span class="val">0.5</span>);  <span class="cm">// 3    (same as Math.sqrt(9))</span>

<span class="cm">// Roots</span>
Math.<span class="fn">sqrt</span>(<span class="val">25</span>);    <span class="cm">// 5</span>
Math.<span class="fn">sqrt</span>(<span class="val">2</span>);     <span class="cm">// 1.4142... (Math.SQRT2)</span>
Math.<span class="fn">cbrt</span>(<span class="val">27</span>);    <span class="cm">// 3</span>
Math.<span class="fn">cbrt</span>(<span class="val">-8</span>);   <span class="cm">// -2</span>

<span class="cm">// Logarithms</span>
Math.<span class="fn">log</span>(Math.E);   <span class="cm">// 1    (natural log)</span>
Math.<span class="fn">log2</span>(<span class="val">1024</span>);  <span class="cm">// 10   (2^10 = 1024)</span>
Math.<span class="fn">log10</span>(<span class="val">1000</span>); <span class="cm">// 3    (10^3 = 1000)</span>`
    },
    trig: {
        title: 'Trigonometric Functions',
        desc: 'All trig functions work in <strong>radians</strong>, not degrees. Convert: <code>radians = degrees × (Math.PI / 180)</code>. These are essential for graphics, animations, and geometry.',
        bullets: [
            '<code>Math.sin(r)</code> <code>Math.cos(r)</code> <code>Math.tan(r)</code> — basic trig (input: radians)',
            '<code>Math.asin()</code> <code>Math.acos()</code> <code>Math.atan()</code> — inverse trig (output: radians)',
            '<code>Math.atan2(y, x)</code> — angle from origin to point (x,y), handles all quadrants'
        ],
        code: `<span class="cm">// Helper: degrees → radians</span>
<span class="kw">const</span> toRad = deg => deg * (Math.PI / <span class="val">180</span>);

Math.<span class="fn">sin</span>(<span class="fn">toRad</span>(<span class="val">30</span>));  <span class="cm">// 0.5</span>
Math.<span class="fn">cos</span>(<span class="fn">toRad</span>(<span class="val">60</span>));  <span class="cm">// 0.5</span>
Math.<span class="fn">tan</span>(<span class="fn">toRad</span>(<span class="val">45</span>));  <span class="cm">// 1.0</span>

<span class="cm">// Common values</span>
Math.<span class="fn">sin</span>(Math.PI / <span class="val">2</span>); <span class="cm">// 1   (sin 90°)</span>
Math.<span class="fn">cos</span>(<span class="val">0</span>);           <span class="cm">// 1   (cos 0°)</span>
Math.<span class="fn">cos</span>(Math.PI);     <span class="cm">// -1  (cos 180°)</span>

<span class="cm">// atan2 — find angle to point</span>
Math.<span class="fn">atan2</span>(<span class="val">1</span>, <span class="val">1</span>) * (<span class="val">180</span>/Math.PI); <span class="cm">// 45°</span>`
    },
    random: {
        title: 'Math.random()',
        desc: '<code>Math.random()</code> returns a pseudo-random float in the range <strong>[0, 1)</strong> — includes 0, excludes 1. Combine it with <code>Math.floor()</code> to get random integers in any range.',
        bullets: [
            'Returns a float: <code>0 ≤ x < 1</code>',
            'Random integer formula: <code>Math.floor(Math.random() * (max - min + 1)) + min</code>',
            'Not cryptographically secure — use <code>crypto.getRandomValues()</code> for security'
        ],
        code: `<span class="cm">// Basic: float between 0 and 1</span>
Math.<span class="fn">random</span>(); <span class="cm">// e.g. 0.7362...</span>

<span class="cm">// Integer between 0 and 9</span>
Math.<span class="fn">floor</span>(Math.<span class="fn">random</span>() * <span class="val">10</span>);

<span class="cm">// Integer between min and max (inclusive)</span>
<span class="kw">function</span> <span class="fn">randInt</span>(min, max) {
  <span class="kw">return</span> Math.<span class="fn">floor</span>(
    Math.<span class="fn">random</span>() * (max - min + <span class="val">1</span>)
  ) + min;
}
<span class="fn">randInt</span>(<span class="val">1</span>, <span class="val">6</span>); <span class="cm">// dice roll: 1-6</span>
<span class="fn">randInt</span>(<span class="val">1</span>, <span class="val">100</span>); <span class="cm">// 1 to 100</span>`
    },
    misc: {
        title: 'Misc: abs, sign, hypot & more',
        desc: 'A collection of handy utility methods for everyday math tasks — absolute values, sign detection, hypotenuse calculation, and clamping values.',
        bullets: [
            '<code>Math.abs(x)</code> — absolute value (always positive)',
            '<code>Math.sign(x)</code> — returns -1, 0, or 1 based on sign',
            '<code>Math.hypot(a, b)</code> — Pythagorean hypotenuse √(a²+b²)'
        ],
        code: `<span class="cm">// Absolute value</span>
Math.<span class="fn">abs</span>(<span class="val">-42</span>);    <span class="cm">// 42</span>
Math.<span class="fn">abs</span>(<span class="val">0</span>);      <span class="cm">// 0</span>

<span class="cm">// Sign (-1, 0, or 1)</span>
Math.<span class="fn">sign</span>(<span class="val">-99</span>);  <span class="cm">// -1</span>
Math.<span class="fn">sign</span>(<span class="val">0</span>);    <span class="cm">// 0</span>
Math.<span class="fn">sign</span>(<span class="val">42</span>);   <span class="cm">// 1</span>

<span class="cm">// Hypotenuse (distance formula)</span>
Math.<span class="fn">hypot</span>(<span class="val">3</span>, <span class="val">4</span>); <span class="cm">// 5  (3-4-5 triangle)</span>
Math.<span class="fn">hypot</span>(<span class="val">5</span>, <span class="val">12</span>);<span class="cm">// 13 (5-12-13 triangle)</span>

<span class="cm">// Clamp a value (no built-in, but easy)</span>
<span class="kw">const</span> clamp = (val, min, max) =>
  Math.<span class="fn">min</span>(Math.<span class="fn">max</span>(val, min), max);
<span class="fn">clamp</span>(<span class="val">150</span>, <span class="val">0</span>, <span class="val">100</span>); <span class="cm">// 100</span>`
    }
};

export const mathMethods = {
    rounding: [
        { name: 'Math.floor(x)',  ex: 'Math.floor(4.9)',   res: '4' },
        { name: 'Math.floor(x)',  ex: 'Math.floor(-4.1)',  res: '-5' },
        { name: 'Math.ceil(x)',   ex: 'Math.ceil(4.1)',    res: '5' },
        { name: 'Math.ceil(x)',   ex: 'Math.ceil(-4.9)',   res: '-4' },
        { name: 'Math.round(x)',  ex: 'Math.round(4.5)',   res: '5' },
        { name: 'Math.round(x)',  ex: 'Math.round(4.4)',   res: '4' },
        { name: 'Math.trunc(x)',  ex: 'Math.trunc(4.9)',   res: '4' },
        { name: 'Math.trunc(x)',  ex: 'Math.trunc(-4.9)',  res: '-4' },
    ],
    minmax: [
        { name: 'Math.min(a,b…)', ex: 'Math.min(3,1,9)',      res: '1' },
        { name: 'Math.max(a,b…)', ex: 'Math.max(3,1,9)',      res: '9' },
        { name: 'Math.min(…arr)', ex: 'Math.min(...[5,2,8])', res: '2' },
        { name: 'Math.max(…arr)', ex: 'Math.max(...[5,2,8])', res: '8' },
    ],
    power: [
        { name: 'Math.pow(b,e)',  ex: 'Math.pow(2,10)',    res: '1024' },
        { name: 'Math.sqrt(x)',   ex: 'Math.sqrt(144)',    res: '12' },
        { name: 'Math.cbrt(x)',   ex: 'Math.cbrt(27)',     res: '3' },
        { name: 'Math.log(x)',    ex: 'Math.log(Math.E)',  res: '1' },
        { name: 'Math.log2(x)',   ex: 'Math.log2(1024)',   res: '10' },
        { name: 'Math.log10(x)',  ex: 'Math.log10(1000)',  res: '3' },
    ],
    trig: [
        { name: 'Math.sin(rad)',  ex: 'Math.sin(Math.PI/2)',  res: '1' },
        { name: 'Math.cos(rad)',  ex: 'Math.cos(0)',           res: '1' },
        { name: 'Math.cos(rad)',  ex: 'Math.cos(Math.PI)',     res: '-1' },
        { name: 'Math.tan(rad)',  ex: 'Math.tan(Math.PI/4)',   res: '1' },
        { name: 'Math.atan2(y,x)',ex: 'Math.atan2(1,1)',       res: 'π/4' },
    ],
    random: [
        { name: 'Math.random()',          ex: 'Math.random()',               res: '[0,1)' },
        { name: 'Random 0–9',             ex: 'Math.floor(random()*10)',     res: '0…9' },
        { name: 'Random min–max',         ex: 'floor(random()*(max-min+1))+min', res: 'int' },
    ],
    misc: [
        { name: 'Math.abs(x)',    ex: 'Math.abs(-42)',       res: '42' },
        { name: 'Math.sign(x)',   ex: 'Math.sign(-5)',       res: '-1' },
        { name: 'Math.sign(x)',   ex: 'Math.sign(0)',        res: '0' },
        { name: 'Math.hypot(a,b)',ex: 'Math.hypot(3,4)',     res: '5' },
        { name: 'Math.PI',        ex: 'Math.PI',             res: '3.14159…' },
        { name: 'Math.E',         ex: 'Math.E',              res: '2.71828…' },
    ],
};

// ── Variable Declaration Section Data ────────────────────

// ── JS Weirdness Section Data ────────────────────────────

export const weirdPanels = {
    coercion: {
        title: 'Type Coercion Madness',
        desc: 'JavaScript silently converts types when operators are used with mismatched types. The <code>+</code> operator is especially chaotic — it concatenates with strings but adds with numbers. This implicit coercion is the root of most JS "wat" moments.',
        bullets: [
            '<code>+</code> with a string → concatenation wins, everything becomes a string',
            '<code>-</code>, <code>*</code>, <code>/</code> → always try to convert to numbers',
            '<code>[] + []</code> is <code>""</code> — arrays coerce to strings first, then concatenate',
            '<code>{} + []</code> behaves differently depending on context (statement vs expression)'
        ],
        code: `<span class="cm">// The + operator is chaotic</span><br><span class="str">"5"</span> + <span class="val">3</span>       <span class="cm">// "53"  (string wins)</span><br><span class="str">"5"</span> - <span class="val">3</span>       <span class="cm">// 2     (- forces number)</span><br><span class="str">"5"</span> * <span class="val">3</span>       <span class="cm">// 15    (* forces number)</span><br><br><span class="cm">// Array coercion</span><br>[] + []         <span class="cm">// ""    (two empty strings)</span><br>[] + {}         <span class="cm">// "[object Object]"</span><br>{} + []         <span class="cm">// 0     (parsed as block + [])</span><br><br><span class="cm">// true and false as numbers</span><br><span class="kw">true</span> + <span class="kw">true</span>    <span class="cm">// 2   (1 + 1)</span><br><span class="kw">true</span> + <span class="kw">false</span>   <span class="cm">// 1   (1 + 0)</span><br><span class="val">9</span> + <span class="kw">true</span>      <span class="cm">// 10</span><br><br><span class="cm">// null and undefined</span><br><span class="kw">null</span> + <span class="val">1</span>       <span class="cm">// 1   (null → 0)</span><br><span class="kw">undefined</span> + <span class="val">1</span>  <span class="cm">// NaN (undefined → NaN)</span>`
    },
    equality: {
        title: 'Equality Gotchas',
        desc: 'The loose equality operator <code>==</code> performs type coercion before comparison, leading to some truly baffling results. This is why <strong>strict equality <code>===</code></strong> is always recommended.',
        bullets: [
            '<code>== </code> coerces types before comparing — <code>===</code> does not',
            '<code>null == undefined</code> is <code>true</code>, but neither equals <code>false</code>',
            'Empty string, <code>0</code>, and <code>false</code> are all loosely equal to each other',
            '<code>NaN</code> is not equal to anything — not even itself!'
        ],
        code: `<span class="cm">// The equality hall of shame</span><br><span class="val">0</span>  <span class="op">==</span> <span class="str">""</span>        <span class="cm">// true  😱</span><br><span class="val">0</span>  <span class="op">==</span> <span class="str">"0"</span>       <span class="cm">// true  😱</span><br><span class="str">""</span> <span class="op">==</span> <span class="str">"0"</span>       <span class="cm">// false 🤯 (not transitive!)</span><br><br><span class="kw">false</span> <span class="op">==</span> <span class="str">"0"</span>    <span class="cm">// true  😱</span><br><span class="kw">false</span> <span class="op">==</span> <span class="kw">null</span>   <span class="cm">// false</span><br><span class="kw">false</span> <span class="op">==</span> <span class="kw">undefined</span> <span class="cm">// false</span><br><span class="kw">null</span>  <span class="op">==</span> <span class="kw">undefined</span> <span class="cm">// true (special rule!)</span><br><br><span class="cm">// NaN — the loner</span><br><span class="val">NaN</span> <span class="op">===</span> <span class="val">NaN</span>     <span class="cm">// false 🤯</span><br><span class="val">NaN</span> <span class="op">==</span>  <span class="val">NaN</span>     <span class="cm">// false 🤯</span><br>Number.<span class="fn">isNaN</span>(<span class="val">NaN</span>) <span class="cm">// true ✅ (correct check)</span>`
    },
    nan: {
        title: 'NaN & Number Edge Cases',
        desc: '<code>NaN</code> stands for "Not a Number" — but <code>typeof NaN === "number"</code>. It is the only value in JS that is <strong>not equal to itself</strong>. JavaScript also has some other number quirks worth knowing.',
        bullets: [
            '<code>typeof NaN === "number"</code> — a number that is not a number 🤯',
            '<code>NaN !== NaN</code> — the only value not equal to itself',
            '<code>0.1 + 0.2 !== 0.3</code> — floating-point precision error',
            '<code>Infinity</code>, <code>-Infinity</code>, and <code>-0</code> are all valid numbers'
        ],
        code: `<span class="cm">// NaN is a "number"</span><br><span class="kw">typeof</span> <span class="val">NaN</span>      <span class="cm">// "number" 🤯</span><br><span class="val">NaN</span> === <span class="val">NaN</span>      <span class="cm">// false</span><br><span class="fn">isNaN</span>(<span class="str">"hello"</span>)  <span class="cm">// true (coerces first!)</span><br>Number.<span class="fn">isNaN</span>(<span class="str">"hello"</span>) <span class="cm">// false ✅</span><br><br><span class="cm">// Floating point</span><br><span class="val">0.1</span> + <span class="val">0.2</span>        <span class="cm">// 0.30000000000000004</span><br><span class="val">0.1</span> + <span class="val">0.2</span> === <span class="val">0.3</span> <span class="cm">// false 😱</span><br><br><span class="cm">// Infinity</span><br><span class="val">1</span> / <span class="val">0</span>            <span class="cm">// Infinity</span><br>-<span class="val">1</span> / <span class="val">0</span>           <span class="cm">// -Infinity</span><br><span class="val">Infinity</span> + <span class="val">1</span>    <span class="cm">// Infinity</span><br><span class="val">Infinity</span> - <span class="val">Infinity</span> <span class="cm">// NaN</span><br><br><span class="cm">// Negative zero</span><br>-<span class="val">0</span> === <span class="val">0</span>         <span class="cm">// true 🤯</span><br>Object.<span class="fn">is</span>(-<span class="val">0</span>, <span class="val">0</span>) <span class="cm">// false ✅</span>`
    },
    typeof: {
        title: 'typeof Lies',
        desc: 'The <code>typeof</code> operator has some notorious inaccuracies that have persisted since JavaScript\'s creation. The most famous: <code>typeof null === "object"</code> — a bug from 1995 that can never be fixed.',
        bullets: [
            '<code>typeof null === "object"</code> — a 30-year-old bug, unfixable for compatibility',
            '<code>typeof []</code> returns <code>"object"</code> — use <code>Array.isArray()</code> instead',
            '<code>typeof function(){}</code> returns <code>"function"</code> — but functions are objects',
            '<code>typeof NaN</code> returns <code>"number"</code> — a number that\'s not a number'
        ],
        code: `<span class="cm">// typeof's greatest hits</span><br><span class="kw">typeof</span> <span class="kw">null</span>          <span class="cm">// "object" 🐛 (should be "null")</span><br><span class="kw">typeof</span> []             <span class="cm">// "object" (should be "array")</span><br><span class="kw">typeof</span> <span class="val">NaN</span>           <span class="cm">// "number" (not a number is a number?)</span><br><span class="kw">typeof</span> <span class="kw">undefined</span>     <span class="cm">// "undefined" ✅ (this one is fine)</span><br><span class="kw">typeof</span> <span class="kw">function</span>(){}  <span class="cm">// "function" (technically an object)</span><br><br><span class="cm">// Better type checks</span><br>Array.<span class="fn">isArray</span>([])    <span class="cm">// true ✅</span><br>Number.<span class="fn">isNaN</span>(<span class="val">NaN</span>)    <span class="cm">// true ✅</span><br><span class="kw">null</span> === <span class="kw">null</span>        <span class="cm">// true ✅ (just use ===)</span><br><br><span class="cm">// typeof undeclared variable → no error!</span><br><span class="kw">typeof</span> doesNotExist  <span class="cm">// "undefined" (no ReferenceError)</span><br><span class="cm">// doesNotExist       → ❌ ReferenceError</span>`
    },
    automatic: {
        title: 'Automatic Semicolons (ASI)',
        desc: 'JavaScript has <strong>Automatic Semicolon Insertion (ASI)</strong> — the engine tries to insert semicolons where it thinks they should go. This can silently change the meaning of your code, especially with <code>return</code> statements.',
        bullets: [
            'JS inserts semicolons at line breaks when it finds a parsing error',
            '<code>return</code> followed by a newline returns <code>undefined</code> — the value is never reached',
            'Starting a line with <code>(</code>, <code>[</code>, or <code>\`</code> after an expression can cause unexpected concatenation',
            'Always use semicolons explicitly or use a linter to be safe'
        ],
        code: `<span class="cm">// ASI can break your return!</span><br><span class="kw">function</span> <span class="fn">getUser</span>() {<br>  <span class="kw">return</span>      <span class="cm">// ← ASI inserts ; here!</span><br>  {<br>    name: <span class="str">"Alice"</span><br>  }<br>}<br><span class="fn">getUser</span>()  <span class="cm">// undefined 😱 (not the object!)</span><br><br><span class="cm">// The fix: open brace on same line</span><br><span class="kw">function</span> <span class="fn">getUser</span>() {<br>  <span class="kw">return</span> {     <span class="cm">// ✅ brace on same line</span><br>    name: <span class="str">"Alice"</span><br>  }<br>}<br><br><span class="cm">// Dangerous line starts</span><br><span class="kw">const</span> a = <span class="val">1</span><br>(<span class="fn">console</span>).<span class="fn">log</span>(a) <span class="cm">// ❌ TypeError: 1 is not a function</span><br><span class="cm">// JS reads it as: const a = 1(console).log(a)</span>`
    },
    this: {
        title: 'The "this" Keyword',
        desc: '<code>this</code> in JavaScript depends on <strong>how</strong> a function is called, not where it is defined. This makes <code>this</code> one of the most confusing concepts — it can change from call to call.',
        bullets: [
            'In a method: <code>this</code> = the object that owns the method',
            'In a regular function: <code>this</code> = <code>window</code> (or <code>undefined</code> in strict mode)',
            'Arrow functions: <code>this</code> = inherited from enclosing scope (lexical)',
            '<code>.bind()</code>, <code>.call()</code>, <code>.apply()</code> can manually set <code>this</code>'
        ],
        code: `<span class="kw">const</span> user = {<br>  name: <span class="str">"Alice"</span>,<br>  greet() {<br>    <span class="fn">console</span>.<span class="fn">log</span>(<span class="kw">this</span>.name); <span class="cm">// "Alice" ✅</span><br>  }<br>};<br><br><span class="cm">// But extract the method...</span><br><span class="kw">const</span> fn = user.greet;<br><span class="fn">fn</span>();  <span class="cm">// undefined 😱 (this = window now)</span><br><br><span class="cm">// Arrow functions inherit this</span><br><span class="kw">const</span> team = {<br>  name: <span class="str">"JS Team"</span>,<br>  members: [<span class="str">"A"</span>, <span class="str">"B"</span>],<br>  show() {<br>    <span class="kw">this</span>.members.<span class="fn">forEach</span>(m =&gt; {<br>      <span class="fn">console</span>.<span class="fn">log</span>(<span class="kw">this</span>.name, m); <span class="cm">// ✅ arrow inherits this</span><br>    });<br>  }<br>};`
    }
};

export const weirdQuirks = [
    {
        icon: '🍌',
        title: '"ba" + + "a" + "a"',
        desc: 'The unary + tries to convert "a" to a number, gets NaN, then string concatenation takes over.',
        code: `<span class="str">"ba"</span> + + <span class="str">"a"</span> + <span class="str">"a"</span>`,
        result: '"baNaNa"',
        explanation: 'The + before "a" is unary plus → NaN → "ba" + "NaN" + "a" = "baNaNa" 🍌'
    },
    {
        icon: '🔢',
        title: '[] == ![]',
        desc: 'An empty array equals its own negation. Both sides coerce to 0 through different paths.',
        code: `[] <span class="op">==</span> ![]`,
        result: 'true',
        explanation: '![] → false → 0, [] → "" → 0. So 0 == 0 → true'
    },
    {
        icon: '➕',
        title: '++[[]][+[]]+[+[]]',
        desc: 'A valid expression that evaluates to "10" using only brackets and plus signs.',
        code: `++[[]][+[]] + [+[]]`,
        result: '"10"',
        explanation: '+[] = 0, [[]][0] = [], ++[] = 1, [0] = "0" → "1" + "0" = "10"'
    },
    {
        icon: '🔄',
        title: '[] + {} vs {} + []',
        desc: 'Order matters! The engine parses these expressions completely differently.',
        code: `[] + {}  <span class="cm">// "[object Object]"</span>\n{} + []  <span class="cm">// 0</span>`,
        result: 'Different!',
        explanation: '[] + {} → string concat. {} + [] → {} is parsed as empty block, then +[] = 0'
    },
    {
        icon: '🧮',
        title: '0.1 + 0.2',
        desc: 'The classic floating-point precision problem inherited from IEEE 754.',
        code: `<span class="val">0.1</span> + <span class="val">0.2</span>`,
        result: '0.30000000000000004',
        explanation: 'Binary floating-point cannot exactly represent 0.1 or 0.2. Use toFixed() or Math.round().'
    },
    {
        icon: '💀',
        title: 'typeof null',
        desc: 'The most famous bug in JavaScript — null is not an object, but typeof says it is.',
        code: `<span class="kw">typeof</span> <span class="kw">null</span>`,
        result: '"object"',
        explanation: 'A bug from 1995. Null\'s internal type tag was 0, same as objects. Cannot be fixed without breaking the web.'
    },
    {
        icon: '🤹',
        title: 'true + true + true',
        desc: 'Boolean addition: true is coerced to 1, so adding booleans gives you math.',
        code: `<span class="kw">true</span> + <span class="kw">true</span> + <span class="kw">true</span>`,
        result: '3',
        explanation: 'true → 1. So 1 + 1 + 1 = 3. Similarly, false → 0.'
    },
    {
        icon: '🪄',
        title: 'Math.max() < Math.min()',
        desc: 'With no arguments, max returns -Infinity and min returns Infinity.',
        code: `Math.<span class="fn">max</span>() < Math.<span class="fn">min</span>()`,
        result: 'true',
        explanation: 'Math.max() = -Infinity (identity for max). Math.min() = Infinity (identity for min). -Infinity < Infinity = true.'
    },
    {
        icon: '🎭',
        title: '(!+[]+[]+![]).length',
        desc: 'A chaotic expression that evaluates to a specific number through multiple coercions.',
        code: `(!+[]+[]+![]).<span class="fn">length</span>`,
        result: '9',
        explanation: '!+[] = !0 = true, true+[] = "true", ![] = false → "true" + "false" = "truefalse" → length 9'
    }
];

export const varPanels = {
    var: {
        title: 'var — The Old Way',
        desc: 'The original variable keyword from 1995. <strong>Function-scoped</strong> and <strong>hoisted</strong> to the top of its function. Avoid in modern JS — its behaviour causes bugs.',
        bullets: [
            '<code>var</code> is function-scoped, NOT block-scoped',
            'Declarations are hoisted — the variable exists before its line',
            'Can be re-declared and re-assigned freely',
            'Leaks out of <code>if</code>, <code>for</code>, and other blocks'
        ],
        code: `<span class="cm">// var is FUNCTION-scoped, not block-scoped</span><br>
         <span class="kw">function</span> <span class="fn">demo</span>()
          { <br>  <span class="kw">if</span> (<span class="kw">true</span>) {<br>   
         <span class="kw">var</span> x = <span class="val">10</span>; <span class="cm">
          leaks out of the if block!</span><br> }<br>
          <span class="fn">console</span>.<span class="fn">log</span>(x); 
         <span class="cm">// 10 — still accessible! 😱</span> <br>}<br><span class="cm">
          Hoisting — var is hoisted as undefined</span> <br> <span class="fn">console</span>.<span class="fn">log</span>(y);
          <span class="cm">// undefined (not an error!)</span><br><span class="kw">var</span>
         y = <span class="val">5</span>;<br><span class="cm">// Re-declaration is allowed (confusing!)</span><br>
        <span class="kw">var</span>
         name = <span class="str">"Alice"</span>;<br><span class="kw">var</span>
          name = <span class="str">"Bob"</span>; <span class="cm">// No error ❌</span>`
    },
    let: {
        title: 'let — The Modern Variable',
        desc: 'Introduced in ES6 (2015). <strong>Block-scoped</strong> — it exists only within the <code>{ }</code> it is declared in. Cannot be re-declared. The preferred choice for variables that change.',
        bullets: [
            '<code>let</code> is block-scoped — lives inside <code>{ }</code> only',
            'Hoisted but NOT initialised — accessing before declaration causes a <strong>ReferenceError</strong> (Temporal Dead Zone)',
            'Can be re-assigned, but NOT re-declared in the same scope',
            'Great for loop counters and values that will change'
        ],
        code: `<span class="cm">// Block scope — stays inside { }</span> <br>
         <span class="kw">if</span> (<span class="kw">true</span>) {<br>
          <span class="kw">let</span> score = <span class="val">100</span>; <br>  <span class="fn">console</span>.<span class="fn">log</span>(score); <span class="cm">// 100 ✅</span>} <br><span class="cm"> console.log(score); ❌ ReferenceError</span> <br>
           <span class="cm">// Re-assign is fine</span><br><span class="kw">let</span> count = <span class="val">0</span>;<br>
           count = <span class="val">1</span>; <span class="cm">// ✅ allowed</span><br>
           <span class="cm">// Re-declare is NOT allowed</span><br><span class="cm"> let count = 5; ❌ SyntaxError</span><br>
           <span class="cm">// TDZ — Temporal Dead Zone</span><br><span class="cm"> console.log(a); ❌ ReferenceError</span><br>
           <span class="kw">let</span> a = <span class="val">42</span>;`
    },
    const: {
        title: 'const — Constant Binding',
        desc: 'Also block-scoped like <code>let</code>. The variable <strong>binding</strong> cannot be re-assigned after declaration. Note: objects and arrays declared with <code>const</code> can still have their <em>contents</em> mutated.',
        bullets: [
            'Must be initialised at declaration — cannot be left empty',
            'Re-assignment throws a <strong>TypeError</strong>',
            '<strong>Objects &amp; Arrays</strong> declared with <code>const</code> are still mutable — the reference is locked, not the content',
            'Use <code>const</code> by default; only switch to <code>let</code> when you need to reassign'
        ],
        code: `<span class="cm">// Must initialise immediately</span><br>
         <span class="kw">const</span> PI = <span class="val">3.14159</span>;<br><span class="cm">// Re-assignment throws TypeError</span><br>
        <span class="cm"> PI = 3; ❌ TypeError</span><br>
         <span class="cm">// Objects are STILL mutable</span><br>
         <span class="kw">const</span> user = { name: <span class="str">"Alice"</span> }; <br>
         user.name = <span class="str">"Bob"</span>; <span class="cm">// ✅ OK — mutating contents</span><br>
          <span class="cm"> user = {}; ❌ TypeError — rebinding blocked</span><br>
          <span class="cm">// Arrays too</span><br><span class="kw">const</span>
            nums = [<span class="val">1</span>, <span class="val">2</span>, <span class="val">3</span>]; <br>
           nnums.<span class="fn">push</span>(<span class="val">4</span>); <span class="cm">// ✅ OK</span><br>
           <span class="cm">// nums = []; ❌ TypeError</span>`
    },
    compare: {
        title: 'var vs let vs const',
        desc: 'A side-by-side comparison of all three keywords. The modern rule is simple: <strong>use <code>const</code> by default, <code>let</code> when you need to reassign, and avoid <code>var</code> entirely.</strong>',
        bullets: [
            '<strong>Scope:</strong> <code>var</code> → function &nbsp; <code>let</code>/<code>const</code> → block',
            '<strong>Hoisting:</strong> <code>var</code> → hoisted as <code>undefined</code> &nbsp; <code>let</code>/<code>const</code> → TDZ (error if accessed early)',
            '<strong>Re-declare:</strong> <code>var</code> → ✅ allowed &nbsp; <code>let</code>/<code>const</code> → ❌ SyntaxError',
            '<strong>Re-assign:</strong> <code>var</code>/<code>let</code> → ✅ allowed &nbsp; <code>const</code> → ❌ TypeError'
        ],
        code: `<span class="cm">// ─── SCOPE ───────────────────────────</span><br>
         { <span class="kw">var</span>   x = <span class="val">1</span>; <span class="cm">// leaks out of block!</span><br>
            <span class="kw">let</span>   y = <span class="val">2</span>; <span class="cm">// block-scoped ✅</span><br>
            <span class="kw">const</span> z = <span class="val">3</span>; <span class="cm">// block-scoped ✅</span>}<br>
             <span class="fn">console</span>.<span class="fn">log</span>(x); <span class="cm">// 1 (leaked!)</span><br>
             <span class="cm">// y and z → ReferenceError ✅</span><br>
             <span class="cm">// ─── HOISTING ─────────────────────────</span><br>
            <span class="fn">console</span>.<span class="fn">log</span>(a); <span class="cm">// undefined (var)</span><br>
            <span class="cm">// console.log(b); ❌ TDZ Error (let)</span><br>
            <span class="kw">var</span>   a = <span class="val">10</span>;<br>
             <span class="kw">let</span>   b = <span class="val">20</span>;<br>
             <span class="kw">const</span> c = <span class="val">30</span>;`
    },
    scope: {
        title: 'Scope Deep Dive',
        desc: '<strong>Scope</strong> is the region of code where a variable is accessible. JS has three main scopes: <strong>global</strong>, <strong>function</strong>, and <strong>block</strong>. Understanding scope prevents accidental variable leaks and naming conflicts.',
        bullets: [
            '<strong>Global scope</strong> — declared outside any function/block; accessible everywhere',
            '<strong>Function scope</strong> — <code>var</code>, <code>let</code>, <code>const</code> inside a function are local to it',
            '<strong>Block scope</strong> — <code>let</code>/<code>const</code> inside <code>{ }</code> are confined to that block',
            '<strong>Lexical scope</strong> — inner functions can access outer variables (closures!)'
        ],
        code: `<span class="kw">const</span> global = <span class="str">"I am global"</span>; <span class="cm">// global scope</span>\n\n<span class="kw">function</span> <span class="fn">outer</span>() {\n  <span class="kw">const</span> outerVar = <span class="str">"outer"</span>;\n\n  <span class="kw">function</span> <span class="fn">inner</span>() {\n    <span class="kw">const</span> innerVar = <span class="str">"inner"</span>;\n    <span class="fn">console</span>.<span class="fn">log</span>(global);   <span class="cm">// ✅ global</span>\n    <span class="fn">console</span>.<span class="fn">log</span>(outerVar); <span class="cm">// ✅ lexical</span>\n    <span class="fn">console</span>.<span class="fn">log</span>(innerVar); <span class="cm">// ✅ local</span>\n  }\n\n  <span class="fn">inner</span>();\n  <span class="cm">// innerVar not accessible here ❌</span>\n}\n\n<span class="cm">// Block scope with let/const</span>\n<span class="kw">for</span> (<span class="kw">let</span> i = <span class="val">0</span>; i < <span class="val">3</span>; i++) {\n  <span class="cm">// i is scoped to the loop only</span>\n}\n<span class="cm">// console.log(i); ❌ ReferenceError</span>`
    }
};
