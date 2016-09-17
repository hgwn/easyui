;
(function($) {


    $.fn.simpleTab = function(options, params) {
        var defopt = {
            selected: "other",
            style: {
                cursor: "pointer"
            },
            grouped: true,
            item: "ul > li"
        };

        var opt = {};
        var preTab = {};

        $.extend(opt, defopt, options);

        this.each(function() {
            var $this = $(this);

            var lis = $this.find(opt.item);

            lis.click(function() {
                if (preTab == $(this)) {
                    return;
                }
                lis.removeClass(opt.selected);
                $(this).addClass(opt.selected);

                if (opt.grouped) {
                    if (preTab == {}) {
                        preTab = $(this);
                    } else {
                        $(preTab).removeClass(opt.selected);
                        preTab = $(this);
                    }
                }


                if (opt.onclick) {
                    opt.onclick(this, params);
                }
            });


        });

    };

    $.fn.breadcrumb = function(options, params) {

        function replace(str, obj) {
            var patten = "";
            for (var name in obj) {

                patten = new RegExp("\\$" + name + "(?!\\w+)", "g");

                str = str.replace(patten, obj[name]);

            }
            return str;

        }


        var defopt = {
            key: "breadcrumb",
            titleKey: "bread",
            container: "#breadcrumb",
            style: {
                cursor: "pointer"
            },
        };

        var opt = {};
        var flag = false;
        $.extend(opt, defopt, options);
        $this = this;
        window.breadcrumb = {};

        breadcrumb = {
            paths: [],
            init: function() {
                breadcrumb.paths = [];
                if (Router) {

                    Router.addListener(opt.key, function(url, arg) {

                        var bread = Utils.getUrlParam(opt.titleKey);
                        if (!bread) {
                            bread = arg.vpage;
                            if(arg.blk) bread = bread +":"+arg.blk;
                        }
                        if (!bread || bread === "") {

                            bread = "首页";
                        }

                        breadcrumb.track(bread, url);
                        breadcrumb.render(breadcrumb.paths);

                    });

                }
                var title = Utils.getUrlParam(opt.titleKey) ? Utils.getUrlParam(opt.titleKey) : Router.getblock(location.href);

                if (!title || title === "") {

                    title = "首页";
                }

                breadcrumb.track(title, location.hash);
                breadcrumb.render(breadcrumb.paths)

            },
            render: function(data) {
                $this.empty();
                var i = 0;
                var tmpl = '<a id="bread_tmpl" href="javascript:void(0);" onclick="window.breadcrumb.goto($i)" class="visit" >$title</a>';

                for (var i = 0; i < data.length; i++) {

                    var obj = {i: i};
                    $.extend(obj, data[i]);
                    $this.append(replace(tmpl, obj));

                    if (i < data.length - 1) {

                        $this.append("<span>&centerdot;</span>");
                    }
                }
                if (!flag) {
                    $this.before("<span id='bread_fl'>您的足迹：</span>");
                    flag = true;
                }


            },
            clean: function() {

                breadcrumb.paths = [];
            },
            goto: function(pathIndex) {

                var url = breadcrumb.paths[pathIndex].path;

                breadcrumb.paths = breadcrumb.paths.slice(0, pathIndex + 1);
                breadcrumb.render(breadcrumb.paths);


                location.href = url;

            },
            track: function(title, path) {


                for (var i = 0; i < breadcrumb.paths.length; i++) {

                    if (breadcrumb.paths[i].path === path) {

                        breadcrumb.goto(i);
                        return;
                    }
                }



                breadcrumb.paths.push({title: title, path: path});

                if( breadcrumb.paths.length >10){  //只保留十个最近浏览记录，若超时，则删除第一个
                    breadcrumb.paths.splice(0,1);
                }
            }

        };


        breadcrumb.init();
    };

})(jQuery);