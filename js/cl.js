'use strict';

(function (window, document) {

    var layout   = document.getElementById('cl-layout'),
        menu     = document.getElementById('cl-menu'),
        menuLink = document.getElementById('cl-menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function (e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

}(window, document));

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