
/**
 * @fileOverview 这是加载页面
 * @author <a href="sjx.wh@lightimes.cn">email to Sirpale</a>
 * @version 1.0.0
 * @copyright Copyrigth © 2014 Lightimes. All Rights Reserved
 */

$(function($){
	
	_loadPage();

	function _loadPage(){

		var $loadPageMessage = $('#load_page_message');
			$pageWrapper = $('#PageWrapper');
			$pageContent = $('#PageContent');

		function _loadMessage(response,status,xhr){
			$loadPageMessage.text('加载完成！').fadeOut(300);
			if($('#photo_album')) $('#photo_album').before("<link rel=\"stylesheet\" href=\"../public/css/photo_album_v1.0.1.css\">");
			if($('#photo_album_tetail')) $('#photo_album_tetail').before("<link rel=\"stylesheet\" href=\"../public/css/photo_album_detail_v1.0.1.css\">");
			if($('#album_recycle')) $('#album_recycle').before("<link rel=\"stylesheet\" href=\"../public/css/recycle_v1.0.1.css\">");

			$loadPageMessage.html('加载完成！');
			$loadPageMessage.fadeOut(1000);

			if (status == "error") {
		    	var msg = "Sorry but there was an error: ";
		    	$("#load_page_error").html(msg + xhr.status + " " + xhr.statusText);
		  	};


			$(document).imgLazyLoading();
			$('#back_top').backTop();

		};

		$pageWrapper.find('.album_manage').click(function(){		
			$pageContent.load('photo_album.html?data&'+Math.random(),_loadMessage);		
		});

		$pageWrapper.find('.pic_manage').click(function(){
			
			$pageContent.load('photo_album_detail.html?data&'+Math.random(),_loadMessage);
		});

		$pageWrapper.find('.recycle_manage,.recycle_btn').click(function(){
				
			$pageContent.load('recycle.html?data&'+Math.random(),_loadMessage);
		});

		$pageWrapper.find('section ul li img').click(function(){
		
			$pageContent.load('photo_album_detail.html?data&'+Math.random(),_loadMessage);
			
		});	


	};


});	