/**
 * PC输入框验证
 */

	var Fcheck = {
			c_name : function(obj) {//检查用户名
				if(obj==''){
					MessageBox.info("请输入用户名");
					return false;
				}
				else if(!/^[0-9a-zA-Z_]+$/.test(obj)||obj.length < 6 || obj.length > 20){
					MessageBox.info("用户名格式不正确");
					return false;
				}else{
					return true;
				}

			},
			c_realname : function(obj) {//检查真实姓名
				if(obj==''){
					MessageBox.info("请输入真实姓名");
					return false;
				}else{
					return true;
				}
			},
			c_icard : function(obj){//检查身份证号码
				var icard = obj;
				var isTrueValidateCodeBy18IdCard=function(a_idCard){
					var sum = 0;
					var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
					var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
					if (a_idCard[17].toLowerCase() == 'x') {
						a_idCard[17] = 10;
					}
					for (var i = 0; i < 17; i++) {
						sum += Wi[i] * a_idCard[i];
					}
					valCodePosition = sum % 11;
					if (a_idCard[17] == ValideCode[valCodePosition]) {
						return true;
					}
					return false;
				};
				var isValidityBrithBy18IdCard=function(idCard18){
					var year = idCard18.substring(6, 10);
					var month = idCard18.substring(10, 12);
					var day = idCard18.substring(12, 14);
					var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
					if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
						return false;
					}
					return true;
				};

				var isValidityBrithBy15IdCard=function(idCard15){
					var year = idCard15.substring(6, 8);
					var month = idCard15.substring(8, 10);
					var day = idCard15.substring(10, 12);
					var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
					if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
						return false;
					}
					return true;
				}


				if (icard.length == 15) {
					if (isValidityBrithBy15IdCard(icard) == true) {
						return true;
					} else {
						MessageBox.info("身份证号码输入错误");
						return false;
					}
				} else if (icard.length == 18) {
					var a_idCard = icard.split("");
					if (isValidityBrithBy18IdCard(icard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
						return true;
					} else {
						MessageBox.info("身份证号码输入错误");
						return false;
					}
				} else {
					MessageBox.info("请输入有效的身份证号");
					return false;
				}
			},
			c_password : function(obj) {//检查密码
				if(obj==''){
					MessageBox.info("请输入密码");
					return false;
				}
				else if(!/^[0-9a-zA-Z_]+$/.test(obj)||obj.length < 6 || obj.length > 20){
					MessageBox.info("密码格式不正确");
					return false;
				}
				else{
					return true;
				}

			},
			c_phone : function(obj) {//检查手机号码
				if(obj==''){
					MessageBox.info("请输入手机号码");
					return false;
				}
				else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(obj)){
					MessageBox.info("手机号码格式不正确");
					return false;
				}
				else{
					return true;
				}

			},
			c_email : function(obj) {//检查邮箱
				if(obj==''){
					MessageBox.info("请输入邮箱号码");
					return false;
				}
				else if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(obj)){
					MessageBox.info("邮箱号码格式不正确");
					return false;
				}
				else{
					return true;
				}

			},
			c_emailcode : function(obj) {//检查邮箱验证码
				if(obj==''){
					MessageBox.info("请输入邮箱验证码");
					return false;
				}
				else{
					return true;
				}

			},
			c_code : function(obj) {//检查验证码
				if(obj==''){
					MessageBox.info("请输入验证码");
					return false;
				}
				else{
					return true;
				}

			},
			c_phonecode : function(obj) {//检查手机验证码
				if(obj==''){
					MessageBox.info("请输入手机验证码");
					return false;
				}
				else{
					return true;
				}

			},
			c_agreed : function(obj,classname) {//检查服务协议
				if($(obj).hasClass(classname)){
					return true;
				}else{
					MessageBox.info("请阅读协议并勾选同意");
					return false;
				}
			},
			c_mony : function(obj) {//检查金额
				if(obj==''||obj==0){
					MessageBox.info("金额不能为空或者不能为0");
					return false;
				}else if(!/^[0-9]+$|^[0-9]+\.[0-9]{1,2}$/i.test(obj)){
					MessageBox.info("金额格式不正确");
					return false;
				}
				else{
					return true;
				}
			},
			c_paypwd : function(obj) {//检查支付密码
				if(obj==''){
					MessageBox.info("支付密码不能为空");
					return false;
				}
				else{
					return true;
				}
			}

		};