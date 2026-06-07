export const typeData = {
    string: {
        name: 'String',
        typeof: 'typeof x === "string"',
        examples: ['"hello"', '"JavaScript"', '`template ${literal}`', '"" (empty)']
    },
    number: {
        name: 'Number',
        typeof: 'typeof x === "number"',
        examples: ['42', '3.14', '-7', 'Infinity', 'NaN (also a number!)']
    },
    boolean: {
        name: 'Boolean',
        typeof: 'typeof x === "boolean"',
        examples: ['true', 'false']
    },
    null: {
        name: 'Null',
        typeof: 'typeof null === "object" (bug!)',
        examples: ['null', '// intentional absence of value']
    },
    undefined: {
        name: 'Undefined',
        typeof: 'typeof x === "undefined"',
        examples: ['undefined', 'let x; // x is undefined', 'void 0']
    },
    symbol: {
        name: 'Symbol',
        typeof: 'typeof x === "symbol"',
        examples: ['Symbol("id")', 'Symbol.iterator', '// always unique']
    },
    bigint: {
        name: 'BigInt',
        typeof: 'typeof x === "bigint"',
        examples: ['9007199254740991n', 'BigInt(123)', '// for huge integers']
    },
    object: {
        name: 'Object',
        typeof: 'typeof x === "object"',
        examples: ['{ name: "Alice" }', '{ key: "value", num: 42 }', 'null (also "object"!)']
    },
    array: {
        name: 'Array',
        typeof: 'typeof x === "object" (Array!)',
        examples: ['[1, 2, 3]', '["a", "b"]', 'Array.isArray(x) // true check']
    },
    function: {
        name: 'Function',
        typeof: 'typeof x === "function"',
        examples: ['function foo() {}', 'const bar = () => {}', '// functions are objects']
    }
};

export const fnPanels = {
    declaration: {
        title: 'Function Declaration',
        desc: 'The classic way. Defined with the <code>function</code> keyword. <strong>Hoisted</strong> — you can call it before its definition in code.',
        bullets: ['Available throughout its scope (hoisted)', 'Has its own <code>this</code> binding', 'Can be recursive by name'],
        code: `<span class="cm">// Can be called BEFORE definition</span>
<span class="fn">greet</span>(<span class="str">"World"</span>); <span class="cm">// ✅ Works!</span>

<span class="kw">function</span> <span class="fn">greet</span>(name) {
  <span class="kw">return</span> <span class="str">\`Hello, \${name}!\`</span>;
}

<span class="cm">// Named — shows in stack traces</span>
<span class="fn">greet</span>(<span class="str">"JS"</span>); <span class="cm">// "Hello, JS!"</span>`
    },
    expression: {
        title: 'Function Expression',
        desc: 'A function assigned to a variable. <strong>Not hoisted</strong> — must be defined before use. Can be anonymous or named.',
        bullets: ['Not hoisted — order matters', 'Can be anonymous or named', 'Useful for conditional function assignment'],
        code: `<span class="cm">// NOT hoisted — this would fail:</span>
<span class="cm">// greet(); ❌ ReferenceError</span>

<span class="kw">const</span> greet = <span class="kw">function</span>(name) {
  <span class="kw">return</span> <span class="str">\`Hi, \${name}!\`</span>;
};

<span class="cm">// Named function expression:</span>
<span class="kw">const</span> factorial = <span class="kw">function</span> <span class="fn">fact</span>(n) {
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
