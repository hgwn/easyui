(function($){
	$.fn.uploadFile = function(options) {
		
		var opts = $.extend({}, $.fn.uploadFile.defaults, options);
		var button = $(this)[0];
		
		this.isDestroyed = false;
		var filter = {
    	  	max_file_size : opts.maxFileSize, 
    	  	prevent_duplicates : !opts.permitDuplicate //不允许选取重复文件
    	}
		var mime_types = [];
		if(opts.isImage){
			mime_types.push({ title : "Image files", extensions : opts.imageExtensions });
		}
		if(opts.fileExtensions){
			mime_types.push({ title : "files", extensions : opts.fileExtensions });
		}
		if(mime_types.length > 0){
			filter.mime_types = mime_types;
		}
		var url = null;
		if(opts.url && typeof(opts.url)=='function'){
			url = opts.url();
		}else{
			url = opts.url;
		}

		var uploader = new plupload.Uploader({
		    url : url,
		    browse_button : button,
		    multi_selection: opts.multiSelection,
		    multipart_params:opts.params,
			flash_swf_url : '/commons/lib/plupload-2.1.9/js/Moxie.swf',
			silverlight_xap_url : '/commons/lib/plupload-2.1.9/js/Moxie.xap',
		    filters: filter
		});
		
		this.start = function(){ //开始上传队列中的文件
			initProgress();
			uploader.start();
		};
		
		this.removeFile = function(id){
			if(!id){
				return;
			}
			var file = uploader.getFile(id);
			if(file){
				uploader.removeFile(file);
			}
		}
		
		this.clearAll = function(){
			var files = uploader.files;
			if(!files || !files.length){
				return;
			}
			uploader.splice(0,files.length);
		}
		
		this.getUploader = function(){
			return uploader;
		}
		
		var startUpload = this.start;
		var clear = this.clearAll;
		var checkResolutionFlag = true;
		
		uploader.bind('Init', function(up) {
		});
		uploader.bind('PostInit', function(up) {
		});
		uploader.bind('FilesAdded', function(up, files) {
			if(opts.beforeFilesAdd && typeof(opts.beforeFilesAdd)=="function"){
		    	var flag = opts.beforeFilesAdd();
		    	if(typeof(flag) != 'undefined' && flag == false){
		    		for(var i in files){
						uploader.removeFile(files[i]);
					}
		    		return;
		    	}
		    }
		    if(files.length>0){
		    	checkResolutionFlag = true;
		    	var fileDataArry = new Array();
		    	for(var i=0;i<files.length;i++){
		    		var suffix = getSuffix(files[i].name);
		    		if(suffix && opts.excludeExtensions.indexOf(suffix) > -1){
		    			MessageBox.info("选择了非法的文件");
		    			return;
		    		}
		    		if(opts.isImage && (opts.maxHeight != null || opts.maxWidth != null || opts.minHeight != null || opts.minWidth != null)){
		    			checkResolution(files[i]);
		    		}
		    		fileDataArry.push({id:files[i].id,name:files[i].name,size:files[i].size});
		    	}
		    	
		    	function process(){
		    		if(opts.previewId && $("#"+opts.previewId).length > 0){
			    		previewImage(files[0],function(imgsrc){
			    			$("#"+opts.previewId).append('<img src="'+ imgsrc +'"/>');
						})
			    	}
			    	if(opts.showNameId && $("#"+opts.showNameId).length >0){
			    		var el = $("#"+opts.showNameId);
			    		if(el.is("input,textarea")){
			    			el.val(files[0].name);
			    		}else{
			    			el.text(files[0].name);
			    		}
			    	}
			    	
				    if(opts.filesAdd && typeof(opts.filesAdd)=="function"){
				    	opts.filesAdd(fileDataArry);
				    }

		    		if(opts.autoUpload){
				    	startUpload();
				    }
		    	}
			    
			    if(opts.isImage && (opts.maxHeight != null || opts.maxWidth != null || opts.minHeight != null || opts.minWidth != null)){
			    	setTimeout(function(){
			    		if(!checkResolutionFlag){
			    			clear();
			    			return;
			    		}
			    		process();
			    	},300);
			    }else{
			    	process();
			    }
		    }
		    
		});
		
		uploader.bind('FileUploaded',function(up,file,responseObj){
			var status = file.status;
			var fileId = file.id;
			if(status==plupload.FAILED){
			}else if(status==plupload.DONE){
				var rsp = eval("("+responseObj.response+")");
				if(typeof handleAjaxRspData == 'function'){
					if(!handleAjaxRspData(rsp)){
						return;
					}
				}
				if(opts.fileUploaded && typeof(opts.fileUploaded)=="function"){
					opts.fileUploaded({id:file.id,name:file.name,size:file.size,rspJson:rsp});
			    }
			}		
		});
		uploader.bind('UploadProgress',function(up,file){
			var fileId = file.id;
			$("#file_upload_progress .progress").attr("data-percent",file.percent+"%");
			$("#file_upload_progress .progress-bar").css("width",file.percent+"%");
		});
		uploader.bind('UploadComplete',function(up,files){
			setTimeout(function(){
				$("#file_upload_progress").fadeOut("slow");
			},1500)
		});
		uploader.bind('Error',function(up,errObject){
			if(errObject.code == plupload.FILE_SIZE_ERROR){
				MessageBox.info("选择的文件大小超出限制，文件不大于："+uploader.getOption("filters").max_file_size);
			}else if(errObject.code == plupload.FILE_EXTENSION_ERROR){
				var mimeTypesList = uploader.getOption("filters").mime_types;
				var mineTypes = "";
				for(var i in mimeTypesList){
					var set = mimeTypesList[i];
					if(i > 0){
						mineTypes += ",";
					}
					mineTypes += (set.extensions || "");
				}
				MessageBox.info("选择的文件不正确，只可以选择"+mineTypes+"后缀名的文件");
			}else if(errObject.code == plupload.FILE_DUPLICATE_ERROR){
				MessageBox.info("不允许选择重复的文件");
			}else if(errObject.code == plupload.IMAGE_FORMAT_ERROR){
				MessageBox.info("图片文件格式不正确");
			}else if(errObject.code == plupload.HTTP_ERROR){
				MessageBox.info("网络或服务器异常，上传失败");
			}else if(errObject.code == plupload.IO_ERROR){
				MessageBox.info("选择的文件不存在或无读取权限");
			}
			if($("#file_upload_progress").is(":visible")){
				$("#file_upload_progress").fadeOut("slow");
			}
		});
		
		uploader.init();

		function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
			if(!file || !/image\//.test(file.type)) return; //确保文件是图片
			if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
				var fr = new mOxie.FileReader();
				fr.onload = function(){
					callback(fr.result);
					fr.destroy();
					fr = null;
				}
				fr.readAsDataURL(file.getSource());
			}else{
				var preloader = new mOxie.Image();
				preloader.onload = function() {
					preloader.downsize( opts.previewWidth, opts.previewHeight );//先压缩一下要预览的图片,宽300，高300
					var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
					callback && callback(imgsrc); //callback传入的参数为预览图片的url
					preloader.destroy();
					preloader = null;
				};
				preloader.load( file.getSource() );
			}	
		}
		
		function getSuffix(filename){
			var idx = filename.lastIndexOf(".");
			var suffix = null;
			if(idx > -1){
				suffix = filename.substring(idx+1);
			}
			return suffix;
		}
		
		function initProgress(){
			var progress = $("#file_upload_progress");
			if(!progress.length){
				var html = "<div id='file_upload_progress' style='position: fixed;top:45%;left:50%;margin-left:-100px;width:200px;z-index: 9999;'><div class='progress progress-striped' data-percent='0%'><div class='progress-bar progress-bar-success' style='width: 0%;'></div></div>"
				$("body").append(html);
			}else{
				$("#file_upload_progress .progress").attr("data-percent","0%");
				$("#file_upload_progress .progress-bar").css("width","0%");
				progress.show();
			}
		}
		
		function showMsg(msg){
			if(msg==""){
				return;
			}
			if(artDialog){
				MessageBox.info(msg);
			}else{
				window.alert(msg);
			}
		}
		
		function checkResolution(file){ //true：通过，false：不通过
			if(file.type=='image/gif'){
				return;
			}
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				var width = preloader.width;
				var height = preloader.height;
				if(opts.maxWidth != null && width > opts.maxWidth){
					checkResolutionFlag = false;
					showMsg("图片像素宽度不能大于"+opts.maxWidth+",请上传正确的图片！");
					return;
				}
				if(opts.maxHeight != null && height > opts.maxHeight){
					checkResolutionFlag = false;
					showMsg("图片像素高度不能大于"+opts.maxHeight+",请上传正确的图片！");
					return;
				}
				if(opts.minWidth != null && width < opts.minWidth){
					checkResolutionFlag = false;
					showMsg("图片像素宽度不能小于"+opts.minWidth+",请上传正确的图片！");
					return;
				}
				if(opts.minHeight != null && height < opts.minHeight){
					checkResolutionFlag = false;
					showMsg("图片像素高度不能小于"+opts.minHeight+",请上传正确的图片！");
					return;
				}
				preloader.destroy();
				preloader = null;
			};
			preloader.load( file.getSource() );
			return;
		}
		
		return this;
	}
	
	$.fn.uploadFile.defaults = {
			url:null, //上传路径，string/function,
			isImage:false, //是否图片
			excludeExtensions:"bat,exe,sh", //不允许上传的拓展名
			imageExtensions:"jpg,jpeg,gif,png", //允许的图片拓展名
			fileExtensions:'', //允许上传的文件拓展名
			maxFileSize:'400kb', //最大的上传文件大小，可以接收单位b,kb,mb,gb，默认单位为b
			params:null, //附带提交的参数
			multiSelection:false, //选择文件时是否可以多选
			autoUpload:false, //选中文件后自动上传
			filesAdd:null, //当选中文件时触发调用的函数，function，可收一个数组对象[{id:id,name:filename,size:filesize}]
			fileUploaded:null, //当文件上传完成调用的函数,function
			previewId:null, //预览的图片窗口ID，isImage=true时有效
			previewWidth:300, //预览图片宽度，isImage=true时有效
			previewHeight:300, //预览图片高度，isImage=true时有效
			maxWidth:null, //最大宽度，对png/jpg图片有效，isImage=true时有效
			maxHeight:null, //最大高度，对png/jpg图片有效，isImage=true时有效
			minWidth:null, //最小宽度，对png/jpg图片有效，isImage=true时有效
			minHeight:null, //最小高度，对png/jpg图片有效，isImage=true时有效
			showNameId:null, //选择文件后展示文件名的DOM ID，如果选择多个文件，只会显示第一个文件的文件名
			permitDuplicate:false, //允许重复上传
			beforeFilesAdd:null    //文件选择前做的操作
	};
})(jQuery);