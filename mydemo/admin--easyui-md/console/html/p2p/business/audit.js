//调用接口项目详情
var audit={
    url:"/project/projectDetail",
    //params:{projectId:listTable.rootScope.projectId},
    rootScope:{},
    data:{},
    echoObj :{},
    init:function(){
        //audit.echo();
        $('#identification').dialog({
            title: '标的认证',
            width: 860,
            height: 450,
            closed: true,
            cache: false,
            href: 'html/p2p/business/identification.html',
            modal: true,
            buttons:[{text:'提交',iconCls:'icon-ok',
                handler:function(){
                    identification.submit();
                }},
                {text:'取消',iconCls:'icon-cancel',handler:function(){
                    $('#identification').dialog("close");
                }}
            ]
        });
        $('#preliminaryAuditDB').dialog({
            title: '设置担保',
            width: 600,
            height: 350,
            closed: true,
            cache: false,
            href: 'html/p2p/business/preliminaryAuditDB.html',
            modal: true,
            buttons:[{text:'提交',iconCls:'icon-ok',
                handler:function(){
                    preliminaryAuditDB.submit();
                }},
                {text:'取消',iconCls:'icon-cancel',handler:function(){
                    $('#preliminaryAuditDB').dialog("close");
                    preliminaryAuditDB.clearForm();
                }}
            ]
        });
        $('#bidOpenDialog').dialog({
            title: '设定开标时间',
            width: 300,
            height: 130,
            closed: true,
            cache: false,
            href: 'html/p2p/business/bidOpen.html',
            modal: true,
            buttons:[{text:'提交',iconCls:'icon-ok',
                handler:function(){
                    bidOpen.submit();
                }},
                {text:'重置',handler:function(){
                    bidOpen.reset();
                }}
            ]
        });
        $('#flowDialog').dialog({
            title: '流标',
            width: 550,
            height: 180,
            closed: true,
            cache: false,
            href: 'html/p2p/business/flowDialog.html',
            modal: true,
            buttons:[{text:'提交',iconCls:'icon-ok',
                handler:function(){
                    flowDialogForm.submit();
                }},
                {text:'取消',iconCls:'icon-cancel',handler:function(){
                    $('#flowDialog').dialog("close");
                }}
            ]
        });
        $('#auditDialog').dialog({
            title: '对标的审核',
            width: 550,
            height: 200,
            closed: true,
            cache: false,
            href: 'html/p2p/business/aduitDialog.html',
            modal: true,
            buttons:[{text:'提交',iconCls:'icon-ok',
                handler:function(){
                    aduitDialogForm.submit();
                }},
                {text:'取消',iconCls:'icon-cancel',handler:function(){
                    $('#auditDialog').dialog("close");
                }}
            ]
        });
        $('#imgUpload').dialog({
            title: '附件管理',
            width: 650,
            height: 450,
            closed: true,
            cache: false,
            href: 'html/p2p/business/imgUpload.html',
            modal: true,
            buttons:[{text:'提交',iconCls:'icon-ok',
                handler:function(){

                }},
                {text:'取消',iconCls:'icon-cancel',handler:function(){
                    $('#imgUpload').dialog("close");
                }}
            ]
        });
        audit.initData();
    },
    initData:function(data){
            audit.data = data;
            audit.echo(audit.data);
    },
    echo:function(params){
        factory.httpGet(audit.url,params,function(data){
            audit.echoObj = data.result.project;
            for(var k in data){
                audit.rootScope[k] = data[k];
            }
            var user = {};
            var obj ={};
            for(var k in data.result.project){
                obj[k] = data.result.project[k];
            }
            for(var k in data.result.user){
                user[k] = data.result.user[k];
            }
            //isNeedGuarantee 是否选择担保 isNeedGuarantee 1是 0否
            if(obj.isNeedGuarantee ==1){
                obj.isNeedGuaranteeName = "是";
            }else{
                obj.isNeedGuaranteeName = "否";
            }
            var deadlineTypeObj = {"DAY":"天","MONTH":"月","YEAR":"年"};
            obj.deadlineTypeName = deadlineTypeObj[obj.deadlineType];

            //按钮操作：1标的认证、2设置担保、3附件管理 4开标 、 5流标  6满标  都在project  ：audit.echoObj = data.result.project;
            //开标设置时间条件：state=1 && openDate（开标时间）> 当前时间   || openDate == null
            // state = 1, 1234可用
            //  state  != 1 不可用 1234
            //流标操作  在 state = 1,2,3
            //满标操作 只能在state =2(招标中 state=2 && complete ==100)

            //type 1:信用认证标 2:实地认证标 3:担保机构标 4:智能理财标
            var  type = ["信用认证标","实地认证标","担保机构标","智能理财标"];
            if(obj.type){
                obj.typeName =type[Number(obj.type)-1];
            }else{
                obj.typeName = obj.type;
            }
            //debugger;
            var  state = ["新申请","招标中","满标","还款中","已还清","流标"];
            if(obj.state){
                obj.stateName = state[Number(obj.state)-1];
            }else{
                obj.stateName = obj.state;
            }
            audit.echoObj.stateName = obj.stateName;
            var  repayWayName = ["一次性还本付息","按月付息","按月付息","到期还本","等额本金，每月还款"];
            if(obj.repayWay){
                obj.repayWayName = repayWayName[Number(obj.repayWay)-1];
            }else{
                obj.repayWayName = obj.repayWay;
            }

            var typeName = ["信用认证标","实地认证标","担保机构标","智能理财标"];
            if(obj.type){
                obj.typeName = typeName[Number(obj.type)-1];
            }else{
                obj.typeName = obj.type
            }
            user.sex = user.sex=1? "男":"女";
            user.marriaged = user.marriaged=1? "是":"否";
            user.whetherCar = user.whetherCar=0? "是":"否";
            user.whetherCarLoan = user.whetherCarLoan=0? "是":"否";
            user.whetherBuyLoan = user.whetherBuyLoan=0? "是":"否";
            //housingConditions 0：自置无按揭，1：自置有按揭，3：商住两用，4：租用，5：与父母共住，6：集体宿舍，7：其他
            var housingConditions = ["自置无按揭","自置有按揭","商住两用","租用","与父母共住","集体宿舍","其他"];
            user.housingConditionsName = housingConditions[Number(user.housingConditions)];
            //workingYear 0：半年以内，1：1年以内，2：2年以内，3：3年以内，4：3年以上
            var workingYear = ["半年以内","1年以内","2年以内","3年以内","3年以上"];
            user.workingYearName = workingYear[Number(user.workingYear)];
            // companySize 0：小于50人，1：50人至200人，2:200人至1000人，3：1千人至1万人，4：大于一万人
            var companySize = ["小于50人","50人至200人","200人至1000人","1千人至1万人","大于一万人"];
            user.companySizeName = companySize[Number(user.companySize)];
            Utils.bindData($("#audit_project"),obj);
            Utils.bindData($("#audit_personal"),user);
            Utils.bindList("#audit-condition", ".itemTmpl", data.result.tuserAuditmat);
        })
    },
    //标的认证对话框
    identification:function(){
        $('#audit_ident_btn').linkbutton('enable');
        if(audit.echoObj.state ==1){
            $('#identification').dialog("open");
        }else{
            $('#audit_ident_btn').linkbutton('disable');
            MessageBox.info("当前项目状态:"+audit.echoObj.stateName+"<br>"+"不可进行标的认证！");
        }
    },
    //设置担保 audit_prelim_btn
    preliminaryAudit:function(){
        $('#audit_prelim_btn').linkbutton('enable');
        if(audit.echoObj.state ==1){
            $('#preliminaryAuditDB').dialog("open");
        }else{
            $('#audit_prelim_btn').linkbutton('disable');
            MessageBox.info("当前项目状态:"+audit.echoObj.stateName+"<br>"+"不可进行设置担保！");
        }
    },
    //开标 audit_bidOpen_btn
    bidOpenDialog:function(){

        console.log(today);
        $('#audit_bidOpen_btn').linkbutton('enable');
        if(audit.echoObj.state ==1){
            if(!audit.echoObj.openDate){
                $('#bidOpenDialog').dialog("open");
            }else{
                var today = factory.today();
                if(factory.CompareDate(today,audit.echoObj.openDate)){
                    MessageBox.info("当前时间大于开标时间了，不可继续设置开标时间");
                }else{
                    $('#bidOpenDialog').dialog("open");
                }
            }
        }else{
            $('#audit_bidOpen_btn').linkbutton('disable');
            MessageBox.info("当前项目状态:"+audit.echoObj.stateName+"<br>"+"不可进行开标！");
        }
    },
    auditDialog:function(){
        $('#auditDialog').dialog("open");
    },
    //附件管理 audit_upload_btn
    imgUpload:function(){
        $('#audit_upload_btn').linkbutton('enable');
        if(audit.echoObj.state ==1){
            $('#imgUpload').dialog("open");
        }else{
            $('#audit_upload_btn').linkbutton('disable');
            MessageBox.info("当前项目状态:"+audit.echoObj.stateName+"<br>"+"不可进行附件管理！");
        }
    },
    //流标操作audit_flow_btn  在 state = 1,2,3
    flowDialog:function(){
        $('#audit_flow_btn').linkbutton('enable');
        if(audit.echoObj.state==1 || audit.echoObj.state==2 ||audit.echoObj.state==3){
            $('#flowDialog').dialog("open");
        }else{
            $('#audit_flow_btn').linkbutton('disable');
            MessageBox.info("当前项目状态:"+audit.echoObj.stateName+"<br>"+"不可进行流标！");
        }
    },
    //满标操作 audit_full_btn 只能在state =2(招标中 state=2 && complete ==100)
    fullDialog:function(){
        $('#audit_full_btn').linkbutton('enable');
        if(audit.echoObj.state ==2 && audit.echoObj.complete ==100){
            factory.httpPut("/project/full",{projectIds:audit.echoObj.projectId},function(data){
                if(data.code==0){
                    MessageBox.info(data.msg);
                }else{
                    MessageBox.info("失败!");
                }
                audit.echo();
            });
        }else{
            $('#audit_full_btn').linkbutton('disable');
            MessageBox.info("当前项目状态:"+audit.echoObj.stateName+"<br>"+"不可进行满标！");
        }
    }
};