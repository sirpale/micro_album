/**
 * @fileOverview 这是相册详情页面功能
 * @author <a href="sjx.wh@lightimes.cn">email to Sirpale</a>
 * @version 1.0.0
 * @copyright Copyrigth © 2014 Lightimes. All Rights Reserved
 */

 $(function ($){


	//遮罩
	var $screen = $('#screen');
	function _screenLock(){
		if($(this).css('display') == 'block') $screen.divLock();
	};

	//图片延迟加载
	$(document).imgLazyLoading();

	_picBath(); //批量管理
	_photoBrowser(); //图片轮播切换

 	//点击批量管理
 	function _picBath(){

 		var $photoAlbumTetail =  $('#photo_album_tetail');


	   $photoAlbumTetail .find('.bath_btn').click(function(){


	   		$('.bath_manage').fadeIn(300);
	   		$('.check_mask').show();
	   		$('.upload_btn,.bath_btn,.recycle_btn,section.album').hide();
	   		//滚动条事件加载图片
	   		setTimeout(function(){
				$(window).scrollTop(10);
	   		},30);

	   		//固定区块
	   		$('.bath_manage').divFixed();
	   		$('.album_list').find('p').show();


	   		//选择框显示并且选中删除
	   		$('.album_list').each(function(){

				var $this = $(this);

				$this.find('.check_mask').bind('click',function(){

					 $this.find('p').toggleClass('check_sta_current');
					 $(this).toggleClass('chek_border');

					
					setTimeout(function(){
						$('.check_num').find('i').html($('.check_sta_current').size());
					},300);			
				});

				//批量删除
				$('.bath_delete').bind('click',function(){
					var $bathDeleteAlert = $('#bath_delete_alert');


					//判断是否存在选中的
					if($('.album_list').find('p').hasClass('check_sta_current') == true) {

						$bathDeleteAlert.show();
						$bathDeleteAlert.divCenter();
						$bathDeleteAlert.browserResize(_screenLock);
						$screen.divLock();

						//取消
						$bathDeleteAlert.find('.close_btn,#bath_delete_cancel').click(function(){
							$bathDeleteAlert.hide();
							$screen.divUnlock();
					
						});

						//确认
						$('#bath_delete_dete').click(function(){

							if($('.album_list').find('p').hasClass('check_sta_current') == true) {
								$('.check_sta_current').parent().parent().remove();
								$bathDeleteAlert.hide();
								$screen.divUnlock();

								// $('.album_detail_message').show().html('删除成功！').divCenter().delay(2000).fadeOut(2000);

							} else {
								return false;
							};
					
						});

						//拖拽
						$bathDeleteAlert.find('h3').drag();
					} else {
						$('.album_detail_message').show().divCenter().delay(2000).fadeOut(2000);
						return false;
					};
					
				});

				//批量移动
				$('.bath_move').bind('click',function(){
					//判断选中状态
					if($('.album_list').find('p').hasClass('check_sta_current') == true) {
						var $movePic = $('#move_pic');
						
						$movePic.show();
						$movePic.divCenter();
						$screen.divLock();

						$movePic.find('dl').each(function($index){
							var $this = $(this);
							$this.click(function(){
								$(this).parent().parent().find('i').removeClass('tick');
								$(this).find('i').addClass('tick');
							})
						})

						//取消
						$movePic.find('.close_btn,#move_pic_cancel').click(function(){
							$movePic.find('i').removeClass('tick');
							$movePic.hide();
							$screen.divUnlock();
					

						});

						//确认
						$movePic.find('#move_pic_dete').click(function(){
							$movePic.find('i').removeClass('tick');
							$movePic.hide();
							$screen.divUnlock();
					
							// $('.album_detail_message').show().html('移动成功！').divCenter().delay(2000).fadeOut(2000);
				
						});

						//拖拽
						$movePic.find('h3').drag();
					} else {
						$('.album_detail_message').show().divCenter().delay(2000).fadeOut(2000);
						return false;
					};
				});			

			});
	   });
	

		//全选		
		$('.checkall>label>i').bind('click',function(){
			var _this = $(this);

			_this.toggleClass('check_all_current');
			$('.check_mask').toggleClass('chek_border');

			$('.album_list').find('p').each(function(){

				$(this).toggleClass('check_sta_current');

			});


			
			setTimeout(function(){
				$('.check_num').find('i').html($('.check_sta_current').size());
			},300);

		});

		//点击完成
	   $('.bath_done').click(function(){

	   			$('.checkall>label>i').removeClass('check_all_current');
	   		
	   			$photoAlbumTetail.find('p').removeClass('check_sta_current').hide();
				$photoAlbumTetail.find('.check_mask').removeClass('chek_border');
   					
	   	   		$photoAlbumTetail.find('.bath_manage').fadeOut(300);
	   	 		$('.album_list').find('p').hide();
	   	 		$photoAlbumTetail.find('.check_mask').unbind().hide();

	   	 		$('.upload_btn,.bath_btn,.recycle_btn,section.album').show();
   	
	   });



		setInterval(function(){
			$('.num').find('i').html($('.album_list').size());
		},300);

	};

	//图片轮播切换
	function _photoBrowser(){

		var $photoBrowser = $('#photo_browser');

			$photoBigImages = '<ul><li class="current"><img src=\"../public/image/p1big.jpg\" title=\"图11111\"></li><li><img src=\"../public/image/p2big.jpg\" title=\"图222222\"></li><li><img src=\"../public/image/p3big.jpg\" title=\"图33333\"></li><li><img src=\"../public/image/p4big.jpg\" title=\"图44444\"></li><li><img src=\"../public/image/p5big.jpg\" title=\"图5\"></li><li><img src=\"../public/image/p6big.jpg\" title=\"图6\"></li><li><img src=\"../public/image/p7big.jpg\" title=\"图7\"></li><li><img src=\"../public/image/p8big.jpg\" title=\"图8\"></li><li><img src=\"../public/image/p9big.jpg\" title=\"图9\"></li><li><img src=\"../public/image/p10big.jpg\" title=\"图10\"></li><li><img src=\"../public/image/p11big.jpg\" title=\"图11\"></li><li><img src=\"../public/image/p12big.jpg\" title=\"图12\"></li></ul>';
			$photosmallImages = '<ul><li class="current"><img src=\"../public/image/p1.jpg\" title=\"图11111\"></li><li><img src=\"../public/image/p2.jpg\" title=\"图222222\"></li><li><img src=\"../public/image/p3.jpg\" title=\"图33333\"></li><li><img src=\"../public/image/p4.jpg\" title=\"图44444\"></li><li><img src=\"../public/image/p5.jpg\" title=\"图5\"></li><li><img src=\"../public/image/p6.jpg\" title=\"图6\"></li><li><img src=\"../public/image/p7.jpg\" title=\"图7\"></li><li><img src=\"../public/image/p8.jpg\" title=\"图8\"></li><li><img src=\"../public/image/p9.jpg\" title=\"图9\"></li><li><img src=\"../public/image/p10.jpg\" title=\"图10\"></li><li><img src=\"../public/image/p11.jpg\" title=\"图11\"></li><li><img src=\"../public/image/p12.jpg\" title=\"图12\"></li></ul>';

			$bigPhotoContent =  $('.big_photo_content');
			$smallPhotoContent = $('.small_photo_content');
			$picTitleEm = $('.pic_title>em');
			$picTitleIb = $('.pic_title>i>b');
			$picTitleIspan = $('.pic_title>i>span');

		$('.album_list').each(function($index){

			var $this = $(this);

			$this.find('img').click(function(){

				$photoBrowser.show();

				$photoBrowser.divCenter();
				$photoBrowser.browserResize(_screenLock);
				$screen.divLock();

				//添加图片
				$photoBrowser.find('.big_photo_content').append($photoBigImages);
				$photoBrowser.find('.small_photo_content').append($photosmallImages);

				//大图小图展示所点击的
				$('.big_photo_content>ul>li').eq($index).addClass('current').siblings().removeClass('current');
				$('.small_photo_content>ul>li').eq($index).addClass('current').siblings().removeClass('current');

				//图片居中
				$bigPhotoContent.find('li.current>img').css('margin-top',($bigPhotoContent.height()- 450)/2);
				//箭头居中
				$('.arrow').find('a').css('top',$bigPhotoContent.height()/2);


				$picTitleEm.html($this.find('h3'));
				$picTitleIb.html($('.album_list').size());
				$picTitleIspan.html($index + 1);

				//点击图片显示		
				var $now = $index;
					$smallPhotoLi = $smallPhotoContent.find('ul>li');
					$bigPhotoLi = $bigPhotoContent.find('ul>li');
					$smallPhotoUl = $smallPhotoContent.find('ul');


				$smallPhotoLiWidth = $smallPhotoContent.find('ul').width();

				$smallPhotoLiWidth = $smallPhotoLi.size() * $smallPhotoLi.eq(0).outerWidth(true);//小图ul的长度

				if($now < 4) {
					$smallPhotoUl.css('left',0);
				} else {
					$smallPhotoUl.css('left',-($now -4) * $smallPhotoLi.eq(0).outerWidth(true));
				};
					
				//鼠标移入移出左右箭头
				$('.prev,.next').hover(function(){
					$(this).find('a').css('opacity',1);
				},function(){
					$(this).find('a').css('opacity',0.3);
				});

				//大图小图切换
				function _imgTab() {

					$bigPhotoLi.eq($now).addClass('current').siblings().removeClass('current');
					$smallPhotoLi.eq($now).addClass('current').siblings().removeClass('current');

					$bigPhotoContent.find('li.current>img').css('margin-top',($bigPhotoContent.height()- 450)/2);

					
					$picTitleEm.html($('.current').find('img').attr('title'));//图片标题
					$picTitleIspan.html($now+1);//图片数字计数

					if($now < 4) {
						$smallPhotoUl.animate({
							'left' : 0
						},300);

					} else if ($now > $smallPhotoLi.length - 1) {

						$smallPhotoUl.animate({
							'left' : -($now - 4) * $smallPhotoLi.eq(0).outerWidth(true)
						},300);

					} else {

						$smallPhotoUl.animate({
							'left':-($now - 4) * $smallPhotoLi.eq(0).outerWidth(true)
						},300);
					};					

				};

				//点击上一张
				function _prevImg(){
														
					--$now;

					if($now == -1) $now = $smallPhotoLi.length - 1;

					_imgTab();

				};
				

				//点击下一张
				function _nextImg(){


					++$now;

					if($now ==  $smallPhotoLi.length) $now = 0;

					_imgTab();
	
				};

				$('.prev').bind('click',_prevImg);
				$('.next').bind('click',_nextImg);
			
				//点击缩略图大图展示
				$smallPhotoContent.find('ul>li').click(function(){

					var _index = $(this).index();
						$now = _index; //重置

					$bigPhotoLi.eq(_index).addClass('current').siblings().removeClass('current');
					$smallPhotoLi.eq(_index).addClass('current').siblings().removeClass('current');

					$bigPhotoContent.find('li.current>img').css('margin-top',($bigPhotoContent.height()- 450)/2);

					if(_index < 3) {
						$smallPhotoUl.animate({
							'left' : 0
						},300);
					} else {
						$smallPhotoUl.animate({
							'left' : -(_index - 4) * $smallPhotoLi.eq(0).outerWidth(true)
						},300);
					};

					$picTitleIspan.html(_index + 1);
					$picTitleEm.html($('.current').find('img').attr('title'));

				});

				//自动播放
				if($photoBrowser.css('display') == 'block') {

					$timer = setInterval(_nextImg,2000);

					$photoBrowser.hover(function(){
						clearInterval($timer);
					},function(){
						$timer = setInterval(_nextImg,2000);
					});
				} else {
					clearInterval($timer);
				};

			});

		});	

		//关闭
		$photoBrowser.find('.close_btn').click(function(){

			$photoBrowser.unbind(); //移除事件绑定

			$photoBrowser.hide();
			$screen.divUnlock();
			$photoBrowser.find('ul').remove();
			$photoBrowser.find('.prev,.next').unbind('click'); //移除事件绑定
	
				
		});	

	};

 });
