/**
 * @fileOverview 这是相册公用页面功能
 * @author <a href="sjx.wh@lightimes.cn">email to Sirpale</a>
 * @version 1.0.0
 * @copyright Copyrigth © 2014 Lightimes. All Rights Reserved
 */
$(function($) {
	//遮罩
	var $screen = $('#screen');
	function _screenLock(){
		if($(this).css('display') == 'block') $screen.divLock();
	}
	//图片延迟加载
	$(document).imgLazyLoading();
	_uploadPic(); //点击上传
	_uploadSelect(); //点击下拉
	_picPreview();	//图片预览
	_createAlbum(); //创建相册
	_checkAlbumString(); //判断相册字符长度
	_editAlbum(); //编辑相册
	_deleteAlbum(); //删除相册


	//点击上传
	function _uploadPic() {
		$('#photo_album,#photo_album_tetail').find('.upload_btn').click(function() {
			var $uploadPic = $('#upload_pic');

			
			$uploadPic.show();
			$uploadPic.divCenter();
			$uploadPic.browserResize(_screenLock);
			$screen.divLock();

			//关闭
			$uploadPic.find('.close_btn').click(function() {
				$uploadPic.hide();
				$screen.divUnlock();
				$('.upload_content').hide();
				$('.up_now').hide();
				$('.up_num').hide();
				$('.upload_ul').find('li').remove();
				$('.upload_index').show();
		
			})
		});
	}



	//上传相册选择下拉
	function _uploadSelect() {

		var $selectTop = $('#upload_pic .select_top,#photo_album_tetail .select_top'),
			$selectContent = $('#upload_pic .select_content,#photo_album_tetail .select_content');

		$selectTop.click(function(e) {
			$selectContent.slideDown(200);
		});
		$('#upload_pic,#photo_album_tetail').find('.select').mouseleave(function() {
			$selectContent.slideUp(200);
		});
		$('.album_list_item', $selectContent).click(function(e) {
			var target = this;
			$selectContent.slideUp(200, function() {
				$selectTop.html(target.innerHTML + '<span class="icon"></span>');
			});
		});
	}



	//图片预览
	function _picPreview() {
		
		$('#uploadImage,#uploadImage1').on('change', function() {

			//得到文件列表
			var files = !! this.files ? this.files : [];
			if (!files.length || !window.FileReader) return;
			setInterval(function(){
					$('.up_num>em').html($('.uploadPReview').length).css('color','red');
			},30);

			$(files).each(function($index){
				var $this = $(this);

				// console.info($this[0]);

				if (/.(gif|jpg|jpeg|png)$/.test($this[0].type) && $this[0].size < 200000) {

					var reader = new FileReader();
						
					reader.readAsDataURL($this[0]);

					// console.info(reader);
					reader.onloadend = function() {
						var $uploadUl = $('.upload_ul'), //图片列表
							imgResult = this.result, //图片信息本地地址
							imgDate = new Date(), //日期
							imgTime = Sirpale._getDateNum(imgDate.getYear() + '-' + imgDate.getDate() + '-' + imgDate.getHours() + '-' + imgDate.getMinutes() + '-' + imgDate.getSeconds() + '-' + imgDate.getMilliseconds());


						$('.upload_content,.up_now,.up_num ').show();
						$('.upload_index').hide();
						
					

						if($(files).length < 20) {
							$uploadUl.append(
								"<li class=\"uploadPReview\" data=\"true\"><img src=" + imgResult + "><h3><input type=\"text\" value=" + imgTime + "  class=\"pic_title\" /></h3><span class=\"delete_btn\" title=\"删除图片\"></span><span class=\"count_text\"><i id=\"pic_word\">0</i>/30</span><div class=\"update_progress\"><div class=\"update_loading\"></div></div></li>"
							);
						}else {
							$('.update_message ').css({
								'left': '42%',
								'top':'20%'
							}).html('上传的数量大于20张!').show().delay(2000).fadeOut(1000);

							return false;
							
						};



						



					


						$uploadUl.find('li').each(function() {
							var $this = $(this),
								$index = $this.index();


							$this.find('.delete_btn').click(function() {
								$(this).parent().remove();
								if (!$uploadUl.find('li').html()) {
									$('.upload_content,#upload_pic .up_now').hide();
									$('.upload_index').show();
								};
							})
							$this.find('.pic_title').hover(function() {
								$(this).css('cursor', 'text');

							}, function() {

							});
							$this.find('.pic_title').keypress(function() {

								$this.find('#pic_word').html($(this).val().length)

								if ($(this).val().length >= 30) {
									$this.find('#pic_word').css('color', 'red')
									$(this).val($(this).val().substring(0, 29));
								}

							}).keyup(function() {
								$this.find('#pic_word').html($(this).val().length)
							});

							$this.find('.pic_title').bind({
								focus: function() {
									$this.find('.count_text').show();
									if ($(this).val() == imgTime) {
										$(this).val('');
									}
								},
								blur: function() {
									$this.find('.count_text').hide();
									if ($(this).val() == '') {
										$(this).val(imgTime);
									}
								}
							})

						});

					};
				} else {					
					$('.update_message ').css({
						'left': '40%',
						'top':'20%'
					}).html('图片大于2M或图片格式错误!').show().delay(2000).fadeOut(1000);
					return false;						
				};
			});

		});

		//进度条

		$('.up_btn').bind('click',function(){
			var $updateProgress = $('.update_progress');
				$updateLoading =  $('.update_loading');
				$updateNum = 0;


			$('.up_pic_wrapper h3').fadeOut(100);
			$updateProgress.show();
			 _doProgress();
			//样式
			function _setProgress($num){
				//控制进度条宽度
				$updateLoading.css('width',$num + '%');
				//显示百分比
				$updateLoading.html(String($num)+'%');
			};
			//执行
			function _doProgress(){
				if($updateNum>100){
					$('.update_message ').css({
						'left': '45%',
						'top':'40%',
						'color':'green'
					}).html('上传成功！').fadeIn(1000).fadeOut(2000);
					$updateProgress.fadeOut(2000);
					$updateLoading.fadeOut(2000);
					$('.delete_btn').hide();
					$('.uploadPReview').attr('data','false');

					return false;
				};
				if($updateNum<=100) {
					setTimeout(_doProgress,100);
					_setProgress($updateNum);
					$updateNum = $updateNum + 10;
				};
			};




		})


	}


	//创建相册
	function _createAlbum() {
		$('.create_btn,#upload_pic .new_btn').click(function() {
			var $createAlbum = $('#create_album'),
				$nameWord = $('#name_word,#des_word');
			$nameWord.css('color', '#5f5f5f');
			$nameWord.html(0);


			$('#upload_pic').hide();	//上传图片区块隐藏
			$('.upload_content').hide();
			$('.up_now').hide();
			$('.up_num').hide();
			$('.upload_ul').find('li').remove();
			$('.upload_index').show();


			$createAlbum.fadeIn();
			$createAlbum.divCenter();
			$createAlbum.browserResize(_screenLock);
			$('#upload_pic').fadeOut();
			$screen.divLock();

			//关闭和取消
			$createAlbum.find('.close_btn,#cancel').click(function() {
				$createAlbum.fadeOut();
				$(this).parent().parent().find('#album_name,#album_des').val('');
				$nameWord.css('color', '#5f5f5f');
				$nameWord.html(0);
				$screen.divUnlock();
				$('.create_album_message').hide();		
			});


			//创建相册拖拽
			$createAlbum.find('h3').drag();

			//确认
			$('#dete').click(function() {
				var $albumNameVal = $('#album_name').val();
				$createDate = new Date();
				$createTime = $createDate.getFullYear() + '-' + ($createDate.getMonth() + 1) + '-' + $createDate.getDate();

				if ($albumNameVal == '') {
					// $('#album_name').val($createTime).css('color', 'red');
					// alert('标题不能为空！');
					$('.create_album_message').html('相册名称不能为空且长度不得小于6位').show();
				} else {
					if($albumNameVal.length < 6) {
						$('.create_album_message').html('相册名称不能为空且长度不得小于6位').show();
					} else {
						$('#photo_album').find('section>ul').append("<li class=\"album_list\"><a href=\"javascript:;\"><img src=\"../public/image/pic-none.png\"><div class=\"move show\"></div><div class=\"change_cover show\"></div><div class=\"num show\">共<em>0</em>张</div></a><h3>" + $albumNameVal + "</h3><div class=\"update_time\">创建于" + $createTime + "</div><div class=\"set show\"><span class=\"edit\" title=\"编辑相册\">编辑<span class=\"pic_edit\"></span></span><span class=\"delete\" title=\"删除相册\">删除<span class=\"pic_delete\"></span></span></div></li>")
						$('#album_name').val('');
						$createAlbum.fadeOut();
						$screen.divUnlock();

						_editAlbum(); //编辑相册
						_deleteAlbum(); //删除相册
						$('.create_album_message').hide();
					}


				};
		
			})
		});
	}



	//判断相册字符长度
	function _checkAlbumString() {

		function _checkName() {
			var v = $(this).val();
			var nameWord = $('#name_word,#edit_name_word,#edit_pic_word').html(v.length);
			if (v.length >= 30) {
				$('#name_word,#edit_name_word,#edit_pic_word').css('color', 'red');
				$(this).val($(this).val().substring(0, 29));
			} else {
				$('#name_word,#edit_name_word,#edit_pic_word').css('color', '#666');
			}
		};

		function _checkDes() {
			var v = $(this).val();
			var nameWord = $('#des_word,#edit_des_word').html(v.length);
			if (v.length >= 100) {
				$('#des_word,#edit_des_word').css('color', 'red');
				$(this).val($(this).val().substring(0, 99));
			} else {
				$('#des_word,#edit_des_word').css('color', '#666');
			}
		};
		//判断相册名称字符串长度
		$('#album_name,#edit_album_name,#edit_pic_name').bind({
			keydown : _checkName,
			focus : _checkName,
			keyup : function() {
				$('#name_word,#edit_name_word,#edit_pic_word').html($(this).val().length);
			}
		})

		//判断相册描述字符长度
		$('#album_des,#edit_album_des').bind({
			keydown : _checkDes,
			focus :_checkDes,
			keyup: function() {
				$('#des_word,#edit_des_word').html($(this).val().length);
			}
		})
	}


	//编辑相册
	function _editAlbum() {

		//相册分类页面编辑
		$('.album_list').each(function() {
			var $this = $(this);
			$editAlbum = $('#edit_album'),
			$editNameWord = $('#edit_name_word,#edit_des_word');
			$this.find('.edit').click(function() {

				$this.attr('data', 'true').siblings().attr('data', 'false');

				if ($this.attr('data') == 'true') {

					$editNameWord.css('color', '#5f5f5f');
					$editNameWord.html(0);

					$editAlbum.fadeIn();
					$editAlbum.divCenter();
					$editAlbum.browserResize(_screenLock);

					//相册名称
					$('#edit_album_name').val($this.find('h3').html());



					$('#upload_pic').fadeOut();
					$screen.divLock();
					//关闭
					$editAlbum.find('.close_btn,#edit_cancel').click(function() {
						$editAlbum.fadeOut();
						$(this).parent().parent().find('#edit_album_name,#edit_album_des').val('');
						$editNameWord.css('color', '#5f5f5f');
						$editNameWord.html(0);
						$screen.divUnlock();
				
					});
					//编辑相册拖拽
					$editAlbum.find('h3').drag();

					//回车确认
					document.onkeydown = function(e){
						var ev = document.all ? windwo.event : e;

						if(ev.keyCode == 13) {
							$('#edit_dete').click();
					
						}
					};

					//确认			
					$('#edit_dete').click(function() {
						$editAlbum.fadeOut();
						$screen.divUnlock();
						$('#photo_album').find('h3').each(function(){
							if($this.attr('data') == 'true'){
								if($(this).html() == $('#edit_album_name').val()){
									$('#edit_album_name').val($this.find('h3').html());
								} else if($('#edit_album_name').val() == ''){
									$('#edit_album_name').val($this.find('h3').html());
								} else  {
									$this.find('h3').html($('#edit_album_name').val().substring(0, 30));
									$this.find('h3').attr('title',$('#edit_album_name').val().substring(0, 30));
								}
							}
		
						});

				

					});


				}


			});

			//编辑图片
			$this.find('.edit_pic').click(function() {
				var $editPic = $('#edit_pic'),
					$editNameWord = $('#edit_pic_word');

				$this.attr('data', 'true').siblings().attr('data', 'false');

				if ($this.attr('data') == 'true') {

					$editNameWord.css('color', '#5f5f5f');
					$editNameWord.html(0);

					$editPic.fadeIn();
					$editPic.divCenter();
					$editPic.browserResize(_screenLock);
					//图片名称
					$('#edit_pic_name').val($this.find('h3').html());

					$('#upload_pic').fadeOut();
					$screen.divLock();
					//关闭
					$editPic.find('.close_btn,#edit_pic_cancel').click(function() {
						$editPic.fadeOut();
						$(this).parent().parent().find('#edit_pic_name').val('');
						$editNameWord.css('color', '#5f5f5f');
						$editNameWord.html(0);
						$screen.divUnlock();
				
					});
					//编辑图片拖拽
					$editPic.find('h3').drag();

					//回车确认
					document.onkeydown = function(e){
						var ev = document.all ? windwo.event : e;

						if(ev.keyCode == 13) {
							$('#edit_pic_dete').click();
					
						}
					};

					//确认
					$('#edit_pic_dete').click(function() {
						$editPic.fadeOut();
						$screen.divUnlock();
				

						$('.album_pic').find('h3').each(function(){

							if($this.attr('data') == 'true'){
								if($(this).html() == $('#edit_pic_name').val()){
									$('#edit_pic_name').val($this.find('h3').html());
								} else if($('#edit_pic_name').val() == ''){
									$('#edit_pic_name').val($this.find('h3').html());
								} else  {
									$this.find('h3').html($('#edit_pic_name').val().substring(0, 30));
									$this.find('h3').attr('title',$('#edit_pic_name').val().substring(0, 30));
								};
							};
		
						});
						
						
					});

				};


			});

		});

		//相册详情页面相册编辑
		$('#photo_album_tetail').find('.edit').click(function() {
			var _this = $(this);
			$editNameWord.css('color', '#5f5f5f');
			$editNameWord.html(0);

			$editAlbum.fadeIn();
			$editAlbum.divCenter();
			$editAlbum.browserResize(_screenLock);

			//相册名称
			$('#edit_album_name').val(_this.parent().parent().find('h3').html());
			//相册描述
			$('#edit_album_des').val(_this.parent().parent().find('article').html());

			$('#upload_pic').fadeOut();
			$screen.divLock();

			//关闭
			$editAlbum.find('.close_btn,#edit_cancel').click(function() {
				$editAlbum.fadeOut();
				$(this).parent().parent().find('#edit_album_name,#edit_album_des').val('');
				$editNameWord.css('color', '#5f5f5f');
				$editNameWord.html(0);
				$screen.divUnlock();
		
			});

			//编辑相册拖拽
			$editAlbum.find('h3').drag();


			//确认
			$('#edit_dete').click(function() {
				$editAlbum.fadeOut();
				$screen.divUnlock();
				//相册名称
				_this.parent().parent().find('h3').html($('#edit_album_name').val().substring(0, 30));
				//相册描述
				_this.parent().parent().find('article').html($('#edit_album_des').val().substring(0, 100));
			});
		});

	};


	//删除相册
	function _deleteAlbum() {
		var $albumList = $('.album_list'),
			$deleteAlbumAlert = $('#delete_album_alert');

		$albumList.each(function() {
			var $this = $(this);

			$(this).find('.delete').click(function() {
				var _this = $(this),
					$thisParentParent = _this.parent().parent();

				$thisParentParent.attr('data', 'true').siblings().attr('data', 'false'); //添加行内属性标示符

				if ($thisParentParent.attr('data') == 'true') {

					//删除相册提示
					$deleteAlbumAlert.show();
					$deleteAlbumAlert.divCenter();
					$deleteAlbumAlert.browserResize(_screenLock);
					$screen.divLock();

					$deleteAlbumAlert.find('em').html($this.find('.num>em').html());

					//编辑相册拖拽
					$deleteAlbumAlert.find('h3').drag();

					//取消
					$deleteAlbumAlert.find('.close_btn,#delete_album_cancel').bind('click', function(e) {
						$deleteAlbumAlert.hide();
						$screen.divUnlock();
				
					});

					//回车确认
					document.onkeydown = function(e){
						var ev = document.all ? windwo.event : e;

						if(ev.keyCode == 13) {
							$('#delete_album_dete').click();
					
						};
					};

					//确认
					$deleteAlbumAlert.find('#delete_album_dete').bind('click', function() {
						
						$deleteAlbumAlert.hide();
						$screen.divUnlock()
						if ($thisParentParent.attr('data') == 'true') $thisParentParent.remove() //当data为ture的时候移除
				
					});
					

				};

			});

		});


	};

});