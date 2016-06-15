var factory = {};

$.ajaxSetup({//ajax全局配置
    error:function(xhr, status, err){
        factory.ajaxerror(xhr, status, err);
    }
});

factory.ajaxerror = function(xhr, status, err){//ajax抛出错误统一定义
    if (xhr.status == 401){//token过期
        user.del();
        Utils.gotoPage('index.html#page=login');
    }
    if (xhr.status == 403){//没有对应的权限
        jAlert.warn('没有权限');
    }
    if (xhr.status == 400 || xhr.status == 500) {
        var errDate=JSON.parse(xhr.responseText);
        jAlert.warn(errDate.msg);
    }
    //抛出错误时，验证码重新获取
    var codesrclen = $("#codesrc").length;
    if(codesrclen>0){
        factory.getCode("#codesrc");
    }
};

factory.getCode = function(obj){//图片验证码
    $(obj).attr('src','/dlsys/portal/sdk/common/validcode?rand='+Math.random());
};

factory.getEmailCode = function(emial){//邮箱验证码
    var t_email = Fcheck.c_email(emial),$getcode=$("#getcode"),$againcode=$("#againcode");
    if(t_email){
        var appUserId = (user.data.id ==undefined ? "":user.data.id);
        var url = '/dlsys/portal/sdk/user/sendEmail/' + emial+"?Appkey=&appUserId="+ appUserId;
       DeelonService.ajax(url,'get',{},function(data){},function(xhr, status, err){
                $getcode.hide();
                $againcode.show();
                var tflg = 60;
                var int = setInterval(function() {
                    $($againcode).html(tflg + '秒后重发');
                    if (tflg == 0) {
                        tflg = 60;
                        $getcode.show();
                        $againcode.hide();
                        $($againcode).html(tflg + '秒后重发');
                        clearInterval(int);
                    }
                    tflg--;
                }, 1000);
       });
    }
};

factory.getPhoneCode = function(phone){//手机验证码
    var t_phone = Fcheck.c_phone(phone),$getcode=$("#getcode"),$againcode=$("#againcode");
    if(t_phone){
        var appUserId = (user.data.id ==undefined ? "":user.data.id);
        var url = '/dlsys/portal/sdk/user/sendSMS/' + phone+"?Appkey=&appUserId="+ appUserId;
        DeelonService.ajax(url,'get',{},function(data){},function(xhr, status, err){
            $getcode.hide();
            $againcode.show();
            var tflg = 60;
            var int = setInterval(function() {
                $($againcode).html(tflg + '秒后重发');
                if (tflg == 0) {
                    tflg = 60;
                    $getcode.show();
                    $againcode.hide();
                    $($againcode).html(tflg + '秒后重发');
                    clearInterval(int);
                }
                tflg--;
            }, 1000);
        });
    }

};

//添加千分号
function addThousandSign(num) {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    //return (num + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
};

//删除千分号
function removeThousandSign(str) {
    return str.replace(/,/g, '');
};

//获取剩余时间
function countdown(data){
    var setRestTime = setInterval(function () {
        var now = new Date(),
            $restTime = $('.project_invest_time'),
            endDate,
            diff;

        endDate = new Date(data);
        diff = dateDiff(endDate, now);
        if($restTime.length > 0){
            $restTime.html('<b>' + diff.date + '</b>天<b>' + diff.hour + '</b>小时<b>' + diff.minute + '</b>分');
        } else {
            clearInterval(setRestTime);
        }
    }, 1000);
}

//求日期差
dateDiff = function dateDiff(date1, date2) {
    var result = {},
        rest = 0,
        msDiff = date1.getTime() - date2.getTime();
    
    if (msDiff > 0) {
        result.date = Math.floor(msDiff / (24 * 60 * 60 * 1000));
        rest = msDiff % (24 * 60 * 60 * 1000);
        result.hour = Math.floor(rest / (60 * 60 * 1000));
        rest = msDiff % (60 * 60 * 1000);
        result.minute = Math.floor(rest / (60 * 1000));
        rest = msDiff % (60 * 1000);
        result.second = Math.floor(rest / (1000));
        rest = msDiff % 1000;
    } else {
        rest = '已结束';
    }
    return result;
};









//获取指定key的hash值
function getHash(key, url) {
    var hash;
    if (!!url) {
        hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        hash = (hash == url) ? "" : hash;
    } else {
        hash = self.location.hash;
    }
    hash = "" + hash;
    hash = hash.replace(/^[?#]/, '');
    //console.log(hash);
    hash = "&" + hash;
    //console.log(hash);
    var val = hash.match(new RegExp("[\&]" + key + "=([^\&]+)", "i"));
    //console.log(val);
    if (val == null || val.length < 1) {
        return null;
    } else {
        return decodeURIComponent(val[1]);
    }
    
};

//弹窗验证
var Fcheck = {
    c_name : function(obj) {//检查用户名
        if(obj==''){
            jAlert.warn('请输入用户名');
            return false;
        }
        else if(!/^[0-9a-zA-Z_]+$/.test(obj)||obj.length < 6 || obj.length > 20){
            jAlert.error('用户名格式不正确');
            return false;
        }else{
            return true;
        }

    },
    c_realname : function(obj) {//检查真实姓名
        if(obj==''){
            jAlert.warn('请输入真实姓名');
            return false;
        }else if(/[^\u4e00-\u9fa5]/.test(obj)){
            jAlert.warn('真实姓名格式不正确');
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
                jAlert.error('身份证号码输入错误');
                return false;
            }
        } else if (icard.length == 18) {
            var a_idCard = icard.split("");
            if (isValidityBrithBy18IdCard(icard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                return true;
            } else {
                jAlert.error('身份证号码输入错误');
                return false;
            }
        } else {
            jAlert.error('身份证号码格式不正确');
            return false;
        }
    },
    c_password : function(obj) {//检查密码
        if(obj==''){
            jAlert.warn('请输入密码');
            return false;
        }
        else if(!/^[0-9a-zA-Z_]+$/.test(obj)||obj.length < 6 || obj.length > 20){
            jAlert.error('密码格式不正确');
            return false;
        }
        else{
            return true;
        }

    },
    c_phone : function(obj) {//检查手机号码
        if(obj==''){
            jAlert.warn('请输入手机号码');
            return false;
        }
        else if(!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(obj)){
            jAlert.error('手机号码格式不正确');
            return false;
        }
        else{
            return true;
        }

    },
    c_email : function(obj) {//检查邮箱
        if(obj==''){
            jAlert.warn('请输入邮箱号码');
            return false;
        }
        else if(!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i.test(obj)){
            jAlert.error('邮箱号码格式不正确');
            return false;
        }
        else{
            return true;
        }

    },
    c_emailcode : function(obj) {//检查邮箱验证码
        if(obj==''){
            jAlert.warn('请输入邮箱验证码');
            return false;
        }
        else{
            return true;
        }

    },
    c_code : function(obj) {//检查验证码
        if(obj==''){
            jAlert.warn('请输入验证码');
            return false;
        }
        else{
            return true;
        }

    },
    c_phonecode : function(obj) {//检查手机验证码
        if(obj==''){
            jAlert.warn('请输入手机验证码');
            return false;
        }
        else{
            return true;
        }

    },
    c_mony : function(obj) {//检查充值金额
        if(obj==''){
            jAlert.warn('请输入充值金额');
            return false;
        }else if(obj<10){
            jAlert.warn('充值金额不得低于10元');
            return false;
        }else if(!/^[0-9]+$|^[0-9]+\.[0-9]{1,2}$/i.test(obj)){
            jAlert.error('金额格式不正确');
            return false;
        }
        else{
            return true;
        }
    },
    c_poolmony : function(obj) {//检查充值金额
        if(obj==''){
            jAlert.warn('请输入充值金额');
            return false;
        }else if(!/^[0-9]+$|^[0-9]+\.[0-9]{1,2}$/i.test(obj)){
            jAlert.error('金额格式不正确');
            return false;
        }
        else{
            return true;
        }
    },
    t_mony : function(obj) {//检查提现金额
        if(obj==''||obj==0){
            jAlert.warn('请输入提现金额');
            return false;
        }else if(obj<3){
            jAlert.warn('提现金额不得低于3元');
            return false;
        }else if(!/^[0-9]+$|^[0-9]+\.[0-9]{1,2}$/i.test(obj)){
            jAlert.error('金额格式不正确');
            return false;
        }
        else{
            return true;
        }
    },
    t_poolmony : function(obj) {//检查提现金额
        if(obj==''||obj==0){
            jAlert.warn('请输入提现金额');
            return false;
        }else if(!/^[0-9]+$|^[0-9]+\.[0-9]{1,2}$/i.test(obj)){
            jAlert.error('金额格式不正确');
            return false;
        }
        else{
            return true;
        }
    },
    c_paypwd : function(obj) {//检查支付密码
        if(obj==''){
            jAlert.warn('支付密码不能为空');
            return false;
        }
        else{
            return true;
        }
    }

};


/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 * 
 * @param num
 *            数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}

/* JQuery 根据Class名称限制文本框只能输入数字和小数点后只能保留两位 */
function checkTextFoNumByClassName(className) {
	$("."+className).keyup(function() {
		//先把非数字的都替换掉，除了数字和. 
		$(this).val($(this).val().replace(/[^\d.]/g, "").
	    //只允许一个小数点              
	    replace(/^\./g, "").replace(/\.{2,}/g, ".").
	    //只能输入小数点后两位
	    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
	}).bind("paste", function() { // CTR+V事件处理
		//先把非数字的都替换掉，除了数字和. 
		$(this).val($(this).val().replace(/[^\d.]/g, "").
	    //只允许一个小数点              
	    replace(/^\./g, "").replace(/\.{2,}/g, ".").
	    //只能输入小数点后两位
	    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
	}).css("ime-mode", "disabled"); // CSS设置输入法不可用
}

/* JQuery 根据Id限制文本框只能输入数字和小数点后只能保留两位 */
function checkTextFoNumByTextId(textId) {
	$("#"+textId).keyup(function() {
		//先把非数字的都替换掉，除了数字和. 
		$(this).val($(this).val().replace(/[^\d.]/g, "").
	    //只允许一个小数点              
	    replace(/^\./g, "").replace(/\.{2,}/g, ".").
	    //只能输入小数点后两位
	    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
	}).bind("paste", function() { // CTR+V事件处理
		//先把非数字的都替换掉，除了数字和. 
		$(this).val($(this).val().replace(/[^\d.]/g, "").
	    //只允许一个小数点              
	    replace(/^\./g, "").replace(/\.{2,}/g, ".").
	    //只能输入小数点后两位
	    replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
	}).css("ime-mode", "disabled"); // CSS设置输入法不可用
}
