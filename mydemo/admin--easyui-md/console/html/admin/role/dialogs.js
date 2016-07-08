var roleFormDlg = {

	id : "#role_form_dlg",
	data : {},
	inited : false,
	init : function(title) {

		$("#role_form_dlg").dialog(
				{

					width : 480,
					height : 240,
					title : title,
					href : "html/admin/role/edit.html",
					modal : true,
					closed : true,

					onLoad : function() {

						roleFormDlg.inited = true;
						roleFormDlg.initData();

					},

					onOpen : function() {
						if (roleFormDlg.inited) {
							roleFormDlg.initData();
						}
					},

					buttons : [
							{
								text : '保存',
								handler : function() {
									if (roleEditFrom) {
										roleEditFrom.bindEvent("submited",
												function(event, data) {
													roleFormDlg.close();
													roleTable.reload();
												});
										roleEditFrom.submit();
									}
								}
							}, {
								text : '清空',
								handler : function() {
									if (roleEditFrom) {
										roleEditFrom.reset();
									}
								}
							} ]
				});

	},

	initData : function(data) {
		if (!roleEditFrom) {
			return;
		}
		roleEditFrom.echo(roleFormDlg.data);

	},

	close : function() {

		$("#role_form_dlg").dialog("close");
	},
	show : function(title, data) {
		roleFormDlg.data = data;
		if ($("#role_form_dlg").length <= 0) {
			roleFormDlg.inited = false;
			$("body").append("<div id='role_form_dlg'><div>");
			roleFormDlg.init(title);
		}
		$("#role_form_dlg").dialog("setTitle", title);
		$("#role_form_dlg").dialog("open");
	}
};
var roleOperatorTableDlg = {
	id : "#role_operator_table_dlg",
	data : {},
	inited : false,
	init : function(title) {

		$("#role_operator_table_dlg").dialog({
			width : 600,
			height : 500,
			title : title,
			href : "html/admin/role/opAddTable.html",
			modal : true,
			closed : true,
			onClose : function() {
				roleOperatorTableDlg.close();
			},
			onLoad : function() {

				roleOperatorTableDlg.inited = true;

			},
			onOpen : function() {

				if (roleOperatorTableDlg.inited) {
				}
			},
			buttons : [ {
				text : '保存',
				handler : function() {
					roleOperatorBox.submit();

				}
			} ]
		});

	},
	close : function() {
		$("#role_operator_table_dlg").dialog("destroy");
		roleOperatorTableDlg.inited = false;
		roleOperatorTableDlg.data = {}

	},
	show : function(title, data) {
		roleOperatorTableDlg.data = data;

		if ($("#role_operator_table_dlg").length <= 0) {
			roleOperatorTableDlg.inited = false;

			$("body").append("<div id='role_operator_table_dlg'><div>");

			roleOperatorTableDlg.init(title);

		}

		$("#role_operator_table_dlg").dialog("setTitle", title);

		$("#role_operator_table_dlg").dialog("open");

	}

};