var factory = {};
factory.url = {};     // 定义统一url对象

// factory.tempUrl="/p2p/"; //发布
factory.tempUrl = "/dlbiz/p2p/";     // 本地调试
//积分商城
factory.marketUrl = "/dlsys/market/"


/*
 * 组件url
 */
factory.url.userSelect = "/dlapi/uc/user/list/infos";   // 发布借款---选择会员


//获取字典值
factory.url.getSysDic = factory.tempUrl + "common/getSysDic";


$.ajaxSetup({//ajax全局配置
    beforeSend: function (xhr) {
        if(op.data.token){
            xhr.setRequestHeader('Token', op.data.token);
        }
    },
    complete:function(xhr, status){
        if(xhr.status == 401){
            UnauthorizedFn();
        }
        if (xhr.status == 400) {
            var errDate = $.parseJSON(xhr.responseText);
            if(errDate.code == 2000 || errDate.code == "2000"){
                if(errDate.result){
                    if(typeof errDate.result =="object"){
                        var result = errDate.result;
                    }else{
                        var result = $.parseJSON(errDate.result);
                    }
                    var msg = '';
                    for(var k in result){
                        msg += result[k]+"<br>";
                    }
                    MessageBox.info(msg);
                }else{
                    MessageBox.info(errDate.msg);
                }


            }else{
                MessageBox.info(errDate.msg);
            }

        }
        if (xhr.status == 500) {
            if($("div.panel.window.messager-window").length == 0){
                MessageBox.info("服务器繁忙，请稍后再试");
            }
        }
    }
});


function UnauthorizedFn(){
    if($("div.panel.window.messager-window").length == 0){
        $.messager.alert('提示','登录超时，请重新登录','info',function(){
            op.del();
            Utils.gotoPage('login.html');
        });
    }
}

var MessageBox = {
    info: function(info) {
        $.messager.alert('提示', info, 'info');

    },
    warn: function(info) {
        $.messager.alert('警告', info, 'warn');

    },
    confirm: function(info, callback, params) {
        $.messager.confirm('提示', info, function(r) {
            if (r && callback) {
                callback(params);
            }
        });
    },
    showProgress: function(info) {
        $.messager.progress({
            title: '请稍后...',
            msg: info
        });

    },
    hideProgress: function() {
        $.messager.progress('close');
    }

};

factory.httpGet = function(url, params, callback) {
    if(url.indexOf("?") != -1){
        var fullpath = url+"&_"+new Date().getTime();
    }else{
        var fullpath = url+"?_"+new Date().getTime();
    }
    $.get(fullpath, params, function(data) {
        callback(data);
    });
};
factory.getJSON = function(url, callback) {
    if(url.indexOf("?") != -1){
        var fullpath = url+"&_"+new Date().getTime();
    }else{
        var fullpath = url+"?_"+new Date().getTime();
    }
    $.getJSON(fullpath, function(data) {
        callback(data);
    });
};

factory.httpPost = function(url, params, callback) {
    $.ajax({
        url: url,
        type: 'post',
        data: params,
        success: function(data) {
            callback(data);
        }
    });
};

factory.httpJsonPost = function(url, params, callback) {
    $.ajax({
        url: url,
        type: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(params),
        success: function(data) {
            callback(data);
        }
    });
};
factory.httpJsonPut = function(url, params, callback) {
    $.ajax({
        url: url,
        type: 'PUT',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(params),
        success: function(data) {
            callback(data);
        }
    });
};

factory.httpPut = function(url, params, callback) {
    $.ajax({
        url: url,
        type: 'PUT',
        data: params,
        success: function(data) {
            callback(data);
        }
    });
};
factory.httpDel = function(url, params, callback) {
    $.ajax({
        url: url,
        type: 'DELETE',
        data: params,
        success: function(data) {
            callback(data);
        },
        error: function(data) {
            callback(data);
        }
    });
};

factory.axse = function(url, params,callbacksuccess) {
    $.ajax({
        type: "GET",
        url: url,
        data: params,
        dataType: "json",
        async:false,     //同步
        success: function(data) {
            callbacksuccess(data);
        }
    });
};

factory.ajaxAsync =  function(url, method, datatype, params, callbacksuccess) {
    if (url.indexOf("?") !== -1) {
        var fullpath = url + "&_" + new Date().getTime();
    } else {
        var fullpath = url + "?_" + new Date().getTime();
    }
    $.ajax({
        type: method,
        url: fullpath,
        data: params,
        dataType: datatype,
        async: false, //同步
        success: function (data) {
            callbacksuccess(data);
        }
    });
};
// 对话框 dialog
factory.dialog = function(id, url, options) {
    var defaultVal = {
        title: '详情',
        width: 600,
        height: 450,
        closed: true,
        cache: false,
        modal: true
    };
    options = $.extend(defaultVal, options);
    options.href = url;
    return $(id).dialog(options);
};

factory.selYear = function(obj, Cyear) {
    var Lastyear;
    var len = 16; // select长度
    var selObj = document.getElementById(obj);
    var selIndex = parseInt(len) - 1;
    var newOpt;
    var LY = Cyear - Lastyear;
    for (i = 0; i < len; i++) {
        if (selObj.options.length != len) {
            newOpt = document.createElement("OPTION");
            newOpt.text = Cyear - selIndex + i;
            newOpt.value = Cyear - selIndex + i;
            selObj.options.add(newOpt, i);
            if (selIndex == i) {
                Lastyear = newOpt.value
            }
        } else {
            selObj.options[i].text = parseInt(selObj.options[i].text) + LY;
            selObj.options[i].value = parseInt(selObj.options[i].value) + LY;
            if (selIndex == i) {
                Lastyear = selObj.options[i].value
            }
        }
    }
    selObj.selectedIndex = selIndex;
};


factory.CompareDate = function(startTime, endTime) {
    return ((new Date(startTime.replace(/-/g, "\/"))) > (new Date(endTime.replace(/-/g, "\/"))));
};

factory.today = function() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
    var hours = (today.getHours()) < 10 ? '0' + (today.getHours()) : (today.getHours());
    var minutes = (today.getMinutes()) < 10 ? '0' + (today.getMinutes()) : (today.getMinutes());
    var seconds = (today.getSeconds()) < 10 ? '0' + (today.getSeconds()) : (today.getSeconds());
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
};

factory.show = function(obj) {
    var msg = obj.msg ? obj.msg : "提交成功！";
    $.messager.show({
        title: '提示',
        msg: msg,
        timeout: 5000,
        showType: 'slide'
    });
};

factory.info = function(info) {
    $.messager.show({
        title: '提示',
        msg: info,
        timeout: 5000,
        showType: 'slide'
    });
};
factory.num = function(th) {
    var reg = /^[0-9]{0}([0-9]|[.])+$/;
    if (reg.test(th.value) != true) {
        th.value = "";
    }
};

// header及sidebaar 切换class
function changeClass(elem, className, num) {
    $(elem).eq(num).addClass(className);
    $(elem).click(function() {
        $(elem).removeClass(className);
        $(this).addClass(className);
    });
}


function TabCtrl(options) {

    this.createCtrl(options);
}


TabCtrl.prototype.createCtrl = function(options) {
    var self = this;

    $.extend(self, {
        parent: 'contents',
        tabs: 'content-tabs'
    });
    $.extend(self, options);

    var parent = $('#' + self.parent);
    parent.empty();

    var tabs = '<div id=' + self.tabs + ' class="easyui-tabs" fit="true" border="false"></div>';
    parent.append(tabs);

    $('#' + this.tabs).tabs();

    self.count = 0;
};

TabCtrl.prototype.addTab = function(options) {

    var tab = $('#' + this.tabs).tabs('getTab', options.title);
    if (!tab) {
        $('#' + this.tabs).tabs('add', {
            title: options.title,
            content: (options.content ? options.content : ''),
            closable: true
        });

        this.count++;

        $('#' + this.tabs).tabs("select", options.title);



    }


    $('#' + this.tabs).tabs("select", options.title);

    if (options.init) {
        var panel = $('#' + this.tabs).tabs('getTab', options.title);
        options.init(panel, options.params);
    }


};


function GetRequest(url) { 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substring(url.indexOf("?")+1,url.length);
		if(url.indexOf("&") != -1){
			strs = str.split("&"); 
			for(var i = 0; i < strs.length; i ++) { 
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
			} 
		}else{
			strs = str.split("="); 
			theRequest[strs[0]]=unescape(strs[1]); 
		}
	} 
	return theRequest; 
} 



$.extend($.fn.validatebox.methods, {
    remove: function(jq, newposition) {
        return jq.each(function() {
            $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus').unbind('blur');
        });
    },
    reduce: function(jq, newposition) {
        return jq.each(function() {
            var opt = $(this).validatebox.options;
            $(this).addClass("validatebox-text").validatebox(opt);
        });
    }
});

/**
 * layout方法扩展
 * 
 * @param {Object}
 *            jq
 * @param {Object}
 *            region
 */
$.extend($.fn.layout.methods, {
    /**
	 * 面板是否存在和可见
	 * 
	 * @param {Object}
	 *            jq
	 * @param {Object}
	 *            params
	 */
    isVisible: function(jq, params) {
        var panels = $.data(jq[0], 'layout').panels;
        var pp = panels[params];
        if (!pp) {
            return false;
        }
        if (pp.length) {
            return pp.panel('panel').is(':visible');
        } else {
            return false;
        }
    },
    /**
	 * 隐藏除某个region，center除外。
	 * 
	 * @param {Object}
	 *            jq
	 * @param {Object}
	 *            params
	 */
    hidden: function(jq, params) {
        return jq.each(function() {
            var opts = $.data(this, 'layout').options;
            var panels = $.data(this, 'layout').panels;
            if (!opts.regionState) {
                opts.regionState = {};
            }
            var region = params;
            function hide(dom, region, doResize) {
                var first = region.substring(0, 1);
                var others = region.substring(1);
                var expand = 'expand' + first.toUpperCase() + others;
                if (panels[expand]) {
                    if ($(dom).layout('isVisible', expand)) {
                        opts.regionState[region] = 1;
                        panels[expand].panel('close');
                    } else if ($(dom).layout('isVisible', region)) {
                        opts.regionState[region] = 0;
                        panels[region].panel('close');
                    }
                } else {
                    panels[region].panel('close');
                }
                if (doResize) {
                    $(dom).layout('resize');
                }
            }
            ;
            if (region.toLowerCase() == 'all') {
                hide(this, 'east', false);
                hide(this, 'north', false);
                hide(this, 'west', false);
                hide(this, 'south', true);
            } else {
                hide(this, region, true);
            }
        });
    },
    /**
	 * 显示某个region，center除外。
	 * 
	 * @param {Object}
	 *            jq
	 * @param {Object}
	 *            params
	 */
    show: function(jq, params) {
        return jq.each(function() {
            var opts = $.data(this, 'layout').options;
            var panels = $.data(this, 'layout').panels;
            var region = params;

            function show(dom, region, doResize) {
                var first = region.substring(0, 1);
                var others = region.substring(1);
                var expand = 'expand' + first.toUpperCase() + others;
                if (panels[expand]) {
                    if (!$(dom).layout('isVisible', expand)) {
                        if (!$(dom).layout('isVisible', region)) {
                            if (opts.regionState[region] == 1) {
                                panels[expand].panel('open');
                            } else {
                                panels[region].panel('open');
                            }
                        }
                    }
                } else {
                    panels[region].panel('open');
                }
                if (doResize) {
                    $(dom).layout('resize');
                }
            }
            ;
            if (region.toLowerCase() == 'all') {
                show(this, 'east', false);
                show(this, 'north', false);
                show(this, 'west', false);
                show(this, 'south', true);
            } else {
                show(this, region, true);
            }
        });
    }
});



var uploadFile = {
    upload: function(ele, uploadUrl, updataUrl, paramName, ev, updata, param, fileExtensions) {
        $(ele).uploadFile({
            url: uploadUrl,
            autoUpload: true,
            permitDuplicate: true,//允许上传重复文件
            maxHeight: 400,
            previewId: 'fileId',
            fileExtensions: fileExtensions,
            fileUploaded: function(obj) {// 文件上传成功时回调的方法
                var str = '{"' + paramName + '" :' + obj.rspJson[0].id + ',"fileName":"'+obj.rspJson[0].resName+'","fullPath":"'+obj.rspJson[0].fullPath+'"}';
                var params = JSON.parse(str);
                if (param != null && param != '') {

                    $.extend(param, params);

                    params = param;

                }
                ev(params);
            }
        });

    }
};

var __jsessionId = '<%=session.getId() %>';

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 * 
 * @param num
 *            数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
var formatCurrency = {
    formatCurrency: function(num) {
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
}

//时间格式化 add by luyang
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    	for (var k in o)
    		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//dataGrid 加title显示
function dataGridFormatterTitle(value,row,index){
    return '<span title="'+value+'">'+value+'</span>';

}

//对于时间，只显示到分--针对datagrid表格时间截取
var dataGridChangeTime = function(value,row,index){
    if(value && value.length > 18 &&  value.indexOf(":") > -1){
        return value.substring(0,value.lastIndexOf(":"));
    }else{
        return value;
    }
}


//引用 DeelonService封装公共方法
var DeelonService = {
    site:location.origin,
    host: "",
    ajax: function(url, type, params,callbacksuccess,callbackerror) {
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