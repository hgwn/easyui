var modifyPwdFormDlg = {
    id: "#modify_pwd_form_dlg",
    inited: false,
    init: function(title) {

        $("#modify_pwd_form_dlg").dialog(
                {
                    width: 350,
                    height: 220,
                    title: title,
                    href: "html/modity-pwd.html",
                    modal: true,
                    closed: true,
                    onLoad: function() {
                        modifyPwdFormDlg.inited = true;
                    },
                    onOpen: function() {

                    },
                    buttons: [
                        {
                            text: '保存',
                            handler: function() {
                                if (modityPwdForm) {
                                    modityPwdForm.bindEvent("submited",
                                            function(event, data) {
                                                modifyPwdFormDlg.close();
                                                // roleTable.reload();
                                            });
                                    modityPwdForm.submit();
                                }
                            }
                        }, {
                            text: '清空',
                            handler: function() {
                                if (modityPwdForm) {
                                    modityPwdForm.reset();
                                }
                            }
                        }]
                });

    },
    close: function() {
        $("#modify_pwd_form_dlg").dialog("destroy");
    },
    show: function(title) {
        if ($("#modify_pwd_form_dlg").length <= 0) {
            $("body").append("<div id='modify_pwd_form_dlg'><div>");
        }
        modifyPwdFormDlg.inited = false;
        modifyPwdFormDlg.init(title);
        $("#modify_pwd_form_dlg").dialog("setTitle", title);
        $("#modify_pwd_form_dlg").dialog("open");
    }
};