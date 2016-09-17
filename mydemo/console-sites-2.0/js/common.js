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



/*
 * p2purl
 */
// ----发布借款---
factory.url.addProjectForm = factory.tempUrl + "project";
factory.url.addProductForm = factory.tempUrl + "product";// 保存产品详情
factory.url.selectProduct = factory.tempUrl + "products";  // 查询产品列表
factory.url.selectLoanPrepareDatas = factory.tempUrl + "product/loanPrepareDatas";// 查询申请指南
factory.url.selectLoanAppGuides = factory.tempUrl + "product/loanAppGuides";  // 查询认证资料
factory.url.getProduct = factory.tempUrl + "product/";  // 查询产品详情
factory.url.uploadFile = factory.tempUrl + "resources/uploadFile";  // 查询产品详情
factory.url.uploadCheditor = factory.tempUrl + "resources/uploadCheditor";  // 富文本上传图片
factory.url.previewFile = factory.tempUrl + "resources/previewFile/";  // 查看图片
factory.url.delProduct = factory.tempUrl + "product/";  // 删除产品

// -----所有借款------
factory.url.listTable = factory.tempUrl + "projects";
factory.url.getRefundedLoanTable = factory.tempUrl + "project/getRefundedLoan"; // 获取待退款投资记录
factory.url.projectInvests = factory.tempUrl + "projects/projectInvests"//借款投资记录
// -----体验标------
factory.url.experienceTable = factory.tempUrl + "projects";//发布体验标
// 所有借款--项目审核详情页
factory.url.audit = factory.tempUrl + "project/projectDetail";
factory.url.identification = factory.tempUrl + "project/authentication"; // 标的认证
factory.url.preliminaryAuditDB = factory.tempUrl + "projectRisk";    // 设置担保
factory.url.bidOpen = factory.tempUrl + "project/open";    // 设置开标时间
factory.url.flowDialogForm = factory.tempUrl + "project/flow";    // 流标 和 批量流标
factory.url.canApplyLoanJudgeDesc = factory.tempUrl + "project/canApplyLoanJudgeDesc";    // 校验借款条件及返回描述
// 所有借款--列表操作
factory.url.full = factory.tempUrl + "project/full";    // 流标
factory.url.onekeySucceedProject = factory.tempUrl + "projects/onekeySucceedProject";    // 一键满标
factory.url.onekeyFailedProject = factory.tempUrl + "projects/onekeyFailedProject";    // 一键流标
// 设置特推项目
factory.url.setRecommendProject = factory.tempUrl + "projects/setRecommendProject";
// 发布披露信息
factory.url.releaseInfoDisclosure = factory.tempUrl + "project/releaseInfoDisclosure";
// 确认放款
factory.url.payLoanTable = factory.tempUrl + "project/payLoanPage"; // 获取投资记录列表
factory.url.auditLoan = factory.tempUrl + "audit/auditLoan"; // 放款审核
factory.url.validAuditLoan = factory.tempUrl + "audit/judgeProjectIsCanAudit"; // 校验放款审核

// 收益计算器
factory.url.profitCalculation = factory.tempUrl + "project/profitCalculation";

//----贷后管理 post-lend------
factory.url.projectList = factory.tempUrl + "projects";//项目列表
factory.url.overdueTable  = factory.tempUrl + "projectRepayment/getAllRepaymentOverdue";//逾期还款
factory.url.overdueList =  factory.tempUrl + "projectRepayment/repaymentDetailPage";//垫付还款
factory.url.repaymentDtailList =  factory.tempUrl + "projectRepayment/getAllRepaymentDtail";//所有还款明细
factory.url.advanceRepaymentDetail =  factory.tempUrl + "projectRepayment/advanceRepaymentPage";//垫付明细界面
factory.url.advanceRepayLoan = factory.tempUrl + "projectRepayment/advanceRepayLoan";//逾期垫付
factory.url.repaymentList  = factory.tempUrl + "projectRepayment";//还款计划列表
factory.url.uncollectedList  = factory.tempUrl + "projects/getUncollectedProject";//待收款借款列表
factory.url.repayRemind = factory.tempUrl + "projectRepayment/repayRemind";//还款提醒
factory.url.checkCanAdvanceRepayLoan = factory.tempUrl + "projectRepayment/checkCanAdvanceRepayLoan";//还款提醒
factory.url.loanContract = factory.tempUrl + "project/contracts/1,2"; //借款合同-协议

//系统设置
factory.url.loanConditions = factory.tempUrl + "loanCondition/all";//借款条件列表
factory.url.conditionSaveOrUpdate = factory.tempUrl + "loanCondition/saveOrUpdate";//保存更新借款条件
factory.url.getLoanCondition = factory.tempUrl + "loanCondition/getLoanCondition";//获取借款条件
factory.url.delLoanCondition =  factory.tempUrl + "loanCondition/del";//删除借款条件
factory.url.auditmats = factory.tempUrl + "auditMaterials/all";//认证资料列表
factory.url.auditmatSaveOrUpdate = factory.tempUrl + "auditMaterials/saveOrUpdate";//保存更新认证资料列表
factory.url.delAuditmat = factory.tempUrl + "auditMaterials/del";//删除认证资料列表
factory.url.getAuditmat = factory.tempUrl + "auditMaterials/getAuditMaterials";//获取借款条件
factory.url.imgUpload = factory.tempUrl + "tProjectMaterials";//借款项目附件列表
factory.url.imgDelete = factory.tempUrl + "resources/delProject";//项目资料删除操作
factory.url.imgPreview = factory.tempUrl + "resources/previewProject";//项目资料预览操作
factory.url.tuserAuditmatUploads = factory.tempUrl + "tuserAuditmatUpload/tuserAuditmatUploadsAndOther";//认证资料文件上传列表
factory.url.userAuditmats = factory.tempUrl + "/resources/userAuditmats";//审核认证资料审核列表
factory.url.getUserAuditmat = factory.tempUrl + "/resources/getUserAuditmat";//获取认证资料审核对象

factory.url.tuserAuditmatUploads = factory.tempUrl + "/tuserAuditmatUpload/tuserAuditmatUploads";//上传认证资料列表
factory.url.previewTication = factory.tempUrl + "/resources/previewTication";//预览认证资料
factory.url.getOperators = factory.tempUrl + "/resources/getOperators";//获取所有操作员
factory.url.checkUserAuditmats = factory.tempUrl + "/resources/checkUserAuditmats";//审核认证资料
factory.url.getAuditMaterialsByName = factory.tempUrl + "auditMaterials/getAuditMaterialsByName";//根据名称获取借款条件

// ----债权转让 transfer------
factory.url.transferTable = factory.tempUrl + "transfer/transfers"; // 所有债权转让
factory.url.transferDialog = factory.tempUrl + "transfer/transferCancel"; // 成交可批量
factory.url.transferRefoundTabel = factory.tempUrl + "transfer/refoundedTransfer"; // 债权退款列表
factory.url.transferRefoundDialog = factory.tempUrl + "audit/audiTrefunded"; // 债权退款操作
factory.url.transferRefoundCheckDialog = factory.tempUrl + "audit/judgeTrefundedIsCanAudit"; // 债权退款操作数据校验


// --- 业务设置-------
factory.url.riskCompanyTable = factory.tempUrl + "project/riskCompanylist"; //担保方列表
factory.url.riskCompanyDel = factory.tempUrl + "project/riskCompanyDel"; //担保方删除
factory.url.riskCompanyAddOrUpdate = factory.tempUrl + "project/riskCompanyAddOrUpdate"; //担保方新增
factory.url.riskCompanyGet = factory.tempUrl + "project/riskCompanyGet"; //获取担保方信息


																			// 和撤销
//----债权竞拍 tprojectAuction------
factory.url.transferBiddingDetail = factory.tempUrl + "tprojectAuction/transferBiddingDetail";//竞拍明细

// 差：待放款审核、合同转让
factory.url.transferContract = factory.tempUrl + "project/contracts/7"; //债权合同

// ----提成管理 financial------
// 提成记录审核
factory.url.trebateRecordsTable = factory.tempUrl + "trebateRecords/";
factory.url.trebateRecordsById = factory.tempUrl + "trebateRecords/trebateRecordsById";
factory.url.trebateRecordsDialogForm = factory.tempUrl + "trebateRecord/audit/";    // 提成记录修改和审核
factory.url.trebateRecordsDialog_M = factory.tempUrl + "trebateRecord/settlement";    // 月度结算
// 月度结算
factory.url.trebateMonthlysTable = factory.tempUrl + "trebateMonthlys/";    // 月度结算
factory.url.trebateMonthlysLoan = factory.tempUrl + "trebateMonthlys/loan"; //月结放款
// 差：查看、导出月结算和导出明细
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
            var errDate = $.parseJSON(xhr.responseText);
            MessageBox.info("服务器繁忙，请稍后再试");
        }
    }
});


function UnauthorizedFn(){
    if($("div.panel.window.messager-window").length == 0){
        $.messager.confirm('提示', "登录过期，请重新登录！", function(r) {
            if (r) {
                op.del();
                Utils.gotoPage('login.html');
            }else{
                $(".messager-window,.window-shadow,.window-mask").remove();
            }
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

// 定义全局对象--用于封装基于jquery和easyui组件的一些常用方法 lihongwen 2016/4/14
factory.httpGet = function(url, params, callback) {
    $.get(url, params, function(data) {
        callback(data);
    });
};
factory.getJSON = function(url, callback) {
    $.getJSON(url, function(data) {
        callback(data);
    });
};
// .done() 和 .fail()方法的功能，（从 jQuery 1.8 开始）允许底层被操纵
factory.httpPost = function(url, params, callback) {
    $.ajax({
        type: "post",
        url: url,
        data: params,
        dataType: "json",
        cache: false   // 不缓存
    }).done(function(data) {
        callback(data);
    }).fail(function(data) {
        callback(data);
    })
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
},

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
factory.deepCopy = function(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
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

//var mainTab = {
//    tabContrl: new TabCtrl({parent: 'main'}),
//    addTab: function(title, url, refresh) {
//        mainTab.tabContrl.addTab({title: title, init: function(panel, params) {
//        	panel.load(url);
//        }});
//    }
//
//};

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
            maxHeight: 400,
            previewId: 'fileId',
            fileExtensions: fileExtensions,
            fileUploaded: function(obj) {// 文件上传成功时回调的方法
                var str = '{"' + paramName + '" :' + obj.rspJson.result[0].id + ',"fileName":"'+obj.rspJson.result[0].resName+'","fullPath":"'+obj.rspJson.result[0].fullPath+'"}';
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