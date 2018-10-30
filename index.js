const postcss = require('postcss');

const pxRegex = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/ig;
module.exports = postcss.plugin('postcss-pixel-to-vw', function () {
    // opts = opts || {};

    // Work with options here
    return function (root) {
        // Transform CSS AST here
        root.walkDecls(function (decl) {
            const next = decl.next();
            const commentText = next && next.type === 'comment' && next.text;
            if (commentText === 'px') return;
            decl.value = decl.value.replace(pxRegex, function ($1, $2) {
                let transformValue = $2 / 750 * 100;
                transformValue = Number.isInteger(transformValue) ?
                    `${transformValue}vw` :
                    `${transformValue.toFixed(5)}vw`;
                return transformValue;
            });
        });
    };
});
