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
 * Instant search
 */
(function($) {
    var input = $('#cl-search');
    var wrapper = input.parents('.dropdown:first');
    var dropdown = wrapper.find('.dropdown-menu');
    var likelyIn = 0;
    var outTimeout = false;
    var upStrikesOnFirstItem = 0;

    wrapper.focusout(function() {
        likelyIn = likelyIn - 1;

        if (outTimeout) {
            clearTimeout(outTimeout);
        }

        outTimeout = setTimeout(function() {
            outTimeout = false;
            if (likelyIn <= 0) {
                wrapper.removeClass('open');
                likelyIn = 0;
            } else {
                showWhenNeeded();
            }
        }, 0);
    });

    wrapper.focusin(function() {
        likelyIn = likelyIn + 1;
        showWhenNeeded();
    });

    input.keyup(function(event) {
        // Arrow down pressed
        if (event.keyCode === 40) {
            dropdown.find('li:not(.hidden):first a').focus();
            upStrikesOnFirstItem = 1;
            return;
        }

        var searchString = input.val().toLowerCase();
        dropdown.find('li').each(function() {
            $(this).toggleClass('hidden', $(this).text().toLowerCase().indexOf(searchString) === -1);
        });

        showWhenNeeded();
    });

    dropdown.keyup(function(event) {
        // Arrow up pressed
        if (event.keyCode === 38) {
            if (dropdown.find('a:focus').parent()[0] === dropdown.find('li:visible:first')[0]) {
                if (++upStrikesOnFirstItem === 2) {
                    input.focus();
                    upStrikesOnFirstItem = 0;
                }
            }
        } else {
            upStrikesOnFirstItem = 0;
        }
    });

    dropdown.keydown(function(event) {
        if (event.keyCode === 13) {
            input.val('');
        }
    });

    function showWhenNeeded() {
        if (input.val().length === 0 || dropdown.find('li:not(.hidden)').length === 0) {
            wrapper.removeClass('open');
        } else {
            wrapper.addClass('open');
        }
    }
})(jQuery);


/**
 * Show/hide code
 */
(function($) {
    $('.cl-js-template-code-toggle').click(function() {
        $(this).next('.cl-js-template-code-content').toggle();
    });
})(jQuery);
