/*
 * Fuel UX Colorpicker
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2014 ExactTarget
 * Licensed under the BSD New license.
 */

// -- BEGIN UMD WRAPPER PREFACE --

// For more information on UMD visit:
// https://github.com/umdjs/umd/blob/master/jqueryPlugin.js

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// if AMD loader is available, register as an anonymous module.
		define(['jquery', 'fuelux/templates', 'fuelux/colpick'], factory);
	} else {
		// OR use browser globals if AMD is not present
		factory(jQuery);
	}
}(function ($, Templates) {
	// -- END UMD WRAPPER PREFACE --

	// -- BEGIN MODULE CODE HERE --

	var old = $.fn.colorpicker;

	// COLORPICKER CONSTRUCTOR AND PROTOTYPE

	var Colorpicker = function (element, options) {

		// cache elements
		this.options = $.extend({}, $.fn.colorpicker.defaults, options);

		if(this.options.generateTemplate){
			var viewTemplate = Templates.colorpicker;
			$(element).html(viewTemplate());
		}

		this.$element = $(element);

		this.$openElement = this.$element.find('.open');
		this.$input = this.$element.find('input');
		this.$dropdownToggle = this.$element.find('.dropdown-toggle');
		this.$dropdown = this.$element.find('.dropdown-menu');
		this.$colorPalette = this.$element.find('.current-color');
		this.$firstTab = this.$element.find('.nav a:first');
		this.$savedTab = this.$element.find('.nav a:contains("Saved")')
		this.$colorpickerAdvanced = this.$element.find('.colorpicker-advanced');
		this.$colorpickerRecent = this.$element.find('.colorpicker-recent');
		this.$colorpickerSaved = this.$element.find('.colorpicker-saved');
		this.closeable = true;
		this.currentColor = '';

		this.allRecentColors = [];
		this.supportsLocalStorage = 'localStorage' in window && window.localStorage !== null && typeof JSON === 'object';

		this.$element.on('click.fu.colorpicker', '.palette-color', $.proxy(this.findColor, this));

		this.$element.on('click.fu.colorpicker', '.dropdown-menu a', $.proxy(this.menuClicked, this));
		this.$element.on('change.fu.colorpicker', 'input', $.proxy(this.inputchanged, this));
		this.$element.on('show.bs.dropdown', $.proxy(this.menuShown, this));
		this.$element.on('hide.bs.dropdown', $.proxy(this.hideDropdown, this));
		this.$element.on('click.fu.colorpicker', '.colorpicker-advanced', $.proxy(this.handleAdvanced, this));



		this.init();

	};

	Colorpicker.prototype = {

		constructor: Colorpicker,

		destroy: function () {
			this.$element.remove();
			// remove any external bindings
			// [none]

			// set input value attrbute in markup
			this.$element.find('input').each(function () {
				$(this).attr('value', $(this).val());
			});

			// empty elements to return to original markup
			// [none]

			return this.$element[0].outerHTML;
		},

		init: function() {

			if(this.options.savedColors){

				this.$savedTab.parent().show();
				this.setSavedColors();
			}
			else {
				this.$savedTab.parent().hide();
			}

			if(this.options.showRecentColors){
				this.getRecentColors();
			}
		},

		setSavedColors: function () {
			this.updateColorsMarkup(this.options.savedColors, this.$colorpickerSaved)
		},

		menuShown: function (e) {
			$(this.$firstTab).tab('show');
			e.stopPropagation();
			$(document).on('click.fu.colorpicker.externalClick', $.proxy(this.bodyClick, this));
		},

		findColor: function (e) {
			var selectedColor = $(e.currentTarget).attr('data-color');
			this.setColor(selectedColor);
		},

		setColor: function (color) {
			this.closeable = true;
			this.$element.find('input.colorpicker-input').val(color);

			if (this.$element.attr('data-foreground') === 'true') {
				$(this.$colorPalette).css('color', color);
			}
			else {
				$(this.$colorPalette).css('background', color);
			}
			this.currentColor = color.toUpperCase();
			this.formatColor(this.currentColor);
			this.updateRecentColors();
			this.$element.trigger('changed.fu.colorpicker', {
				color: this.currentColor
			});
		},

		hideDropdown: function (e) {
			if (!this.closeable) {
				return false;
			}
		},

		menuClicked: function (e) {
			this.closeable = false;

			if (e.target.text.toLowerCase() === 'advanced') {

				if ($(this.$colorpickerAdvanced.find('.colpick')).length === 0) {
					$(this.$colorpickerAdvanced).colpick({
						flat: true,
						height: 175,
						color: this.formattedColor
					});
				}
				else {
					$(this.$colorpickerAdvanced).colpickSetColor(this.formattedColor, true);
				}
				var spinboxes = this.$element.find('.spinbox-xs');
				spinboxes.trigger('mousedown');
			}
		},

		handleAdvanced: function (e) {

			if (!$(e.target).hasClass('colpick_submit')) {
				this.closeable = false;
			}
			else {
				this.closeable = true;
				var curColor = '#' + $('.colpick_hex_field input').val();
				this.setColor(curColor);
			}
		},

		formatColor: function () {
			this.formattedColor = this.currentColor.replace('#', '');
		},

		getRecentColors: function () {
			if (this.supportsLocalStorage && localStorage.allRecentColors) { // look for them in LS
				this.allRecentColors = JSON.parse(localStorage.allRecentColors);
			} else {
				if (document.cookie.match("allRecentColors=")) {
					var theseCookies = document.cookie.split(";"); // split cookies into an array...

					$.each(theseCookies, function (index) { // find the savedColors cookie!
						if (theseCookies[index].match("allRecentColors=")) {
							this.allRecentColors = theseCookies[index].split("=")[1].split(",");
						}
					});
				}
			}
			this.updateColorsMarkup(this.allRecentColors, this.$colorpickerRecent);
		},

		removeFromArray: function (array, item) {
			if ($.inArray(item,array) !== -1) { // make sure it's in there
				array.splice($.inArray(item,array),1);
			}
		},

		updateRecentColors: function () {
			this.removeFromArray(this.allRecentColors,this.currentColor);
			this.allRecentColors.unshift(this.currentColor);
			this.saveToLocalStorage();
			this.updateColorsMarkup(this.allRecentColors, this.$colorpickerRecent);
		},

		saveToLocalStorage: function () {
			if (this.supportsLocalStorage) {
				try {
					localStorage.allRecentColors = JSON.stringify(this.allRecentColors);
				}
				catch (e) {
					localStorage.clear();
				}
			} else {
				this.setColorsCookie(this.allRecentColors);
			}
		},

		setColorsCookie: function () {
			var now = new Date(),
				tenYearsInMilliseconds = 315360000000,
				expiresOn = new Date(now.getTime() + tenYearsInMilliseconds);
				expiresOn = expiresOn.toGMTString();

				document.cookie = "allRecentColors=" + this.allRecentColors + ";expires=" + expiresOn;
		},

		updateColorsMarkup: function(colorString, elem) {

			var savedColorsHtml = '<div class="container-fluid">';

			$.each(colorString, function (index,color) {

				savedColorsHtml += '<span class="palette-color" style="background-color:'+ color +'" data-color="'+ color +'" title=""></span>'
			});

			savedColorsHtml += '</div>';

			elem.html(savedColorsHtml);
		},
		bodyClick: function (e) {
			if (!$(this.$dropdown).is(e.target) && $(this.$dropdown).has(e.target).length === 0 && $(this.$openElement).has(e.target).length === 0) {
				this.unregisterBodyClick();

				if (this.closeable !== true){
					this.closeable = true;
					this.$dropdownToggle.dropdown('toggle');
				}
			}
		},

		unregisterBodyClick: function() {
			$(document).off('click.fu.colorpicker.externalClick');
		}
	};

	// COLORPICKER PLUGIN DEFINITION

	$.fn.colorpicker = function (option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('fu.colorpicker');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('fu.colorpicker', (data = new Colorpicker(this, options) ));
			if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.colorpicker.defaults = {
		generateTemplate: false,
		showRecentColors: true,
		showAdvancedPicker: true,
		savedColors: false
	};

	$.fn.colorpicker.Constructor = Colorpicker;

	$.fn.colorpicker.noConflict = function () {
		$.fn.colorpicker = old;
		return this;
	};

	// DATA-API

	$(document).on('mousedown.fu.colorpicker.data-api', '[data-initialize=colorpicker]', function (e) {
		var $control = $(e.target).closest('.colorpicker');
		if (!$control.data('fu.colorpicker')) {
			$control.colorpicker($control.data());
		}
	});

	// Must be domReady for AMD compatibility
	$(function () {
		$('[data-initialize=colorpicker]').each(function () {
			var $this = $(this);
			if (!$this.data('fu.colorpicker')) {
				$this.colorpicker($this.data());
			}
		});
	});

	// -- BEGIN UMD WRAPPER AFTERWORD --
}));
// -- END UMD WRAPPER AFTERWORD --