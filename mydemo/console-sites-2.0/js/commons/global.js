var count = 60;
var endTiem;
var wait = 60;
var ele = "";
var path = {
		site:'http://192.168.16.11',
		//site:'http://localhost',
		CMSimgSrc: "/dlapi/cms/image/download?",
		UserCenter:'/dlsys/portal',//API通道（用户中心页面定制支付）
		baseServer:'/dlapi/uc',//API通道（基础服务）
		baseCms:'/dlapi/cms',//API通道（内容管理）
		PayServer:'/dlapi/wealth'//支付
};
// 公共请求
var commons = {

	data : {
		"downloadUrl" : path.CMSimgSrc
	},
	cmsapi_address :function(){
		return path.baseCms;
	},
	sendPhoneVerificationCode : function(el) {

		var mobile = $(el).val();
		if (!mobile) {
			MessageBox.info('请输入手机号');
			return false;
		}
		var appUserId = (user.data.id ==undefined ? "":user.data.id);
		var url = '/dlsys/admin/sdk/user/sendSMS/' + mobile+"?Appkey=&appUserId="+ appUserId;

		$.get(url, function(data) {
			// alert("success");
		});

	},
	sendEmailCode : function(el) {

		var email = $(el).val();

		if (!email) {
			MessageBox.info('请输入邮箱');
			return false;
		}
		var url = '/dlsys/admin/sdk/op/sendEmail/' + email;
		$.get(url, function(data) {
			// alert("success");
		});
	},
	timeCount : function() {// 倒计时
		$(ele).text(count + "秒后重发");
		--count;
		if (count < 0) {
			window.clearInterval(endTiem);
			$(ele).text("重新获取");
			count = 60;
		}
	},
	beginCount : function(el) {
		ele = "#" + el;
		endTiem = window.setInterval("commons.timeCount()", 999);
	},
	time : function(o, el) {

		if (wait == 0) {
			if (el) {
				el.removeAttr("disabled");
			}
			o.removeAttribute("disabled");
			$(o).text("重新获取");
			wait = 60;

		} else {

			if (el) {
				el.attr("disabled", "disabled");
			}
			o.setAttribute("disabled", true);
			--wait;
			$(o).text("重新发送(" + wait + ")");
			setTimeout(function() {
				commons.time(o, el)
			}, 1000)
		}
	},
	content_upload: function(ele_id,upload_url,call_back){
		$("#"+ele_id).uploadFile({
			url : upload_url,
			autoUpload : true,
			maxHeight : 400,
			previewId : 'fileId',
			fileUploaded : function(obj) {
				call_back(obj);
			}
		});
	},
	upload : function(ele, uploadUrl, updataUrl, paramName, ev, updata, param) {
		$(ele).uploadFile({
			url : uploadUrl,
			autoUpload : true,
			maxHeight : 400,
			previewId : 'fileId',

			fileUploaded : function(obj) {// 文件上传成功时回调的方法

				var str = '{"' + paramName + '" :' + obj.rspJson[0].id + '}';
				var params = JSON.parse(str);
				if (param != null && param != '') {

					$.extend(param, params);

					params = param;

				}
				ev(params);
				/*
				 * MessageBox.confirm('是否保存', function() {
				 * 
				 * $.post(updataUrl, params, function(rsp) {
				 * 
				 * if (updata != null && updata != '') {
				 * updata(obj.rspJson[0].id); } ev();
				 * 
				 * }); });
				 */
			}
		});

	},
	formToJson:function(form_obj){
	      var json_obj = {};
	      if(form_obj){  
	         var ele_arr = form_obj.serializeArray();    
	          if(ele_arr){
	              for(var i = 0; i < ele_arr.length ; i++){  
	                  if(ele_arr[i].name && ele_arr[i].name !=""){  
	                      json_obj[ele_arr[i].name] = ele_arr[i].value;  
	                  }  
	              }
	          }  
	      }
	      return json_obj;
    },
	formToJsonNoEmpty:function(form_obj){
	      var json_obj = {};
	      if(form_obj){  
	         var ele_arr = form_obj.serializeArray();    
	          if(ele_arr){
	              for(var i = 0; i < ele_arr.length ; i++){  
	                  if(ele_arr[i].name && ele_arr[i].name !=""){  
	                	  if(ele_arr[i].value != ""){
	                		  json_obj[ele_arr[i].name] = ele_arr[i].value;  
	                	  }
	                  }  
	              }
	          }  
	      }
	      return json_obj;
    } 
    
    
};

var op = {
	data : {},

	islogin : function() {

		op.load();
		return ((op.data) && (op.data.id));

	},

	create : function(id, name, ip, loginCount, lastLoginTime, email, mobile,
			photo, workNumber, token, keepdays) {

		op.data.id = id;
		op.data.name = name;
		op.data.ip = ip;
		op.data.loginCount = loginCount;
		op.data.lastLoginTime = lastLoginTime;
		op.data.email = email;
		op.data.mobile = mobile;
		op.data.photo = photo;
		op.data.workNumber = workNumber;
		op.data.token = token;
		op.save(keepdays);

	},

	save : function(keepdays) {

		DataProvider.localStore.save("opSession", op.data, keepdays);

	},

	load : function() {
		// 取出cookie中的json对象
		op.data = DataProvider.localStore.get("opSession") || {};

	},
	del : function() {
		DataProvider.localStore.remove("opSession");
		op.data = {};

	},

	login : function(data) {
		if (data) {
			if (data.code == 0 || data.code == 302) {
				op.create(data.result.id, data.result.name, data.result.ip,
						data.result.loginCount, data.result.lastLoginTime,
						data.result.email, data.result.mobile,
						data.result.photo, data.result.workNumber,
						data.result.token, 60 * 60 * 2);

				if (data.code == 302) {
					Utils.gotoPage(data.msg + "?token=" + data.result.token);
				} else {
					Utils.gotoPage('index.html');
				}
			} else {
				MessageBox.info(data.msg);
			}
		} else {
			MessageBox.info("登录失败");
		}

	},
	p2p_login : function(data) {
		if (data) {
			if (data.code == 0 || data.code == 302) {
				op.create(data.result.id, data.result.name, data.result.ip,
					data.result.loginCount, data.result.lastLoginTime,
					data.result.email, data.result.mobile,
					data.result.photo, data.result.workNumber,
					data.result.token);

				if (data.code == 302) {
					Utils.gotoPage(data.msg + "?token=" + data.result.token);
				} else {
					Utils.gotoPage('index.html');
				}
			} else {
				/*var msg=data.msg;
				if( typeof msg =="string"){
					msg=eval("("+data.msg+")");
				}*/
				$("#p2p_login_tip").text(data.msg);
				loginform.getvalidcode();
			}
		} else {
			$("#p2p_login_tip").text("登录失败");
			loginform.getvalidcode();
		}

	},
	logout : function(url, params) {

		$.post(url, params, function(data) {
			op.del();
			Utils.gotoPage('login.html');
		});
		op.del();
	}

};

$.extend($.fn.validatebox.defaults.rules, {
    /*必须和某个字段相等*/
    equalTo: {validator: function (value, param) {return $(param[0]).val() == value; }, message: '字段不匹配' },
    //移动手机号码验证//value值为文本框中的值
	mobile: {validator: function (value) { var reg = /^1[3|4|5|7|8|9]\d{9}$/; return reg.test(value);},message: '输入手机号码格式不准确.'},
    //整数
	digits: {validator: function(value, param) {return /^([0-9]+)$/.test(value);}, message: '请输入整数'},  
	//区间整数
	range:{validator:function(value,param){
           if(/^[1-9]\d*$/.test(value)){
             return value >= param[0] && value <= param[1]
           }else{
             return false;
           }
         },
         message:'输入的数字在{0}到{1}之间'
     }
});
var MessageBox = {

	info : function(info,fn) {
		if(typeof fn=='undefined'){
			fn = function(){};
		}
		$.messager.alert('提示', info, 'info',fn);

	},
	warn : function(info) {
		$.messager.alert('警告', info, 'warn');

	},
	error: function(info) {
		$.messager.alert('提示', info, 'error');
	},
	confirm : function(info, callback, params) {
		$.messager.confirm('提示', info, function(r) {
			if (r && callback) {
				callback(params);
			}
		});
	},

	showProgress : function(info) {
		$.messager.progress({
			title : '请稍后...',
			msg : info
		});

	},
	hideProgress : function() {
		$.messager.progress('close');
	}

};