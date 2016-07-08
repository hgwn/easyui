var opFormDlg = {

	id : "#op_form_dlg",
	data : {},
	inited : false,
	init : function(title) {

		$("#op_form_dlg").dialog({

			width : 480,
			height : 500,
			title : title,
			href : "html/admin/operator/edit.html",
			modal : true,
			closed : true,

			onLoad : function() {

				opFormDlg.inited = true;
				opFormDlg.initData();

			},

			onOpen : function() {
				if (opFormDlg.inited) {
					opFormDlg.initData();
				}
			},

			buttons : [ {
				text : '保存',
				handler : function() {

					if (opEditFrom) {
						opEditFrom.bindEvent("submited", function(event, data) {
							opFormDlg.close();
							optable.reload();
						});
						
						opEditFrom.submit();

					}
				}
			}, 
		    {
				text : '清空',
				handler : function() {

					if (opEditFrom) {
						opEditFrom.reset();
					}
				}
			} ]
		});

	},

	initData : function(data) {

		if (!opEditFrom) {

			return;
		}
		opEditFrom.echo(opFormDlg.data);

	},

	close : function() {

		$("#op_form_dlg").dialog("close");
	},
	show : function(title, data) {
		opFormDlg.data = data;

		if ($("#op_form_dlg").length <= 0) {
			opFormDlg.inited = false;

			$("body").append("<div id='op_form_dlg'><div>");

			opFormDlg.init(title);

		}

		$("#op_form_dlg").dialog("setTitle", title);

		$("#op_form_dlg").dialog("open");

	}

};

