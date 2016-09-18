var transaction_record_list_obj = {
	id : null,
	selectRowObj : null,
	url : {},
	params : null,
	submit : function(search_form_id) {
		var params = $("#" + search_form_id).serialize();
		transaction_record_list_obj.params = params;
		transaction_record_list_obj.render();
	},
	init : function(id, url, params) {
		transaction_record_list_obj.id = id;
		transaction_record_list_obj.url = url;
		transaction_record_list_obj.params = params;
		transaction_record_list_obj.render();
		combobox_datas.loadBizModules("transaction_record_bm_combobox");
		combobox_datas.loadPayChannel("transaction_record_pc_combobox");
	},
	reload : function() {
		$('#' + transaction_record_list_obj.id).datagrid("reload");
	},
	render : function() {
		if(transaction_record_list_obj.url.indexOf("?")!=-1){
			var _url = transaction_record_list_obj.url + "&"
			+ transaction_record_list_obj.params + "&time="
			+ new Date().getTime();
		}else{
			var _url = transaction_record_list_obj.url + "?"
			+ transaction_record_list_obj.params + "&time="
			+ new Date().getTime();
		}
		$('#' + transaction_record_list_obj.id).datagrid({
			url : _url,
			pagination : true,
			nowrap : true,
			fit : true,
			fitColumns : true,
			striped : true,
			pageList : [ 5, 10, 15, 20 ],
			singleSelect : true,
			method : 'GET',
			columns : [ [ {
				field : 'transNo',
				title : '交易号',
				width : 200,
				align : 'left'
			}, {
				field : 'amount',
				title : '发生总金额  ',
				width : 200,
				align : 'left'
			}, {
				field : 'bizType',
				title : '业务类型 ',
				width : 265,
				formatter : transaction_record_list_obj.fmtBizType,
				align : 'left'
			}, {
				field : 'state',
				title : '状态 ',
				width : 265,
				formatter : transaction_record_list_obj.fmtState,
				align : 'left'
			}, {
				field : 'createTime',
				title : '创建时间',
				width : 265,
				align : 'left'
			}, {
				field : 'lastUpdateTime',
				title : '最后修改时间',
				width : 265,
				align : 'left'
			}, {
				field : 'remark',
				title : '备注 ',
				width : 265,
				align : 'left'
			}, {
				field : 'approveDescp',
				title : '审核备注 ',
				width : 265,
				align : 'left'
			}, {
				field : 'active',
				title : '操作',
				width : 265,
				formatter : transaction_record_list_obj.console,
				align : 'left'
			} ] ]
		});
	},
	fmtBizType : function(value, row, index) {
		if (row.bizType == "account") {
			return "开户";
		} else if (row.bizType == "charge") {
			return "充值";
		}else if (row.bizType == "pay") {
			return "支付（投资）";
		}else if (row.bizType == "draw") {
			return "提现";
		}else if (row.bizType == "accept") {
			return "确认放款（授权转账）";
		}else if (row.bizType == "batchpay") {
			return "放款（直接转账）";
		}else if (row.bizType == "refund") {
			return "退款";
		} else if (row.bizType == "freeze") {
        	    	return "冻结";
        	}
	},
	fmtState : function(value, row, index) {
		if (Number(row.state) == -1) {
			return "失败";
		} else if (Number(row.state) == 0) {
			return "关闭";
		} else if (Number(row.state) == 1) {
			return "新建";
		} else if (Number(row.state) == 2) {
			return "待支付";
		} else if (Number(row.state) == 3) {
			return "异常";
		} else if (Number(row.state) == 4) {
			return "完成";
		} else if (Number(row.state) == 5) {
			return "待收款";
		} else if (Number(row.state) == 6) {
			return "待审核";
        	} else if (Number(row.state) == 7) {
        	    	return "拒绝";
        	} 
	},console:function(value, row, index){
		var state = row.state;
		var bizType = row.bizType;
		var html = "";
		//debugger;
		if(Number(state) != 0){
		    html += '&nbsp;<a href="javascript:void(0);" style="text-decoration:none"  onclick="transaction_record_list_obj.updateState('+index+');">更新</a>';
		}
		/*
		if(bizType == "draw"){
		    if(Number(state) == 6){
			html = '<a href="javascript:void(0);" style="text-decoration:none" onclick="transaction_record_list_obj.cash_audit(0,'+index+');">放款</a>';
			html += '&nbsp;<a href="javascript:void(0);" style="text-decoration:none" onclick="transaction_record_list_obj.cash_audit(1,'+index+');">拒绝</a>';
		    } else if(Number(state) == 3){
			html = '<a href="javascript:void(0);" style="text-decoration:none" onclick="transaction_record_list_obj.cash_audit(0,'+index+');">放款</a>';
			html += '&nbsp;<a href="javascript:void(0);" style="text-decoration:none" onclick="transaction_record_list_obj.cash_audit(1,'+index+');">拒绝</a>';
		    }// else {
			//html = transaction_record_list_obj.fmtState(value,row,index);
		    //}
		} else {
		    
		}
		*/
		
		
		return html;
	},cash_audit:function(flag,index){
		var row = $('#'+transaction_record_list_obj.id).datagrid('getData').rows[index];
		if(row != null){
		    transaction_record_list_obj.selectRowObj = row;
		    var _url = "html/finance/transaction_record/transaction_audit.html";
		    var obj_data = {"flag":flag};
		    var title = "";
		    if(flag == "0"){
		    	title = "放款";
		    }else if(flag == "1"){
		    	title = "退回";
		    }
		    transaction_audit_obj.show({width:315,height:155,url:_url,data:obj_data,title:title});
		} 
	},
	updateState : function(index){
	    var row = $('#'+transaction_record_list_obj.id).datagrid('getData').rows[index];
	    transaction_audit_obj.updateState(row);
	},
	excel:function(_url,search_form_id){
	    var params = $("#"+search_form_id).serialize();
	    transaction_record_list_obj.params = params;
    	    if(_url.indexOf("?")!=-1){
    		_url = _url + "&" + transaction_record_list_obj.params + "&time=" + new Date().getTime();
    	    }else{
    		_url = _url + "?" + transaction_record_list_obj.params + "&time=" + new Date().getTime();
    	    }
    	    var tableOptions = $('#' + transaction_record_list_obj.id).datagrid('options');
            if(tableOptions.pagination){
                var pageOptions = $('#' + transaction_record_list_obj.id).datagrid('getPager').data("pagination").options;
                var expPageNumber = pageOptions.pageNumber;
                var expPageSize = pageOptions.pageSize;
                var expTotal = Math.ceil(pageOptions.total/pageOptions.pageSize)||1;
                
                _url += "&pageNum=1&pageSize="+pageOptions.total;
            }
            
            var expFrozenColumnFields = encodeURIComponent(encodeURIComponent(JSON.stringify(tableOptions["frozenColumns"])));
            var expColumnFields = encodeURIComponent(encodeURIComponent(JSON.stringify(tableOptions["columns"])));
            var expQueryParams = encodeURIComponent(encodeURIComponent(JSON.stringify(tableOptions["queryParams"])));
            var expTableRows =   encodeURIComponent(encodeURIComponent(JSON.stringify($("#"+transaction_record_list_obj.id).datagrid('getRows'))));
            $("#expFrozenColumnFields").val(expFrozenColumnFields);
            $("#expColumnFields").val(expColumnFields);
            $("#expQueryParams").val(expQueryParams);
            $("#expTableRows").val(expTableRows);
            $("#expForm").attr("action",_url);
            $("#expForm").submit();
	}
};

//模板
var transaction_audit_obj = {
	id :"1008",
	width :350,
	height :260,
	url :null,
	title :"dialog",
	init :function (o){
	        this.data = o.data;
			this.width = o.width;
			this.height = o.height;
			this.url  = o.url;
			this.title = o.title;
			if($("#edit_"+this.id).length <= 0) {
			      $("body").append("<div id='edit_"+this.id+"' ><div>");
			}
			$("#edit_"+this.id).dialog({
					href:transaction_audit_obj.url,
					width: this.width,
					height:this.height,
					title:this.title,
					modal : true,
					closed : true,
					onLoad : function() {
				         var obj = transaction_record_list_obj.selectRowObj;
	        	         var flag = transaction_audit_obj.data.flag;
	        	         //放款
	        	         if(flag == "0"){
	        	        	 $("#transaction_audit_form textarea[name='remark']").text("同意放款");
	        	        	 //完成
	        	        	 $("#transaction_audit_form input[name='transState']").val("4");
	        	         }else{  //失败
	        	        	 $("#transaction_audit_form input[name='transState']").val("-1");
	        	         }
	                	 $("#transaction_audit_form textarea[name='remark']").val(obj.remark);
	                	 $("#transaction_audit_form input[name='transNo']").val(obj.transNo);
			},
					buttons : [{
						          text : '保存',
								  iconCls: 'icon-save',
								  handler : function() {
								          var transNo = $("#transaction_audit_form input[name='transNo']").val();
								          var remark = $("#transaction_audit_form textarea[name='remark']").val();
								          if(remark == ""){
								        	  $.messager.alert("操作提示", "请输入备注信息!", "error");
								        	  return false;
								          }
								          var transState = $("#transaction_audit_form input[name='transState']").val();
								          var _audit_url = "/dlsys/portal/paygate/trans/"+transNo+"/"+transState+"?remark="+remark;
										  $.ajax({
										  		url:_audit_url,
										  		type:'post',
										  		async:false,
										  		beforeSend: function (xhr) {
								            		xhr.setRequestHeader('Appkey',"SYSTEM_ID");
								            		xhr.setRequestHeader('Content-Type','application/json');
								            		xhr.setRequestHeader('Token',op.data.token);
								                },
										  		success:function(data){
										  			 
										  			 transaction_audit_obj.close();
										  			transaction_record_list_obj.reload();
										  		}
										   });
								  }
					 }]
		     })
		    	
   },
	close :function() {
			$("#edit_"+this.id).dialog("destroy");
	},
	show: function(o) {
		    transaction_audit_obj.init(o);
			$("#edit_"+this.id).dialog("open");
	},
	updateState :function(data) {
	    if(data.proceeds){
		var url = '/dlsys/portal/paygate/transaction/proceeds/' + data.transNo;
		$('#proceeds').datagrid({
		    url: url,
		    fitColumns:true,
		    striped:true,
		    columns:[[    
		        {field:'accountNo',title:'收款帐号'},    
		        {field:'amount',title:'发生金额'},    
		        {field:'charge',title:'手续费'}
		    ]]    
		});
		$('#proceeds_div').show();
	    } else {
		$('#proceeds_div').hide();
	    }
	    
	    $('#updateState').dialog({    
		title: '更新状态',    
		width: 'auto',    
		height: 'auto',    
		closed: false,    
		cache: false,    
		modal: true,
		buttons:[{
			text:'保存',
			width:'80px',
			handler:function(){
			    var remark = $("#updateState_remark").val();
			    var state =$('#updateState_state').combobox('getValue');
			    if(null == remark || "" == remark.trim()){
				$.messager.alert("操作提示", "备注信息必填" , "error");
				return false;
			    }
			    if(null == state || "" == state.trim()){
				$.messager.alert("操作提示", "状态必选" , "error");
				return false;
			    }

			    var url = "/dlsys/portal/paygate/trans/"+ data.transNo +"/"+ Number(state) + "?remark=" + remark;
			    $.ajax({
				url:url,
				type:'post',
				async:false,
				beforeSend: function (xhr) {
				    xhr.setRequestHeader('Appkey',"SYSTEM_ID");
				    xhr.setRequestHeader('Content-Type','application/json');
				    xhr.setRequestHeader('Token',op.data.token);
				},
				success:function(data){
			  	
				    if(data.code == "0"){
					$('#updateState').dialog({
					    closed: true
					});
					$("#updateState_remark").val("");
					$('#updateState_state').combobox('setValue',"");
					transaction_record_list_obj.reload();
				    } else {
					$.messager.alert("操作提示", data.msg , "error");
				    }
				}
			   });
			}
		},{
			text:'关闭',
			width:'80px',
			handler:function(){
			    $("#updateState_remark").val("");
			    $('#updateState_state').combobox('setValue',"");
			    $('#updateState').dialog({  
				closed: true
			    });
			}
		}]
	    });
	}
	
};

