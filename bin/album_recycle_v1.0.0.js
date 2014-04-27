/**
 * @fileOverview 这是相册回收站页面功能
 * @author <a href="sjx.wh@lightimes.cn">email to Sirpale</a>
 * @version 1.0.0
 * @copyright Copyrigth © 2014 Lightimes. All Rights Reserved
 */


$(function($){
	//遮罩
	var $screen = $('#screen'),
		$recycleDeleteAlert = $('#recycle_delete_alert');


		_showRecycleAlbum();	//点击显示相册或图片
		_slectALL();			//全选
		_slectDelete();			//选中删除
		_emptyRecycle();		//清空回收站


	//点击显示相册或图片
	function _showRecycleAlbum(){
		$('#album_recycle').find('.recycle_album_show').click(function(){
			$('#views_cont_album').fadeIn(300);
			$('#views_cont_pic').fadeOut(300);
			$('.checkall_pic').fadeOut(30);
			$('.checkall_album').fadeIn(30);
		});
		$('#album_recycle').find('.recycle_pic_show').click(function(){
			$('#views_cont_pic').fadeIn(300);
			$('#views_cont_album').fadeOut(300);
			$('.checkall_pic').fadeIn(30);
			$('.checkall_album').fadeOut(30);
		});
	};

	//全选
	function _slectALL(){
		$('#checkall_album').bind('click',function(){		
			$('#views_cont_album').find("input[name='check_album_name']").each(_slect);
		});
		$('#checkall_pic').bind('click',function(){
			$('#views_cont_pic').find("input[name='check_pic_name']").each(_slect);
		});

		function _slect(){
			var _this = $(this);
			if(this.checked) {
				this.checked = false;
			} else {
				this.checked = true;
				$('#recycle_delete').click(function(){
					$recycleDeleteAlert.show();
					$recycleDeleteAlert.divCenter();
					$screen.divLock();

					$recycleDeleteAlert.find('.close_btn,#recycle_delete_cancel').click(function() {
						$recycleDeleteAlert.hide();
						$screen.divUnlock();

					});

					$('#recycle_delete_dete').click(function(){
						$recycleDeleteAlert.hide();
						$screen.divUnlock();
						_this.parent().parent().parent().fadeOut(300);
					});
					
				});
			};		
		};

	};
	
	//选中删除
	function _slectDelete(){
		$('#recycle_delete').click(function(){
			$('#views_cont_album,#views_cont_pic').find("input[name='check_album_name'],input[name='check_pic_name']").each(function(){
				var _this = $(this);
					


				if(this.checked) {
					$recycleDeleteAlert.show();
					$recycleDeleteAlert.divCenter();
					$screen.divLock();

					//取消
					$recycleDeleteAlert.find('.close_btn,#recycle_delete_cancel').click(function() {
						$recycleDeleteAlert.hide();
						$screen.divUnlock();

					});

					//确认
					$('#recycle_delete_dete').click(function(){
						$recycleDeleteAlert.hide();
						$screen.divUnlock();
						_this.parent().parent().parent().fadeOut(300);
					});

					//拖拽
					$recycleDeleteAlert.find('h3').drag();
				};
			});
			
		});

	};
	
	//清空回收站
	function _emptyRecycle(){
		$('#recycle_delete_all').click(function(){
			var $recycleEmptyAlert = $('#recycle_empty_alert');

			$recycleEmptyAlert.show();
			$recycleEmptyAlert.divCenter();
			$screen.divLock();

			//取消
			$recycleEmptyAlert.find('.close_btn,#recycle_empty_cancel').click(function() {
					$recycleEmptyAlert.hide();
					$screen.divUnlock();

			});

			//确认
			$('#recycle_empty_dete').click(function(){
				$recycleEmptyAlert.hide();
				$screen.divUnlock();
				$('#album_recycle').find('li').fadeOut(300);
			});

			//拖拽
			$recycleEmptyAlert.find('h3').drag();
			
		});
	};

});