/**
 * @fileOverview 这是基础功能方法
 * @author <a href="sjx.wh@lightimes.cn">email to Sirpale</a>
 * @version 1.0.0
 * @copyright Copyrigth © 2014 Lightimes. All Rights Reserved
 */

;
(function($) {
	//设置模块居中
	$.fn.divCenter = function() {
		var top = (Sirpale._getInner().height - $(this).height()) / 2 + Sirpale._getScroll().top,
			left = (Sirpale._getInner().width - $(this).width()) / 2 + Sirpale._getScroll().left;
		$(this).css({
			'top': top,
			'left': left
		});
		return $(this);
	};

	//设置锁屏
	$.fn.divLock = function() {
		$('body').css('overflow', 'hidden');
		$(this).css({
			'width': $(document).width() + Sirpale._getScroll().left,
			'height': $(document).height() + Sirpale._getScroll().top
		}).fadeIn().bind({
			'mousedown':Sirpale._preDef,
			'mouseup': Sirpale._preDef,
			'selectstart': Sirpale._preDef
		});

		// $(window).bind('scroll',Sirpale._fixedScroll);

		return $(this);
	};

	//解锁
	$.fn.divUnlock = function() {
		$('body').css({
			'overflow-x': 'hidden',
			'overflow-y':'auto'
		});
		$(this).fadeOut().unbind({
			'mousedown': Sirpale._preDef,
			'mouseup': Sirpale._preDef,
			'selectstart': Sirpale._preDef
		});
		// $(window).unbind('scroll',Sirpale._fixedScroll);

		return $(this);

	};

	//触发浏览器窗口事件
	$.fn.browserResize = function(fn){
		var $this = $(this);
			$offset = $this.offset();

		$(window).bind('resize',function(){
			fn();
			if($offset.left > Sirpale._getInner().width + Sirpale._getScroll().left - $this.width() ) {
				$this.css('left',Sirpale._getInner().width + Sirpale._getScroll().left - $this.width());
				if($offset.left <= 0 + Sirpale._getScroll().left) $this.css('left',Sirpale._getScroll().left);
			};
			if($offset.top > Sirpale._getInner().height + Sirpale._getScroll().top - $this.height() ) {
				$this.css('top',Sirpale._getInner().height + Sirpale._getScroll().top - $this.height());
				if($offset.top <= 0 + Sirpale._getScroll().top) $this.css('top',Sirpale._getScroll().top);
			};

		});

		return $this;
	};

	//图片延迟加载
	$.fn.imgLazyLoading = function(){
		var $waitLoad = $('.wait_load');
		_waitLoad();

		$(window).bind({
			'scroll' : _waitLoad,
			'resize' : _waitLoad
		});
		
		//执行
		function _waitLoad(){
			setTimeout(function(){
				$waitLoad.each(function($index){
					var _this = $waitLoad.eq($index);
						$this = $(_this);

					if(Sirpale._getInner().height + Sirpale._getScroll().top >= _this.offset().top) {
						if($this.attr('src') == $this.attr('xsrc')){
							return this;
						} else {
							$this.attr('src',$this.attr('xsrc'));
						} 
					};
				});
			},300);
		};
	};

	//固定区块在窗口顶部
	$.fn.divFixed = function(){
		var $this = $(this);
			//区块距离屏幕顶部距离
			$defaultTop = $this.offset().top - $(window).scrollTop();
			//区块距离屏幕左侧的距离
			// $defaultLeft = $this.offset().left + $(window).scrollLeft();
			//区块默认样式
			$divPosition = $this.css('position');
			$divTop = $this.css('top');
			$divLeft = $this.css('left');
			$divZindex = $this.css('z-index');


		//鼠标滚动事件
		setTimeout(function(){
			$(window).bind('scroll',function(){
				//当区块当前距离大于默认高度时
				if($(this).scrollTop() >= $defaultTop) {				
					$this.css({
						'position':'fixed',
						'top':0,
						// 'left':$defaultLeft,
						'z-index':9999
					});
				} else {
					$this.css({
						'position':$divPosition,
						'top':$divTop,
						// 'left':$divLeft,
						'z-index':$divZindex
					});
				};
			});
		},300);

		return $this;

	};



	//返回顶部
	$.fn.backTop = function(){
		var $this = $(this);
	
		
		//触发滚动条事件
		$(window).scroll(function(){
			if($(this).scrollTop() > 300){
				$this.show();
			} else {
				$this.hide();
			};
		});

		$this.hover(function(){
			$this.css({
				'background':'#2375c8',
				'opacity':0.8
			});
			$this.find('span.s').css({
				'border-color':'transparent transparent #fff',
				'-webkit-animation':'aa 1s linear infinite'
			});
			$this.find('span.b').css({
				'background':'#fff'
			});
		},function(){
			$this.css({
				'background':'#fff',
				'opacity':1
			});
			$this.find('span.s').css({
				'border-color':'transparent transparent #2375c8',
				'-webkit-animation':'paused'
			});
			$this.find('span.b').css({
				'background':'#2375c8'
			});
		});

		//点击返回
		$this.click(function(){
			$('body,html').animate({'scrollTop':0},300);
			return false;
		});
		return $this;
	};


})(jQuery);
