'use strict';

/**
 * Show/hide code
 */
(function(document) {
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll('.cl-js-template-code').forEach(function(templateBlock) {
            var templateCode = templateBlock.querySelector('.cl-js-template-code-content'),
                activeAttribute = 'cl-visible';
            templateBlock.querySelector('.cl-js-template-code-toggle').onclick = function() {
                if (templateCode.hasAttribute(activeAttribute)) {
                    templateCode.removeAttribute(activeAttribute);
                } else {
                    templateCode.setAttribute(activeAttribute, true);
                }
            }
        });
    });
})(document);
