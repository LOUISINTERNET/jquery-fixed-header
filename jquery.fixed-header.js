(function($) {
  /**
   * Add fixed function to global scope to add the possibility
   *
   * Working example: *
   *    https://codepen.io/patrickkahl/pen/mRMBLo
   *
   * Example 1:
   *
   *    // No options required
   *    $('#header').fixed();
   *
   * Example 2:
   *
   *    // Overwriting default values
   *    $('#header').fixed({
   *      offset: 30,               // Default is 50
   *      class: 'fixed-header',    // Default is header--fixed
   *      objects: [
   *        {object: $('.logo'),class: 'logo--fixed'}
   *      ]
   *    });
   *
   * @ param {object} settings
   * @ return {object} this
   */
  $.fn.fixed = function(customer_opt) {
    // Define objects and default values
    var header = this,
      w = $(window),
      d = $(document),
      document_height = d.height(),
      header_height = header.outerHeight(),
      scrollTop = 0,
      lastScrollTop = 0,
      // Define current header state for better performance
      state = null,
      // Default options
      default_opt = {
        toAnchor: 'scroll',
        onLoadAnchor: 'jump',
        onChangeAnchor: 'jump',
        offset: 50,
        class: 'header--fixed',
        objects: {},
      },
      target = $(location.hash),
      // Merge default and customer options
      opt = $.extend({}, default_opt, customer_opt),
      /**
       * Toggle header and depended object classes
       * with given action
       * @param {string} action addClass || removeClass
       */
      toggleClass = function(action) {
        header[action](opt.class);

        if (opt.objects.length > 0) {
          $.each(opt.objects, function(i, e) {
            if (e.object && e.class) {
              $(e.object)[action](e.class);
            }
          });
        }

        var event = new CustomEvent('fixed-header-changed', {
          detail: header[0],
        });
        document.dispatchEvent(event);
      },
      /**
			 * Scroll to given anchor target
			 * @param {string} anchor
			 */
      scrollToAnchor = function(target) {
        $('html,body').animate(
          {
            scrollTop: target.offset().top - header_height,
          },
          500
        );
      },
      /**
			 * Jump to given anchor target
			 * @param {string} anchor
			 */
      jumpToAnchor = function(target) {
        $(document).scrollTop(target.offset().top - header_height);
      };

    // Do on window scroll and resize
    w
      .on('resize scroll', function(e) {
        header_height = header.outerHeight();
        if (document_height - header_height + opt.offset > w.height()) {
          // If fixed header
          if (state !== false && w.scrollTop() > header_height + opt.offset) {
            toggleClass('addClass');
            state = false;

            // If no fixed header
          } else if (
            state !== true &&
            w.scrollTop() <= header_height + opt.offset
          ) {
            toggleClass('removeClass');
            state = true;
          }
        }

        // Add direction classes
        scrollTop = $(this).scrollTop();
        if (scrollTop < lastScrollTop) {
          header.addClass('swipe-up');
        } else {
          if (header.hasClass('swipe-up')) {
            header.removeClass('swipe-up');
          }
        }
        lastScrollTop = scrollTop;
      })
      .resize();

    // Do anchor action on click
    $(
      'a[href*="#"]:not([href="#"]):not([href="#nav"]):not([href*="#mm-"])'
    ).click(function(e) {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') ||
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);

        if (target.length) {
          if (opt.toAnchor === 'jump') {
            jumpToAnchor(target);
          } else if (opt.toAnchor === 'scroll') {
            scrollToAnchor(target);
          }
          return false;
        }
      }
    });

    // Do anchor action on page load
    if (target.length && opt.onLoadAnchor !== false) {
      setTimeout(function() {
        window.scrollTo(0, 0);
        if (opt.onLoadAnchor === 'jump') {
          jumpToAnchor(target);
        } else if (opt.onLoadAnchor === 'scroll') {
          scrollToAnchor(target);
        }
      }, 1);
    }

    // Do anchor action after anchor change
    if (opt.onChangeAnchor !== false) {
      w.on('hashchange', function() {
        var target = $(location.hash);
        if (target.length) {
          if (opt.onChangeAnchor === 'jump') {
            jumpToAnchor(target);
          } else if (opt.onChangeAnchor === 'scroll') {
            scrollToAnchor(target);
          }
        }
      });
    }

    return this;
  };
})(jQuery);
