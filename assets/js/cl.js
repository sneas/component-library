'use strict';

jQuery(function($) {
    $('.cl-menu-toggle-button').click(function() {
        function toggle(visible) {
            $('#cl-navigation').toggleClass('cl-navigation-visible', !visible);
        }

        toggle($('#cl-navigation').is(':visible'));

        return false;
    });
});