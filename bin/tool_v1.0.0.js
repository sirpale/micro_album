/**
 * @fileOverview 这是私有公用方法
 * @author <a href="sjx.wh@lightimes.cn">email to Sirpale</a>
 * @version 1.0.0
 * @copyright Copyrigth © 2014 Lightimes. All Rights Reserved
 */

Sirpale = {
	/**
	 *
	 * @property  原型
	 * @param 参数说明
	 * @param
	 * @name 名称
	 * @function 方法
	 * @public 公用
	 **/
	//跨浏览器获取视口大小
	_getInner: function() {
		return {
			width: $(window).width(),
			height: $(window).height()
		}
	},
	//跨浏览器获取滚动条
	_getScroll: function() {
		return {
			top: document.documentElement.scrollTop || document.body.scrollTop,
			left: document.documentElement.scrollLeft || document.body.scrollLeft
		}
	},
	//阻止默认行为
	_preDef: function(e) {
		e.preventDefault(); //阻止默认行为
		// e.stopPropagation();//阻止冒泡
	},
	//滚动条固定
	_fixScroll : function () {
		setTimeout(function(){
			$(window).scrollTo(fixScroll.left,fixScroll.top);
		},100)
	},
	//获取当前日期
	_getDateNum: function($date) {
		var arr = [];
		for (i = 0; i < $date.length; i++) {
			if (!isNaN($date[i] * 1)) {
				arr.push($date[i]);
			}
		}
		return arr.join('');
	},
	//删除前后空格
	_trim: function($str) {
		return $str.replace(/(^\s*)|(\s*$)/g, "");
	}
};