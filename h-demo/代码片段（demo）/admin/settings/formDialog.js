function FormDialog(options) {

    this.createDialog(options);
}


FormDialog.prototype = {
    createDialog: function(opt, show) {
        this.defopt = {
            width: 500,
            height: 300,
            title: "",
            formurl: "",
            formName: "",
            data: {}
        };

        $.extend(this.defopt, opt);

        this.inited = false;
        this.id = "__" + this.defopt.formName + "__";

        if (show === true) {
            this.show();
        }
    },
    initData: function(data) {

        var formobj = eval(this.defopt.formName);
        if (formobj) {

            formobj.echo(this.defopt.data);
        }


    },
    show: function() {
        this.close();


        if ($("#" + this.id).length <= 0) {
            this.inited = false;

            $("body").append("<div id='" + this.id + "'><div>");

            this.init();

        }
       

        $("#" + this.id).dialog("open");


    },
    close: function() {
         $("#"+this.id).dialog("destroy");
    },
    init: function() {

        var $this = this;

        $("#"+this.id).dialog({
            width: $this.defopt.width,
            height: $this.defopt.height,
            title: $this.defopt.title,
            href: $this.defopt.formurl,
            modal: true,
            closed:true,
            onLoad: function() {

                $this.inited = true;
                $this.initData();

            },
            onOpen: function() {
                if ($this.inited) {
                    $this.initData();
                }
            },
            onClose:function(){
                $this.close();
            },
            buttons: [{
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function() {
                        $this.formobj = eval($this.defopt.formName);

                        if ($this.formobj) {
                            $this.formobj.bindEvent("submited", function(event, data) {

                                $this.close();
                                //callback
                            });

                            $this.formobj.submit();

                        }
                    }
                },
                {
                    text: '清空',
                    iconCls: 'icon-reload',
                    handler: function() {
                        $this.formobj = eval($this.defopt.formName);
                        if ($this.formobj) {
                            $this.formobj.reset();
                        }
                    }
                }]
        });


    }

};




