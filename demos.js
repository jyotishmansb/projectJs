export function setupDemos(topicId) {
    if (topicId === 'truthy-falsy') {
        const btn = document.getElementById('tf-btn');
        const input = document.getElementById('tf-input');
        const result = document.getElementById('tf-result');
        
        btn.addEventListener('click', () => {
            let val = input.value;
            
            // Handle special string cases to simulate real JS behavior
            if (val === 'false') val = false;
            else if (val === '0') val = 0;
            else if (val === 'null') val = null;
            else if (val === 'undefined') val = undefined;
            else if (val === 'NaN') val = NaN;
            else if (val === '""' || val === "''") val = "";
            
            const isTruthy = Boolean(val);
            result.innerHTML = isTruthy 
                ? '<span class="truthy-text">Truthy! ✅</span>' 
                : '<span class="falsy-text">Falsy! ❌</span>';
        });
    }
    
    if (topicId === 'math-floor') {
        const btn = document.getElementById('math-btn');
        const input = document.getElementById('math-input');
        const result = document.getElementById('math-result');
        
        btn.addEventListener('click', () => {
            const num = parseFloat(input.value);
            if (isNaN(num)) {
                result.innerHTML = 'Please enter a valid number';
                return;
            }
            const floored = Math.floor(num);
            result.innerHTML = `Math.floor(${num}) = <strong>${floored}</strong>`;
        });
    }
}
