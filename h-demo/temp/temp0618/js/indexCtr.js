var p2p_user = {
    islogin : function() {
        var userislogin=$.cookie('userSession');
        if(userislogin){}else{
            var url=window.location.href;
            Utils.gotoPage('index.html#page=login?urlReturn='+url);
        }
    },
    login : function(obj,url) {
        $(obj).html("登录中").attr("disabled","disabled");
        DeelonService.ajax(url,'get',{},function(data){
            if (data && data.id) {
                user.create(data.id, data.name, data.token,
                    data.inviteCode,data.coverInviteCode,
                    data.sex, data.photo, data.email,
                    data.phone, data.account,
                    data.lastLoginTime, data.payChannel,
                    data.certificationStatus
                );
                var str=window.location.href;
                locationurl = str.split("?urlReturn=");
                var result=locationurl[1];
                if(result==''||result==undefined){
                    Utils.gotoPage('members.html#page=accout?bread=我的账户');
                }else{
                    Utils.gotoPage(result);
                }
                p2p_topBox.render();
                setLoginAuto();
            }else{
                $(obj).html("登录").removeAttr("disabled");
            }
        },function(xhr, status, err){
            $(obj).html("登录").removeAttr("disabled");
        });
    },
    logout : function(url, params) {
        //$.post(url, params, function(data) {
        //    user.del();
        //});
        user.del();
        Utils.gotoPage('index.html#page=login');
    }

};



var p2p_loginBox = {
    init:function(){
        var cookieValname = $.cookie(COOKIE_NAME);
        if (cookieValname) {
            $("#username").val($.cookie(COOKIE_NAME));
        }
        var cookieValpass = $.cookie(COOKIE_PASSWORD);
        if (cookieValpass) {
            $("#password").val($.cookie(COOKIE_PASSWORD));
        }
        $("#btn_login").click(function(e){
            e.preventDefault();
            var username = $.trim($('#username').val()),password = $.trim($('#password').val()),code = $.trim($("#code").val());
            if(!username){
                $("#username_tip").text("用户名为空！");
                $("#login_tip").text("");
                $("#username").focus();
                return
            }
            if(!password){
                $("#password_tip").text("密码为空！");
                $("#login_tip").text("");
                $("#password").focus();
                return
            }
            if(!code){
                $("#code_tip").text("验证码为空！");
                $("#login_tip").text("");
                $("#code").focus();
                return
            }
            var returnUrl='';
            var notifyUrl='';
            var url = '/dlsys/portal/sdk/user/login/'+username+'/'+password+'?returnUrl='+returnUrl+'&notifyUrl='+notifyUrl+'&checkNum='+code;
            p2p_user.login(this,url);
        });
        $("#username").blur(function(){
            if($.trim($(this).val())){
                $("#username_tip").text("");
            }
        });
        $("#password").blur(function(){
            if($.trim($(this).val())){
                $("#password_tip").text("");
            }
        });
        $("#code").blur(function(){
            if($.trim($(this).val())){
                $("#code_tip").text("");
            }
        });
    }
};

var COOKIE_NAME = 'COOKIE_NAME';
var COOKIE_PASSWORD = 'COOKIE_PASSWORD';
function setLoginAuto(){
    if($("#remerberme").is(":checked")){
        $.cookie(COOKIE_NAME, $("#username").val(), {
            path : '/',
            expires : 1
        });
        $.cookie(COOKIE_PASSWORD, $("#password").val(), {
            path : '/',
            expires : 1
        });
    }else{
        $.cookie('COOKIE_NAME', null, { expires: -1 });
        $.cookie('COOKIE_PASSWORD',null,{ expires: -1 });
    }
}


//弹出框
function showDialog(e, m, fn) {
    var wh = $(window).height();
    var t = $(e).css({ "z-index": 1002, "position": "fixed"});
    repositionDialog(t);
    $(window).resize(function() {
        repositionDialog(t);
    });

    showMask(m, function() { t.fadeIn(m && m.delay ? m.delay : 150, fn); }).dblclick(function() {
        hideDialog(e);
    });
}

function showMask(s, fn) {
    var c = { "opacity": 0.3, "bgcolor": "black", "delay": 150 };
    if (s) {
        if (s.opacity) c.opacity = s.opacity;
        if (s.bgcolor) c.bgcolor = s.bgcolor;
        if (s.delay) c.delay = s.delay;
    }
    if (!document.getElementById("maskDiv")) {
        var maskDiv = "<div id='maskDiv' style='display: none; width: 100%; height: " + $(document).height() + "px; ";
        maskDiv += "position: absolute; top: 0; left: 0; z-index: 1001; background-color: " + c.bgcolor + "; "
        maskDiv += "-moz-opacity: " + c.opacity + "; opacity: " + c.opacity + "; filter: alpha(opacity=" + c.opacity * 100 + ");'></div>";
        $("body").append(maskDiv);
    }
    return $("#maskDiv").fadeIn(c.delay, fn);
}

function repositionDialog(t) {
    t.css({
        "top": $(window).height() / 2 - t.outerHeight() / 2,
        "left": $(window).width() / 2 - t.outerWidth() / 2
    });
}

function hideDialog(e, fn) {
    $(e).fadeOut(150, function() {
        $("#maskDiv").fadeOut(150, function() {
            $(this).remove();
            if (typeof (fn)=="function") fn();
        });
    });
}

//我的账户--选项卡
function myTab(){
    $(".member_tab_menu  li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index=$(this).index();
        $(".member_tab_content > div").eq(index).show().siblings().hide();
    });
}
function toTab(i){
    $(".member_tab_menu  li").eq(i).addClass("active").siblings().removeClass("active");
    $(".member_tab_content > div").eq(i).show().siblings().hide();
}


//提示错误
function setErrorLable() {
    jQuery.validator.setDefaults({
        errorPlacement : function(error, element) {
            $(element).closest("form").find(
                "span[name='e-" + element.attr("id") + "']").append(error);

        }

    });

}

//解决页面发生跳转时，header nav 没有加上相应的active 样式问题
//如 在首页 “投资项目”点击“更多”按钮，头部导航条“我要理财”添加 active 样式
function  onhashchangeFn(){
    var url = location.hash;
    if(url.indexOf("?") >=0){url = url.split("?")[0];}
    var a =  url.replace('#', '');
    //alert(a);
    var li = $(".p2p_nav > .p2p_nav_li");
    li.each(function(){
        var h = $(this).find("a").attr("href").split("#")[1];
        if(h.indexOf("?") >= 0){h = h.split("?")[0];}
        if(a == h){
            li.removeClass("active");
            $(this).addClass("active");
        }
    });
    if(a=="page=main"){
        li.removeClass("active");
        li.eq(0).addClass("active");
    }else if(a=="page=showProjectDetail"){
        li.removeClass("active");
        li.eq(1).addClass("active");
    }
}
