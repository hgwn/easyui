
//选择借款产品
var selectProduct = {
    url:factory.url.selectProduct,
    //url:"/products/",
    rootScope:{},
    params:{},
    //初始化
    init:function(url,params){
        if(url !=undefined){
            selectProduct.url = url;
        }
        if(params && typeof params ==="object"){
            $.extend(selectProduct.params, params);
        }
        selectProduct.render();
    },
    reload:function(){
        $('#selectProduct').datagrid("reload");
    },
    render:function(){  //data-options 也可设置
        $('#selectProduct').datagrid({
            singleSelect:true,
            fitColumns:true,//自动适应宽度
            method:'get',//请求方式  get 或post
            queryParams:selectProduct.params, //请求参数
            url:selectProduct.url
        });
    }
};

//发布借款--表单处理对象
var addProjectForm = {
    //定义提交路径
    url:factory.url.addProjectForm,
    //提交
    submitForm:function(){
        $('#addProjectForm').form('submit',{
            url:addProjectForm.url,
            //提交前处理
            onSubmit:function(param){
                //获取富文本内容
                if(!($(this).form('enableValidation').form('validate'))){
                    $.messager.alert('提示','请检查数据完整性!','info');
                    return false;
                }
                param.description = $('#wysiwyg').val();
                param.productsLoanId =  selectProduct.rootScope.productsLoanId;
                param.userId =  userSelect.rootScope.userId;
                param.publishType = 1; //后台传输1
                return true;
                //return $(this).form('enableValidation').form('validate');
            },
            success:function(data){
                if(typeof data =="object"){
                    MessageBox.info(data.msg);
                }else{
                    var obj = eval('(' + data + ')');
                    //factory.info(obj.msg);
                    MessageBox.info(obj.msg);
                }
                addProjectForm.clearForm();
                listTable.reload();
            }

        });
    },
    //重置
    clearForm:function(obj){
        $('#addProjectForm').form('clear');
    },
    //选择产品对话框
    selectProduct:function(){
        $('#selectProductDialog').dialog('open');
    },
    //选择借款人对话框
    userSelect: function () {
        $('#userSelectDialog').dialog('open');
    },
    addProjectRateDialog:function(){
        $('#addProjectRateDialog').dialog('open');
    },
    showPpassword:function(){
        $("#ppasswordTH").html("投标密码：");
        $("#pPassword").show();
    },
    //
    hidePpassword:function(){
        $("#ppasswordTH").html("");
        $("#pPassword").hide();
    },
    //显示份额--隐藏投资金额
    showPortion:function(){
        $("#portionTR").show();
        $("#pInvestTR").hide();
        $("#minInvest1").validatebox('remove');
        $('#minInvest1').textbox({required:false});
    },
    hidePortion:function(){
        $("#portionTR").hide();
        $("#pInvestTR").show();
        $('#minInvest1').textbox({required:true});
    },

    genCondition:function(){
        var pamountMin = selectProduct.rootScope.amountMin;
        var pamountMax = selectProduct.rootScope.amountMax;
        var prateMin =  selectProduct.rootScope.rateMin;
        var prateMax = selectProduct.rootScope.rateMax;
        var pdeadlineMin = selectProduct.rootScope.deadlineMin;
        var pdeadlineMax = selectProduct.rootScope.deadlineMax;
        //开标天数限制
        var pvotingDaysMin = selectProduct.rootScope.auditDaysMin;
        var pvotingDaysMax = selectProduct.rootScope.auditDaysMax;
        $("#ploan_label").text("(产品金额限制："+pamountMin+"元~"+pamountMax+"元)");
        var pdeadlineLabel = "";
        var pdeadlineType = selectProduct.rootScope.deadlineType;
        if(pdeadlineType == 'DAY'){
            pdeadlineLabel = "天&nbsp;&nbsp;借款期限限制："+pdeadlineMin+"天~"+pdeadlineMax+"天";

        }else if(pdeadlineType == 'MONTH'){
            pdeadlineLabel = "月&nbsp;&nbsp;借款期限限制："+pdeadlineMin+"月~"+pdeadlineMax+"月";
        }else{
            pdeadlineLabel = "年&nbsp;&nbsp;借款期限限制："+pdeadlineMin+"年~"+pdeadlineMax+"年";
        }
        $("#pdeadline_label").html(pdeadlineLabel);
        $("#prateIn_label").text("借款利率限制："+prateMin+"%~"+prateMax+"%");
        $("#popenDays_label").text("开标天数限制："+pvotingDaysMin+"~"+pvotingDaysMax+"天");
    },
    //计算实际支付利息
    interest:function(){
        if(!selectProduct.rootScope.deadlineType){
            MessageBox.info("请先选择借款产品");
            return;
        }
        //产品金额限制
        var pamountMin = selectProduct.rootScope.amountMin;
        var pamountMax = selectProduct.rootScope.amountMax;
        var ploanT = $('#loan').textbox('getValue');  //借款金额


        //借款利率限制
        var prateMin =  selectProduct.rootScope.rateMin;
        var prateMax = selectProduct.rootScope.rateMax;
        var prateInT = $('#prateIn').textbox('getValue'); //prateIn年利率


        //借款期限限制
        var pdeadlineMin = selectProduct.rootScope.deadlineMin;
        var pdeadlineMax = selectProduct.rootScope.deadlineMax;
        var pdeadlineT = $('#pdeadline').textbox('getValue');  //pdeadline  借款期限

        //开标天数限制
        var pvotingDaysMin = selectProduct.rootScope.auditDaysMin;
        var pvotingDaysMax = selectProduct.rootScope.auditDaysMax;
        var popenDays = $('#popenDays').textbox('getValue');

        ////还款方式的值 select
        var prepayWay = $('#repayWay').combobox('getValue');

        //校验借款金额
        if(parseFloat(ploanT) <parseFloat(pamountMin) || parseFloat(ploanT) >parseFloat(pamountMax) ){
            $('#loan').textbox('setValue','');
            $('#loan').textbox('textbox').focus();
            return;
        }
        //prateIn年利率
        if(parseFloat(prateInT) <parseFloat(prateMin) || parseFloat(prateInT) >parseFloat(prateMax) ){
            $('#prateIn').textbox('setValue','');
            $('#prateIn').textbox('textbox').focus();
            return;
        }

        //借款期限限制
        if(parseFloat(pdeadlineT) <parseFloat(pdeadlineMin) || parseFloat(pdeadlineT) >parseFloat(pdeadlineMax) ){
            $('#pdeadline').textbox('setValue','');
            $('#pdeadline').textbox('textbox').focus();
            return;
        }

        //筹标期限id: popenDays
        if(parseFloat(popenDays) <parseFloat(pvotingDaysMin) || parseFloat(popenDays) >parseFloat(pvotingDaysMax) ){
            $('#popenDays').textbox('setValue','');
            $('#popenDays').textbox('textbox').focus();
            return;
        }

        if(ploanT==""||prateInT==""||pdeadlineT==""){
            return;
        }
        var pdeadlineType = selectProduct.rootScope.deadlineType;  // 借款期限限制类型
        if(1==prepayWay){
            if(pdeadlineType == 'DAY'){
                $("#interest").text(((parseFloat(ploanT)*parseFloat(prateInT)*parseInt(pdeadlineT)/36500).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"元");
            }else if(pdeadlineType == 'YEAR'){
                $("#interest").text(((parseFloat(ploanT)*parseFloat(prateInT)*parseInt(pdeadlineT)).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"元");
            }else{
                $("#interest").text(((parseFloat(ploanT)*parseFloat(prateInT)*parseInt(pdeadlineT)/1200).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"元");
            }
        }else if(2==prepayWay){
            $("#interest").text(((parseFloat(ploanT)*parseFloat(prateInT)*parseInt(pdeadlineT)/1200).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"元");
        }else if(3==prepayWay){
            $("#interest").text(((parseInt(pdeadlineT)*parseFloat(ploanT)*parseFloat(prateInT)/1200*(Math.pow(parseFloat(prateInT)/1200+1,parseInt(pdeadlineT)))/(Math.pow(parseFloat(prateInT)/1200+1,parseInt(pdeadlineT))-1)-parseFloat(ploanT)).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"元");
        }else if(4==prepayWay){
            $("#interest").text((((parseFloat(ploanT)*parseFloat(prateInT)/1200+parseFloat(ploanT)/parseInt(pdeadlineT)*parseFloat(prateInT)/1200)*parseInt(pdeadlineT)/2).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')+"元");
        }
    },
    initDialog:function(){
        //dialog
        $('#selectProductDialog').dialog({
            title: '选择借款产品',
            width: 800,
            height: 450,
            closed: true,
            cache: false,
            href: 'html/p2p/business/selectProduct.html',
            modal: true
        });
        $('#userSelectDialog').dialog({
            title: '选择借款人',
            width: 800,
            height: 500,
            closed: true,
            cache: false,
            href: 'html/p2p/business/userSelect.html',
            modal: true
        });
        $('#addProjectRateDialog').dialog({
            title: '资费说明',
            width: 960,
            height: 500,
            closed: true,
            cache: false,
            href: 'html/p2p/business/addProjectRate.html',
            modal: true
        });
    }
};



