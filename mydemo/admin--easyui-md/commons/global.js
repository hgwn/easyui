AppConfig = {
	prefix : "/members",
	fullpath : function(related) {
		return AppConfig.prefix + related;
	}
};
var count = 60;
var endTiem;
var wait = 60;
var ele = "";
// 公共请求
var commons = {

	data : {
		"downloadUrl" : "http://192.168.16.11:3000/cmsapi/image/download?"
	},

	sendPhoneVerificationCode : function(el) {

		var mobile = $(el).val();
		if (!mobile) {
			MessageBox.info('请输入手机号');
			return false;
		}
		var appUserId = (user.data.id ==undefined ? "":user.data.id);
		var url = '/sdk/user/sendSMS/' + mobile+"?Appkey=&appUserId="+ appUserId;

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
		var url = '/sdk/op/sendEmail/' + email;
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
					data.result.token, 60 * 60 * 2);

				if (data.code == 302) {
					Utils.gotoPage(data.msg + "?token=" + data.result.token);
				} else {
					Utils.gotoPage('index.html');
				}
			} else {
				var msg=data.msg;
				if( typeof msg =="string"){
					msg=eval("("+data.msg+")");
				}
				$("#p2p_login_tip").text(msg.msg);
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

// ajax全局配置

$.ajaxSetup({

	error : function(xhr, status, err) {

		if (xhr.status == 400) {

			var errDate = $.parseJSON(xhr.responseText);

			var regx = /^{\w*}$/;
			if (regx.test(errDate.msg)) {
				MessageBox.info($.parseJSON(errDate.msg).msg);
			} else {
				MessageBox.info(errDate.msg);
			}

			if ($.parseJSON(errDate.msg).code == "2072") {
				op.del();
				Utils.gotoPage("login.html");
			}

		}
		if (xhr.status == 500) {

			var errDate = $.parseJSON(xhr.responseText);
			MessageBox.info($.parseJSON(errDate.msg).msg);
			if ($.parseJSON(errDate.msg).code == "2072"
					|| $.parseJSON(errDate.msg).code == "2071") {
				op.del();
				Utils.gotoPage("login.html");
			}
		}

	}
});

var MessageBox = {

	info : function(info) {
		$.messager.alert('提示', info, 'info');

	},
	warn : function(info) {
		$.messager.alert('警告', info, 'warn');

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