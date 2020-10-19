window.slate = window.slate || {};
window.theme = window.theme || {};

/*================ Slate ================*/
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element.first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element.first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on('click', function(evt) {
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).on(eventName, function(evt) {
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};

/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

slate.cart = {

  /**
   * Browser cookies are required to use the cart. This function checks if
   * cookies are enabled in the browser.
   */
  cookiesEnabled: function() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled){
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf('testcookie') !== -1);
    }
    return cookieEnabled;
  }
};

/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

slate.utils = {

  /**
   * Return an object from an array of objects that matches the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  findInstance: function(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
  },

  /**
   * Remove an object from an array of objects by matching the provided key and value
   *
   * @param {array} array - Array of objects
   * @param {string} key - Key to match the value against
   * @param {string} value - Value to get match of
   */
  removeInstance: function(array, key, value) {
    var i = array.length;
    while(i--) {
      if (array[i][key] === value) {
        array.splice(i, 1);
        break;
      }
    }

    return array;
  },

  /**
   * _.compact from lodash
   * Remove empty/false items from array
   * Source: https://github.com/lodash/lodash/blob/master/compact.js
   *
   * @param {array} array
   */
  compact: function(array) {
    var index = -1;
    var length = array == null ? 0 : array.length;
    var resIndex = 0;
    var result = [];

    while (++index < length) {
      var value = array[index];
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },

  /**
   * _.defaultTo from lodash
   * Checks `value` to determine whether a default value should be returned in
   * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
   * or `undefined`.
   * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
   *
   * @param {*} value - Value to check
   * @param {*} defaultValue - Default value
   * @returns {*} - Returns the resolved value
   */
  defaultTo: function(value, defaultValue) {
    return (value == null || value !== value) ? defaultValue : value
  }
};

/**
 * Rich Text Editor
 * -----------------------------------------------------------------------------
 * Wrap iframes and tables in div tags to force responsive/scrollable layout.
 *
 * @namespace rte
 */

slate.rte = {
  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */
  wrapTable: function(options) {
    var tableWrapperClass = typeof options.tableWrapperClass === "undefined" ? '' : options.tableWrapperClass;

    options.$tables.wrap('<div class="' + tableWrapperClass + '"></div>');
  },

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
  wrapIframe: function(options) {
    var iframeWrapperClass = typeof options.iframeWrapperClass === "undefined" ? '' : options.iframeWrapperClass;

    options.$iframes.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="' + iframeWrapperClass + '"></div>');
      
      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  }
};

slate.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:section:reorder', this._onReorder.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

slate.Sections.prototype = $.extend({}, slate.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof constructor === 'undefined') {
      return;
    }

    var instance = $.extend(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (!instance) {
      return;
    }

    if (typeof instance.onUnload === 'function') {
      instance.onUnload(evt);
    }

    this.instances = slate.utils.removeInstance(this.instances, 'id', evt.detail.sectionId);
  },

  _onSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onSelect === 'function') {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onDeselect === 'function') {
      instance.onDeselect(evt);
    }
  },

  _onReorder: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onReorder === 'function') {
      instance.onReorder(evt);
    }
  },

  _onBlockSelect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockSelect === 'function') {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    var instance = slate.utils.findInstance(this.instances, 'id', evt.detail.sectionId);

    if (instance && typeof instance.onBlockDeselect === 'function') {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

slate.Currency = (function () {
  var moneyFormat = '${{amount}}';

  /**
   * Format money values based on your shop currency settings
   * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
   * or 3.00 dollars
   * @param  {String} format - shop money_format setting
   * @return {String} value - formatted value
   */
  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = slate.utils.defaultTo(precision, 2);
      thousands = slate.utils.defaultTo(thousands, ',');
      decimal = slate.utils.defaultTo(decimal, '.');

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

slate.Image = (function() {

  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    } else {
      return null;
    }
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist. Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {

  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = $.extend({}, Variants.prototype, {

    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var currentOptions = $.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};

        if (type === 'radio' || type === 'checkbox') {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');

          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = slate.utils.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;
      var found = false;

      variants.forEach(function(variant) {
        var satisfied = true;

        selectedValues.forEach(function(option) {
          if (satisfied) {
            satisfied = (option.value === variant[option.index]);
          }
        });

        if (satisfied) {
          found = variant;
        }
      });

      return found || null;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param {object} variant - Currently selected variant
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param {object} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container)[0].value = variant.id;
    }
  });

  return Variants;
})();


/*================ General ================*/
// Inspiration: https://www.w3.org/TR/wai-aria-practices/examples/accordion/js/accordion.js
// feature: data-allow-toggle
// Allow for each toggle to both open and close its section. Makes it possible for all sections to be closed. Assumes only one section may be open.

// feature: data-allow-multiple
// Allow for multiple accordion sections to be expanded at the same time. Assumes data-allow-toggle otherwise the toggle on open sections would be disabled.
// __________

// Ex:
// Parent
// <div id="accordionGroup" data-accordion>
// <div id="accordionGroup" data-accordion data-allow-multiple>
// <div id="accordionGroup" data-accordion data-allow-toggle></div>
//  Question
// <div data-accordion-trigger aria-expanded="true / false" aria-controls="#faq-group-{{- id -}}-{{- forloop.index -}}">
// Answer
// <div id="faq-group-{{- id -}}-{{- forloop.index -}}" data-accordion-panel>


theme.accordion = (function () {
    'use strict';

    var selectors = {
        root   : "[data-accordion]",
        trigger: "[data-accordion-trigger]",
        panel  : "[data-accordion-panel]"
    }

    var features = {
        allow_multiple : "[data-allow-multiple]",
        allow_toggle   : "[data-allow-toggle]"
    }

    var data = {
        target_id: 'aria-controls'
    }

    var states = {
        expanded: {
            attr_name: 'aria-expanded',
            attr_values : {
                yes: "true",
                no:  "false"
            }
        },
        disabled: {
            attr_name: 'aria-disabled',
            attr_values : {
                yes: "true",
                no:  "false"
            }
        }
    }

    $(selectors.root).each(function () {
        var $accordion = $(this);
        init($accordion);
    });

    function init ($accordion) {
        var allowsMultiple = $accordion.is(features.allow_multiple);
        var options = {
            allowsMultiple: allowsMultiple,
            allowToggle: (allowsMultiple) ? allowsMultiple : $accordion.is(features.allow_toggle)
        }

        $accordion.on("click", selectors.trigger, function (e) {
            e.preventDefault();
            trigger($(this), $accordion, options);
        });

        $accordion.on('keydown', function (e) {
            handleKeyboard(event, $(this), options);
        });

        if (!options.allowToggle) {
            // Get the first expanded/ active accordion
            var $expanded = $accordion.find('[aria-expanded="true"]').first();

            // If an expanded/ active accordion is found, disable
            if ($expanded.length) {
                $expanded.setAttribute(states.disabled.attr_name, states.disabled.attr_values.yes);
            }
        } else {
            // Get all unexpanded accordion panels
            var $unexpanded = $accordion.find('[aria-expanded="false"]');
            $unexpanded.each(function () {
                var panelId = $(this).attr('aria-controls');
                hidePanel ($(panelId))
            })
        }
    }

    function trigger ($trigger, $accordion, options) {
        var settings = {
            allowsMultiple: options.allowsMultiple,
            allowToggle   : options.allowToggle
        };

        var $targetPanel = $($trigger.attr(data.target_id));

        var isExpanded = $trigger.is("[" + states.expanded.attr_name + "='" + states.expanded.attr_values.yes + "']");
        var $accordionActiveTriggers = $accordion.find("[" + states.expanded.attr_name + "='" + states.expanded.attr_values.yes + "']");
        var $accordionActivePanels = $accordion.find(selectors.panel);

        if (!settings.allowsMultiple && $accordionActiveTriggers.length > 0) {
            // Set the expanded state on the triggering element
            $accordionActiveTriggers.not($trigger).attr(states.expanded.attr_name, states.expanded.attr_values.no);
            // Hide the accordion sections, using aria-controls to specify the desired section
            hidePanel($accordionActivePanels.not($targetPanel));

            // When toggling is not allowed, clean up disabled state
            if (!settings.allowToggle) {
                $accordionActiveTriggers.removeAttr(states.disabled.attr_name);
            }
        }

        if (!isExpanded) {
            // Set the expanded state on the triggering element
            $trigger.attr(states.expanded.attr_name, states.expanded.attr_values.yes);
            // Hide the accordion sections, using aria-controls to specify the desired section
            reveilPanel($targetPanel);

            // If toggling is not allowed, set disabled state on trigger
            if (!settings.allowToggle) {
                $trigger.attr(states.disabled.attr_name, states.disabled.attr_values.yes);
            }
        }
        else if (settings.allowToggle && isExpanded) {
            // Set the expanded state on the triggering element
            $trigger.attr(states.expanded.attr_name, states.expanded.attr_values.no);
            // Hide the accordion sections, using aria-controls to specify the desired section
            hidePanel($targetPanel);
        }
    }

    function reveilPanel ($panel) {
        $panel.slideDown();// .removeClass('hide');
    }

    function hidePanel ($panel) {
        $panel.slideUp(); //.addClass('hide');
    }

    function handleKeyboard (event, $accordion, options) {}
})();

theme.insideAccordion = (function () {
    'use strict';

    var selectors = {
        root   : "[data-inside-accordion]",
        trigger: "[data-inside-accordion-trigger]",
        panel  : "[data-inside-accordion-panel]"
    }

    var features = {
        allow_multiple : "[data-allow-multiple]",
        allow_toggle   : "[data-allow-toggle]"
    }

    var data = {
        target_id: 'aria-controls'
    }

    var states = {
        expanded: {
            attr_name: 'aria-expanded',
            attr_values : {
                yes: "true",
                no:  "false"
            }
        },
        disabled: {
            attr_name: 'aria-disabled',
            attr_values : {
                yes: "true",
                no:  "false"
            }
        }
    }

    $(selectors.root).each(function () {
        var $accordion = $(this);
        init($accordion);
    });

    function init ($accordion) {
        var allowsMultiple = $accordion.is(features.allow_multiple);
        var options = {
            allowsMultiple: allowsMultiple,
            allowToggle: (allowsMultiple) ? allowsMultiple : $accordion.is(features.allow_toggle)
        }

        $accordion.on("click", selectors.trigger, function (e) {
            e.preventDefault();
            trigger($(this), $accordion, options);
        });

        $accordion.on('keydown', function (e) {
            handleKeyboard(event, $(this), options);
        });

        if (!options.allowToggle) {
            // Get the first expanded/ active accordion
            var $expanded = $accordion.find('[aria-expanded="true"]').first();

            // If an expanded/ active accordion is found, disable
            if ($expanded.length) {
                $expanded.setAttribute(states.disabled.attr_name, states.disabled.attr_values.yes);
            }
        } else {
            // Get all unexpanded accordion panels
            var $unexpanded = $accordion.find('[aria-expanded="false"]');
            $unexpanded.each(function () {
                var panelId = $(this).attr('aria-controls');
                hidePanel ($(panelId))
            })
        }
    }

    function trigger ($trigger, $accordion, options) {
        var settings = {
            allowsMultiple: options.allowsMultiple,
            allowToggle   : options.allowToggle
        };

        var $targetPanel = $($trigger.attr(data.target_id));

        var isExpanded = $trigger.is("[" + states.expanded.attr_name + "='" + states.expanded.attr_values.yes + "']");
        var $accordionActiveTriggers = $accordion.find("[" + states.expanded.attr_name + "='" + states.expanded.attr_values.yes + "']");
        var $accordionActivePanels = $accordion.find(selectors.panel);

        if (!settings.allowsMultiple && $accordionActiveTriggers.length > 0) {
            // Set the expanded state on the triggering element
            $accordionActiveTriggers.not($trigger).attr(states.expanded.attr_name, states.expanded.attr_values.no);
            // Hide the accordion sections, using aria-controls to specify the desired section
            hidePanel($accordionActivePanels.not($targetPanel));

            // When toggling is not allowed, clean up disabled state
            if (!settings.allowToggle) {
                $accordionActiveTriggers.removeAttr(states.disabled.attr_name);
            }
        }

        if (!isExpanded) {
            // Set the expanded state on the triggering element
            $trigger.attr(states.expanded.attr_name, states.expanded.attr_values.yes);
            // Hide the accordion sections, using aria-controls to specify the desired section
            reveilPanel($targetPanel);

            // If toggling is not allowed, set disabled state on trigger
            if (!settings.allowToggle) {
                $trigger.attr(states.disabled.attr_name, states.disabled.attr_values.yes);
            }
        }
        else if (settings.allowToggle && isExpanded) {
            // Set the expanded state on the triggering element
            $trigger.attr(states.expanded.attr_name, states.expanded.attr_values.no);
            // Hide the accordion sections, using aria-controls to specify the desired section
            hidePanel($targetPanel);
        }
    }

    function reveilPanel ($panel) {
        $panel.slideDown();// .removeClass('hide');
    }

    function hidePanel ($panel) {
        $panel.slideUp(); //.addClass('hide');
    }

    function handleKeyboard (event, $accordion, options) {}
})();

theme.tabs = new function () {
    var selectors = {
        container   : ".tab",
        buttons_bar : ".tab__buttons",
        buttons     : ".tab__buttons__single",
        content     : ".tab__content"
    };

    var modifierClasses = {
        // active_button  : "tab__buttons--overlay-active",
        active_button  : "tab__buttons__single--active",
        active_content : "tab__content--active"
    }

    function tabs () {
        var $tabs = $(selectors.container);
        if (!$tabs.length) return;

        // init tabs
        $tabs.each(function () {
            init($(this));
        });

        return this;
    }

    function init($tab) {
        // Get active tab button
        var $activeButton  = false;
        var $tabButtons    = $tab.find(selectors.buttons);
        var $activeButtons = $tabButtons.is("." + modifierClasses.active_button);

        // if no tab buttons exist, exit.
        if (!$tabButtons.length) return;

        // if active buttons found: select first, else, assign first button as active
        if ($activeButtons.length)
            $activeButton = $activeButtons.first();
        else
            $activeButton = $tabButtons.first();

        // setup listners
        $tab.on('click', selectors.buttons, function () {
            var $button = $(this);
            if ($button.hasClass(modifierClasses.active_button))
                return;

            return open($button);
        });

        open($activeButton);

        // check length
        if ($(selectors.buttons_bar).length > $(window).length)
            $(selectors.buttons_bar).addClass(modifierClasses.active_button);
    }

    function open($activeButton) {
        var $tab      = $activeButton.closest(selectors.container);
        var $buttons  = $tab.find(selectors.buttons);
        var $contents = $tab.find(selectors.content);

        // Rest buttons / content
        $buttons.attr("tabindex", -1);

        $buttons.removeClass(modifierClasses.active_button);
        $contents
            .removeClass(modifierClasses.active_content)
            .hide();

        // Select buttons / content
        var contentId = $activeButton.attr('aria-controls');
        var $activeContent = $('#' + contentId);
        $activeButton.addClass(modifierClasses.active_button);
        $activeContent
            .addClass(modifierClasses.active_content)
            .fadeIn(300);

        $activeButton.attr("tabindex", 0);
    }

    return tabs;
}

theme.Filters = (function() {
    var constants = {
      SORT_BY: 'sort_by'
    };

    var selectors = {
      mainContent    : '#MainCollectionContent',
      sortSelection  : '#SortBy',
      filterTag      : '[data-filter-tag]'
    };

    var data = {
      sortBy: 'data-default-sortby'
    };

    var _sectionSettings = {};

    function Filters(container) {
      var $container = (this.$container = $(container));
      this._sectionSettings = $container.data("sectionSettings") || {};

      this.initSort();
      this.initFilters();
    }

    Filters.prototype.initSort = function () {
      this.defaultSort = this._sectionSettings.sortBy;
      this.$sortSelect = $(selectors.sortSelection, this.$container);
      this.$sortSelect.on('change', this._onSortChange.bind(this));
    }

    Filters.prototype.initFilters = function () {
        this.$container.on('click', selectors.filterTag, this._onFilterChange.bind(this));
    }

    Filters.prototype._onFilterChange = function() {
        // var filter = this._getFilterValue();

        // // remove the 'page' parameter to go to the first page of results
        // var search = document.location.search.replace(/\?(page=\w+)?&?/, '');

        // // only add the search parameters to the url if they exist
        // search = search !== '' ? '?' + search : '';

        // document.location.href = filter + search + selectors.mainContent;

        window.location.href = this._buildUrl();
    };

    Filters.prototype._buildFiltersUrlPart = function () {
        var filtersUrlPart = '';
        this.$container.find(selectors.filterTag).each (function () {
            if (!$(this).is(':checked')) return;

            var tagHandle = $(this).val();
            if (filtersUrlPart == '')
                filtersUrlPart = tagHandle;
            else
                filtersUrlPart += '+' + tagHandle;
        });

        return filtersUrlPart;
    };

    Filters.prototype._onSortChange = function() {
        // var sort = this._sortQuery();
        // var url = window.location.href.replace(window.location.search, '');
        // var queryStringValue = slate.utils.getParameterByName('q');
        // var query = queryStringValue !== null ? queryStringValue : '';

        // if (sort.length) {
        //     var urlStripped = url.replace(window.location.hash, '');
        //     query = query !== '' ? '?q=' + query + '&' : '?';

        //     window.location.href =
        //     urlStripped + query + sort + selectors.mainContent;
        // } else {
        //     // clean up our url if the sort value is blank for default
        //     window.location.href = url;
        // }

        window.location.href = this._buildUrl();
    };

    Filters.prototype._getSortValue = function() {
        return this.$sortSelect.val() || this.defaultSort;
    };

    Filters.prototype._sortQuery = function() {
        var sort = this._getSortValue();
        var query = '';

        if (sort !== this.defaultSort) {
            query = constants.SORT_BY + '=' + sort;
        }

        return query;
    };

    Filters.prototype._buildUrl = function() {
        var baseUrl = this._sectionSettings.collectionUrl;
        var filters = this._buildFiltersUrlPart();
        var sort = this._sortQuery();

        return baseUrl + (filters === ''?'':'/'+filters) + (sort === ''?'':'?'+sort) + selectors.mainContent;
    };

    return Filters;
  })();
  

/**
 *  Helper for the lazysizes plugin
 * */
theme.lazyloading_helper = (function() {
    var isVerbal = true;

    var config = {
      lazyLoadedEvent: 'lazybeforeunveil',
      lazyLoadingCarousel: '.carousel--lazy',
      lazyLoading__effectClass: 'lazy-effect',
      lazyLoading__effectEndClass: 'lazy-effect--end',
      lazyLoading__loadingClass: '.lazyload',
      lazyLoading__loadedClass: 'lazyloaded'
    };

    remove_skeleton_mutations();
    setTimeout(remove_skeleton_pooling, 1000);
    setInterval(remove_skeleton_pooling, 2500);
    document.addEventListener(config.lazyLoadedEvent, function(e){
        try {
            var $target = $(e.target);
            if (!$target.length) return;

            // check if it's a background image and lazyload it.
            var bg_src = $target.data("bg") || "";
            if (bg_src && bg_src.trim() != "")
                onBGLoaded ($target, bg_src);

            // check if the target is an image and if it has a skelaton parent & remove it
            // remove_skeleton($target);

            // check if the target is part of a carousel
            var $lazy_carousel = $target.closest(config.lazyLoadingCarousel);
            if ($lazy_carousel.length)
                lazyload_carousel ($lazy_carousel);
        } catch (e) {
            logger('error handing lazyloaded image');
            logger(e);
        }
    });

    $(config.lazyLoading__loadingClass).each(function () {
        var $target = $(this);
        var isImage = $target.is('img');

        // var $parentWithEffect = $target.closest('.' + config.lazyLoading__effectClass);
        // if (!$parentWithEffect.length) return;

        if (!isImage) {
            // $parentWithEffect.removeClass(config.lazyLoading__effectClass);
            return;
        }

        // $target.css('opacity', 0);

        var onLoaded = function () {
            onImageLoaded($target);
        }

        if(jQuery().imagesLoaded) {
            $target.imagesLoaded( onLoaded);
        } else {
            $target[0].onload = onLoaded;
        }
    });

    function onImageLoaded ($img) {
        // logger('Remove skeleton of an image');
        var $parentWithEffect = $img.closest('.' + config.lazyLoading__effectClass);
        if ($parentWithEffect.length) $parentWithEffect.addClass(config.lazyLoading__effectEndClass);

        // $img.addClass(config.lazyLoading__effectEndClass);
        // $img.animate({
        //     opacity: 1
        // }, 300, function() {
        //     // Animation complete.
        // });
    }

    /**
     *  Lazy loads BG images
     * */
    function onBGLoaded ($bg, src) {
        try {
            logger('Lazy loading a background, src: ' + src);
            $bg.css("background-image", "url(" + src + ")");

            // remove effect class (if it exists)
            // $parentWithEffect.removeClass(config.lazyLoading__effectClass);
        } catch (e) {
            logger('error lazyloading bg');
            logger(e);
        }
    }

    /**
     *  Update carousel when all images are lazyloaded.
     * */
    function lazyload_carousel ($carousel) {
        try {
            logger('Lazy loading a carousel');
            var $unloaded = $carousel.find(config.lazyLoading__loadingClass);

            logger('$unloaded.length: ' + $unloaded.length);
            if ($unloaded.length > 1) {
                return;
            }

            logger('reload carousel cells');
            $carousel.flickity('reloadCells');
        } catch (e) {
            logger('error error while lazyloading carousel');
            logger(e);
        }
    }

    /**
     *  Lazy loads BG images
     * */
    function remove_skeleton_mutations () {
        // config object
        var mutaionsConfig = {
            attributes: true,
            attributeOldValue: true,
            // attributeFilter: ['class'],
            childList: true,
            subtree: true
        };

        // subscriber function
        // .lazy-effect.lazyloaded
        // .lazy-effect .lazyloaded
        function subscriber(mutations) {
            mutations.forEach(function(mutation) {
                var $target = $(mutation.target);
                if (!$target.hasClass(config.lazyLoading__loadedClass) && $target.find('.' + config.lazyLoading__loadedClass).length == 0) return;
                onImageLoaded($target);
            });
        }

        // instantiating observer
        var observer = new MutationObserver(subscriber);

        // observing target
        $('.' + config.lazyLoading__effectClass).each(function () {
            observer.observe($(this)[0], mutaionsConfig);
        })
    }

    function remove_skeleton_pooling () {
        $('.' + config.lazyLoading__effectClass).each(function () {
            var $target = $(this);
            if (!$target.hasClass(config.lazyLoading__loadedClass) && $target.find('.' +  config.lazyLoading__loadedClass).length == 0) return;
            onImageLoaded($target);
        });
    }

    function logger(log) {
        if(!isVerbal) return;
        console.log(log);
    }
})();

// Youtube video controller
theme.Youtube_videos = new function () {
    // Add these tiny css rules http://www.funkertech.com/windows/w6/sass/bootstrap/_responsive-embed.scss
    // ==> ".embed-responsive" to parent with: ".embed-responsive-16by9" or ".embed-responsive-4by3"
    // ==> ".embed-responsive-item" to video placeholder

    // Should also add custom CSS rules to show/hide cover images or any other elements based on the status data selector
    // ==> ex, .embed-responsive[data-activity-status="playing"], .embed-responsive[data-activity-status="ended"]

    var self = this;

    self.initiated = false;
    self.players = [];
    self.array_videos = [];
    self.lastVideoPlay = null;

    self.selectors = {
        VIDEO : "[data-youtube-id]",
        VIDEOLINK : "[data-popup-video-link]",
        PARENT : ".embed-responsive",
        TRIGGER : ".embed-video-trigger"
    };

    self.data_selectors = {
        INITIATED : 'initiated',
        YOUTUEB_ID : 'youtubeId',
        STATUS : 'activity-status'
    };

    // TODO: revoir.
    $('[data-video-close]').on('click', function() {
        try {
            self.players[self.lastVideoPlay].player.pauseVideo();
        } catch(err){
            console.log(err)
        }
    })

    function youtube_videos () {
        // Only init if there are youtube placeholders on the page
        if (!$(self.selectors.VIDEO).length) return;

        // Attach cover click events
        $('body').on("click", self.selectors.TRIGGER, function (e) {
            e.preventDefault();
            var current_id = $(this).attr("class").split(' ')[0];
            self.play_video($(this).closest(self.selectors.PARENT), current_id);
        })
        $('body').on("click", self.selectors.VIDEOLINK, function (e) {
            e.preventDefault();
            var current_id = $(this).attr("class").split(' ')[0];
            self.play_video($(this).closest(self.selectors.PARENT), current_id);
        })

        // only load script if the widget was not initiated beforehand.
        if (!self.initiated) {
            // add youtube script
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            // wait for youtube activation
            window.onYouTubeIframeAPIReady = self.activation_listner;
        }
    }

    self.play_video = function ($parent, youtubeId) {
        try {

            self.array_videos.some(function(video, index) {
              if (video[1] != youtubeId) return false;

              var videoDomId = $parent.find(self.selectors.VIDEO).attr("id");
              if (self.players[videoDomId] != undefined) {
                  if (videoDomId != self.lastVideoPlay && self.lastVideoPlay != null) { // We can run only one video at a time, if another is being played => pause it.
                      self.players[self.lastVideoPlay].player.pauseVideo();
                  }
                  self.players[videoDomId].player.playVideo();
                  self.lastVideoPlay = videoDomId;
              } else {
                  self.initPlayer(video[0], video[1], video[2], video[3], index);
                  var videoDomId = $parent.find(self.selectors.VIDEO).attr("id");
              }

              return true;
            });
        } catch (e) {
            console.log("failed to play video");
            console.log(e.message);
        }
    }

    self.activation_listner = function () {
        self.initiated = true;
        self.iterate();
    }

    self.iterate = function () {
        $(self.selectors.VIDEO).each(function () {
            var videoHolder = $(this);
            if (videoHolder.data(self.data_selectors.INITIATED)) return;

            var youtubeId = videoHolder.data(self.data_selectors.YOUTUEB_ID);

            var domId = videoHolder.prop('id');
            if (!domId) {
              var random = Math.floor(Math.random() * 60000) + 1000;
              domId = 'youtube-placeholder-' + youtubeId + '-' + random;
              videoHolder.attr('id', domId);
            }

            var showControles = videoHolder.data('controls') || 0;
            var autoplay = videoHolder.data('autoplay') || 0;
            var fullscreenAllowed = videoHolder.data('fs') || 0;
            var releventVideos = videoHolder.data('rel') || 0;
            var loop = videoHolder.data('loop') || 0;

            self.array_videos.push([domId, youtubeId, {
                height: '390',
                width: '640',
                showinfo: 0,
                rel: releventVideos || 0,
                fs: fullscreenAllowed || 0,

                // Afficher les controles de la video en option (data attribute)
                controls: showControles || 0,

                // AutoPlay en option (data attribute), il faut ajouter mute: 1 car navigateur ne permet plus de lancer des videos avec son.
                autoplay: autoplay || 0,
                mute: 0 || 0,

                // Permettre de lire la video indéfiniment en option (data attribute)
                loop: loop || 0,

                enablejsapi: 1
            }, false ]);

            if (autoplay == 1) {
                self.play_video($("#" + videoHolder.attr('id')).closest(self.selectors.PARENT), youtubeId);
            }
        });
    }

    self.initPlayer = function (domId, videoId, options, isActive, index) {
        if (isActive) return;

        var settings = {
            videoId: videoId,
            events: {
                'onReady': function (event) {
                  self.onPlayerReady(event, index);
                },
                'onStateChange': self.onPlayerStateChange
            }
        };

        settings.playerVars = options;
        var player = new YT.Player(domId, settings);

        var updatedSetting = options || {};
        updatedSetting.player = player;
        self.players[domId] = options || {};

        var videoHolder = $(this);
        videoHolder.data(self.data_selectors.INITIATED, true);
    }

    self.onPlayerReady = function (event, index) {
        var player = event.target;
        var vidDomId = event.target.f.id;
        var playerSettings = self.players[vidDomId];

        if (vidDomId != self.lastVideoPlay && self.lastVideoPlay != null) {
            self.players[self.lastVideoPlay].player.pauseVideo();
        }

        // Mark the current video as active and all the others as inactive.
        for (var i=0; i < self.array_videos.length; i++) {
          var status = false;
          if (i == index) status = true;
          self.array_videos[i][3] = status;
        }

        self.lastVideoPlay = vidDomId;
        player.playVideo();
    }

    self.onPlayerStateChange = function (event) {
        var player = event.target;
        var parent = event.target.f.parentElement;
        var playerId = event.target.l.id;
        var playerSettings = self.players[playerId];

        if (event.data == YT.PlayerState.ENDED) {
            parent.setAttribute('activity-status', 'ended');
        } else if (event.data == YT.PlayerState.PLAYING) {
            parent.setAttribute('activity-status', 'playing');
        } else if (event.data == YT.PlayerState.PAUSED) {
            parent.setAttribute('activity-status', 'paused');
        } else if (event.data == YT.PlayerState.BUFFERING) {
            parent.setAttribute('activity-status', 'buffering');
        } else if (event.data == YT.PlayerState.CUED) {
            parent.setAttribute('activity-status', 'cued');
        } else if (event.data == YT.PlayerState.UNSTARTED) {
            player.playVideo();
        }
    }

    return youtube_videos;
}

var youtubeController = new theme.Youtube_videos();

/**************************
  Custom select
***************************/

theme.searchHighlight = new function() {

  function searchHighlight() {

    // init default settings
    var settings = {
      select: '[data-search-box]',
      accordion : "[data-accordion]",
      trigger: "[data-accordion-trigger]",
      panel  : "[data-accordion-panel]",
      accordionInside   : "[data-inside-accordion]",
      triggerInside : "[data-inside-accordion-trigger]",
      panelInside  : "[data-inside-accordion-panel]",
      noResultMessage  : "[data-no-result-search]"
    };

    // If searchbox is available on the page
    $(settings.select).on("input",function(e){
       searchContent(self, $(this));
    });



    // help: http://stackoverflow.com/a/14031522 & http://stackoverflow.com/a/23266812
    // Also, this function makes use of the library mark.js to heighligh search results.
    function searchContent(context, $searchbox) {

      var $accordion = $(settings.accordion).find(settings.panel);
      var $accordionInside = $(settings.accordionInside).find(settings.panelInside);
      var parent = $searchbox.closest('#shopify-section-mega-section__faq'); // get faq dom root.
      var searchPhrase = $searchbox.val().trim().toLowerCase(); // get search term

      if($searchbox.data("lastval") === searchPhrase) // if search term is identical to the previous one, do nothing.
        return;
      $searchbox.data("lastval",searchPhrase); // set the previous search term
      clearTimeout(context.timerid);
      context.timerid = setTimeout(function() {
        $(settings.noResultMessage).removeClass('active');
        $accordion.slideUp();
        $accordionInside.slideUp();
        $(settings.trigger).attr("aria-expanded", "false");
        $(settings.triggerInside).attr("aria-expanded", "false");
        parent.find('.faq-group').show(); // show questions/ answers.
        parent.unmark(); // unset the yellow background of search terms

        if (searchPhrase.trim() === '') // if search term is empty, do nothing.
          return
          var found = false;
       parent.find('.faq-group__question, .faq-group__answer, .faq-group__question-inside, .faq-group__answer-inside').each(function() {
          var s = $(this).text().toLowerCase();
          if (s.indexOf(searchPhrase) > -1) {
            $(this).slideDown();
            $(this).find(settings.accordion).slideDown();
            var $trigger = $(this).find(settings.trigger);
            var $triggerInside = $(this).find(settings.triggerInside);
            $trigger.attr("aria-expanded", "true");
            $triggerInside.attr("aria-expanded", "true");
            var $pannelInside = $(this).find(settings.panelInside);
            $pannelInside.mark(searchPhrase);
            found = true;
          }
        });
        if (!found) {
          $(settings.noResultMessage).addClass('active');
        }
      },500);
    };

  }
  return searchHighlight;
}

var searchHighlight = new theme.searchHighlight();

/**************************
  Echantillons tabs and progress bar
***************************/



theme.echantillonsTabs = new function() {

  function echantillonsTabs() {

    // init default settings
    var settings = {
      button: '[data-echantillons-tab-index]',
      buttonIndex: 'data-echantillons-tab-index',
      tab : "[data-echantillons-tab]",
      checkbox : "[data-echantillons-checkbox]",
      input : "[data-echantillon-check-input]",
      checkboxCustom : "[data-echantillons-checkbox-custom]",
      progressBar : "[data-echantillons-progress-bar]",
      email : "[data-echantillons-email]",
      buttonStep1: "[data-echantillons-step-1-button]",
      buttonStep2: "[data-echantillons-step-2-button]",
      variantSelector: "[data-echantillon-variant-id]",
      variantData: "data-echantillon-variant-id",
      eventCategory: "[data-event-category]",
      eventCategoryData: "data-event-category",
      handleData: "data-echantillon-handle"

    };
    var checkedLenght = 0;
    var emailIsNotEmpty = false;
    var eventCategory = $(settings.eventCategory).attr(settings.eventCategoryData);
    var start = new Date().getTime();
    var awnsers = [];
    var items = [];


    //Check if step 1 is completed to disabled button
    $(settings.input).on("keyup keydown change",function(event){
        var empty = false;
        $(settings.input).each(function() {
            if ($(this).val().length == 0) {
                empty = true;
            }
        });
        if (empty) {
            $(settings.buttonStep1).attr('disabled', 'disabled');
            $(settings.buttonStep1).addClass('button--disabled');
        } else {
            $(settings.buttonStep1).attr('disabled', false);
            $(settings.buttonStep1).removeClass('button--disabled');
        }
    });

    //Step 1 button click
    $(settings.buttonStep1).click(function(){

      try {
        var eventAction = 'submit step 1';
        var end = new Date().getTime();
        var eventLabel = end - start;
        start = new Date().getTime();
        if(ga) ga('send', 'event', eventCategory, eventAction, eventLabel);

        $(settings.input).each(function(){
          const handle = $(this).attr(settings.handleData);
          const value = $(this).val();
          awnsers[handle] = value;
        });

        $(settings.button).removeClass('current');
        $(settings.tab).removeClass('current');
        $("#tab_echantillons_2").addClass('current');
        $(".echantillons__tab_2").addClass('current');
        $(settings.progressBar).val(66);

      } catch (error) {
        // console.error(error);
        // console.log(eventCategory);
        // console.log(eventAction);
        // console.log(eventLabel);
      }
    })

    //Step 3 button click
    $(settings.buttonStep2).click(function(){

      try {
        var eventAction = 'submit step 3';
        var end = new Date().getTime();
        var eventLabel = end - start;
        start = new Date().getTime();
        if(ga) ga('send', 'event', eventCategory, eventAction, eventLabel);

        var email_klaviyo = $(settings.email).val();
        var cookie = 'quizz_email='+ email_klaviyo;
        document.cookie = cookie;
        console.log('Event category ', eventCategory, ' Answers', awnsers);
        var kObject = {};
        kObject['$email'] = email_klaviyo;
        for(var key in awnsers){
          kObject[key] = awnsers[key];
        }
        // console.log('Kobject', kObject);
        _learnq.push(['identify', kObject]);
        _learnq.push(['track', eventCategory, awnsers]);
		items = [];
        $(settings.variantSelector).each(function(){
          if ($(this).hasClass('product__choice--active')) {
            const variant_id = $(this).attr(settings.variantData);
            items.push({id: variant_id, quantity: 1});
          }
        });
        CartJS.addItems(items);

      } catch (error) {
        // console.error(error);
        // console.log(eventCategory);
        // console.log(eventAction);
        // console.log(eventLabel);
      }
    })

    //Steps tabs click we can return only in back
    $(settings.button).click(function(){
      var tab_id = $(this).attr(settings.buttonIndex);

      if (tab_id == 'tab_echantillons_1') {
        $(settings.progressBar).val(33);
        $(settings.button).removeClass('current');
        $(settings.tab).removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
      } else if (tab_id == 'tab_echantillons_2') {
        if (!$(".echantillons__tab_1").hasClass('current')) {
          $(settings.button).removeClass('current');
          $(settings.tab).removeClass('current');

          $(this).addClass('current');
          $("#"+tab_id).addClass('current');
          $(settings.progressBar).val(66);
          $(settings.checkbox).each(function(){
            $(this).prop( "checked", false );
            $(settings.buttonStep2).attr('disabled', 'disabled');
            $(settings.buttonStep2).addClass('button--disabled');
          })
          checkedLenght = 0;
        }
      } else {
        return false;
      }

    })

    //Checkbox step 2
    $(settings.checkbox).each(function(){
      $(this).before('<div class="product__choice-outbox custom-checkbox" data-echantillons-checkbox-custom><div class="product__choice-inbox"></div></div>');
      if($(this).is(':checked')) {
        $(this).parent('.product-card__checkbox__echantillon').addClass('product__choice--active');
      } else{
         $(this).parent('.product-card__checkbox__echantillon').removeClass('product__choice--active');
      }
    });

    $('body').on('change', '.product-card__checkbox__echantillon--hidden', function(){
      if($(this).is(':checked')){
        $(this).parent('.product-card__checkbox__echantillon').addClass('product__choice--active');
        checkedLenght = checkedLenght + 1;
      } else {
        if (checkedLenght > 0) {
          $(this).parent('.product-card__checkbox__echantillon').removeClass('product__choice--active');
          checkedLenght = checkedLenght - 1;
         }
      }
      goStep3();
    });


    //email Step 2
    $(settings.email).on("keyup keydown change",function(event){
        if ($(this).val().length == 0) {
            emailIsNotEmpty = false;
        } else {
            emailIsNotEmpty = true;
        }
        goStep3();
    });

    function goStep3() {
      if (checkedLenght >= 2) {
        $(settings.checkbox).each(function(){
            if(!$(this).is(':checked')){
                $(this).attr("disabled", true);
            }
          });
      } else {
        $(settings.checkbox).each(function(){
          $(this).removeAttr("disabled");
        });
      }
      if (checkedLenght >= 1 && emailIsNotEmpty) {
        try {
          var eventAction = 'submit step 2';
          var end = new Date().getTime();
          var eventLabel = end - start;
          start = new Date().getTime();

          if(ga) ga('send', 'event', eventCategory, eventAction, eventLabel);

          $(settings.buttonStep2).attr('disabled', false);
          $(settings.buttonStep2).removeClass('button--disabled');
          $(settings.progressBar).val(100);
          $(".echantillons__tab_2").addClass('passed');
          $(".echantillons__tab_3").addClass('current');
        } catch (error) {
          console.error(error);
          console.log(eventCategory);
          console.log(eventAction);
          console.log(eventLabel);
        }
      } else {
        $(settings.buttonStep2).attr('disabled', 'disabled');
        $(settings.buttonStep2).addClass('button--disabled');
        $(settings.progressBar).val(66);
        $(".echantillons__tab_2").removeClass('passed');
        $(".echantillons__tab_3").removeClass('current');
      }
    }
  }
  return echantillonsTabs;

}

var echantillonsTabs = new theme.echantillonsTabs();



/*================ Sections ================*/
/**
* Product Template Script
* ------------------------------------------------------------------------------
* A file that contains scripts highly couple code to the Product template.
*
* @namespace product
*/

theme.Product = new function() {

    var selectors = {
        productSectionSelector : '[data-product-container]',
        thumbnailSelector : '[data-product-thumbnail]',
        thumbnailAttribute : 'data-product-thumbnail',
        sliderSelector : '[data-product-slider]',
        sliderAttribute : 'data-product-slider',

        subscriptionIdAttribute : 'data-subscription-id',
        subscriptionIdSelector : '[data-subscription-id]',
        frequencySelector : '[data-frequency-selector]',
        intervalUnitTypeSelector : '[data-interval-unit-type]',
        intervalUnitTypeAttribute : 'data-interval-unit-type',
        subscriptionActiveSelector : '[data-subscription-activate]',
        oneshotActiveSelector : '[data-oneshot-activate]',
        optionActiveClass : 'product__choice--active',
        optionDisableClass : 'product__choice--disable',
        addToCartSelector : '[data-add-to-cart]',
        oneshotUnitPrice : '[data-oneshot-unit-price]',
        subscriptionUnitPrice : '[data-subscription-unit-price]',
        subscriptionWeightPrice : '[data-subscription-weight-price]',
        oneshotWeightPrice : '[data-oneshot-weight-price]',
        oneshotQtyPrice : '[data-oneshot-quantity-price]',
        subscriptionQtyPrice : '[data-subscription-quantity-price]',
        subscriptionFrequencyContainer : '[data-frequency-container]',

        subscriptionVariantAttribute : 'data-subscription-variant-id',
        oneshotVariantAttribute : 'data-oneshot-variant-id',
        variantSubscriptionPriceAttribute : 'data-subscription-price',
        variantOneshotPriceAttribute : 'data-oneshot-price',
        variantOptionSelector:'[data-variant-option]',
        plusButton : '[data-product-plus]',
        minusButton : '[data-product-minus]',
        maximumAttribute : 'data-product-maximum',
        optionSelector : '[data-option-selector]',
        optionIndex : 'data-option-index',
        productSelect : '[data-product-select]',
        productQty : '[data-product-quantity]',
        orderPrice : '[data-order-price]',
        featuredImageAttribute : 'data-featured-image-id',

        openQuickview : '[data-open-quickview]',
        closeQuickview : '[data-close-quickview]',
        quickviewIdAttr : 'data-product-id',
        quickviewHandleAttribute : 'data-product-handle',
        quickviewSelector : '[data-quickview]',
        quickviewContainerSelector : '[data-quickview-container]',
        productQuickviewSelector : '[data-quickview-product]',
        nonScrollClass : 'non-scroll'

    };

    /**
    * Product section constructor. Runs on page load as well as Theme Editor
    * `section:load` events.
    * @param {string} container - selector for the section container DOM element
    */
    function Product(container) {
        $(function(){
            $(window).on('productLoaded', function(){
                console.log('Product js product loaded');
                var $productSection = $(selectors.productSectionSelector)
                if($productSection.length > 0){
                    initProductHandlers($productSection);
                    filterSelectElements($productSection);
                    updateUnitPrices($productSection);
                }
                initCardsHandlers();

                // Check url A/B test
                const queryString = window.location.search;
                console.log('query ', queryString);
                if(queryString.indexOf('subscription=false') == -1){
                    //$('[data-subscription-activate]').click();
                }
            })
        });
    };

    function initProductHandlers($productSection){
        // Init onscroll
        $(window).on("scroll", function() {
			if($(window).width() > 900){
				if($(window).scrollTop() < ($(window).height() / 2))$('[data-product-footer]').removeClass('product-footer__container--active');
				else $('[data-product-footer]').addClass('product-footer__container--active');
			}else{
				if($(window).scrollTop() < ($(window).height() * 2))$('[data-product-footer]').removeClass('product-footer__container--active');
				else $('[data-product-footer]').addClass('product-footer__container--active');
			}
		});

        // Init slider
        var mobileSlider = false;
        var flickitySettings = JSON.parse($(selectors.sliderSelector , $productSection).attr(selectors.sliderAttribute));
        if ( matchMedia('screen and (min-width: 768px)').matches ) {

        }else{
            flickitySettings.pageDots = true;
        }

        var $carousel = $(selectors.sliderSelector, $productSection).flickity(flickitySettings);
        $(selectors.thumbnailSelector, $productSection).click(function(){
            var index = $(this).attr(selectors.thumbnailAttribute);
            $carousel.flickity( 'select', index );
            $(selectors.thumbnailSelector, $productSection).each(function(){
                $(this).removeClass('product__thumbnail-border--active');
            });
            $(this).addClass('product__thumbnail-border--active');
        });
        $carousel.on('select.flickity', function() {
            var flkty = $carousel.data('flickity');
            $(selectors.thumbnailSelector, $productSection).each(function(){
                $(this).removeClass('product__thumbnail-border--active');
            });
            $('[data-product-thumbnail=' + flkty.selectedIndex + ']', $productSection).addClass('product__thumbnail-border--active');
        });

        $(selectors.subscriptionActiveSelector, $productSection).click(function(){
            console.log("TOTOTOTO");
            if($(this).hasClass(selectors.optionDisableClass)) return ;
            $(this).addClass(selectors.optionActiveClass);
            $(selectors.oneshotActiveSelector, $productSection).removeClass(selectors.optionActiveClass);
            $(selectors.subscriptionFrequencyContainer).show();
            updateButtonPrice();
        });
        $(selectors.oneshotActiveSelector, $productSection).click(function(){
            $(this).addClass(selectors.optionActiveClass);
            $(selectors.subscriptionActiveSelector, $productSection).removeClass(selectors.optionActiveClass);
            $(selectors.subscriptionFrequencyContainer).hide();
            updateButtonPrice();
        });
        // Change quantity
        $(selectors.plusButton, $productSection).click(function(){
            var qty = $(selectors.productQty, $productSection).html();
            var max = $(selectors.plusButton, $productSection).attr(selectors.maximumAttribute);
            if(qty < max) qty++;
            $(selectors.productQty, $productSection).html(qty);
            updateQuantityPrices($productSection);
            updateButtonPrice($productSection);
        });
        $(selectors.minusButton, $productSection).click(function(){
            var qty = $(selectors.productQty, $productSection).html();
            if(qty > 1) qty--;
            $(selectors.productQty, $productSection).html(qty);
            updateQuantityPrices($productSection);
            updateButtonPrice($productSection);
        });
        // Change option
        $(selectors.optionSelector).change(function(){
            // For size - to remove
            var isSize = false;
            var sizeIndex = 0;
            if($(this).attr('data-variant-option-name').indexOf('Taille') !== -1){
                isSize = true;
                sizeIndex = $(this).attr('data-option-index');
                sizeOption = $(this).val();
            }
            // End

            var options = [];
            var selectElt = '';
            $(selectors.optionSelector, $productSection).each(function(index){
                options[index] = $(this).val();
            });
            for(var i = 1; i < (options.length + 1); i++){
                selectElt += '[data-option-' + i + '="' + options[(i - 1)] + '"]';
            }
            var value = $(selectElt, $productSection).val();

            // For size - to remove
            if(!value && isSize == true){
                selectElt = '[data-option-' + sizeIndex + '="' + sizeOption + '"][data-variant-available="true"]';
                value = $(selectElt, $productSection).val();
                for(var i = 1; i < (options.length + 1); i++){
                    if(i != sizeIndex){
                        $('[data-option-index="' + i + '"] option[value="' + $(selectElt, $productSection).attr('data-option-' + i) + '"]').prop('selected', true);
                    }
                }
            }
            // End

            $((selectors.productSelect + ' option[value="' + value + '"]'), $productSection).prop('selected', true);
            filterSelectElements($productSection);
            updateSliderImage($productSection);
            updateUnitPrices($productSection);
            updateQuantityPrices($productSection);
            updateButtonPrice($productSection);

            // Cas taille

        });
        // Add to cart
        $(selectors.addToCartSelector).click(function(){
            var isSubscription = $((selectors.subscriptionActiveSelector + '.' + selectors.optionActiveClass), $productSection).length;
            var addCart = {};
            var variant_id = null;
            var quantity = $(selectors.productQty, $productSection).html();
            if(isSubscription){
                variant_id = $(selectors.productSelect + ' option:selected', $productSection).attr(selectors.subscriptionVariantAttribute);
                if(integrate_checkout){
                    // On remplace le variant id par le produit "classic", et on ajoute le recharge_variant_id en line item
                    addCart["recharge_variant_id"] = variant_id;
                    variant_id = $(selectors.productSelect + ' option:selected', $productSection).attr(selectors.oneshotVariantAttribute);
                }
                addCart["subscription_id"] = $(selectors.subscriptionIdSelector, $productSection).attr(selectors.subscriptionIdAttribute);
				addCart["shipping_interval_frequency"] = $(selectors.frequencySelector, $productSection).val();
				addCart["shipping_interval_unit_type"] = $(selectors.intervalUnitTypeSelector, $productSection).attr(selectors.intervalUnitTypeAttribute);
            }else{
                variant_id = $(selectors.productSelect + ' option:selected', $productSection).attr(selectors.oneshotVariantAttribute);
            }
            CartJS.addItem(variant_id, quantity, addCart);
        });
    };
    function updateSliderImage($productSection){
        var $selectedElt = $((selectors.productSelect + ' option:selected'), $productSection);
        var featured_image_id = $selectedElt.attr(selectors.featuredImageAttribute);
        if(featured_image_id){
            var $carousel = $(selectors.sliderSelector, $productSection).flickity();
            $carousel.flickity('selectCell', '[data-image-id="' + featured_image_id + '"]');
        }
    }
    // Hide nonexistent select variants
    function filterSelectElements($productSection){
        var $selectedElt = $((selectors.productSelect + ' option:selected'), $productSection);

        $('[data-variant-option]', $productSection).each(function(){
            $(this).removeAttr('disabled');
            $(this).show();
        });
        $('[data-variant-option]', $productSection).each(function(){
            var optionIndex = $(this).parents('[data-option-selector]').attr('data-option-index');
            var value = $(this).val();
            var exist = false;
            var available = true;
            var firstQuery = '[data-option-' + optionIndex + '="' + value + '"]';
            var baseQueryElt = '';
            var queryElt = '';

            for(var i = 1; i < 4; i++){
                if(i == optionIndex) continue;
                var selectedValue = $selectedElt.attr('data-option-' + i);
                if(!selectedValue) continue;
                baseQueryElt = firstQuery + '[data-option-' + i + '="' + selectedValue + '"] ';
                for(var y = 1; y < 4; y++){
                    if(y == i) continue;
                    var selectedValue = $selectedElt.attr('data-option-' + y);
                    if(!selectedValue) continue;
                    queryElt = baseQueryElt;
                    if(y != optionIndex) queryElt += baseQueryElt + '[data-option-' + y + '="' + selectedValue + '"]';
                    if($(queryElt, $productSection).length > 0){
                        exist = true;
                        if($(queryElt).attr('data-variant-available') == 'false') available = false;
                    }
                }
            }
            // Cas où 1 seule option
            if($('[data-option-2]', $productSection).length == 0){
                if($('[data-option-1="' + value + '"]', $productSection).length){
                    exist = true;
                    if($('[data-option-1="' + value + '"]').attr('data-variant-available') == 'false'){
                        available = false;
                    }
                }
            }
            if($(this).parents('[data-variant-option-name]').attr('data-variant-option-name').indexOf('Taille') !== -1){
                // console.log('C L TAILLE');
                var isTailleAvailable = true;
                var tailleValue = $(this).val();
                $('[data-option-1="' + tailleValue + '"]').each(function(){
                    if($(this).attr('data-variant-available') == 'false'){
                        isTailleAvailable = false;
                    }
                });
                if(!isTailleAvailable) $(this).attr('disabled', true);
            }else{
                if(!exist || !available) $(this).attr('disabled', true);
            }
        });
    };

    function updateUnitPrices($productSection){
        var $selectedElt = $((selectors.productSelect + ' option:selected'), $productSection);
        var subscription_price = parseFloat($selectedElt.attr(selectors.variantSubscriptionPriceAttribute));
        var oneshot_price = parseFloat($selectedElt.attr(selectors.variantOneshotPriceAttribute)) / 100;
        if(!subscription_price || subscription_price == 'NaN'){
            $(selectors.oneshotActiveSelector, $productSection).click();
            $(selectors.subscriptionActiveSelector, $productSection).addClass(selectors.optionDisableClass);
        }else{
            $(selectors.subscriptionActiveSelector, $productSection).removeClass(selectors.optionDisableClass);
            $(selectors.subscriptionUnitPrice, $productSection).html(subscription_price.toFixed(2).replace('.', ','));
        }
        $(selectors.oneshotUnitPrice, $productSection).html(oneshot_price.toFixed(2).replace('.', ','));

        // console.log('Selected elt ', $selectedElt);
        if($selectedElt.attr('data-option-1').indexOf('kg') !== -1){
            var weight = parseFloat($selectedElt.attr('data-option-1').replace(' kg', '').replace('kg', ''));
            // console.log('Weight', weight);
            var weightSubscription = ($selectedElt.attr('data-subscription-price') / weight ).toFixed(2);
            var weightOneshot = ($selectedElt.attr('data-oneshot-price') / weight / 100).toFixed(2);
            // console.log('weightSubscription ', weightSubscription);
            // console.log('weightOneshot ', weightOneshot);
            $(selectors.subscriptionWeightPrice).html(weightSubscription.replace('.',','))
            $(selectors.oneshotWeightPrice).html(weightOneshot.replace('.',','))
        }
        // TODO
    };

    function updateQuantityPrices($productSection){
        var quantity = $(selectors.productQty, $productSection).html();
        var totalOneshot = quantity * parseFloat($(selectors.oneshotUnitPrice, $productSection).html().replace(/,/, '.'));
        $(selectors.oneshotQtyPrice, $productSection).html(totalOneshot.toFixed(2).replace('.', ','));
        if($(selectors.subscriptionActiveSelector, $productSection).length){
            var totalSubscription = quantity * parseFloat($(selectors.subscriptionUnitPrice, $productSection).html().replace(/,/, '.'));
            $(selectors.subscriptionQtyPrice, $productSection).html(totalSubscription.toFixed(2).replace('.', ','));
        }

    }
    function updateButtonPrice($productSection){
        var isSubscription = $((selectors.subscriptionActiveSelector + '.' + selectors.optionActiveClass), $productSection).length;
        var total = 0;
        var quantity = $(selectors.productQty, $productSection).html();
        if(isSubscription) total = quantity * parseFloat($(selectors.subscriptionUnitPrice, $productSection).html().replace(/,/, '.'));
        else total =  quantity * parseFloat($(selectors.oneshotUnitPrice, $productSection).html().replace(/,/, '.'));
        // console.log('Total product page', total);
        $(selectors.orderPrice, $productSection).html(total.toFixed(2).replace('.', ','));
        $('[data-product-footer] ' + selectors.orderPrice).html(total.toFixed(2).replace('.', ','));
    };

    function initCardsHandlers(){
        $(function(){
            $(selectors.openQuickview).click(function(){
                var product_handle = $(this).attr(selectors.quickviewHandleAttribute);
                // console.log('Open quickview ', product_handle);
                clearQuickviews();
                openQuickview(product_handle);
            });
            $(window).on('initQuickviewHandle', function(){
              setTimeout(function(){
                $(selectors.openQuickview).click(function(){
                  console.log('toto');
                    var product_handle = $(this).attr(selectors.quickviewHandleAttribute);
                     // console.log('Open quickview ', product_handle);
                    clearQuickviews();
                    openQuickview(product_handle);
                });
              }, 1500);
            });
            $(window).on('clearQuickviews', function(){
                clearQuickviews();
            });
        });
    };
    function initQuickviewHandlers(){
        $(selectors.quickviewSelector).click(function(event) {
            if ($(event.target).closest(selectors.productQuickviewSelector).get(0) == null ) {
                clearQuickviews();
            }
        });
        $(selectors.closeQuickview).click(function(){
            clearQuickviews();
        });
    }
    function clearQuickviews(){
        $(selectors.quickviewContainerSelector).each(function(){
            $(this).empty();
        });
        $('body').removeClass(selectors.nonScrollClass);
    };
    function openQuickview(product_handle){
        $(window).trigger('closeSearch');
        console.log('TRIGGER SEARCH');
        $.get('/products/' + product_handle + '?view=quickview', function( data ) {
            $('body').addClass(selectors.nonScrollClass);
            $(selectors.quickviewContainerSelector).html(data.split('getter-start')[1].split('getter-stop')[0]);
            var $quickviewSection = $(selectors.productQuickviewSelector);
            initProductHandlers($quickviewSection);
            filterSelectElements($quickviewSection);
            updateUnitPrices($quickviewSection);
            initQuickviewHandlers();
        });
    };

    return Product;
};
var Product = new theme.Product();

/** header **/

theme.header = new function() {
	var settings = {};

	function header(headerSettings) {

		// init default settings
		var defaultSettings = {
			bodySelector : "body",
			doubleClick:'[data-double-link]',
			nonScrollClass : "non-scroll",
			headerId : "shopify-section-header",
			headerSelector : '.header',
			headerTransparent : 'header--transparent',
			toggleSideNav : '[data-header-toggle]',
			openSideNavSelector : '[data-header-open]',
			closeSideNavSelector : '[data-header-close]',
			toggleSideSearch : '[data-search-toggle]',
			closeSideSearchSelector : '[data-search-close]',
			sideNavSelector : '[data-header-side-nav]',
			sideSearchSelector : '[data-header-side-search]',
			openSideNavClass : 'active',
			openSideSearchClass : 'active--search',
			lightClass : 'light',
			headerNotLight : 'not-light',
			headerNotLightSearch : 'not-light--search',
			anchorContainer : '[data-anchor-container]',
			anchorLink : '[data-anchor-link]',
			anchorSlideTo : '[data-anchor-slideto]',
			anchorHeaderContainer : '[data-anchor-header]'
		};

		// merge settings
		settings = $.extend({}, defaultSettings, headerSettings);
		if ($(defaultSettings.bodySelector).attr('id') != 'recharge-customer-portal') {
			//if ($(settings.headerSelector).hasClass('header--transparent')) {
			checkHeaderStatus();
			$(window).on("scroll", function() {
				checkHeaderStatus();
			});
			//}
		}

		$(settings.doubleClick).dblclick(function(){
			var url = $(this).attr('data-double-link');
			if(url) window.location.href = url;
		});

		$('[data-menu-double]').click(function(e){
			var $self = $(this)
			e.preventDefault();
			if($(this).parent().hasClass('header__menu-item--clicked')){
				console.log('Toto');
				var url = $(this).attr('href');
				if(url) window.location.href = url;
				return;
			}
			$('[data-menu-double]').each(function(){
				$(settings.doubleClick).dblclick(function(){
					var url = $(this).attr('data-double-link');
					if(url) window.location.href = url;
				});
				$(this).parent().removeClass('header__menu-item--clicked')
			});
			$(this).parent().addClass('header__menu-item--clicked');
			$(document).click(function(event) {
			  $target = $(event.target);
			  if(!$target.closest('[data-menu-double]').length){
					$('[data-menu-double]').each(function(){
						$(this).parent().removeClass('header__menu-item--clicked')
					});
			  }

			});
		});
		$('[data-menu-double]').dblclick(function(e){
			var url = $(this).attr('href');
			if(url) window.location.href = url;
		});



		$(settings.toggleSideNav).on('click', function() {
			toggleSideNav();
		});
		$(settings.toggleSideSearch).on('click', function() {
			toggleSideSearch();
		});
		$(settings.closeSideNavSelector).on('click', function(){
			closeSideNav();
		})
		$(document).ready(function(){
			resizeWindow();
		})
		createUnderline();
		$(function(){createUnderline();})
		setTimeout(function(){
			createUnderline();
		}, 3000);
		$(window).on('resize', function(){
			resizeWindow();
			createUnderline();
		});
		initAnchors();
	}

	function openSideNav() {
		closeSideSearch();
		$(window).trigger('resize');
		if($(settings.headerSelector).hasClass(settings.lightClass)){
			$('html, body').animate({scrollTop: 0}, 200);
		}
		$(settings.sideNavSelector).addClass(settings.openSideNavClass);
		$(settings.headerSelector).addClass(settings.headerNotLight);
		$(settings.bodySelector).addClass(settings.nonScrollClass);
	}
	function openSideSearch() {
		if(ga) ga('send', 'event', 'Search', 'open', 'mobile');
		closeSideNav();
		if($(settings.headerSelector).hasClass(settings.lightClass)){
			$('html, body').animate({scrollTop: 0}, 200);
		}
		$(window).trigger('resize');
		$(settings.sideSearchSelector).addClass(settings.openSideSearchClass);
		$(settings.headerSelector).addClass(settings.headerNotLight);
		$(settings.headerSelector).addClass(settings.headerNotLightSearch);
		$(settings.bodySelector).addClass(settings.nonScrollClass);
	}
	function createUnderline() {
		var styleElt = '<style data-underline-style>';
		$('.header__menu-item').each(function(i) {
			var width = $(this).width();
			$(this).attr('id', 'header__menu-item-' + i);
			styleElt += '#header__menu-item-' + i + ':after{width: ' + width + 'px;left:'+ $(this).offset().left +'px;}';
		})
		setInterval(function(){
			$('.header__menu-item').each(function(i) {
				var width = $(this).width();
				$(this).attr('id', 'header__menu-item-' + i);
				styleElt += '#header__menu-item-' + i + ':after{width: ' + width + 'px;left:'+ $(this).offset().left +'px;}';
			})
		}, 1000);

		styleElt += '</style>';
		$('[data-underline-style]').remove();
		$('body').append(styleElt)
	}
	function closeSideNav() {
		$(settings.sideNavSelector).removeClass(settings.openSideNavClass);
		$(settings.headerSelector).removeClass(settings.headerNotLight);
		$(settings.bodySelector).removeClass(settings.nonScrollClass);
	}
	function closeSideSearch() {
		$(settings.sideSearchSelector).removeClass(settings.openSideSearchClass);
		$(settings.headerSelector).removeClass(settings.headerNotLight);
		$(settings.headerSelector).removeClass(settings.headerNotLightSearch);
		$(settings.bodySelector).removeClass(settings.nonScrollClass);
	}

	function toggleSideNav() {
		if ($(settings.sideNavSelector).hasClass(settings.openSideNavClass))
		closeSideNav();
		else
		openSideNav();
	}
	function toggleSideSearch() {
		if ($(settings.sideSearchSelector).hasClass(settings.openSideSearchClass))
		closeSideSearch();
		else
		openSideSearch();
	}

	function checkHeaderStatus() {
		var transparencyHeight = $(window).height() - $('.header').height();
		if($('[data-transparency-height]').length) transparencyHeight = $('[data-transparency-height]').height() + $('.header').height();

		// POUR REMETTRE LE HEADER, COMMENTER LA LIGNE SUIVANTE ET DECOMMENTER LES SUIVANTES ET REMETTRE FIXED  DANS .sticky-header
		$('#' + settings.headerId).addClass('sticky-header');

		// REMI Tu mets tes 2 conditions et tu return

		//
		// if($(window).scrollTop() > transparencyHeight) {
		// 	if($(settings.headerSelector).hasClass('light')){
		// 		$(settings.headerSelector).removeClass("light");
		// 		$(settings.headerSelector).addClass("little");
		// 		$('#' + settings.headerId).addClass('sticky-header');
		// 		if($(settings.headerSelector).hasClass('header--transparent')){
		// 			$('#' + settings.headerId).removeClass('absolute-header');
		// 		}else{
		// 			var marginTop = $('.header-container').outerHeight() + $('.announcement-bar').outerHeight();
		// 			$('body').css('margin-top', marginTop + 'px');
		// 		}
		// 		$(settings.headerSelector).trigger('headerChange');
		// 	}
		// } else {
		// 	if($(settings.headerSelector).hasClass('little')){
		// 		$(settings.headerSelector).addClass("light");
		// 		$(settings.headerSelector).removeClass("little");
		// 		$('#' + settings.headerId).removeClass('sticky-header');
		// 		if($(settings.headerSelector).hasClass('header--transparent')){
		// 			$('#' + settings.headerId).addClass('absolute-header');
		// 		}else{
		// 			$('body').css('margin-top', 0);
		// 		}
		// 		$(settings.headerSelector).trigger('headerChange');
		// 	}
		// }
		createUnderline();
	}

	function resizeWindow() {
		var windowWidth = window.innerWidth,
		headerSection = document.getElementById(settings.headerId);
		// console.log('innerheight', window.innerHeight);
		document.documentElement.style.setProperty('--window-height', window.innerHeight + 'px');
		if (headerSection) {
			var headerHeight = headerSection.clientHeight;
			var headerHeightReal = $('.header').height();
			// console.log('headerheight', headerHeight);
			document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
			document.documentElement.style.setProperty('--header-height-real', headerHeightReal + 'px');
		}

		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	function initAnchors(){
		if($(settings.anchorLink).length){
			$(settings.anchorContainer).clone().appendTo(settings.anchorHeaderContainer);
			$('.header').addClass('header--anchor');
			$(settings.anchorHeaderContainer).addClass("header__anchor--active");
			resizeWindow();
			$(settings.anchorSlideTo).click(function(){
				$(settings.anchorLink).each(function () {
					$(this).removeClass('anchor-link--active');
				});
				$(this).addClass('anchor-link--active');
				var $targetElement = $('[data-anchor-id="' + $(this).attr('data-anchor-slideto') + '"]');
				if($targetElement.length > 1){
					$targetElement.each(function(){
						if($(this).is(':visible')){
							$targetElement = $(this);
							return false;
						}
					})
				}
				var heightSum = $('.announcement-bar').height() + $('[data-section-type="anchor-menu"]').height() + $('.header-container').height();
				// if($(window).width() > 800) heightSum += 50;
				heightSum += 50;
				if($targetElement && $targetElement.offset())$("html, body").animate( {
					scrollTop: $targetElement.offset().top - heightSum
				}, 500);
			});
			$(window).on('scroll', function(){
				var top = $(window).scrollTop()+ 300 + $('.announcement-bar').height() + $('[data-section-type="anchor-menu"]').height() + $('.header-container').height();
				$(settings.anchorLink).each(function(){
					var targetAnchorId = $(this).find(settings.anchorSlideTo).attr('data-anchor-slideto');
					var $target = $('[data-anchor-id="' + targetAnchorId + '"]');
					if(!$target.length) return;
					var targetTop = $target.offset().top
					var targetBottom = targetTop + $target.outerHeight();
					if(top > targetTop && top < targetBottom){
						$(this).addClass('anchor-link--active');
					}else{
						$(this).removeClass('anchor-link--active');
					}
				});
			});
		}
	}
	return header;
}

var header = new theme.header();

theme.searchBar = new function() {

  var settings = {
    searchToggle : '[data-search-toggle-desktop]',
    searchActiveClass : 'header__menu-item--search--active',

    openSelector : '[data-search-bar-open]',
    closeSelector : '[data-search-bar-close], main',
    searchBar : '[data-search-bar]',
    searchLaunch : '[data-search-launch]',
    inputBar : '[data-search-bar-input]',
    result : '[data-search-result]',
    slider : '[data-search-slider]',
    activeClass : 'active',
    highlightClass : 'highlight'
  };

  var sendRequest = false;
  function searchBar() {
    $('.header__submenu--search').mouseleave(function(e){
      e.preventDefault();
      if($(settings.searchToggle).parent().hasClass(settings.searchActiveClass)){$(this).parent().removeClass(settings.searchActiveClass);}
    });
    $(settings.searchToggle).click(function(){
        if($(this).parent().hasClass(settings.searchActiveClass)){
          $(this).parent().removeClass(settings.searchActiveClass);
        }
        else{
          $(this).parent().addClass(settings.searchActiveClass);
          $(settings.inputBar).focus();
        }
    });
    $(settings.inputBar).keyup(function( event ) {
      var code = event.key;

      if (this.value.length > 0)
      if(code === 'Enter'){
        goToSearchPage(this.value);
      }else{
        searchProduct(this.value);
      }
    });
    $(settings.searchLaunch).click(function(){
      var search = false;
      $(settings.inputBar).each(function(){
        // console.log($(this));
        if($(this)[0].value.length > 0) search = $(this)[0].value;
      });
      if(search) goToSearchPage(search);
    })
    $(settings.openSelector).on('click', function(e) {
      openSearch();
      return false;
    });
    $(window).on('closeSearch', function(){
      console.log('CLOSE SEARCH');
      if($(settings.searchToggle).parent().hasClass(settings.searchActiveClass)){$('.header__submenu--search').parent().removeClass(settings.searchActiveClass);}
      closeSearch();
      $(settings.result).removeClass(settings.activeClass);
      $(settings.searchBar).removeClass(settings.highlightClass);
    })
    $(settings.closeSelector).on('click', function() {
      closeSearch();
      $(settings.result).removeClass(settings.activeClass);
      $(settings.searchBar).removeClass(settings.highlightClass);
    });
    initSearchSlider();
  }


  function searchProduct(search) {
    // console.log('Search ', search);
    $.get('/search?view=ajax&q=' + search + '*&type=product,article', function( data ) {
      // console.log('Data ', data);
      $(settings.result).html(data);
      $(settings.searchBar).addClass(settings.highlightClass);
      $(settings.result).addClass(settings.activeClass);
      $(window).trigger('initQuickviewHandle');
      initSearchSlider();
    });

  }


  function openSearch() {
    if(ga) ga('send', 'event', 'Search', 'open', 'desktop');
    $(window).trigger('resize');
    $(settings.searchBar).addClass(settings.activeClass);
  }
  function closeSearch() {
    $(settings.searchBar).removeClass(settings.activeClass);
  }

  function initSearchSlider(){
    $(function(){
      $(settings.slider).each(function(){
        var flickitySettings = JSON.parse($(this).attr('data-search-slider'));
        // console.log("flickitySettings ", flickitySettings);

        var $carousel = $(this).flickity(flickitySettings);
      });
    })
  }
  function goToSearchPage(search){
    if ( matchMedia('screen and (min-width: 768px)').matches ) {
      window.location.href="/search?q=" + search + '*&type=product,article';
    }
  }
  return searchBar;
}

var searchBar = new theme.searchBar();

theme.scrollReveal = new function() {

    var settings = {
        elementSelector : '[data-scroll-reveal]'
    }
    function scrollReveal() {
        $(function(){
            $(settings.elementSelector).each(function(){
                console.log('Toto');
                if ( matchMedia('screen and (min-width: 768px)').matches ) {

                    var delay = $(this).attr('data-scroll-reveal');
                    var id = '#' + $(this).attr('id');
                    var options = {
                        delay : delay,
                        mobile:false
                    }
                    ScrollReveal().reveal(id, options)
                }
            });

        });
    }
    return scrollReveal;
}

var scrollReveal = new theme.scrollReveal();


/** side cart **/
theme.cart = new function() {

    var settings = {};

    function cart(cartSettings) {
        // init default settings
        var defaultSettings = {
            bodySelector : "body",
            nonScrollClass : "non-scroll",
            openCartSelector : "[data-cart-open]",
            toggleCartSelector : "[data-cart-toggle]",
            cartCountSelector:'[data-cart-count]',
            closeCartSelector : "[data-cart-close]",
            cartLoaderSelector : '[data-cart-loader]',
            cartSelector : "[data-side-cart]",
            orderPriceSelector : '[data-cart-price]',
            checkoutButtonSelector : '[data-checkout-button]',
            continueShoppingSelector : '[data-continue-shopping]',
            cartTotalPriceSelector : '[data-cart-total-price]',
            backgroundSelector : "[data-cart-background-overlay]",
            openCartClass : 'open',
            activeBackgroundClass : "active",
            emptyCartText : '<div class="cart__empty-state heading z-h8">Votre panier est vide.</div>',
            headerSelector : '.header',
            headerNotLight : 'not-light',

            cartItemsSelector : '[data-cart-items]',
            cartItemSelector : '[data-cart-item]',
            cartItemNoSubscribeSelector:'[data-cart-item--no-subscribe]',
            cartItemEchantillonSelector:'[data-cart-item--echantillon]',
            cartItemSubscribeOffSelector : '[data-cart-item--subscribe-off]',
            cartItemSubscribeOnSelector : '[data-cart-item--subscribe-on]',
            itemStatusAttribute : 'data-item-status',

            popupToggleSelector : '[data-item-popup-toggle]',
            popupKeyAttribute : 'data-item-popup-key',
            openPopup : '[data-open-popup]',
            closePopup : '[data-close-popup]',
            popupSelector : '[data-popup]',
            popupContainerSelector : '[data-quickview-container]',
            productPopupSelector : '[data-popup-product]',
            nonScrollClass : 'non-scroll',
            popupPlusSelector : '[data-popup-plus]',
            popupQuantitySelector : '[data-popup-quantity]',
            popupMinusSelector : '[data-popup-minus]',
            popupFrequencySelector : '[data-popup-frequency]',
            popupValidate : '[data-popup-validate]',
            qtyAttribute : 'data-quantity',

            itemSubscribeSelector : '[data-item-subscribe]',
            itemUnsubscribeSelector : '[data-item-unsubscribe]',
            itemKeyAttribute : 'data-item-key',

            itemUpdateSelector : '[data-item-update]',
            itemUpdateAttribute : 'data-item-update',
            itemQuantityAttribute : 'data-item-quantity',
            dataAttributesSelector : "[data-attributes]",
            customerIdAttribute : "data-customer-id",
            customerEmailAttribute : 'data-customer-email',

            progressPriceSelector : '[data-progress-price]',
            progressGoalAttr : 'data-progress-goal',
            progressContainerSelector : '[data-progress-container]',
            progressBarContainerSelector : '[data-progress-bar-container]',
            progressBarSelector : '[data-progress-bar]',
            progressReachClass : 'cart-progress__container--reached',

            gobeletContainerSelector : '[data-gobelet-container]',
            gobeletMinAttr : 'data-gobelet-min',
            gobeletIdAttr : 'data-gobelet-id',
            gobeletSwitchSelector : '[data-gobelet-switch]'
        };
        // merge settings
        settings = $.extend({}, defaultSettings, cartSettings);

        // init cart
        $(document).on('cart.ready', function(event, cart) {
            constructCart(cart, false);
			$(window).on('cartLoaded', function(){
				constructCart(cart, false);
			});
        });

        // call classic function on click on trigger elemets
        $(settings.toggleCartSelector).on('click', function() {
            toggleCart();
            return false;
        });

        $('body').on('click', settings.closeCartSelector, function() {
            closeCart();
            return false;
        });

        $(settings.openCartSelector).on('click', function() {
            openCart();
            return false;
        });
        $(document).on('cart.requestDone', function(event) {
            jQuery.getJSON('/cart', function(cart){
                $(settings.cartLoaderSelector).hide();
                constructCart(cart, true);
                clearPopups();
            });
        });
        $(document).on('cart.requestComplete', function(event, cart) {
            constructCart(cart, true);
            $(settings.bodySelector).addClass(settings.nonScrollClass);
            $('[data-cart-items]').focus();
        });
        // setInterval(function(){
        //     calculateCartHeight(cart);
        // }, 400)
    }
    function addGobelet(cart){
        var gobelet_id = $(settings.gobeletContainerSelector).attr(settings.gobeletIdAttr);
        var founded = false;
        for(var i = 0; i < cart.items.length; i++){
            var item = cart.items[i];
            // console.log('Item.id ', item.id, ' gobelet_id ', gobelet_id);
            if(item.id == gobelet_id){
                founded = true;
                if(item.quantity > 1){
                    jQuery.post('/cart/update.js', ('updates[' + item.key + ']=1'))
                    .done(function(){$(document).trigger('cart.requestDone');});
                }
            }
        }
        // console.log('Founded ', founded);
        if(!founded){
            $(settings.cartLoaderSelector).show();
            jQuery.post('/cart/add.js', {items : [{quantity: 1,id : gobelet_id}]})
            .done(function(){$(document).trigger('cart.requestDone');});
        }
    }
    function removeGobelet(cart){
        var gobelet_id = $(settings.gobeletContainerSelector).attr(settings.gobeletIdAttr);
        for(var i = 0; i < cart.items.length; i++){
            var item = cart.items[i];
            if(item.id == gobelet_id){
                $(settings.cartLoaderSelector).show();
                jQuery.post('/cart/update.js', ('updates[' + item.key + ']=0'))
                .done(function(){$(document).trigger('cart.requestDone');});
            }
        }
    }
    function initHandlers(cart){
        // Gobelet switcher
        $(settings.gobeletSwitchSelector).change(function(){
            if($(this).is(':checked')){
                // console.log('ADD GOBELET 1');
                addGobelet(cart);
            }else{
                // console.log('REMOVE GOBELET 1 ');
                removeGobelet(cart);
            }
        });
        // Build popup
        $(settings.popupToggleSelector).click(function(){
            var item_key = $(this).attr(settings.popupKeyAttribute);
            var status = $(this).parents(settings.cartItemSelector).attr(settings.itemStatusAttribute);
            if(item_key) buildPopup(cart, item_key, status);
        });
        // Update quantity and delete
        $(settings.itemUpdateSelector).click(function(){
            var key = $(this).attr('data-item-update');
            var qty = $(this).attr(settings.itemQuantityAttribute);
            // console.log('Key ', key);
            // console.log('Quantity', qty);
            $(settings.cartLoaderSelector).show();
            jQuery.post('/cart/update.js', ('updates[' + key + ']=' + qty))
            .done(function(){$(document).trigger('cart.requestDone');});
        });
        $(settings.checkoutButtonSelector).click(function(){
            var isRecharge = false;
            for(var i = 0; i < cart.items.length; i++){
                if(cart.items[i].properties && cart.items[i].properties.subscribtion_id) isReCharge = true;
            }
            var url = reChargeBuildCheckoutURL(isRecharge);
            // console.log('Redirect url ', url);
            window.location.href=url;
        });
        initSubscriptionHandlers(cart)
    }
    function reChargeGetCookie(name) {
        return (document.cookie.match('(^|; )' + name + '=([^;]*)')||0)[2];
    }
    function reChargeBuildCheckoutURL(isRecharge) {
        return '/checkout';
        if(!isRecharge) return '/checkout';
        // Build the Checkout URL
        var myshopify_domain = shop_url;
        var token = reChargeGetCookie('cart');
        try {
            // Cross-domain tracking with Google Analytics
            var ga_linker = ga.getAll()[0].get('linkerParam');
        } catch (e) {
            // 'ga' is not available
            // console.log('GA Failed');
            var ga_linker = '';
        }
        // Customer email address for use in the Checkout URL
        var customer_param = '';
        var customer_id = $(settings.dataAttributesSelector).attr(settings.customerIdAttribute);
        var customer_email = $(settings.dataAttributesSelector).attr(settings.customerEmailAttribute);
        if(customer_id && customer_email) customer_param += '}customer_id=' + customer_id + ' &customer_email=' + customer_email;
        // console.log('Customer param: ' , customer_param);
        var checkout_url = 'https://checkout.rechargeapps.com/r/checkout?myshopify_domain=' + myshopify_domain + '&cart_token=' + token + '&' + ga_linker + '&' + customer_param
        // console.log('Checkout url : ' + checkout_url);
        return checkout_url;
    }
    function initSubscriptionHandlers(cart){
        // Subscribe
        $(settings.itemSubscribeSelector).click(function(e){
            e.preventDefault();
            var item_key = $(this).attr(settings.itemKeyAttribute);
            var itemObject = null;
            var product_id = null;
            var productObject = null;
            var cart_variant_id = null;
            var cart_properties = {};
            for(var i = 0; i < cart.items.length; i++){
                var item = cart.items[i];
                if(item.key == item_key){
                    itemObject = item;
                    product_id = item.product_id;
                }
            }
            for(var i = 0; i < all_products.length; i++){
                var product = all_products[i];
                if(product.product.id == product_id){
                    productObject = product;
                }
            }
            for(var i = 0; i < productObject.variants.length; i++){
                if(productObject.variants[i].variant.id == itemObject.variant_id){
                    cart_variant_id = productObject.variants[i].metafields.discount_variant_id;
                }
            }
            cart_properties["subscription_id"] = productObject.metafields.subscription_id;
            cart_properties["shipping_interval_frequency"] = productObject.metafields.shipping_interval_frequency.split(',')[0];
            cart_properties["shipping_interval_unit_type"] = productObject.metafields.shipping_interval_unit_type;
            if(integrate_checkout){
                $(settings.cartLoaderSelector).show();
                cart_properties["recharge_variant_id"] = cart_variant_id;
                jQuery.post('/cart/change.js',
                {
                    id:item_key,
                    quantity:itemObject.quantity,
                    properties:cart_properties
                })
                .done(function(){$(document).trigger('cart.requestDone');});
            }else{
                if(!cart_properties["subscription_id"] || !cart_properties["shipping_interval_frequency"] || !cart_properties["shipping_interval_unit_type"] || !cart_variant_id){
                    // console.log('Error swap subscription cart');
                    return;
                }
                $(settings.cartLoaderSelector).show();
                jQuery.post('/cart/update.js', ('updates[' + item_key + ']=0'))
                .done(function(){
                    jQuery.post('/cart/add.js', {
                        items : [
                            {
                                quantity: itemObject.quantity,
                                id : cart_variant_id,
                                properties : cart_properties
                            }
                        ]
                    })
                    .done(function(){$(document).trigger('cart.requestDone');});
                })
            }
            clearPopups();
        });
        // Unsubscribe
        $(settings.itemUnsubscribeSelector).click(function(e){
            e.preventDefault();
            var item_key = $(this).attr(settings.itemKeyAttribute);
            var itemObject = null;
            var product_id = null;
            var cart_variant_id = null;
            for(var i = 0; i < cart.items.length; i++){
                var item = cart.items[i];
                if(item.key == item_key){
                    itemObject = item;
                    product_id = item.product_id;
                }
            }
            for(var i = 0; i < all_products.length; i++){
                var product = all_products[i];
                for(var j = 0; j < product.variants.length; j++){
                    var variant = product.variants[j];
                    if(variant.metafields.discount_variant_id == itemObject.variant_id){
                        cart_variant_id = variant.variant.id;
                    }
                }
            }
            $(settings.cartLoaderSelector).show();
            if(integrate_checkout){
                jQuery.post('/cart/change.js',
                {
                    id:item_key,
                    quantity:itemObject.quantity,
                    properties:{
                        "_oneshot_product":true
                    }
                })
                .done(function(){$(document).trigger('cart.requestDone');});
            }else{
                jQuery.post('/cart/update.js', ('updates[' + item_key + ']=0'))
                .done(function(){
                    jQuery.post('/cart/add.js', {items:[{quantity:itemObject.quantity, id : cart_variant_id}]})
                    .done(function(){$(document).trigger('cart.requestDone');});
                });
            }
            clearPopups();
        });
    }

    function getPrice(price, cart) {
        var price = Number(price / 100).toFixed(2);
        if (cart.currency == "EUR")
        return price + "€";
        else
        return price + "$";
    }
    function unescape(string) {
        return new DOMParser().parseFromString(string,'text/html').querySelector('html').textContent;
    }
    function constructCart(cart, open) {
        // create elemets
        var contexts = [];
        var context = {};
        var c = null;
        var final_html = "";
        var source = "";
        var template = null;
        var echantillonCounter = 0;

        // console.log('Cart ', cart);
        $(window).trigger('clearQuickviews');
        var gobelet_id = $(settings.gobeletContainerSelector).attr(settings.gobeletIdAttr);
        for(var i=0, l=cart.items.length; i<l; i++) {
            c = cart.items[i];
            if(c.id == gobelet_id) continue;
            var productObject = {};
            var variantObject = {};
            var status = 'NO-SUBSCRIBE';

            for(var k = 0; k < all_products.length; k++){
                var product = all_products[k];
                if(product.product.id == c.product_id){
                    productObject = product;
                    // console.log('Product ', product);
                    if(productObject.product.tags.indexOf('echantillons') !== -1){
                        status = 'ECHANTILLON';
                        echantillonCounter += c.quantity;
                        console.log('Echantillon counter ', echantillonCounter);
                        if(echantillonCounter > 2){
                            console.log('IN ', echantillonCounter);
                            jQuery.post('/cart/update.js', ('updates[' + c.key + ']=0'))
							.done(function(){$(document).trigger('cart.requestDone');});
                        }
                    }
                    for(var j = 0; j < productObject.variants.length; j++){
                        if(productObject.variants[j].variant.id == c.id){
                            variantObject = productObject.variants[j];
                        }
                    }
                }
            }

            // console.log('Item ', c);
            // console.log('Product object', productObject);
            // console.log('Variant object', variantObject);
            if(c && c.properties && c.properties.subscription_id) status = 'SUBSCRIBE-ON';
            else if(productObject && productObject.metafields.has_subscription == 'True'){
                status = 'SUBSCRIBE-OFF';
            }
            if(status == 'SUBSCRIBE-OFF' || status == 'NO-SUBSCRIBE' || status == 'ECHANTILLON'){
                var context = {
                    item_image : c.image,
                    item_key : c.key,
                    item_variant_id : variantObject.variant.id,
                    item_product_title : productObject.product.title,
                    item_vendor : productObject.product.vendor,
                    item_quantity : c.quantity,
                    item_price : getPrice((c.price * c.quantity), cart),
                    item_quantity_plus : ((c.quantity > 19) ? 19 : (c.quantity + 1)),
                    item_quantity_minus : (c.quantity - 1),
                    item_line_price : getPrice(c.line_price, cart),
                    item_url : c.url,
                    item_discount_percentage : parseInt(productObject.metafields.discount_percentage).toString().replace('0','').replace('.',''),
                    item_discount_variant_price : getPrice((variantObject.metafields.discount_variant_price * c.quantity * 100), cart),
                    product_why_subscribe : unescape(themeSettings.product_why_subscribe),
                    subscribe_popup_title : unescape(themeSettings.subscribe_popup_title),
                    subscribe_popup_content : unescape(themeSettings.subscribe_popup_content).replace('<p>','').replace('</p>',''),
                    subscribe_popup_cta : unescape(themeSettings.subscribe_popup_cta),
                    subscribe_popup_url : unescape(themeSettings.subscribe_popup_url),
                    subscribe_popup_picto_1 : unescape(themeSettings.subscribe_popup_picto_1),
                    subscribe_popup_title_1 : unescape(themeSettings.subscribe_popup_title_1),
                    subscribe_popup_text_1 : unescape(themeSettings.subscribe_popup_text_1),
                    subscribe_popup_picto_2 : unescape(themeSettings.subscribe_popup_picto_2),
                    subscribe_popup_title_2 : unescape(themeSettings.subscribe_popup_title_2),
                    subscribe_popup_text_2 : unescape(themeSettings.subscribe_popup_text_2),
                    subscribe_popup_picto_3 : unescape(themeSettings.subscribe_popup_picto_3),
                    subscribe_popup_title_3 : unescape(themeSettings.subscribe_popup_title_3),
                    subscribe_popup_text_3 : unescape(themeSettings.subscribe_popup_text_3),
                    subscribe_popup_picto_4 : unescape(themeSettings.subscribe_popup_picto_4),
                    subscribe_popup_title_4 : unescape(themeSettings.subscribe_popup_title_4),
                    subscribe_popup_text_4 : unescape(themeSettings.subscribe_popup_text_4)

                };
                if(!c.product_has_only_default_variant){
                    context.item_variant_title = variantObject.variant.title;
                }
                // console.log('Context ', context);
            }
            // console.log('Status  :', status);


            if(status == 'SUBSCRIBE-ON'){
                var rootItemProduct = null;
                var rootItemVariant = null;
                var item_price = c.price;
                var item_variant_id = c.id;
                for(var j = 0; j < all_products.length; j++){
                    var product = all_products[j];
                    // console.log('C product id', c.product_id);
                    // console.log('Metafields discount product id', product.metafields.discount_product_id);
                    if(product.metafields.discount_product_id == c.product_id){
                        rootItemProduct = product;
                        for(var k = 0; k < rootItemProduct.variants.length; k++){
                            if(rootItemProduct.variants[k].metafields.discount_variant_id == c.id){
                                rootItemVariant = rootItemProduct.variants[k];
                            }
                        }
                    }
                }
                if(integrate_checkout){
                    // Get
                    rootItemProduct = productObject;
                    rootItemVariant = variantObject;
                    item_price = rootItemVariant.metafields.discount_variant_price * 100;
                    item_variant_id = rootItemVariant.metafields.discount_variant_id;
                }
                // console.log('Item ', c);
                // console.log('Root item variant', rootItemVariant);
                // console.log('ITEM PRICE ', item_price);
                // console.log('ITEM GET PRICE ', getPrice((item_price * c.quantity), cart));
                var context = {
                    item_image : rootItemProduct.product.featured_image,
                    item_key : c.key,
                    item_variant_id : item_variant_id,
                    item_product_title : rootItemProduct.product.title,
                    item_vendor : rootItemProduct.product.vendor,
                    item_quantity : c.quantity,
                    item_price : getPrice((item_price * c.quantity), cart),
                    item_initial_price : getPrice((c.quantity * rootItemVariant.variant.price), cart),
                    item_quantity_plus : ((c.quantity > 19) ? 19 : (c.quantity + 1)),
                    item_quantity_minus : (c.quantity - 1),
                    // item_line_price : getPrice(c.line_price, cart),
                    item_url : '/products/' + rootItemProduct.product.handle,
                    item_discount_percentage : parseInt(rootItemProduct.metafields.discount_percentage).toString().replace('0','').replace('.',''),
                    item_discount_variant_price : getPrice((rootItemVariant.metafields.discount_variant_price * c.quantity * 100), cart),
                    item_shipping_interval_frequency : c.properties.shipping_interval_frequency,
                    product_why_subscribe : themeSettings.product_why_subscribe,
                    subscribe_popup_title : themeSettings.subscribe_popup_title,
                    subscribe_popup_content : themeSettings.subscribe_popup_content,
                    subscribe_popup_cta : themeSettings.subscribe_popup_cta,
                    subscribe_popup_url : themeSettings.subscribe_popup_url,
                    subscribe_popup_picto_1 : themeSettings.subscribe_popup_picto_1,
                    subscribe_popup_title_1 : themeSettings.subscribe_popup_title_1,
                    subscribe_popup_text_1 : themeSettings.subscribe_popup_text_1,
                    subscribe_popup_picto_2 : themeSettings.subscribe_popup_picto_2,
                    subscribe_popup_title_2 : themeSettings.subscribe_popup_title_2,
                    subscribe_popup_text_2 : themeSettings.subscribe_popup_text_2,
                    subscribe_popup_picto_3 : themeSettings.subscribe_popup_picto_3,
                    subscribe_popup_title_3 : themeSettings.subscribe_popup_title_3,
                    subscribe_popup_text_3 : themeSettings.subscribe_popup_text_3,
                    subscribe_popup_picto_4 : themeSettings.subscribe_popup_picto_4,
                    subscribe_popup_title_4 : themeSettings.subscribe_popup_title_4,
                    subscribe_popup_text_4 : themeSettings.subscribe_popup_text_4
                };
                if(!c.product_has_only_default_variant){
                    context.item_variant_title = rootItemVariant.variant.title;
                }
                //console.log('Context ', context);
                source = $(settings.cartItemSubscribeOnSelector).html();
            }else if(status == 'SUBSCRIBE-OFF'){
                source = $(settings.cartItemSubscribeOffSelector).html();
            }else if (status == 'ECHANTILLON'){
                source = $(settings.cartItemEchantillonSelector).html();
            }else if(status == 'NO-SUBSCRIBE'){
                source = $(settings.cartItemNoSubscribeSelector).html();
            }
            template = Handlebars.compile(source);
            html = template(context);
            final_html += html;
        }
        $(settings.cartTotalPriceSelector).html(getPrice(cart.total_price, cart));
        if (cart.items.length > 0) {
            $(settings.cartItemsSelector).html(final_html);
        }
        else {
            $(settings.cartItemsSelector).html(settings.emptyCartText);
        }
        if (open) openCart();
        initHandlers(cart);
        updateCartVariables(cart);
        $('[data-cart-items]').focus();
    }
    function calculateCartHeight(){
        var cartItemsHeight = $(window).innerHeight();
        cartItemsHeight = $('.cart__payment-container').offset().top - $('[data-cart-items]').offset().top;
        document.documentElement.style.setProperty('--cart-items-height', cartItemsHeight + 'px');
    }
    function getCartPrice(cart){
        if(integrate_checkout){
            var total_price = 0;
            for(var i = 0; i < cart.items.length; i++){
                var item = cart.items[i];
                if(item.properties.recharge_variant_id){
                    var productObject = null;
                    for(var j = 0; j < all_products.length; j++){
                        var product = all_products[j];
                        if(product.product.id == item.product_id){
                            productObject = product;
                        }
                    }
                    for(var j = 0; j < productObject.variants.length; j++){
                        if(productObject.variants[j].variant.id == item.id){
                            total_price += ((productObject.variants[j].metafields.discount_variant_price * 100) * item.quantity);
                        }
                    }

                }else{
                    total_price += item.final_line_price;
                }
            }
            return total_price;
        }
        else return cart.total_price;
    }
    function updateCartVariables(cart){
        var price = getCartPrice(cart)
        var cartCount = 0;
        var isOnlyEchantillon = true;
        // Show section gobelet
        var gobelet_id = $(settings.gobeletContainerSelector).attr(settings.gobeletIdAttr);
        var minGobelet = parseFloat($(settings.gobeletContainerSelector).attr(settings.gobeletMinAttr).toString().replace(',','.')) * 100;
        for(var i = 0; i < cart.items.length; i++){
            // console.log('Item ', cart.items[i]);
            if(cart.items[i].sku.indexOf('SAMP') == -1) isOnlyEchantillon = false;
            if(cart.items[i].id == gobelet_id){
                $(settings.gobeletSwitchSelector).prop('checked',true);
            }else{
                cartCount += cart.items[i].quantity;
            }
        }
        if(minGobelet > price){
            $(settings.gobeletContainerSelector).hide();
            removeGobelet(cart);
        }else{
            $(settings.gobeletContainerSelector).show();
        }

        // Change cart count
        if(cartCount > 0){
            $(settings.cartCountSelector).show();
        }else{
            $(settings.cartCountSelector).hide();
        }
        $(settings.cartCountSelector).html(cartCount);

        // Change button price
        var cart_total_price = (price / 100).toFixed(2);
        if(cart_total_price < 45){
            jQuery.post('/cart/update.js', "attributes[free_shipping]='disabled'");
        }else{
            jQuery.post('/cart/update.js', "attributes[free_shipping]='active'");
        }
        $(settings.orderPriceSelector).html(cart_total_price.toString().replace('.',','));
        if(price == 0){
            $(settings.continueShoppingSelector).show();
            $(settings.checkoutButtonSelector).hide();
        }else{
            $(settings.continueShoppingSelector).hide();
            $(settings.checkoutButtonSelector).show();
        }

        // Change progress bar
        var progressGoal = $(settings.progressPriceSelector).attr(settings.progressGoalAttr);
        var containerWidth = $(settings.progressBarContainerSelector).innerWidth();
        var $progressElt = $(settings.progressBarSelector);
        var relation = (price / progressGoal) * 100;
        var targetWidth = relation * containerWidth;
        var difference = ((progressGoal - price) / 100).toFixed(2).toString().replace('.',',');
        $(settings.progressPriceSelector).html(difference);

        if(relation <= 0) {
          relation = 0;
          isOnlyEchantillon = false;
        }
        if(relation > 100 || isOnlyEchantillon){
            $(settings.progressContainerSelector).addClass(settings.progressReachClass);
            $(settings.progressBarSelector).width('100%');
        }else{
            $(settings.progressContainerSelector).removeClass(settings.progressReachClass);
            if(relation <= 0) relation = 0;
            $(settings.progressBarSelector).width(relation + '%');
        }

    }
    function openCart() {

        if ($('body').hasClass('template-cart')) return;

        $(settings.cartSelector).addClass(settings.openCartClass);
        $(settings.backgroundSelector).addClass(settings.activeBackgroundClass);
        $(settings.headerSelector).addClass(settings.headerNotLight);
        $(settings.bodySelector).addClass(settings.nonScrollClass);
    }

    function closeCart() {
        $(settings.cartSelector).removeClass(settings.openCartClass);
        $(settings.backgroundSelector).removeClass(settings.activeBackgroundClass);
        $(settings.headerSelector).removeClass(settings.headerNotLight);
        $(settings.bodySelector).removeClass(settings.nonScrollClass);
        if ($('body').hasClass('template-cart'))
        window.location.href = "/";
    }

    function toggleCart() {
        if ($(settings.cartSelector).hasClass(settings.openCartClass))
        closeCart();
        else
        openCart();
    }

    function clearPopups(){
        $(settings.popupContainerSelector).each(function(){
            $(this).empty();
        });
        $('body').removeClass(settings.nonScrollClass);
    }

    function filterPopupSelectedElements(cart){
        var $selectedElt = $('[data-popup-select]').children('option:selected');

        $('[data-popup-option] option').each(function(){
            $(this).removeAttr('disabled');
        });

        $('[data-popup-option] option').each(function(){
            var optionIndex = $(this).parents('[data-popup-option]').attr('data-popup-option');
            var value = $(this).val();
            var exist = false;
            var available = true;
            var firstQuery = '[data-popup-select-option-' + optionIndex + '="' + value + '"]';
            var baseQueryElt = '';
            var queryElt = '';

            for(var i = 0; i < 4; i++){
                if(i == optionIndex) continue;
                var selectedValue = $selectedElt.attr('data-popup-select-option-' + i);
                if(!selectedValue) continue;
                baseQueryElt = firstQuery + '[data-popup-select-option-' + i + '="' + selectedValue + '"] ';
                for(var y = 0; y < 4; y++){
                    if(y == i) continue;
                    var selectedValue = $selectedElt.attr('data-popup-select-option-' + y);
                    if(!selectedValue) continue;
                    queryElt = baseQueryElt;
                    if(y != optionIndex) queryElt += baseQueryElt + '[data-popup-select-option-' + y + '="' + selectedValue + '"]';
                    if($(queryElt).length > 0){
                        exist = true;
                        if($(queryElt).attr('data-variant-available') == 'false') available = false;
                    }
                }
            }
            // Cas où 1 seule option
            if($('[data-popup-select-option-1]').length == 0){
                if($('[data-popup-select-option-0="' + value + '"]').length){
                    exist = true;
                    if($('[data-popup-select-option-0="' + value + '"]').attr('data-variant-available') == 'false'){
                        available = false;
                    }
                }
            }
            // console.log('Value' , value);
            // console.log('Exist ', exist, ' available ', available);
            if(!exist || !available) $(this).attr('disabled', true);
        });
    }

    function initPopupHandlers(cart){
        // Close popup
        $(settings.popupSelector).click(function(event) {
            if ($(event.target).closest(settings.productPopupSelector).get(0) == null ) {
                clearPopups();
            }
        });
        $(settings.closePopup).click(function(){
            clearPopups();
        });
        $(settings.popupMinusSelector).click(function(){
            var $popup = $(this).parents(settings.productPopupSelector);
            var newQuantity = $popup.find(settings.popupQuantitySelector).html();
            if(newQuantity > 0) newQuantity--;
            $popup.find(settings.popupQuantitySelector).html(newQuantity);
        });
        $(settings.popupPlusSelector).click(function(){
            var $popup = $(this).parents(settings.productPopupSelector);
            var newQuantity = $popup.find(settings.popupQuantitySelector).html();
            if(newQuantity <= 9) newQuantity++;
            $popup.find(settings.popupQuantitySelector).html(newQuantity);
        });

        $('[data-popup-option]').change(function(){
            var targetQuery = '';
            for(var i = 0; i < 3; i++){
                var $optionElt = $('[data-popup-option-' + i + ']');
                if($optionElt.length > 0){
                    var value = $optionElt.children('option:selected').val();
                    targetQuery += '[data-popup-select-option-' + i + '="' + value + '"]';
                }
            }
            // console.log('Target query ', targetQuery);
            $(targetQuery).prop('selected',true);
            filterPopupSelectedElements(cart);
        });

        $(settings.popupValidate).click(function(){
            var $popup = $(this).parents(settings.productPopupSelector);
            var item_key = $popup.attr(settings.itemKeyAttribute);
            var newQuantity = $popup.find(settings.popupQuantitySelector).html();
            var newFrequency = $popup.find(settings.popupFrequencySelector).children('option:selected').val();
            var initialFrequency = $popup.find('[data-popup-frequency-initial]').val();
            var initialVariant = $popup.find('[data-popup-select-initial]').val();
            var newVariant = $popup.find('[data-popup-select]').children('option:selected').val();
            if(newQuantity == 0){
                $(settings.cartLoaderSelector).show();
                jQuery.post('/cart/update.js', ('updates[' + item_key + ']=0'))
                .done(function(){$(document).trigger('cart.requestDone');});
                clearPopups();
            }else if(newVariant && initialVariant && (newVariant != initialVariant)){
                var cart_properties = {};
                var newId = newVariant;
                if(newFrequency){
                    for(var i = 0; i< cart.items.length; i++){
                        if(cart.items[i].key == item_key){
                            cart_properties = cart.items[i].properties;
                            var quantity = newQuantity;
                            if(cart_properties) cart_properties.shipping_interval_frequency = newFrequency
                        }
                    }
                    if(integrate_checkout){
                        newId = $popup.find('[data-popup-select]').children('option:selected').attr('data-popup-select-variant-id');
                    }else{
                        newId = $popup.find('[data-popup-select]').children('option:selected').attr('data-popup-subscription-variant-id');
                    }
                }
                $(settings.cartLoaderSelector).show();
                // console.log('Cart properties', cart_properties);
                // console.log('new id ', newId);
                jQuery.post('/cart/update.js', ('updates[' + item_key + ']=0'))
                .done(function(e, b){
                    jQuery.post('/cart/add.js', {
                        items : [
                            {
                                quantity: newQuantity,
                                id : newId,
                                properties : cart_properties
                            }
                        ]
                    })
                    .done(function(){$(document).trigger('cart.requestDone');});
                })
                clearPopups();
            }else if(newFrequency && initialFrequency && (newFrequency != initialFrequency)){
                for(var i = 0; i< cart.items.length; i++){
                    if(cart.items[i].key == item_key){
                        var properties = cart.items[i].properties;
                        var quantity = newQuantity;
                        i++;
                        properties.shipping_interval_frequency = newFrequency
                        CartJS.updateItem(i, quantity, properties);
                        clearPopups();
                        return;
                    }
                }
            }else{
                $(settings.cartLoaderSelector).show();
                jQuery.post('/cart/update.js', ('updates[' + item_key + ']=' + newQuantity))
                .done(function(){$(document).trigger('cart.requestDone');});
            }
        });
        initSubscriptionHandlers(cart);
        filterPopupSelectedElements(cart);
    }

    function buildPopup(cart, item_key, status){
        var item = null;
        var productObject = null;
        var rootProductObject = null;
        for(var i = 0; i < cart.items.length; i++){
            if(cart.items[i].key == item_key) item = cart.items[i];
        }
        // console.log('Item ', item, ' Status ', status);
        // console.log('Cart ', cart);
        if(status == 'SUBSCRIBE-ON' && !integrate_checkout){
            for(var i = 0; i < all_products.length; i++){
                if(all_products[i].metafields.discount_product_id == item.product_id) productObject = all_products[i];
            }
        }else{
            for(var i = 0; i < all_products.length; i++){
                if(all_products[i].product.id == item.product_id) productObject = all_products[i];
            }
        }
        // console.log('Product ', productObject);
        if(!item || !productObject) return;
        var html = '<div data-popup class="background-overlay quickview">';
        html += '<div data-popup-product data-item-key="' + item_key + '" class="popup-update">';
        // Header
        html += '<div class="popup__header">';
        html += '<h3 class="popup__title heading z-h8">'
        if(status == 'SUBSCRIBE-ON'){
            html += 'Modifier mon abonnement.'
        }else{
            html += 'Modifier mon produit.'
        }
        html+= '</h3>';
        html += '<div data-close-popup class="popup__close">'
        html += '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-croix" viewBox="0 0 12.31 12.311"><g fill="none" stroke="#807672" stroke-dasharray="0 0 0 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11.56.75L.75 11.561M11.56 11.558L.75.75"></path></g></svg>'
        html+= '</div>';
        html+= '</div>';
        // Options
        html += '<div class="product__options">';

        html+='<select class="no-js" data-popup-select>';
        for(var f = 0; f < productObject.variants.length; f++){
            var variant = productObject.variants[f].variant;
            var variantObject = productObject.variants[f];
            html += '<option';

            if(status == 'SUBSCRIBE-ON') html += ' data-popup-subscription-variant-id="' + productObject.variants[f].metafields.discount_variant_id + '" ';
            html += ' data-popup-select-variant-id="' + variant.id + '" ';
            html += ' value="' + variant.id + '" ';
            if(!variant.available) html += 'data-variant-available="false" ';
            if(status == 'SUBSCRIBE-ON' && !integrate_checkout){
                if(item.id == variantObject.metafields.discount_variant_id){
                    html += 'selected data-popup-select-initial ';
                }
            }else{
                if(item.id == variant.id){
                    html += 'selected data-popup-select-initial ';
                }
            }

            for(var g = 0; g < variant.options.length; g++){
                var g1 = g + 1;
                html += ' data-popup-select-option-' + g + '="' + variant.options[g] + '"';
            }
            html += '>';
            html += variant.name;
            html += '</option>'
        }
        html +='</select>';

        for(var f = 0; f < productObject.product.options.length; f++){
            var optionName = productObject.product.options[f];

            if (optionName.includes('aille')) {
              html += '<div class="product__option-container order-0">'
            } else {
              html += '<div class="product__option-container order-2">'
            }
            html += '<div class="product__option-title  text t-9">'
            html += optionName;
            html += '</div>';
            html += '<div class="product__option-content">';
            html += '<select data-popup-option="' + f + '" data-popup-option-' + f + ' class="product__select">';

            var conditionnementStr = '';
            for(var j = 0; j < productObject.product.variants.length; j++){
                var variant = productObject.product.variants[j];
                // if(!variant.available) continue;
                if(conditionnementStr.indexOf(variant['option' + (f + 1)]) !== -1) continue;
                conditionnementStr += variant['option' + (f + 1)];
                if(item.options_with_values[f].value == variant['option' + (f + 1)]){
                    html += '<option selected value="' + variant['option' + (f + 1)] + '" class="product__select-option">';
                }else{
                    html += '<option value="' + variant['option' + (f + 1)] + '" class="product__select-option">';
                }
                html += variant['option' + (f + 1)];
                html += '</option>';
            }
            html += '</select>';
            html += '</div>';
            html += '</div>';
        }

        html += '<div class="product__option-container order-3">'

        html += '<div class="product__option-title  text t-9">'
        html += 'Quantité'
        html += '</div>';
        html += '<div class="product__option-content product__qty-container">';
        html += '<div data-popup-minus class="product__qty-btn">';
        html += '-';
        html += '</div>';
        html += '<div class="product__qty text t-9">';
        html += '<span data-popup-quantity class="product__qty-nb">';
        html += item.quantity;
        html += '</span>';
        html += '</div>';
        html += '<div data-popup-plus class="product__qty-btn">';
        html += '+';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        if(status == 'SUBSCRIBE-ON'){
            html += '<div class="product__option-container order-4">'
            html += '<div class="product__option-title  text t-9">'
            html += 'Fréquence de livraison'
            html += '</div>';
            html += '<div class="product__option-content">';

            var frequencies = productObject.metafields.shipping_interval_frequency.split(',');
            html += '<select data-popup-frequency class="product__select">';
            for(var j = 0; j < frequencies.length; j++){
                var frequency = frequencies[j];
                if(item.properties.shipping_interval_frequency == frequency){
                    html += '<option data-popup-frequency-initial selected value="' + frequency + '" class="product__select-option">';
                }else{
                    html += '<option value="' + frequency + '" class="product__select-option">';
                }
                html += 'Tous les ' + frequency +' j';
                html += '</option>';
            }
            html += '</select>';
            html += '</div>';
            html += '</div>';
        }
        html += '</div>';
        // Footer
        html += '<div class="popup__footer">';
        // Validate button
        html += '<div data-popup-validate class="button--full button">';
        html += 'Valider';
        html+= '</div>';
        // Cancel subscription
        if(status == 'SUBSCRIBE-ON'){
            html += '<div data-item-unsubscribe data-item-key="' + item_key + '" class="text t-10 uppercase popup__unsuscribe">'
            html += 'Annuler mon abonnement mais conserver mon produit en achat unique.';
            html+= '</div>';
        }
        html+= '</div>';
        html += '</div>';

        html+= '</div>';
        html+= '</div>';
        $(settings.bodySelector).addClass(settings.nonScrollClass);
        $(settings.popupContainerSelector).html(html);
        var $popupSection = $(settings.productPopupSelector);
        filterPopupSelectedElements(cart);
        initPopupHandlers(cart)
    }

    return cart;
}

var cart = new theme.cart();

/**************************
  Custom select
***************************/

theme.customSelect = new function() {

  function customSelect() {

    // init default settings
    var settings = {
      select: '[data-custom-select]'
    };

    // Iterate over each select element
    $(settings.select).each(function () {

        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        if(numberOfOptions > 1){
        // Hides the select element
        $this.addClass('s-hidden');


        // Wrap the select element in a div
        $this.wrap('<div class="select text t-4"></div>');



        // Insert a styled div to sit over the top of the hidden select element
          $this.after('<div class="styledSelect"></div>');


        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());

        if(numberOfOptions > 1){
          $styledSelect.append('<span class="select_chevron_down"></span>');
        }
        // Insert an unordered list after the styled div and also cache the list
        if(numberOfOptions > 1){
          var $list = $('<ul />', {
              'class': 'options'
          }).insertAfter($styledSelect);


        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
          var text = '';
          if (i != 0) {
            text = $this.children('option').eq(i).text()
            $('<li />', {
                text: text,
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
          }
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.styledSelect.active').not(this).each(function () {
                $(this).removeClass('active').next('ul.options').hide();
            });
            $(this).toggleClass('active').next('ul.options').toggle();
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            var url = $(this).attr('rel').toString();
            window.location.replace(url);
            $list.hide();
            /* alert($this.val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });
      }
    }else{

    }
    });


  }
  return customSelect;
}

var customSelect = new theme.customSelect();

/**************************
  Valid form contact
***************************/

theme.checkForm = new function() {

  function checkForm() {

    // init default settings
    var settings = {
      input: '[data-valid-input]',
      button: '[data-valid-button]'
    };

    $(settings.input).keyup(function() {

        var empty = false;
        $(settings.input).each(function() {
            if ($(this).val().length == 0 && $(this).attr('required')) {
                empty = true;
            }
        });

        if (empty) {
            $(settings.button).attr('disabled', 'disabled');
        } else {
            $(settings.button).attr('disabled', false);
        }
    });


  }
  return checkForm;
}

var checkForm = new theme.checkForm();

/**************************
  Slider only mobile
***************************/

theme.sliderOnlyMobile = new function() {

  function sliderOnlyMobile() {

    // init default settings
    var settings = {
      selector: '[data-only-mobile-f]',
      selectorChild: '[data-slider-mobile-item]',
      selectorData : 'only-mobile-f'
    };

    // init flickity default settings
    var flickitySettings = {

    };

    $(settings.selectorChild).each(function() {
      var $currentEl = $(this);
      if ($currentEl.hasClass('grid__cell')) {
        $currentEl.removeClass('grid__cell')
      }
    });

    // iterate across all slider
    $(settings.selector).each(function() {

      var $currentEl = $(this);
      if ($currentEl.hasClass('grid')) {
          $currentEl.removeClass('grid')
        }
      // get elements settings
      var elementSettings = $currentEl.data(settings.selectorData);
      // merge default settings with elements settings
      var finalSettings = $.extend({}, flickitySettings, elementSettings);

      // wait all images in slider are loaded
      $currentEl.imagesLoaded( function() {
        // init carousel
        var $carousel = $currentEl.flickity(finalSettings);
      });

    });
  }
  return sliderOnlyMobile;
}

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

if ($(window).width() < 1024) {
    isMobile = true;
}

$(window).resize(function(){
  if ($(window).width() < 1024) {
      isMobile = true;
  } else {
    isMobile = false;
  }
  if (isMobile) {
    var sliderOnlyMobile = new theme.sliderOnlyMobile();
  }
})

if (isMobile) {
  var sliderOnlyMobile = new theme.sliderOnlyMobile();
}

/** Account popup **/
theme.accountPopup = new function() {

	var context = {
		userMail : false,
		routeUrl:'https://cldw0t4rik.execute-api.eu-west-1.amazonaws.com/prod/customers/search',
		disabledClass : 'button--disabled',
		finalStateClass : 'account-popup--final-state',
		storefrontApiKey : 'f30850f961aadcf23f39666a3041d658',
		shopUrl : 'https://franklinpetfood.com/'
	}

	var selectors = {
		openPopup : '[data-open-account]',
		closePopup : '[data-close-account]',

		accountLoader : '[data-account-loader]',

		errors:'[data-account-error]',

		quickviewContainer : '[data-quickview-container]',
		nonScrollClass : 'non-scroll',

		accountContainer : '[data-account-container]',
		accountPopup : '[data-account-popup]',
		accountState : '[data-account-state]',

		emailTemplate : '[data-email-template]',
		emailInput : '[data-email-input]',
		emailButton : '[data-email-button]',

		registerTemplate : '[data-register-template]',
		registerForm : '[data-register-form]',
		registerMail : '[data-register-mail]',
		registerPassword : '[data-register-password]',
		registerConfirmation : '[data-register-confirmation]',
		registerButton : '[data-register-button]',
		registerNewstext : '[data-register-newstext]',
		registerNewscheck : '[data-register-newscheck]',

		signinTemplate : '[data-signin-template]',
		signinForm : '[data-signin-form]',
		signinForgot : '[data-signin-forgot]',
		signinMail : '[data-signin-mail]',
		signinButton : '[data-signin-button]',
		signinPassword : '[data-signin-password]',

		forgotTemplate : '[data-forgot-template]',
		forgotMail : '[data-forgot-mail]',
		forgotButton : '[data-forgot-button]',

		activateTemplate : '[data-activate-template]',
		activateMail : '[data-activate-mail]',
		activateButton : '[data-activate-button]',


		pendingTemplate : '[data-pending-template]'

	};

	function accountPopup() {
		$(window).on('openPopup', function(){
			console.log('Open POPUP');
			openPopup();
			return false;
		});
		$(selectors.openPopup).on('click', function() {
			openPopup();
			return false;
		});

		var allowSubmit = false;
		console.log(window.location.search)
		if(!window.location.search || (window.location.search.indexOf('checkout_url') == -1)){
			console.log('COUCOU ZERANCE');
			$('form[action="/account/login"]').submit(function(e){
				if(allowSubmit){
					allowSubmit = false;
					return true;
				}else{
					e.preventDefault();
				}
				console.log('Coucou ', allowSubmit);
				var password = $('input[name="customer[password]"]').val();
				var email = $('input[name="customer[email]"]').val();
				setCookie('email', email, 0.1);
				setCookie('login', true, 0.1);
				return getAccessToken(email, password)
				.then(function(result){
					setCookie('login', true, 0.1);
					console.log('Get access token result', result);
					if(result && result.data && result.data.customerAccessTokenCreate && result.data.customerAccessTokenCreate.customerAccessToken && result.data.customerAccessTokenCreate.customerAccessToken.accessToken){
						setCookie('customerAccessToken', result.data.customerAccessTokenCreate.customerAccessToken.accessToken);
					}
					allowSubmit = true;
					$('form[action="/account/login"]').submit();
				})
				.catch(function(err){
					allowSubmit = true;
					$('form[action="/account/login"]').submit();
				})
			});
		}
	}

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	function showLoader(){
		$(selectors.accountLoader).show();
	}

	function hideLoader(){
		$(selectors.accountLoader).hide();
	}

	function getAccessToken(email, password){
		const recoverQuery = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
			customerAccessTokenCreate(input: $input) {
				customerAccessToken {
					accessToken
					expiresAt
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}`;
		const params = {
			query : recoverQuery,
			variables : {
				"input": {
					"email": email,
					"password": password
				}
			}
		};
		const optionsQuery = {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-Shopify-Storefront-Access-Token": context.storefrontApiKey
			},
			body: JSON.stringify(params)
		};

		return fetch(`/api/graphql`, optionsQuery)
		.then(res => res.json());
	}

	function loginUser(email, password) {
		setCookie('login', true, 0.1);
		$('<form action="/account/login" accept-charset="UTF-8" id="customer_login" method="POST"/>')
		.append($('<input type="email" name="customer[email]">').val(email))
		.append($('<input type="password" name="customer[password]">').val(password))
		.appendTo($(document.body)) //it has to be added somewhere into the <body>
		.submit();
		// var data = {
		// 	'customer[email]': email,
		// 	'customer[password]': password,
		// 	form_type: 'customer_login',
		// 	utf8: '✓'
		// };
		// console.log('Login user');
		// $.ajax({
		// 	url: '/account/login',
		// 	method: 'post',
		// 	data: data,
		// 	dataType: 'html'
		// });
	}
	function recoverPassword(email){
		const recoverQuery = `mutation customerRecover($email: String!) {
			customerRecover(email: $email) {
				customerUserErrors {
					code
					field
					message
				}
			}
		}`;
		const params = {
			query : recoverQuery,
			variables : {
				email : email
			}
		};
		const optionsQuery = {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-Shopify-Storefront-Access-Token": context.storefrontApiKey
			},
			body: JSON.stringify(params)
		};

		return fetch(`/api/graphql`, optionsQuery)
		.then(res => res.json());
	}
	function registerUser(customer) {
		const registerQuery = `mutation customerCreate($input: CustomerCreateInput!) {
			customerCreate(input: $input) {
				customer {
					id
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
		`;
		const params = {
			query : registerQuery,
			variables : {
				input:{
					acceptsMarketing:customer.accepts_marketing,
					email:customer.email,
					firstName:customer.first_name,
					lastName:customer.last_name,
					password:customer.password
				}
			}
		};
		const optionsQuery = {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-Shopify-Storefront-Access-Token": context.storefrontApiKey
			},
			body: JSON.stringify(params)
		};

		return fetch(`/api/graphql`, optionsQuery)
		.then(res => res.json());
	}

	function validateEmail(email){
		console.log('Validate email ', email);
		context.userMail = email;
		showLoader();
		$.post(context.routeUrl, {email:email},function(response){
			hideLoader();
			console.log('Route response ', response);
			if(!response.data){
				changePopup('register');
			}else{
				var state = response.data.state;
				if(state == 'enabled'){
					changePopup('signin');
				}else if(state == 'disabled'){
					changePopup('activate');
				}else if(state == 'pending' || state == 'invited' || state == 'declined'){
					changePopup('pending');
				}
			}
		})
	}



	function activateAccount(email){
		const registerQuery = `mutation customerCreate($input: CustomerCreateInput!) {
			customerCreate(input: $input) {
				customer {
					id
				}
				customerUserErrors {
					code
					field
					message
				}
			}
		}
		`;

		const params = {
			query : registerQuery,
			variables : {
				input:{
					email:email,
					password:'franklin'
				}
			}
		};

		const optionsQuery = {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-Shopify-Storefront-Access-Token": context.storefrontApiKey
			},
			body: JSON.stringify(params)
		};

		return fetch(`/api/graphql`, optionsQuery)
		.then(res => res.json());
	}

	function verifyEmail(elementValue){
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(elementValue);
	}

	function checkEmail(email, code){
		if(verifyEmail(email)){
			$(selectors.emailButton).prop('disabled', false);
			$(selectors.emailButton).removeClass(context.disabledClass);
			if(code == 'Enter'){
				validateEmail(email);
			}
		}else{
			$(selectors.emailButton).prop('disabled', true);
			$(selectors.emailButton).addClass(context.disabledClass);
		}
	}

	function initEmailPopup(){
		var efficientFn = debounce(function(e){
			checkEmail(this.value, e.key);
		}, 150)
		$(selectors.emailInput).keyup(efficientFn);
		$(selectors.emailButton).click(function(){
			if(verifyEmail($(selectors.emailInput).val())){
				validateEmail($(selectors.emailInput).val());
			}
		});
	}

	function initPendingPopup(){
		var mail = context.userMail;
		return activateAccount(mail);
	}

	function initRegisterPopup(){
		if(context.userMail) $(selectors.registerMail).val(context.userMail);
		$(selectors.registerNewstext).click(function(){
			$(selectors.registerNewscheck).click();
		})
		$(selectors.registerForm + ' .input-text').keyup(function(e){
			var isEmpty = false;
			$(selectors.registerForm + ' .input-text').each(function(){
				if(!$(this).val() || $(this).val == '') isEmpty = true;
			});
			if(isEmpty){
				$(selectors.registerButton).prop('disabled', true);
				$(selectors.registerButton).addClass(context.disabledClass);
			}
			else{
				$(selectors.registerButton).prop('disabled', false);
				$(selectors.registerButton).removeClass(context.disabledClass);
				if(e.key == 'Enter') $(selectors.registerButton).click()
			}
		});
		$(selectors.registerButton).click(function(){
			if($(selectors.registerPassword).val() !== $(selectors.registerConfirmation).val()){
				$(selectors.errors).html("Les mots de passes ne correspondent pas");
				$(selectors.errors).show();
				return;
			}
			showLoader();
			var newCustomer = $(selectors.registerForm).serializeArray().reduce(function(obj, item) {
				obj[item.name] = item.value;
				return obj;
			}, {});
			newCustomer.accepts_marketing = $('[data-register-newscheck]').val();
			// console.log('new customer ', newCustomer);
			if(newCustomer.accepts_marketing == 'on') newCustomer.accepts_marketing = true;
			else newCustomer.accepts_marketing = false;
			console.log('Hello');
			return registerUser(newCustomer)
			.then(function(response){
				console.log('World');
				// console.log('Response ', response);
				var errorHtml = null;
				if(!response || !response.data) return;
				if(response.data.customerCreate){
					var errors = response.data.customerCreate.customerUserErrors
				}else {
					var errors = response.data.errors;
				}
				hideLoader();
				if(errors.length){
					errorHtml = ''
					for(var i = 0; i < errors.length; i++){
						errorHtml += errors[i].message + ' <br>';
					}
					$(selectors.errors).show();
					$(selectors.errors).html(errorHtml);
				}else{
					changePopup('signin');
					$(selectors.errors).html('Merci d\'avoir créé votre compte Franklin. <br> Vous pouvez maintenant vous connecter.');
					$(selectors.errors).show();
				}
			})
		});
	}

	function initSigninPopup(){
		if(context.userMail) $(selectors.signinMail).val(context.userMail);

		$(selectors.signinForgot).click(function(e){
			e.preventDefault();
			e.stopPropagation();
			changePopup('forgot');
		});
		$(selectors.signinForm + ' .input-text').keyup(function(e){
			var isEmpty = false;
			$(selectors.signinForm + ' .input-text').each(function(){
				if(!$(this).val() || $(this).val == '') isEmpty = true;
			});
			if(isEmpty){
				$(selectors.signinButton).prop('disabled', true);
				$(selectors.signinButton).addClass(context.disabledClass);
			}
			else{
				$(selectors.signinButton).prop('disabled', false);
				$(selectors.signinButton).removeClass(context.disabledClass);
				if(e.key == 'Enter') $(selectors.signinButton).click()
			}
		});
		$(selectors.signinButton).click(function(){
			showLoader();
			var password = $(selectors.signinPassword).val();
			var email = $(selectors.signinMail).val();
			setCookie('email', email, 0.1);
			return getAccessToken(email, password)
			.then(function(result){
				console.log('Get access token result');
				if(result && result.data && result.data.customerAccessTokenCreate && result.data.customerAccessTokenCreate.customerAccessToken && result.data.customerAccessTokenCreate.customerAccessToken.accessToken){
					setCookie('customerAccessToken', result.data.customerAccessTokenCreate.customerAccessToken.accessToken);
				}
				return loginUser(email, password);
			})
			// .done(function (html) {
			// 	hideLoader();
			// 	if (html.indexOf('data-errors') !== -1) {
			// 		console.log('Invalid password');
			// 		$(selectors.errors).html('Email ou mot de passe incorrect');
			// 		// invalid password - show a message to the user
			// 	} else {
			// 		console.log("OK connected");
			// 		setCookie('login', true, 0.1);
			// 		window.location.href = '/account';
			// 	}
			// })
			// .fail(function(error){
			// 	hideLoader();
			// 	$(selectors.errors).html('Trop de requêtes. Connectez vous <a href="/account/login">en cliquant ici</a>')
			// })
		});
	}

	function initForgotPopup(){
		if(context.userMail) $(selectors.forgotMail).val(context.userMail);

		$(selectors.forgotButton).click(function(){
			showLoader();
			var email = $(selectors.forgotMail).val();
			return recoverPassword(email)
			.then(function(response){
				var errorHtml = null;
				// console.log('Response forgot ', response);
				if(!response || !response.data) return;
				if(response.data.customerCreate){
					var errors = response.data.customerRecover.customerUserErrors
				}else {
					var errors = response.data.errors;
				}
				if(errors && errors.length){
					errorHtml = ''
					for(var i = 0; i < errors.length; i++){
						errorHtml += errors[i].message + ' <br>';
					}
					$(selectors.errors).html(errorHtml);
					$(selectors.errors).show();
					hideLoader();
				}else{
					$(selectors.accountState).addClass(context.finalStateClass);
					hideLoader();
				}
			})
		});
	}

	function initActivatePopup(){
		if(context.userMail) $(selectors.activateMail).val(context.userMail);

		$(selectors.activateButton).click(function(){
			showLoader();
			var email = $(selectors.activateMail).val();
			return activateAccount(email)
			.then(function(response){
				// TODO
				console.log('Response ', response);
				var errorHtml = null;
				if(response.data.customerCreate){
					var errors = response.data.customerRecover;
				}else {
					var errors = response.data.errors;
				}
				hideLoader();
				if(errors && errors.length){
					errorHtml = ''
					for(var i = 0; i < errors.length; i++){
						errorHtml += errors[i].message + ' <br>';
					}
					$(selectors.errors).html(errorHtml);
					$(selectors.errors).show();
				}else{
					changePopup('pending');
				}
				console.log('Response ', response);
			});
		})
	}
	function initPopupHandlers(){
		$(document).click(function(event) {
			var $target = $(event.target);
			if(!$target.closest('[data-account-state]').length &&
			$('[data-account-state]').is(":visible")) {
				console.log('Visible');
				closePopup();
			}
		});

		$('body').on('click', selectors.closePopup, function() {
			closePopup();
			return false;
		});
		initEmailPopup();
	}

	function changePopup(key){
		if(key == 'register'){
			$(selectors.accountContainer).html($(selectors.registerTemplate).html());
			initRegisterPopup();
		}
		if(key == 'signin'){
			$(selectors.accountContainer).html($(selectors.signinTemplate).html())
			initSigninPopup();
		}
		if(key == 'email'){
			$(selectors.accountContainer).html($(selectors.emailTemplate).html());
			initEmailPopup();
		}
		if(key == 'forgot'){
			$(selectors.accountContainer).html($(selectors.forgotTemplate).html());
			initForgotPopup();
		}
		if(key == 'activate'){
			$(selectors.accountContainer).html($(selectors.activateTemplate).html());
			initActivatePopup();
		}
		if(key == 'pending'){
			$(selectors.accountContainer).html($(selectors.pendingTemplate).html())
			initPendingPopup();
		}
	}


	function openPopup(){
		clearPopup();
		$('body').addClass(selectors.nonScrollClass);
		$(selectors.accountContainer).html($(selectors.emailTemplate).html());
		$(selectors.accountPopup).show();
		initPopupHandlers();
	}

	function closePopup(){
		clearPopup();
		$(selectors.accountPopup).hide();
	}

	function clearPopup(){
		$(selectors.quickviewContainer).each(function(){
			$(this).empty();
		});
		$('body').removeClass(selectors.nonScrollClass);
	}

	return accountPopup;
}

var accountPopup = new theme.accountPopup();

theme.resetPassword = new function() {

  var settings = {
    password : '[data-reset-password-password]',
    passwordConfirmation : '[data-reset-password-confirmation]',
    passwordSubmit : '[data-reset-password-submit]'
  };

  function resetPassword() {
    if( $(settings.password).length && ($(settings.password).val().length === 0 || $(settings.passwordConfirmation).val().length === 0)) {
        $(settings.passwordSubmit).prop( "disabled", true );
    } else {
      $(settings.passwordSubmit).prop( "disabled", false );
    }
  }

  $(settings.password).on('input', function() {
    resetPassword();
  })
  $(settings.password).on('blur', function() {
    resetPassword();
  })

  $(settings.passwordConfirmation).on('input', function() {
    resetPassword();
  })
  $(settings.passwordConfirmation).on('blur', function() {
    resetPassword();
  })

  return resetPassword;
}

var resetPassword = new theme.resetPassword();



/*================ Templates ================*/
/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

theme.customerAddresses = (function() {
  var $newAddressForm = $('#AddressNewForm');

  if (!$newAddressForm.length) {
    return;
  }

  // Initialize observers on address selectors, defined in shopify_common.js
  if (Shopify) {
    new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
      hideElement: 'AddressProvinceContainerNew'
    });
  }

  // Initialize each edit form's country/province selector
  $('.address-country-option').each(function() {
    var formId = $(this).data('form-id');
    var countrySelector = 'AddressCountry_' + formId;
    var provinceSelector = 'AddressProvince_' + formId;
    var containerSelector = 'AddressProvinceContainer_' + formId;

    new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
      hideElement: containerSelector
    });
  });

  // Toggle new/edit address forms
  $('.address-new-toggle').on('click', function() {
    $newAddressForm.toggleClass('hide');
  });

  $('.address-edit-toggle').on('click', function() {
    var formId = $(this).data('form-id');
    $('#EditAddress_' + formId).toggleClass('hide');
  });

  $('.address-delete').on('click', function() {
    var $el = $(this);
    var formId = $el.data('form-id');
    var confirmMessage = $el.data('confirm-message');
    if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
      Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
    }
  });
})();

/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

theme.customerLogin = (function() {
  var config = {
    recoverPasswordForm: '#RecoverPassword',
    hideRecoverPasswordLink: '#HideRecoverPasswordLink'
  };

  if (!$(config.recoverPasswordForm).length) {
    return;
  }

  checkUrlHash();
  resetPasswordSuccess();

  $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
  $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

  function onShowHidePasswordForm(evt) {
    evt.preventDefault();
    toggleRecoverPasswordForm();
  }

  function checkUrlHash() {
    var hash = window.location.hash;

    // Allow deep linking to recover password form
    if (hash === '#recover') {
      toggleRecoverPasswordForm();
    }
  }

  /**
   *  Show/Hide recover password form
   */
  function toggleRecoverPasswordForm() {
    $('#RecoverPasswordForm').toggleClass('hide');
    $('#CustomerLoginForm').toggleClass('hide');
  }

  /**
   *  Show reset password success message
   */
  function resetPasswordSuccess() {
    var $formState = $('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }

    // show success message
    $('#ResetSuccess').removeClass('hide');
  }
})();


$(document).ready(function() {
    var sections = new slate.Sections();
    // sections.register('product', theme.Product);

    // Common a11y fixes
    slate.a11y.pageLinkFocus($(window.location.hash));

    $('.in-page-link').on('click', function(evt) {
        slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
    });

    // Target tables to make them scrollable
    var tableSelectors = '.rte table';

    slate.rte.wrapTable({
        $tables: $(tableSelectors),
        tableWrapperClass: 'rte__table-wrapper',
    });

    // Target iframes to make them responsive
    var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"]';

    slate.rte.wrapIframe({
        $iframes: $(iframeSelectors),
        iframeWrapperClass: 'rte__video-wrapper'
    });

    // Apply a specific class to the html element for browser support of cookies.
    if (slate.cart.cookiesEnabled()) {
        document.documentElement.className = document.documentElement.className.replace('supports-no-cookies', 'supports-cookies');
    }

    // /*================ Custom flickity arrow buttons ================*/
    $('[data-carousel-prev]').click(function(){
        $(this).parents('[data-carousel-container]').find('[data-flickity]').flickity('previous');
    });
    $('[data-carousel-next]').click(function(){
        $(this).parents('[data-carousel-container]').find('[data-flickity]').flickity('next');
    });

});

// /*================ Custom ================*/


theme.banner = new function() {
    var settings = {};

    function banner(bannerSettings) {

        var defaultSettings = {
            bannerSelector : '[data-banner]',
            selectorData : 'banner',
            prevNextButtons : false,
            pageDots : false
        };

        settings = $.extend({}, defaultSettings, bannerSettings);

        $(settings.bannerSelector).each(function() {
            var el = $(this);
            $(this).imagesLoaded( function() {
                var elementSettings = $(el).data(settings.selectorData);
                var finalSettings = $.extend({}, settings, elementSettings);
                $(el).flickity({
                    lazyLoad: 'true',
                    pageDots: finalSettings.pageDots,
                    prevNextButtons: finalSettings.prevNextButtons
                });
            });
        });
    }
    return banner;
}
var banner = new theme.banner();

/** Collection slider **/
theme.collectionSlider = new function() {
    function collectionSlider() {
        $(function(){
            // Section obsolète
            $('[data-collection-slider]').each(function(){
                var flickitySettings = JSON.parse($(this).attr('data-collection-slider'));
                if ( matchMedia('screen and (min-width: 768px)').matches ) {
                    flickitySettings.cellAlign = 'center';
                }else{
                    //flickitySettings.pageDots = true;
                }
                var $carousel = $(this).flickity(flickitySettings);
                $('[data-carousel-prev]').each(function(){$(this).click(function(){$(this).parents('[data-carousel-container]').find('[data-collection-slider]').flickity('previous');});});
                $('[data-carousel-next]').each(function(){$(this).click(function(){$(this).parents('[data-carousel-container]').find('[data-collection-slider]').flickity('next');});});
            });
        })
    }
    return collectionSlider;
}
var collectionSlider = new theme.collectionSlider();

/** Description tabs **/
theme.descTab = new function() {
    function descTab() {
        $(function(){
            // Section obsolète
            $('[data-desctab-heading]').click(function(){
                var index = $(this).attr('data-desctab-heading');
                $('[data-desctab-heading]').each(function(){$(this).removeClass('desctab__heading--active');})
                $(this).addClass('desctab__heading--active');

                $('[data-desctab-content]').each(function(){$(this).removeClass('desctab__content--active');});
                $('[data-desctab-content="' + index + '"]').addClass('desctab__content--active');
            });
        })
    }
    return descTab;
}
var descTab = new theme.descTab();

// theme.getOriginalProduct = new function(variant_id){
//     function getOriginalProduct(variant_id){
//
//         return variant_id;
//     }
//     return getOriginalProduct;
// }
// var getOriginalProduct = new theme.getOriginalProduct();

(function() {
    // Video controllers

    // Hide GORGIAS
    // var gorgiasChatInterval = window.setInterval(function () {
    //     var iframe = document.querySelector('#gorgias-web-messenger-container');
    //     if (iframe) {
    //         var head = iframe.contentWindow.document.querySelector('head')
    //         if (head.children.length) {
    //             window.clearInterval(gorgiasChatInterval); // this line breaks out of the loop - make sure it's not deleted.
    //             var styles = document.createElement('style');
    //             styles.textContent = '.logo-wrapper{display: none}'
    //             head.appendChild(styles)
    //         }
    //     }
    // }, 100);

    // Footer email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    $('#ContactFooter-email').keyup(function(e){
        var email = this.value;
        console.log(validateEmail(email));
        if(validateEmail(email)){
            $('#Subscribe').removeClass('button--disabled');
            $('#Subscribe').attr('disabled',false);
        }else{
            $('#Subscribe').addClass('button--disabled');
            $('#Subscribe').attr('disabled',true);
        }
    });


    // Fix flickity slider
    var touchingCarousel = false,
    touchStartCoords;
    document.body.addEventListener('touchstart', function(e) {
        if (e.target.closest('.flickity-slider')) {
            touchingCarousel = true;
        } else {
            touchingCarousel = false;
            return;
        }

        touchStartCoords = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        }
    });

    document.body.addEventListener('touchmove', function(e) {
        if (!(touchingCarousel && e.cancelable)) {
            return;
        }

        var moveVector = {
            x: e.touches[0].pageX - touchStartCoords.x,
            y: e.touches[0].pageY - touchStartCoords.y
        };

        if (Math.abs(moveVector.x) > 7)
        e.preventDefault()

    }, {passive: false});
})();

theme.demoAsideBar = new function() {

	function demoAsideBar() {

		// init default settings
		var settings = {
			selectorTrigger: '[data-demo-aside-bar]',
			selectorTriggerFrequency: '[data-edit-frequency]',
			selectorTriggerDate: '[data-edit-date]',
			selectorTriggerProduct: '[data-edit-product]',
			selectorOverlay: '[data-rc-overlay]',
			selectorClose: '[data-rc-close-aside-bar]',
			selectorAsideBar: '[data-aside-bar]',
			selectorAsideBarFrequency: '[data-aside-bar-frequency]',
			selectorAsideBarProduct: '[data-aside-bar-product]',
			selectorAsideBarDate: '[data-aside-bar-date]',
			selectorModalTrigger: '[data-open-modal-cancel]',
			selectorModal: '[data-modal-cancel]',
		};

		$(settings.selectorTrigger).on( 'click', function() {
			$(settings.selectorOverlay).addClass('is-active');
			$(settings.selectorAsideBar).addClass('is-active');
		});

		$(settings.selectorTriggerFrequency).on( 'click', function() {
			$(settings.selectorOverlay).addClass('is-active');
			$(settings.selectorAsideBarFrequency).addClass('is-active');
		});
		$(settings.selectorTriggerDate).on( 'click', function() {
			$(settings.selectorOverlay).addClass('is-active');
			$(settings.selectorAsideBarDate).addClass('is-active');
		});
		$(settings.selectorTriggerProduct).on( 'click', function() {
			$(settings.selectorOverlay).addClass('is-active');
			$(settings.selectorAsideBarProduct).addClass('is-active');
		});
		$(settings.selectorModalTrigger).on( 'click', function() {
			$(settings.selectorOverlay).addClass('is-active');
			$(settings.selectorModal).addClass('is-active');
		});

		$(settings.selectorOverlay).on( 'click', function() {
			if ($(this).hasClass('is-active')) {
				$(settings.selectorOverlay).removeClass('is-active');
				$(settings.selectorAsideBar).removeClass('is-active');
				$(settings.selectorAsideBarFrequency).removeClass('is-active');
				$(settings.selectorAsideBarDate).removeClass('is-active');
				$(settings.selectorAsideBarProduct).removeClass('is-active');
				$(settings.selectorModal).removeClass('is-active');
			}
		});
		$(settings.selectorClose).on( 'click', function() {
			if ($(settings.selectorOverlay).hasClass('is-active')) {
				$(settings.selectorOverlay).removeClass('is-active');
				$(settings.selectorAsideBar).removeClass('is-active');
				$(settings.selectorAsideBarFrequency).removeClass('is-active');
				$(settings.selectorAsideBarDate).removeClass('is-active');
				$(settings.selectorAsideBarProduct).removeClass('is-active');
				$(settings.selectorModal).removeClass('is-active');
			}
		});

	}
	return demoAsideBar;
}

var demoAsideBar = new theme.demoAsideBar();
