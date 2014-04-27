/**
 * @fileOverview 这是拖拽插件
 * @author <a href="sjx.wh@lightimes.cn">email to Sirpale</a>
 * @version 1.0.0
 * @copyright Copyrigth © 2014 Lightimes. All Rights Reserved
 */
;
(function($) {
	$.fn.drag = function(options) {
		var defaults = {};
		var optopns = $.extend(defaults, options);

		this.each(function() {
			var tags = arguments;
			$(this).on('mousedown', function(e) {
				var _this = $(this),	
					oParent = _this.parent();
				if (Sirpale._trim(this.innerHTML).length == 0) e.preventDefault();
				var diffX = e.clientX - oParent.offset().left,
					diffY = e.clientY - oParent.offset().top;

				var flag = false;//自定义拖拽区域


				for (var i = 0; i < tags.length; i ++) {
					if (e.target == tags[i]) {
						flag = true;					//只要有一个是true，就立刻返回
						break;
					};
				};
				
				if(flag){
					$(document).bind({mousemove : move,mouseup : up});
				} else {
					$(document).unbind({mousemove : move,mouseup : up});
				};

				function move(e) {
					var left = e.clientX - diffX,
						top = e.clientY - diffY;

					if (left < 0) {
						left = 0;
					} else if (left <= Sirpale._getScroll().left) {
						left = Sirpale._getScroll().left;
					} else if (left > Sirpale._getInner().width + Sirpale._getScroll().left - oParent.width()) {
						left = Sirpale._getInner().width + Sirpale._getScroll().left - oParent.width();
					};

					if (top < 0) {
						top = 0;
					} else if (top <= Sirpale._getScroll().top) {
						top = Sirpale._getScroll().top;
					} else if (top > Sirpale._getInner().height +Sirpale. _getScroll().top - oParent.height()) {
						top = Sirpale._getInner().height + +Sirpale._getScroll().top - oParent.height();
					};

					oParent.css('left', left);
					oParent.css('top', top);

					if (typeof oParent.setCapture != 'undefined') {
						oParent.setCapture();
					};
				};

				function up() {
					$(document).unbind({mousemove : move,mouseup : up});
					if (typeof oParent.releaseCapture != 'undefined') {
						oParent.releaseCapture();
					}
				};

			});

		});

		return this;
	};

})(jQuery);