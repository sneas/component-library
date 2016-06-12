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

}(this, this.document));

jQuery(function($) {
    $('.cl-menu-toggle-button').click(function() {
        function toggle(visible) {
            $('#cl-navigation').toggleClass('cl-navigation-visible', !visible);
        }

        toggle($('#cl-navigation').is(':visible'));

        return false;
    });

    $('.cl-template-code-toggle').click(function() {
        $(this).next('.cl-template-code-content').toggleClass('cl-template-code-content-show');
    });
});