var assetsEditDlg = {
    id: "#assets_form_dlg",
    data: {},
    inited: false,
    init: function(title) {

        $("#assets_form_dlg").dialog({
            width: 500,
            height: 300,
            title: title,
            href: "html/admin/assets/edit.html",
            modal: true,
            closed: true,
            onLoad: function() {

            	assetsEditDlg.inited = true;

                if (assetsEditFrom) {

                	assetsEditFrom.init();
                	assetsEditFrom.echo(assetsEditDlg.data);

                	assetsEditFrom.bindEvent("submited", function(event, data) {
                        assetsEditDlg.close();

                        assetsTree.reload();
                    });

                }

            },
            onOpen: function() {

                if (assetsEditDlg.inited) {
                	assetsEditFrom.echo(assetsEditDlg.data);
                }
            },
            buttons: [{
                    text: '保存',
                    handler: function() {

                        if (assetsEditFrom) {

                        	assetsEditFrom.submit();

                        }
                    }
                }, {
                    text: '清空',
                    handler: function() {

                        if (assetsEditFrom) {
                        	assetsEditFrom.reset();
                        }
                    }
                }]
        });

    },
    close: function() {
        //$("#group_form_dlg").dialog("close");
        $("#assets_form_dlg").dialog("destroy");
        assetsEditDlg.inited = false;
        assetsEditDlg.data = {}

    },
    show: function(title, data) {
        assetsEditDlg.data = data;

        if ($("#assets_form_dlg").length <= 0) {
            assetsEditDlg.inited = false;

            $("body").append("<div id='assets_form_dlg'><div>");

            assetsEditDlg.init(title);

        }

        $("#assets_form_dlg").dialog("setTitle", title);

        $("#assets_form_dlg").dialog("open");

    }

};