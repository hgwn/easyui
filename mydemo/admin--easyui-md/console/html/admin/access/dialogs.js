var accessFormDlg = {

	id : "#access_form_dlg",
	data : {},
	inited : false,
	init : function(title) {

		$("#access_form_dlg").dialog(
				{
					width : 500,
					height : 450,
					title : title,
					href : "html/admin/access/edit.html",
					modal : true,
					closed : true,
					onLoad : function() {
						accessFormDlg.inited = true;
						accessFormDlg.initData();
					},

					onOpen : function() {
						if (accessFormDlg.inited) {
							accessFormDlg.initData();
						}
					},
					buttons : [
							{
								text : '保存',
								handler : function() {
									if (accessEditFrom) {
										accessEditFrom.bindEvent("submited",
												function(event, data) {
													accessFormDlg.close();
													// roleTable.reload();
												});
										accessEditFrom.submit();
									}
								}
							}, {
								text : '清空',
								handler : function() {
									if (accessEditFrom) {
										accessEditFrom.reset();
									}
								}
							} ]
				});

	},
	initData : function(data) {
		if (!accessEditFrom) {
			return;
		}
		accessEditFrom.echo(accessFormDlg.data);
	},

	close : function() {
		$("#access_form_dlg").dialog("close");
	},
	show : function(title, data) {
		accessFormDlg.data = data;
		if ($("#access_form_dlg").length <= 0) {
			$("body").append("<div id='access_form_dlg'><div>");
		}
		accessFormDlg.inited = false;
		accessFormDlg.init(title);
		$("#access_form_dlg").dialog("setTitle", title);
		$("#access_form_dlg").dialog("open");
	}
};