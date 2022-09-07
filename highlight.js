const colors = [
    "#ef4444",
    "#f59e0b",
    "#84cc16",
    "#14b8a6",
    "#3b82f6",
    "#a855f7"
];

/**
 * @param {HTMLDivElement} container 
 */
const highlight = (container) => {
    console.log(container);
};

const hook = () => {
    const expressions = Array.from(document.querySelectorAll(".MathJax"));

    // No expressions found, try searching for a mathjax pattern and evenually calling the hook again
    if (expressions.length === 0) {
        const html = document.body.innerHTML;
        const pattern = /(?:\\\[|\$.+\$)/

        // The HTML contains mathjax that will be rendered or that's currently rendering
        if (pattern.test(html)) {
            window.setTimeout(hook, 1000);
        }

        // Otherwise just halt the highlight hook
        return;
    }

    // Some of the expressions have not been fully rendered yet
    if (expressions.some(expression => expression.classList.contains("MathJax_Processing"))) {
        window.setTimeout(hook, 1000);
        return;
    }

    expressions.forEach(expression => highlight(expression));
};

window.setTimeout(hook, 1000);