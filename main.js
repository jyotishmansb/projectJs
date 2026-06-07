import { typeData, fnPanels, condPanels, loopPanels, opPanels, opRefCards, mathPanels, mathMethods, mathConstants } from './data.js';

// ── Canvas Particle Background ──────────────────────────
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.r = Math.random() * 1.5 + 0.3;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139,92,246,${this.alpha})`;
            ctx.fill();
        }
    }

    resize();
    for (let i = 0; i < 120; i++) particles.push(new Particle());
    window.addEventListener('resize', resize);

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(loop);
    }
    loop();
}

// ── Typewriter Hero ──────────────────────────────────────
function initTypewriter() {
    const el = document.getElementById('typewriter-code');
    const lines = [
        { text: `<span class="cm">// My JavaScript Journey 🚀</span>`, delay: 0 },
        { text: `<span class="kw">const</span> me = {`, delay: 400 },
        { text: `  name: <span class="str">"JS Learner"</span>,`, delay: 700 },
        { text: `  language: <span class="str">"JavaScript"</span>,`, delay: 1000 },
        { text: `  types: [<span class="str">"string"</span>, <span class="str">"number"</span>],`, delay: 1300 },
        { text: `  loves: () => <span class="str">"coding"</span>`, delay: 1600 },
        { text: `};`, delay: 1900 },
        { text: ``, delay: 2100 },
        { text: `<span class="cm">// Let's explore! 👇</span>`, delay: 2200 },
    ];

    el.innerHTML = '';
    lines.forEach(({ text, delay }) => {
        setTimeout(() => {
            const span = document.createElement('span');
            span.className = 'tw-line';
            span.innerHTML = text;
            el.appendChild(span);
        }, delay);
    });
    setTimeout(() => {
        const cursor = document.createElement('span');
        cursor.className = 'tw-cursor';
        el.appendChild(cursor);
    }, 2400);
}

// ── Nav Scroll & Progress ────────────────────────────────
function initNav() {
    const nav = document.getElementById('top-nav');
    const fill = document.getElementById('progress-ring-fill');
    const pct = document.getElementById('progress-pct');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const circumference = 2 * Math.PI * 16;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(scrolled / total, 1);

        nav.classList.toggle('scrolled', scrolled > 50);
        fill.style.strokeDashoffset = circumference * (1 - progress);
        pct.textContent = Math.round(progress * 100) + '%';

        // Active nav link
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        links.forEach(l => l.classList.toggle('active', l.dataset.section === current));
    });
}

// ── AOS (Animate On Scroll) ──────────────────────────────
function initAOS() {
    const items = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    items.forEach(el => observer.observe(el));
}

// ── Data Types Section ───────────────────────────────────
function initDataTypes() {
    const tags = document.querySelectorAll('.type-tag');
    const body = document.getElementById('type-explorer-body');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('selected'));
            tag.classList.add('selected');
            const info = typeData[tag.dataset.type];
            body.innerHTML = `
                <div>
                    <div class="type-info-name">${info.name}</div>
                    <div class="type-info-typeof">${info.typeof}</div>
                    <ul class="type-info-examples">
                        ${info.examples.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>`;
        });
    });

    // typeof demo
    document.getElementById('typeof-btn').addEventListener('click', () => {
        const raw = document.getElementById('typeof-input').value.trim();
        const output = document.getElementById('typeof-output');
        let result, type;
        try {
            const val = eval(raw);
            type = typeof val;
            const isArr = Array.isArray(val);
            const display = isArr ? 'array (typeof: "object")' : type;
            result = `<span class="out-typeof">typeof ${raw} === <strong>"${type}"</strong></span>${isArr ? `<br><span style="color:var(--a1);font-size:.8rem">💡 Use Array.isArray() to detect arrays</span>` : ''}`;
        } catch {
            result = `<span style="color:#ef4444">❌ Cannot evaluate — try: 42, "hello", true, null, [], {}</span>`;
        }
        output.innerHTML = result;
        output.style.animation = 'none';
        output.offsetHeight;
        output.style.animation = 'fadeUp .3s forwards';
    });

    document.getElementById('typeof-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('typeof-btn').click();
    });
}

// ── Truthy/Falsy Section ─────────────────────────────────
function initTruthyFalsy() {
    const btn = document.getElementById('tf-btn');
    const input = document.getElementById('tf-input');
    const output = document.getElementById('tf-output');

    function evaluate(raw) {
        let val, isTruthy, display;
        const specials = { 'false': false, '0': 0, '-0': -0, '0n': 0n, '""': '', "''": '', 'null': null, 'undefined': undefined, 'NaN': NaN };
        if (raw in specials) {
            val = specials[raw];
        } else {
            try { val = eval(raw); } catch { val = raw; }
        }
        isTruthy = Boolean(val);
        const label = isTruthy
            ? `<span class="out-truthy">✅ TRUTHY — if (${raw}) { } would run!</span>`
            : `<span class="out-falsy">❌ FALSY — if (${raw}) { } would NOT run!</span>`;
        output.innerHTML = `${label}<br><span style="color:var(--muted);font-size:.8rem">Boolean(${raw}) = <strong style="color:${isTruthy?'var(--a5)':'#ef4444'}">${isTruthy}</strong></span>`;
    }

    btn.addEventListener('click', () => evaluate(input.value.trim() || ''));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });

    document.querySelectorAll('.tf-quick').forEach(q => {
        q.addEventListener('click', () => {
            input.value = q.dataset.val;
            evaluate(q.dataset.val);
        });
    });
}

// ── Functions Section ────────────────────────────────────
function initFunctions() {
    const tabs = document.querySelectorAll('.fn-tab');
    const content = document.getElementById('fn-content');

    function renderPanel(key) {
        const p = fnPanels[key];
        content.innerHTML = `
            <div class="fn-panel active">
                <div class="fn-desc">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
                <div class="fn-code-block"><code>${p.code}</code></div>
            </div>`;
    }

    renderPanel('declaration');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderPanel(tab.dataset.tab);
        });
    });

    // Sandbox
    document.getElementById('fn-run').addEventListener('click', () => {
        const code = document.getElementById('fn-sandbox').value;
        const out = document.getElementById('fn-output');
        const logs = [];
        const origLog = console.log;
        console.log = (...args) => logs.push(args.map(a => JSON.stringify(a) ?? String(a)).join(' '));
        try {
            const result = eval(code);
            console.log = origLog;
            const resultStr = result !== undefined ? JSON.stringify(result) ?? String(result) : undefined;
            out.innerHTML = [
                ...logs.map(l => `<span style="color:var(--muted)">log: </span><span style="color:var(--a5)">${l}</span>`),
                resultStr !== undefined ? `<span style="color:var(--muted)">→ </span><span style="color:var(--a1)">${resultStr}</span>` : ''
            ].filter(Boolean).join('<br>') || '<span class="output-placeholder">// No output</span>';
        } catch (err) {
            console.log = origLog;
            out.innerHTML = `<span style="color:#ef4444">❌ ${err.message}</span>`;
        }
    });
}

// ── Memory Section ───────────────────────────────────────
function initMemory() {
    document.getElementById('stack-demo-btn').addEventListener('click', () => {
        let a = 10, b = a;
        b = 20;
        document.getElementById('stack-result').textContent = `a = ${a}, b = ${b} → a unchanged ✅`;
    });

    document.getElementById('heap-demo-btn').addEventListener('click', () => {
        const obj1 = { name: 'Alice' };
        const obj2 = obj1;
        obj2.name = 'Mutated!';
        document.getElementById('heap-result').textContent = `obj1.name = "${obj1.name}" ⚠️ Both changed!`;
    });

    const copyOutput = document.getElementById('copy-output');
    const methods = {
        spread: () => {
            const original = { a: 1, nested: { b: 2 } };
            const copy = { ...original };
            copy.a = 99;
            return `<span class="cm">// Spread operator (shallow copy)</span>
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };
copy.a = 99;
<span class="cm">// original.a = ${original.a} ✅ (not affected)</span>
<span class="cm">// BUT nested objects still shared!</span>`;
        },
        assign: () => {
            return `<span class="cm">// Object.assign (also shallow)</span>
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original);
copy.a = 99;
<span class="cm">// original.a = 1 ✅ (not affected)</span>
<span class="cm">// Same caveat — nested objects shared</span>`;
        },
        json: () => {
            return `<span class="cm">// JSON deep copy (simple but limited)</span>
const original = { a: 1, nested: { b: 2 } };
const deep = JSON.parse(JSON.stringify(original));
deep.nested.b = 99;
<span class="cm">// original.nested.b = 2 ✅ Truly independent!</span>
<span class="cm">// ⚠️ Loses: functions, undefined, Date, etc.</span>`;
        }
    };

    function showCopyMethod(method) {
        copyOutput.innerHTML = `<code style="white-space:pre;line-height:2;font-family:var(--mono);font-size:.83rem">${methods[method]()}</code>`;
    }
    showCopyMethod('spread');

    document.querySelectorAll('.copy-method-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.copy-method-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showCopyMethod(btn.dataset.method);
        });
    });
}

// ── Quirks Section ───────────────────────────────────────
function initQuirks() {
    document.getElementById('floor-btn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('floor-input').value);
        const out = document.getElementById('floor-output');
        if (isNaN(val)) {
            out.innerHTML = '<span style="color:#ef4444">Enter a number</span>';
            return;
        }
        out.innerHTML = `<span style="color:var(--a5)">Math.floor(${val}) = <strong>${Math.floor(val)}</strong></span>`;
    });
}

// ── Control Flow Section ────────────────────────────────
function initControlFlow() {
    // ── Subnav: switch between Conditionals / Loops groups
    const subnavBtns = document.querySelectorAll('.cf-subnav-btn');
    subnavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            subnavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const group = btn.dataset.group;
            document.getElementById('cf-group-conditionals').classList.toggle('hidden', group !== 'conditionals');
            document.getElementById('cf-group-loops').classList.toggle('hidden', group !== 'loops');
        });
    });

    // ── Conditionals tab explorer
    function renderCondPanel(key) {
        const p = condPanels[key];
        document.getElementById('cond-content').innerHTML = `
            <div class="fn-panel active">
                <div class="fn-desc">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
                <div class="fn-code-block"><code>${p.code}</code></div>
            </div>`;
    }
    renderCondPanel('if-else');
    document.querySelectorAll('[data-ctab]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-ctab]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCondPanel(tab.dataset.ctab);
        });
    });

    // ── Conditional Playground
    let activeOp = 'if';
    document.querySelectorAll('.cond-op-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cond-op-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeOp = btn.dataset.op;
        });
    });

    document.getElementById('cond-run-btn').addEventListener('click', () => {
        const raw = document.getElementById('cond-input').value.trim();
        const out = document.getElementById('cond-output');
        const specials = { 'false': false, '0': 0, 'null': null, 'undefined': undefined, 'NaN': NaN, '""': '', "''": '' };
        let val;
        if (raw in specials) { val = specials[raw]; }
        else { try { val = eval(raw); } catch { val = raw; } }

        let result = '';
        const bool = Boolean(val);
        const display = raw || '(empty)';
        if (activeOp === 'if') {
            result = `<span style="color:var(--muted)">if (${display}) {</span>\n  <span style="color:${bool ? 'var(--a5)' : '#ef4444'}">${bool ? '✅ This block runs!' : '❌ This block is skipped'}</span>\n<span style="color:var(--muted)">} else {</span>\n  <span style="color:${bool ? 'var(--muted)' : 'var(--a5)'};opacity:.7">${bool ? '(skipped)' : '✅ else block runs'}</span>\n<span style="color:var(--muted)">}</span>`;
        } else if (activeOp === 'ternary') {
            result = `<span style="color:var(--muted)">${display} ? <span style="color:var(--a5)">"truthy branch"</span> : <span style="color:#ef4444">"falsy branch"</span></span>\n→ <span style="color:var(--a1);font-weight:700">${bool ? '"truthy branch"' : '"falsy branch"'}</span>`;
        } else if (activeOp === 'nullish') {
            const isNullish = val === null || val === undefined;
            result = `<span style="color:var(--muted)">${display} ?? "default"</span>\n→ <span style="color:var(--a1);font-weight:700">${isNullish ? '"default" (was null/undefined)' : String(val) + ' (kept original)'}</span>\n<span style="color:var(--muted);font-size:.8em">?? only replaces null and undefined, not 0 or ""</span>`;
        } else if (activeOp === 'or') {
            result = `<span style="color:var(--muted)">${display} || "default"</span>\n→ <span style="color:var(--a1);font-weight:700">${bool ? String(val) + ' (kept original)' : '"default" (was falsy)'}</span>\n<span style="color:var(--muted);font-size:.8em">|| replaces ANY falsy value (0, "", null, undefined, false)</span>`;
        }
        out.innerHTML = `<span style="white-space:pre;font-family:var(--mono);font-size:.85rem;line-height:1.9">${result}</span>`;
    });

    document.getElementById('cond-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('cond-run-btn').click();
    });

    // ── Loops tab explorer
    function renderLoopPanel(key) {
        const p = loopPanels[key];
        document.getElementById('loop-content').innerHTML = `
            <div class="fn-panel active">
                <div class="fn-desc">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
                <div class="fn-code-block"><code>${p.code}</code></div>
            </div>`;
    }
    renderLoopPanel('for');
    document.querySelectorAll('[data-ltab]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-ltab]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderLoopPanel(tab.dataset.ltab);
        });
    });

    // ── Loop Visualizer
    const rangeEl = document.getElementById('loop-count');
    const rangeVal = document.getElementById('loop-count-val');
    const codePreview = document.getElementById('loop-code-preview');
    let vizLoopType = 'for';

    const loopCodeTemplates = {
        for:   n => `<span class="kw">for</span> (<span class="kw">let</span> i = <span class="val">0</span>; i &lt; <span class="val">${n}</span>; i++) {\n  <span class="cm">// iteration i</span>\n}`,
        while: n => `<span class="kw">let</span> i = <span class="val">0</span>;\n<span class="kw">while</span> (i &lt; <span class="val">${n}</span>) {\n  <span class="cm">// iteration i</span>\n  i++;\n}`,
        forof: n => `<span class="kw">const</span> arr = [<span class="val">${Array.from({length:n},(_,i)=>i).join(', ')}</span>];\n<span class="kw">for</span> (<span class="kw">const</span> item <span class="kw">of</span> arr) {\n  <span class="cm">// item = current value</span>\n}`,
    };

    function updateCodePreview() {
        const n = parseInt(rangeEl.value);
        codePreview.innerHTML = loopCodeTemplates[vizLoopType](n);
    }
    updateCodePreview();

    rangeEl.addEventListener('input', () => {
        rangeVal.textContent = rangeEl.value;
        updateCodePreview();
    });

    document.querySelectorAll('.loop-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.loop-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            vizLoopType = btn.dataset.loop;
            updateCodePreview();
        });
    });

    document.getElementById('loop-run-btn').addEventListener('click', () => {
        const n = parseInt(rangeEl.value);
        const steps = document.getElementById('loop-steps');
        steps.innerHTML = '';
        const items = vizLoopType === 'forof'
            ? Array.from({length: n}, (_, i) => ({ label: `item`, val: i }))
            : Array.from({length: n}, (_, i) => ({ label: `i`, val: i }));

        items.forEach((item, idx) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'loop-step done';
                div.style.animationDelay = `0ms`;
                div.innerHTML = `
                    <span class="loop-step-num">iter ${idx + 1}</span>
                    <span class="loop-step-icon">▶</span>
                    <span class="loop-step-val">${item.label} = <strong>${item.val}</strong></span>
                `;
                steps.appendChild(div);
                steps.scrollTop = steps.scrollHeight;

                if (idx === items.length - 1) {
                    setTimeout(() => {
                        const done = document.createElement('div');
                        done.className = 'loop-step active-step';
                        done.innerHTML = `<span class="loop-step-num">done</span><span class="loop-step-val">Loop finished ✅ (${n} iterations)</span>`;
                        steps.appendChild(done);
                        steps.scrollTop = steps.scrollHeight;
                    }, 200);
                }
            }, idx * 180);
        });
    });
}

// ── Boot ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initTypewriter();
    initNav();
    initAOS();
    initDataTypes();
    initTruthyFalsy();
    initFunctions();
    initMemory();
    initQuirks();
    initControlFlow();
    initOperators();
    initMath();
});

// ── Operators Section ───────────────────────────────────
function initOperators() {
    const opContent = document.getElementById('op-content');
    const opRefGrid = document.getElementById('op-ref-grid');

    function renderOpPanel(key) {
        const p = opPanels[key];
        opContent.innerHTML = `
            <div class="fn-panel active">
                <div class="fn-desc">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
                <div class="fn-code-block"><code>${p.code}</code></div>
            </div>`;

        // Reference cards
        const cards = opRefCards[key] || [];
        opRefGrid.innerHTML = cards.map(c => `
            <div class="op-ref-card">
                <span class="op-ref-sym">${c.sym}</span>
                <span class="op-ref-name">${c.name}</span>
                <span class="op-ref-ex">${c.ex}</span>
                <span class="op-ref-res">→ ${c.res}</span>
            </div>`).join('');
    }

    renderOpPanel('arithmetic');

    document.querySelectorAll('[data-optab]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-optab]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderOpPanel(tab.dataset.optab);
        });
    });

    // ── Arithmetic Sandbox
    function runArith() {
        const a = parseFloat(document.getElementById('arith-a').value);
        const op = document.getElementById('arith-op').value;
        const b = parseFloat(document.getElementById('arith-b').value);
        const out = document.getElementById('arith-output');
        if (isNaN(a) || isNaN(b)) { out.innerHTML = '<span style="color:#ef4444">Enter valid numbers</span>'; return; }
        let result;
        switch (op) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = b === 0 ? 'Infinity' : a / b; break;
            case '%': result = a % b; break;
            case '**': result = a ** b; break;
        }
        out.innerHTML = `<span style="color:var(--muted)">${a} ${op} ${b} = </span><span style="color:var(--a1);font-size:1.3rem;font-weight:800">${result}</span>`;
    }
    document.getElementById('arith-btn').addEventListener('click', runArith);
    ['arith-a','arith-b'].forEach(id => {
        document.getElementById(id).addEventListener('keydown', e => { if(e.key==='Enter') runArith(); });
    });
    document.getElementById('arith-op').addEventListener('change', runArith);
    runArith();

    // ── Comparison Truth Table
    function runComparison() {
        const rawA = document.getElementById('cmp-a').value.trim() || '5';
        const rawB = document.getElementById('cmp-b').value.trim() || '"5"';
        let a, b;
        const tbody = document.getElementById('cmp-tbody');
        try { a = eval(rawA); } catch { a = rawA; }
        try { b = eval(rawB); } catch { b = rawB; }

        const ops = [
            { op: '==',  label: '==',  fn: (a,b) => a == b },
            { op: '===', label: '===', fn: (a,b) => a === b },
            { op: '!=',  label: '!=',  fn: (a,b) => a != b },
            { op: '!==', label: '!==', fn: (a,b) => a !== b },
            { op: '>',   label: '>',   fn: (a,b) => a > b },
            { op: '<',   label: '<',   fn: (a,b) => a < b },
            { op: '>=',  label: '>=',  fn: (a,b) => a >= b },
            { op: '<=',  label: '<=',  fn: (a,b) => a <= b },
        ];

        tbody.innerHTML = ops.map(({op, label, fn}) => {
            let result;
            try { result = fn(a, b); } catch { result = 'error'; }
            const cls = result === true ? 'cmp-true' : result === false ? 'cmp-false' : '';
            const icon = result === true ? '✅' : result === false ? '❌' : '⚠️';
            return `<tr>
                <td><span class="cmp-op-badge">${label}</span></td>
                <td>${rawA} ${label} ${rawB}</td>
                <td class="${cls}">${icon} ${result}</td>
            </tr>`;
        }).join('');
    }
    document.getElementById('cmp-btn').addEventListener('click', runComparison);
    ['cmp-a','cmp-b'].forEach(id => {
        document.getElementById(id).addEventListener('keydown', e => { if(e.key==='Enter') runComparison(); });
    });
    runComparison();

    // ── Logical Evaluator
    function runLogical() {
        const rawA = document.getElementById('log-a').value.trim() || 'true';
        const rawB = document.getElementById('log-b').value.trim() || 'false';
        const container = document.getElementById('log-results');
        const specials = { 'true': true, 'false': false, 'null': null, 'undefined': undefined, 'NaN': NaN, '0': 0, '""': '', "''": '' };
        const resolve = raw => raw in specials ? specials[raw] : (() => { try { return eval(raw); } catch { return raw; } })();
        const a = resolve(rawA), b = resolve(rawB);

        const fmt = v => {
            const s = v === null ? 'null' : v === undefined ? 'undefined' : JSON.stringify(v) ?? String(v);
            const cls = v ? 't' : (v === false || v === 0 || v === '' || v !== v || v === null || v === undefined) ? 'f' : 'other';
            return `<span class="log-val ${cls}">${s}</span>`;
        };

        const rows = [
            { op: '&&',  expr: `${rawA} && ${rawB}`,  val: a && b },
            { op: '||',  expr: `${rawA} || ${rawB}`,  val: a || b },
            { op: '!a',  expr: `!${rawA}`,             val: !a },
            { op: '!b',  expr: `!${rawB}`,             val: !b },
            { op: '??',  expr: `${rawA} ?? ${rawB}`,   val: a ?? b },
            { op: '!!a', expr: `!!${rawA}`,            val: !!a },
        ];

        container.innerHTML = rows.map(r =>
            `<div class="log-row">
                <span class="log-op">${r.op}</span>
                <span class="log-expr">${r.expr}</span>
                <span>→ ${fmt(r.val)}</span>
            </div>`
        ).join('');
    }
    document.getElementById('log-btn').addEventListener('click', runLogical);
    ['log-a','log-b'].forEach(id => {
        document.getElementById(id).addEventListener('keydown', e => { if(e.key==='Enter') runLogical(); });
    });
    runLogical();
}

// ── Math Section ────────────────────────────────────────────
function initMath() {
    // ── Constants strip
    const constEl = document.getElementById('math-constants');
    constEl.innerHTML = mathConstants.map(c => `
        <div class="math-const-card" style="--cc:${c.color}">
            <span class="mc-name">${c.name}</span>
            <span class="mc-val">${c.val}</span>
            <span class="mc-desc">${c.desc}</span>
        </div>`).join('');

    // ── Tab + method grid
    const mathContent = document.getElementById('math-content');
    const mathGrid   = document.getElementById('math-method-grid');

    function renderMathPanel(key) {
        const p = mathPanels[key];
        mathContent.innerHTML = `
            <div class="fn-panel active">
                <div class="fn-desc">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
                </div>
                <div class="fn-code-block"><code>${p.code}</code></div>
            </div>`;

        const methods = mathMethods[key] || [];
        mathGrid.innerHTML = methods.map(m => `
            <div class="math-method-card">
                <span class="mm-name">${m.name}</span>
                <span class="mm-ex">${m.ex}</span>
                <span class="mm-res">→ ${m.res}</span>
            </div>`).join('');
    }
    renderMathPanel('rounding');

    document.querySelectorAll('[data-mtab]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-mtab]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMathPanel(tab.dataset.mtab);
        });
    });

    // ── Live Math Calculator
    function runMathCalc() {
        const method = document.getElementById('math-method-sel').value;
        const x = parseFloat(document.getElementById('math-calc-input').value);
        const out = document.getElementById('math-calc-output');
        if (isNaN(x)) { out.innerHTML = '<span style="color:#ef4444">Enter a valid number</span>'; return; }
        const result = Math[method](x);
        const rounded = typeof result === 'number' ? (Number.isInteger(result) ? result : parseFloat(result.toFixed(8))) : result;
        out.innerHTML = `<span style="color:var(--muted)">Math.${method}(${x}) = </span><span style="color:var(--a1);font-size:1.3rem;font-weight:800">${rounded}</span>`;
    }
    document.getElementById('math-calc-btn').addEventListener('click', runMathCalc);
    document.getElementById('math-method-sel').addEventListener('change', runMathCalc);
    document.getElementById('math-calc-input').addEventListener('keydown', e => { if(e.key==='Enter') runMathCalc(); });
    runMathCalc();

    // ── Random Number Visualizer
    function generateRandom() {
        const min   = parseInt(document.getElementById('rand-min').value) || 1;
        const max   = parseInt(document.getElementById('rand-max').value) || 100;
        const count = Math.min(parseInt(document.getElementById('rand-count').value) || 10, 30);
        const viz   = document.getElementById('rand-viz');
        const fml   = document.getElementById('rand-formula');

        if (min >= max) { viz.innerHTML = '<span style="color:#ef4444">Min must be less than Max</span>'; return; }

        const nums = Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1)) + min);
        const range = max - min || 1;

        viz.innerHTML = nums.map((n, i) => {
            const pct = ((n - min) / range) * 100;
            return `<div class="rand-bar-wrap" style="animation-delay:${i * 60}ms">
                <div class="rand-bar" style="height:${Math.max(pct, 4)}%;background:hsl(${(pct * 2.4) | 0},70%,55%)"></div>
                <span class="rand-num">${n}</span>
            </div>`;
        }).join('');

        fml.innerHTML = `<code style="font-family:var(--mono);font-size:.8rem;color:var(--muted)">Math.floor(Math.random() * (${max} - ${min} + 1)) + ${min}</code>`;
    }
    document.getElementById('rand-btn').addEventListener('click', generateRandom);
    generateRandom();

    // ── Rounding Comparison Table
    function runRoundCompare() {
        const x = parseFloat(document.getElementById('round-input').value);
        const tbl = document.getElementById('round-table');
        if (isNaN(x)) { tbl.innerHTML = '<span style="color:#ef4444">Enter a decimal number</span>'; return; }

        const methods = [
            { name: 'Math.floor(x)',  fn: Math.floor,  color: '#3b82f6', desc: 'Always down' },
            { name: 'Math.ceil(x)',   fn: Math.ceil,   color: '#8b5cf6', desc: 'Always up' },
            { name: 'Math.round(x)',  fn: Math.round,  color: '#f59e0b', desc: 'Nearest (.5 → up)' },
            { name: 'Math.trunc(x)',  fn: Math.trunc,  color: '#10b981', desc: 'Toward zero' },
        ];
        tbl.innerHTML = methods.map(m => {
            const res = m.fn(x);
            return `<div class="round-row">
                <span class="round-method" style="color:${m.color}">${m.name}</span>
                <span class="round-result">${res}</span>
                <span class="round-desc">${m.desc}</span>
            </div>`;
        }).join('');
    }
    document.getElementById('round-btn').addEventListener('click', runRoundCompare);
    document.getElementById('round-input').addEventListener('keydown', e => { if(e.key==='Enter') runRoundCompare(); });
}
