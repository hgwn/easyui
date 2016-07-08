var groupEditDlg = {
	id : "#group_form_dlg",
	data : {},
	inited : false,
	init : function(title) {

		$("#group_form_dlg").dialog({
			width : 300,
			height : 300,
			title : title,
			href : "html/admin/group/edit.html",
			modal : true,
			closed : true,
			onLoad : function() {

				groupEditDlg.inited = true;

				if (groupEditForm) {

					groupEditForm.init();
					groupEditForm.echo(groupEditDlg.data);

					groupEditForm.bindEvent("submited", function(event, data) {
						groupEditDlg.close();
						groupTree.reload();
					});

				}

			},
			onOpen : function() {

				if (groupEditDlg.inited) {
					groupEditForm.echo(groupEditDlg.data);
				}
			},
			buttons : [ {
				text : '保存',
				handler : function() {

					if (groupEditForm) {

						groupEditForm.submit();

					}
				}
			}, {
				text : '清空',
				handler : function() {

					if (groupEditForm) {
						groupEditForm.reset();
					}
				}
			} ]
		});

	},
	close : function() {
		// $("#group_form_dlg").dialog("close");
		$("#group_form_dlg").dialog("destroy");
		groupEditDlg.inited = false;
		groupEditDlg.data = {}

	},
	show : function(title, data) {
		groupEditDlg.data = data;

		if ($("#group_form_dlg").length <= 0) {
			groupEditDlg.inited = false;

			$("body").append("<div id='group_form_dlg'><div>");

			groupEditDlg.init(title);

		}

		$("#group_form_dlg").dialog("setTitle", title);

		$("#group_form_dlg").dialog("open");

	}

};

var operatorTableDlg = {
	id : "#operator_table_dlg",
	data : {},
	inited : false,
	init : function(title) {

		$("#operator_table_dlg").dialog({
			width : 600,
			height : 500,
			title : title,
			href : "html/admin/group/opAddTable.html",
			modal : true,
			closed : true,
			onClose : function() {
				operatorTableDlg.close();
			},
			onLoad : function() {

				operatorTableDlg.inited = true;

			},
			onOpen : function() {

				if (operatorTableDlg.inited) {
				}
			},
			buttons : [ {
				text : '保存',
				handler : function() {
					operatorBox.submit();

				}
			} ]
		});

	},
	close : function() {
		$("#operator_table_dlg").dialog("destroy");
		operatorTableDlg.inited = false;
		operatorTableDlg.data = {}

	},
	show : function(title, data) {
		operatorTableDlg.data = data;

		if ($("#operator_table_dlg").length <= 0) {
			operatorTableDlg.inited = false;

			$("body").append("<div id='operator_table_dlg'><div>");

			operatorTableDlg.init(title);

		}

		$("#operator_table_dlg").dialog("setTitle", title);

		$("#operator_table_dlg").dialog("open");

	}

};