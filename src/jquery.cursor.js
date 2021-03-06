/*!
 * Cursor jQuery Plugin v1.0
 * By Kohei MATSUSHITA - https://github.com/ma2shita/cursor-jquery-plugin
 * Released under the MIT license (MIT-LICENSE.txt)
 */
;(function($){
	var defaults = {
		cursorElement: 'li',
		currentClassName: 'pointed',
		debug: false
	};

	function logger(n, e) {
		if (defaults['debug']) {
			if (e) {
				console.debug(n, e);
			} else {
				console.debug(n);
			}
		}
	}

	$.fn.cursor = function(options){
		var elem = this;
		$.extend(defaults, options);

		elem.find(defaults['cursorElement']).live('click', function(e){
			elem.find(defaults['cursorElement'] + '.' + defaults['currentClassName']).removeClass(defaults['currentClassName']);
			$(this).addClass(defaults['currentClassName']);
		});

		return this.each(function(){
			var next = $.fn.cursor.next = function(){ //public
				var c = current();
				var t = target(c, 'next');
				move(c, t);
				return c;
			}
			var prev = $.fn.cursor.prev = function(){ //public
				var c = current();
				var t = target(c, 'prev');
				move(c, t);
				return c;
			}
			var current = $.fn.cursor.current = function(){ //public
				var c = elem.find(defaults['cursorElement'] + '.' + defaults['currentClassName']).first();
				logger('c=', c);
				return c;
			}
			var target = function(current, action){ //private
				var sets = {
					next: {method: 'next', selector: 'first'},
					prev: {method: 'prev', selector: 'last'}
				};
				var method = sets[action]['method'];
				var selector = sets[action]['selector'];
				var t = (current.length == 1) ? eval('current.' + method + '()') : elem.find(defaults['cursorElement'] + ':' + selector);
				logger('t=', t);
				return t;
			}
			var move = function(from, to){ //private
				if (to.length == 1) {
					from.removeClass(defaults['currentClassName']);
					to.addClass(defaults['currentClassName']);
					var p1 = to.position()['top'];
					var p2 = Math.floor($(window).height()/2);
					var p3 = Math.floor(to.height()/2);
					$(document).scrollTop(p1 - p2 + p3);
				}
			}
		});
	};
})(jQuery);
