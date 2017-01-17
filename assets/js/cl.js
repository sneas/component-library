'use strict';

/**
 * Navigation menu
 */
(function($) {
    var collapsible = $('.cl-navigation-collapse');

    function toggle() {
        collapsible.slideToggle('fast', function() {
            collapsible.toggleClass('in');
        });
    }

    $('.cl-navigation-toggle').click(function() {
        toggle();
    });

    $('.cl-navigation-collapse a').click(function(e) {
        if (!collapsible.is(':visible')) {
            return;
        }

        if ($(e.target).is('.navbar-toggle')) {
            return;
        }

        if ($(this).is('.has-submenu.highlighted') || !$(this).is('.has-submenu')) {
            toggle();
        }
    });
})(jQuery);


/**
 * Show/hide code
 */
(function($) {
    $('.cl-js-template-code-toggle').click(function() {
        $(this).next('.cl-js-template-code-content').toggle();
    });
})(jQuery);
