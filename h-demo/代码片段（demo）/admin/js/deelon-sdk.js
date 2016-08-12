
var user = {
    data: {},
    islogin: function() {
        user.load();
        return (user.data && user.data.id);
    },
    create: function(id, name, token, inviteCode,coverInviteCode, sex, photo, email, phone, account, realname,
            lastLoginTime, payChannel, certificationStatus, keepdays) {
        user.data.id = id;
        user.data.name = name;
        user.data.token = token;
        user.data.inviteCode = inviteCode;
        user.data.coverInviteCode = coverInviteCode;
        user.data.sex = sex;
        user.data.photo = photo;
        user.data.email = email;
        user.data.phone = phone;
        user.data.account = account;
        user.data.realname = realname;
        user.data.lastLoginTime = lastLoginTime;
        user.data.payChannel = payChannel;
        user.data.certificationStatus = certificationStatus;
        user.save(keepdays);
    },
    save: function(keepdays) {
        DataProvider.localStore.save("userSession", user.data, keepdays);
    },
    load: function() {
        // 取出cookie中的json对象
        user.data = DataProvider.localStore.get("userSession") || {};
    },
    del: function() {
        DataProvider.localStore.remove("userSession");
        user.data = {};
    }

};

$.ajaxSetup({//ajax全局配置
    beforeSend: function(xhr) {
        DeelonService.ajaxbeforeSend(xhr);
    },
    error:function(xhr, status, err){
        DeelonService.ajaxerror(xhr, status, err);
    }

});
var DeelonService = {
    // protocal: "http",
    site:location.origin,
    host: "",
    getApiConf: function(name) {
        return DeelonService[apiName] || {};
    },
    getApiUrl: function(apiName, sname, path) {

        var apiconf = DeelonService[apiName];
        if (apiconf) {
            var fullpath = DeelonService.protocal + "//" + apiconfi.host + "/"
                    + apiName + "/" + sname + path;
            return fullpath;
        } else {
            return "";
        }
    },
    ajax: function(url, type, params,callbacksuccess,callbackerror) {
        if(url.indexOf("?") != -1){
            var fullpath = DeelonService.host + url+"&_"+new Date().getTime();
        }else{
            var fullpath = DeelonService.host + url+"?_"+new Date().getTime();
        }
        //async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
        $.ajax({
            type: type,
            url: fullpath,
            data: params,
            dataType: "json",
            async:false,  //如果需要发送同步请求，请将此选项设置为 false。
            cache: false,
            beforeSend: function(xhr) {
                DeelonService.ajaxbeforeSend(xhr);
            },
            success: function(data) {
                callbacksuccess(data);
            },
            error: function(xhr, status, err) {
                callbackerror(xhr, status, err);
                 DeelonService.ajaxerror(xhr, status, err);
            }
        });
    },

    axse: function(url,type, params,callbacksuccess) {
        if(url.indexOf("?") != -1){
            var fullpath = DeelonService.host + url+"&_"+new Date().getTime();
        }else{
            var fullpath = DeelonService.host + url+"?_"+new Date().getTime();
        }
        $.ajax({
            type: type,
            url: fullpath,
            data: params,
            dataType: "json",
            async:false,     //同步
            success: function(data) {
                callbacksuccess(data);
            }
        });
    },
    
       ajaxAsync: function(url, method, datatype, params, callbacksuccess) {
        if (url.indexOf("?") !== -1) {
            var fullpath = DeelonService.host + url + "&_" + new Date().getTime();
        } else {
            var fullpath = DeelonService.host + url + "?_" + new Date().getTime();
        }
        $.ajax({
            type: method,
            url: fullpath,
            data: params,
            dataType: datatype,
            async: false, //同步
            success: function(data) {
                callbacksuccess(data);
            }
        });
    },

    ajaxbeforeSend: function(xhr) {
        if ( user != "" && typeof(user.data.token) != "undefined" ) {
            xhr.setRequestHeader('Token', user.data.token);
        }else{
            if(typeof(window._user) != "undefined"){
                user = window._user;
            }
            xhr.setRequestHeader('Token', user.data.token);
        }
    },
    ajaxerror: function(xhr, textStatus, errorThrown) {
        var state = xhr.status;
        if (state == 401) {//Token过去
            //user.del();
            //jAlert.info("会话超时，请重新登录",null,null,function(){
                Utils.gotoPage('index.html#page=login');
           // });
        }else if (state == 403) {//没有相应权限
            jAlert.warn('没有权限');
        }
        else if (xhr.status == 400 || xhr.status == 500) {
            var errDate=JSON.parse(xhr.responseText);
            jAlert.warn(errDate.msg);
        }

        //区别获得手机验证码时图形码
        var phonecode = $("#phonecodesrc").length;
        if(phonecode>0 && $("#phonecodesrc").is(":visible")){
            factory.getCode("#phonecodesrc");
        }else{
            var codesrclen = $("#codesrc").length;
            if(codesrclen>0 && $("#codesrc").is(":visible")){
                factory.getCode("#codesrc");
            }
        }
    },
    //加时间戳前要对URL加个判断，如果有?号就加&_=new Date().getTime()，否则?_=new Date().getTime()
    get: function(url, params, callback) {
        if(url.indexOf("?") != -1){
            var fullpath = DeelonService.host + url+"&_"+new Date().getTime();
        }else{
            var fullpath = DeelonService.host + url+"?_"+new Date().getTime();
        }
        $.getJSON(fullpath, params, function(data) {
            callback(data);
        });
    },
    put: function(url, params, callback) {
        var fullpath = DeelonService.host + url;
        DeelonService.ajax(fullpath, "PUT", params, function(data) {
            callback(data);
        });
    },
    putjSON: function(url, params, callback) {
        var fullpath = DeelonService.host + url;
        $.ajax({
            url: fullpath,
            type: 'PUT',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(params),
            success: function(data) {
                callback(data);
            }
        });
    },
    del: function(url, params, callback) {
        var fullpath = DeelonService.host + url;
        $.ajax({
            url: fullpath,
            type: 'DELETE',
            data: params,
            success: function(data) {
                callback(data);
            }
        });
    },
    //
    postjSON: function(url, params, callback) {
        var fullpath = DeelonService.host + url;
        $.ajax({
            url: fullpath,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(params),
            success: function(data) {
                callback(data);
            }
        });
    },
    post: function(url, params, callback) {
        var fullpath = DeelonService.host + url;
        $.ajax({
            url: fullpath,
            type: 'POST',
            data: params,
            success: function(data) {
                callback(data);
            }
        });
    },
    postInOneCallback: function(url, params, callback) {
        var fullpath = DeelonService.host + url;
        $.ajax({
            url: fullpath,
            type: 'POST',
            data: params,
            success: function(data) {
                callback(data);
            },
            error:function(xhr, status, err){
            	var errData = $.parseJSON(xhr.responseText);
                callback(errData);
            }
        });
    }
};
DeelonService.dlapi = {
    host: "192.168.16.11",
    prefix: "dlapi"

};
DeelonService.dlsys = {
    host: "192.168.16.11",
    prefix: "dlapi",
    apipaths: [{name: "", path: ""}]

};
DeelonService.dlbiz = {
    host: "192.168.16.11",
    prefix: "dlapi"
};


DeelonService.CMSService = {
    opt: {
        id: "",
        fullPath: "",
        deepin: 2
    },
    //获取资源
    list: function(params, callback) {
        var CMS = DeelonService.CMSService;
        var url = "/dlapi/cms/directory/list/resourses";

        var opts = {};
        $.extend(opts, CMS.opt, params);

        DeelonService.get(url, opts, callback);


    },
    //获取当前目录
    dir: function(params, callback) {
        var CMS = DeelonService.CMSService;
        var url = "/dlapi/cms/directory/list";

        var opts = {};
        $.extend(opts, CMS.opt, params);
        DeelonService.get(url, opts, callback);
    },

    //获取文章:如 “/内容管理/网站管理/P2P/协议/”
    article:function(url,callback){
        var url = "/dlapi/cms/article?id=&fullPath="+encodeURIComponent(url);
        DeelonService.get(url,null,callback);
    }


};