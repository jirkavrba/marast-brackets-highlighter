const colors = [
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#84cc16",
    "#14b8a6",
    "#a855f7"
];

/**
 * @param {HTMLDivElement} container 
 */
const highlight = (container) => {
    const children = Array.from(container.querySelectorAll("span.mo"));

    children.reduce((level, span) => {
        const opening = ["(", "{"];
        const closing = [")", "}"];
        const content = span.textContent.trim();

        if (opening.includes(content)) {
            span.style.color = colors[level % colors.length];
            return level + 1;
        }

        if (closing.includes(content)) {
            span.style.color = colors[(level - 1) % colors.length];
            return level - 1;
        }

        return level;
    }, 0);
};

const hook = () => {
    const expressions = Array.from(document.querySelectorAll(".MathJax"));

    // No expressions found, try searching for a mathjax pattern and evenually calling the hook again
    if (expressions.length === 0) {
        const html = document.body.innerHTML;

        // The HTML contains mathjax that will be rendered or that's currently rendering
        if (html.indexOf("$") !== -1 || html.indexOf("\\[") !== -1) {
            console.log("The document contains mathjax expressions, but they have not been rendered yet...");
            window.setTimeout(hook, 1000);
        }

        // Otherwise just halt the highlight hook
        console.log("The document doesn't contain any mathajx expressions that could be highlighted");
        return;
    }

    // Some of the expressions have not been fully rendered yet
    if (expressions.some(expression => expression.classList.contains("MathJax_Processing"))) {
        console.log("Some expressions are still being rendered...");
        window.setTimeout(hook, 1000);
        return;
    }

    console.log(`Highlighting brackets inside ${expressions.length} math expressions...`);
    expressions.forEach(expression => highlight(expression));
};

let source = window.location.href;

window.setTimeout(hook, 1000);
window.setInterval(() => { 
    const current = window.location.href;
    if (current !== source) {
        source = current;
        console.log("The url has changed... Re-running the hightlight hook...")
        window.setTimeout(hook, 1000);
    }
}, 1000);