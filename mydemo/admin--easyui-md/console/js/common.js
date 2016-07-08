var factory ={};
factory.url = {};     //定义统一url对象

factory.tempUrl="/dlbiz/p2p/";  //发布
//factory.tempUrl="/";     //本地调试
/*
 * 组件url
 * */
factory.url.userSelect="/dlapi/uc/user/list/infos";   //发布借款---选择会员

/*
 * p2purl
 * */
//----发布借款---
factory.url.addProjectForm=factory.tempUrl+"project";
factory.url.selectProduct=factory.tempUrl+"products/";  //选择产品

//-----所有借款------
factory.url.listTable=factory.tempUrl+"projects";
//所有借款--项目审核详情页
factory.url.audit=factory.tempUrl+"project/projectDetail";  //正在....审核信息
factory.url.identification=factory.tempUrl+"project/authentication"; //标的认证
factory.url.preliminaryAuditDB=factory.tempUrl+"projectRisk";    //设置担保
factory.url.bidOpen=factory.tempUrl+"project/open";    //设置开标时间
factory.url.flowDialogForm=factory.tempUrl+"project/flow";    //流标 和 批量流标
//所有借款--列表操作
factory.url.full=factory.tempUrl+"project/full";    //流标
factory.url.onekeySucceedProject=factory.tempUrl+"projects/onekeySucceedProject";    //一键满标
factory.url.onekeyFailedProject=factory.tempUrl+"projects/onekeyFailedProject";    //一键流标
//差：确认放款

//----贷后管理 post-lend------


//----债权转让 transfer------
factory.url.transferTable=factory.tempUrl+"transfer/transfers"; //所有债权转让
factory.url.transferDialog=factory.tempUrl+"transfer/transferCancel/"; //成交可批量 和撤销
//差：待放款审核、合同转让

//----提成管理 financial------
//提成记录审核
factory.url.trebateRecordsTable=factory.tempUrl+"trebateRecords/";
factory.url.trebateRecordsDialogForm=factory.tempUrl+"trebateRecord/audit/";    //提成记录修改和审核
factory.url.trebateRecordsDialog_M=factory.tempUrl+"trebateRecord/settlement";    //月度结算
//月度结算
factory.url.trebateMonthlysTable=factory.tempUrl+"trebateMonthlys/";    //月度结算
//差：查看、导出月结算和导出明细

$.ajaxSetup({
    error : function(xhr, status, err) {
        debugger;
        if (xhr.status == 400) {
            var errDate = $.parseJSON(xhr.responseText);
            var regx = /^{\w*}$/;
            if (regx.test(errDate.msg)) {
                MessageBox.info(errDate.msg);
            }
        }
        if (xhr.status == 405) {
            var errDate = $.parseJSON(xhr.responseText);
            MessageBox.info(errDate.msg);
        }

        if (xhr.status == 500) {
            var errDate = $.parseJSON(xhr.responseText);
            MessageBox.info(errDate.msg);
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

//定义全局对象--用于封装基于jquery和easyui组件的一些常用方法 lihongwen 2016/4/14
factory.httpGet = function(url,params,callback){
    $.get(url,params,function(data){
        callback(data);
    });
};
factory.getJSON =function(url,callback){
    $.getJSON(url,function(data){
        callback(data);
    });
};
//.done() 和 .fail()方法的功能，（从 jQuery 1.8 开始）允许底层被操纵
factory.httpPost = function(url,params,callback){
    $.ajax({
        type: "post",
        url: url,
        data: params,
        dataType: "json",
        cache:false   //不缓存
    }).done(function(data){
        callback(data);
    }).fail(function(data){
        callback(data);
    })
};

factory.httpPut = function(url,params,callback){
    $.ajax({
        url:url,
        type: 'PUT',
        data:params,
        success: function(data){
            callback(data);
        }
    });
};
factory.httpDel = function(url,params,callback){
    $.ajax({
        url:url,
        type: 'DELETE',
        data:params,
        success: function(data){
            callback(data);
        },
        error:function(data){
            callback(data);
        }
    });
};
//对话框 dialog
factory.dialog = function(id,url,options){
    var defaultVal = {
        title: '详情',
        width: 600,
        height: 450,
        closed: true,
        cache: false,
        modal: true
    };
    options = $.extend(defaultVal,options);
    options.href = url;
    return $(id).dialog(options);
};

factory.selYear = function(obj,Cyear){
    var Lastyear;
    var len=16; //select长度
    var selObj=document.getElementById(obj);
    var selIndex=parseInt(len)-1;
    var newOpt;
    var LY=Cyear-Lastyear;
    for (i=0;i<len;i++){
        if (selObj.options.length!=len){
            newOpt=document.createElement("OPTION");
            newOpt.text=Cyear-selIndex+i;
            newOpt.value=Cyear-selIndex+i;
            selObj.options.add(newOpt,i);
            if (selIndex==i) {
                Lastyear=newOpt.value
            }
        }else{
            selObj.options[i].text=parseInt(selObj.options[i].text)+LY;
            selObj.options[i].value=parseInt(selObj.options[i].value)+LY;
            if (selIndex==i) {
                Lastyear=selObj.options[i].value
            }
        }
    }
    selObj.selectedIndex=selIndex;
};
factory.deepCopy = function(p, c){
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

factory.CompareDate = function(startTime,endTime){
    return ((new Date(startTime.replace(/-/g,"\/"))) > (new Date(endTime.replace(/-/g,"\/"))));
};

factory.today = function(){
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = (today.getDate()) < 10 ? '0' + (today.getDate()) : (today.getDate());
    var hours = (today.getHours()) < 10 ? '0' + (today.getHours()) : (today.getHours());
    var minutes = (today.getMinutes()) < 10 ? '0' + (today.getMinutes()) : (today.getMinutes());
    var seconds = (today.getSeconds()) < 10 ? '0' + (today.getSeconds()) : (today.getSeconds());
    return year +"-"+ month +"-"+ day +" "+ hours+":" + minutes+":" + seconds;
};

factory.show= function(obj){
    var msg = obj.msg? obj.msg:"提交成功！";
    $.messager.show({
        title:'提示',
        msg:msg,
        timeout:5000,
        showType:'slide'
    });
};

factory.info= function(info){
    $.messager.show({
        title:'提示',
        msg:info,
        timeout:5000,
        showType:'slide'
    });
};
factory.num = function(th){
    var reg = /^[0-9]{0}([0-9]|[.])+$/;
    if(reg.test(th.value)!=true){th.value="";}
};

//header及sidebaar 切换class
function changeClass(elem,className,num){
    $(elem).eq(num).addClass(className);
    $(elem).click(function(){
        $(elem).removeClass(className);
        $(this).addClass(className);
    });
}

var mainTab = {
    //打开tab选项卡
    addTab: function(title, url,refresh) {
        if ($('#mainTab').tabs('exists', title)) {
            $('#mainTab').tabs('select', title);
            if(refresh && typeof refresh ==="boolean"){
                var tab = $('#mainTab').tabs('getSelected');
                tab.panel('refresh', url);  //重新加载
            }
        } else {
            $('#mainTab').tabs('add', {
                title: title,
                href: url,
                closable: true
            });
        }
    },
    //几个关闭事件的实现
    CloseTab:function(menu,type){
        var curTabTitle = $(menu).data("tabTitle");
        var tabs = $("#mainTab");
        if(type === "close"){
            tabs.tabs("close",curTabTitle);
            return;
        }
        var allTabs = tabs.tabs("tabs");
        var closeTabsTitle = [];
        $.each(allTabs,function(){
            var opt = $(this).panel("options");
            if(opt.closable && opt.title != curTabTitle && type === "Other"){
                closeTabsTitle.push(opt.title);
            }else if(opt.closable && type === "All"){
                closeTabsTitle.push(opt.title);
            }
        });
        for(var i = 0;i<closeTabsTitle.length;i++){
            tabs.tabs("close",closeTabsTitle[i]);
        }
    }
};
//绑定tabs的右键菜单
$("#mainTab").tabs({
    onContextMenu:function(e,title){
        e.preventDefault();
        if(title != "首页"){
            $('#tabsMenu').menu('show', {
                left: e.pageX,
                top: e.pageY
            }).data("tabTitle",title);
        }
    }
});
//实例化menu的onClick事件
$("#tabsMenu").menu({
    onClick:function(item){
        console.log(item);
        mainTab.CloseTab(this,item.name);
    }
});


/*
 * 扩展easyui validatebox的两个方法.移除验证和还原验证
 *  $('#minInvest1').textbox({required:false});
 *  $('#cmid').combo({required:false});
 * */
$.extend($.fn.validatebox.methods, {
    remove: function(jq, newposition){
        return jq.each(function(){
            $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus').unbind('blur');
        });
    },
    reduce: function(jq, newposition){
        return jq.each(function(){
            var opt = $(this).validatebox.options;
            $(this).addClass("validatebox-text").validatebox(opt);
        });
    }
});

/**
 * layout方法扩展
 * @param {Object} jq
 * @param {Object} region
 */
$.extend($.fn.layout.methods, {
    /**
     * 面板是否存在和可见
     * @param {Object} jq
     * @param {Object} params
     */
    isVisible: function(jq, params) {
        var panels = $.data(jq[0], 'layout').panels;
        var pp = panels[params];
        if(!pp) {
            return false;
        }
        if(pp.length) {
            return pp.panel('panel').is(':visible');
        } else {
            return false;
        }
    },
    /**
     * 隐藏除某个region，center除外。
     * @param {Object} jq
     * @param {Object} params
     */
    hidden: function(jq, params) {
        return jq.each(function() {
            var opts = $.data(this, 'layout').options;
            var panels = $.data(this, 'layout').panels;
            if(!opts.regionState){
                opts.regionState = {};
            }
            var region = params;
            function hide(dom,region,doResize){
                var first = region.substring(0,1);
                var others = region.substring(1);
                var expand = 'expand' + first.toUpperCase() + others;
                if(panels[expand]) {
                    if($(dom).layout('isVisible', expand)) {
                        opts.regionState[region] = 1;
                        panels[expand].panel('close');
                    } else if($(dom).layout('isVisible', region)) {
                        opts.regionState[region] = 0;
                        panels[region].panel('close');
                    }
                } else {
                    panels[region].panel('close');
                }
                if(doResize){
                    $(dom).layout('resize');
                }
            };
            if(region.toLowerCase() == 'all'){
                hide(this,'east',false);
                hide(this,'north',false);
                hide(this,'west',false);
                hide(this,'south',true);
            }else{
                hide(this,region,true);
            }
        });
    },
    /**
     * 显示某个region，center除外。
     * @param {Object} jq
     * @param {Object} params
     */
    show: function(jq, params) {
        return jq.each(function() {
            var opts = $.data(this, 'layout').options;
            var panels = $.data(this, 'layout').panels;
            var region = params;

            function show(dom,region,doResize){
                var first = region.substring(0,1);
                var others = region.substring(1);
                var expand = 'expand' + first.toUpperCase() + others;
                if(panels[expand]) {
                    if(!$(dom).layout('isVisible', expand)) {
                        if(!$(dom).layout('isVisible', region)) {
                            if(opts.regionState[region] == 1) {
                                panels[expand].panel('open');
                            } else {
                                panels[region].panel('open');
                            }
                        }
                    }
                } else {
                    panels[region].panel('open');
                }
                if(doResize){
                    $(dom).layout('resize');
                }
            };
            if(region.toLowerCase() == 'all'){
                show(this,'east',false);
                show(this,'north',false);
                show(this,'west',false);
                show(this,'south',true);
            }else{
                show(this,region,true);
            }
        });
    }
});

/*
 * zxxFile.js 基于HTML5 文件上传的核心脚本 http://www.zhangxinxu.com/wordpress/?p=1923
 */
var ZXXFILE = {
    fileInput: null,				//html file控件
    dragDrop: null,					//拖拽敏感区域
    upButton: null,					//提交按钮
    url: "",						//ajax地址
    fileFilter: [],					//过滤后的文件数组
    filter: function(files) {		//选择文件组的过滤方法
        return files;
    },
    onSelect: function() {},		//文件选择后
    onDelete: function() {},		//文件删除后
    onDragOver: function() {},		//文件拖拽到敏感区域时
    onDragLeave: function() {},	//文件离开到敏感区域时
    onProgress: function() {},		//文件上传进度
    onSuccess: function() {},		//文件上传成功时
    onFailure: function() {},		//文件上传失败时,
    onComplete: function() {},		//文件全部上传完毕时

    /* 开发参数和内置方法分界线 */

    //文件拖放
    funDragHover: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
        return this;
    },
    //获取选择文件，file控件或拖放
    funGetFiles: function(e) {
        // 取消鼠标经过样式
        this.funDragHover(e);

        // 获取文件列表对象
        var files = e.target.files || e.dataTransfer.files;
        //继续添加文件
        this.fileFilter = this.fileFilter.concat(this.filter(files));
        this.funDealFiles();
        return this;
    },

    //选中文件的处理与回调
    funDealFiles: function() {
        for (var i = 0, file; file = this.fileFilter[i]; i++) {
            //增加唯一索引值
            file.index = i;
        }
        //执行选择回调
        this.onSelect(this.fileFilter);
        return this;
    },

    //删除对应的文件
    funDeleteFile: function(fileDelete) {
        var arrFile = [];
        for (var i = 0, file; file = this.fileFilter[i]; i++) {
            if (file != fileDelete) {
                arrFile.push(file);
            } else {
                this.onDelete(fileDelete);
            }
        }
        this.fileFilter = arrFile;
        return this;
    },

    //文件上传
    funUploadFile: function() {
        var self = this;
        if (location.host.indexOf("sitepointstatic") >= 0) {
            //非站点服务器上运行
            return;
        }
        for (var i = 0, file; file = this.fileFilter[i]; i++) {
            (function(file) {
                var xhr = new XMLHttpRequest();
                if (xhr.upload) {
                    // 上传中
                    xhr.upload.addEventListener("progress", function(e) {
                        self.onProgress(file, e.loaded, e.total);
                    }, false);

                    // 文件上传成功或是失败
                    xhr.onreadystatechange = function(e) {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                self.onSuccess(file, xhr.responseText);
                                self.funDeleteFile(file);
                                if (!self.fileFilter.length) {
                                    //全部完毕
                                    self.onComplete();
                                }
                            } else {
                                self.onFailure(file, xhr.responseText);
                            }
                        }
                    };

                    // 开始上传
                    xhr.open("POST", self.url, true);
                    xhr.setRequestHeader("X_FILENAME", file.name);
                    xhr.send(file);
                }
            })(file);
        }

    },

    init: function() {
        var self = this;

        if (this.dragDrop) {
            this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
            this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
            this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
        }

        //文件选择控件选择
        if (this.fileInput) {
            this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); }, false);
        }

        //上传按钮提交
        if (this.upButton) {
            this.upButton.addEventListener("click", function(e) { self.funUploadFile(e); }, false);
        }
    }
};
