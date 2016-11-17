'use strict';

/**
 * Show/hide mobile menu functionality
 */

(function (window, document) {

    var layout = document.getElementById('cl-layout'),
        menu = document.getElementById('cl-menu'),
        menuLink = document.getElementById('cl-menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for (; i < length; i++) {
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
})(window, document);

/**
 * Show/hide code functionality
 */
(function (document) {
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll('.cl-js-template-code').forEach(function (templateBlock) {
            var templateCode = templateBlock.querySelector('.cl-js-template-code-content'),
                activeAttribute = 'cl-visible';
            templateBlock.querySelector('.cl-js-template-code-toggle').onclick = function () {
                if (templateCode.hasAttribute(activeAttribute)) {
                    templateCode.removeAttribute(activeAttribute);
                } else {
                    templateCode.setAttribute(activeAttribute, true);
                }
            };
        });
    });
})(document);

/**
 * Search functionality
 */
(function (document) {
    var searchInputId = 'cl-search',
        listId = 'cl-navigation-list',
        hiddenAttribute = 'cl-hidden',
        searchInput = document.getElementById(searchInputId);

    searchInput.addEventListener('keyup', function () {
        var searchString = searchInput.value;
        if (searchString.length <= 1) {
            unHideAll();
            return;
        }

        searchString = searchString.replace("'", "\\'");

        var query = "//ul[@id='" + listId + "']//a[text()[not(contains(translate(., '" + searchString.toUpperCase() + "', '" + searchString.toLowerCase() + "'), '" + searchString.toLowerCase() + "'))]]";

        var nodesSnapshot = document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
            nodesSnapshot.snapshotItem(i).setAttribute(hiddenAttribute, true);
        }
    });

    function unHideAll() {
        document.querySelectorAll('#' + listId + ' [' + hiddenAttribute + ']').forEach(function (hiddenElement) {
            hiddenElement.removeAttribute(hiddenAttribute);
        });
    }
})(document);