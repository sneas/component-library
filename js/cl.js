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


(function(window, document) {
    var urlNodes = document.querySelectorAll('[cl-url]');

    document.onscroll = scroll;

    scroll();

    function scroll() {
        var screenHeight = window.screen.height,
            visibleUrl,
            previous = urlNodes[0],
            inactiveSelectedLink,
            activeUnselectedLink,
            activeUnselectedLinkTop;

        Array.prototype.some.call(urlNodes, function(node) {
            var top = node.getBoundingClientRect().top;
            if (top > 0 && top < screenHeight) {
                visibleUrl = node.getAttribute('cl-url');
                return true;
            } else if (top > 0) {
                visibleUrl = previous.getAttribute('cl-url');
                return true;
            }

            previous = node;
        });

        if (!visibleUrl) {
            return;
        }

        inactiveSelectedLink = document.querySelector('.cl-menu-item a[cl-selected]:not([href="' + visibleUrl + '"])');
        if (inactiveSelectedLink) {
            inactiveSelectedLink.removeAttribute('cl-selected');
        }

        activeUnselectedLink = document.querySelector('.cl-menu-item a[href="' + visibleUrl + '"]:not([cl-selected])');
        if (activeUnselectedLink) {
            activeUnselectedLink.setAttribute('cl-selected', true);
            activeUnselectedLinkTop = activeUnselectedLink.getBoundingClientRect().top;
            if (activeUnselectedLinkTop < 0 || activeUnselectedLinkTop > screenHeight) {
                activeUnselectedLink.scrollIntoView({block: "end", behavior: "smooth"});
            }
        }
    }
})(window, document);