'use strict';

jQuery(function($) {
    $('.ks-menu-toggle-button').click(function() {
        function toggle(visible) {
            $('#cl-navigation').toggleClass('ks-navigation-visible', !visible);
        }

        toggle($('#cl-navigation').is(':visible'));

        return false;
    });
});