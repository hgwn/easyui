
function isInArray(data, array) {

    var inarray = false;
    for (var i = 0; i < array.length; i++) {

        if (data === array[i]) {
            inarray = true;
            break;
        }

    }

    return inarray;
}

function hasProp(obj, prop) {

    return (obj[prop] !== 'undefined');
}

function getPorlets(keys, mappings) {
    var porletList = [];
    var item = {};
    for (var key in keys) {

        if (mappings[key]) {

            item = {box: keys[key].box, porlet: mappings[key]};
            porletList.push(item);
        }

    }

    return porletList;

}


Router = {
    context: {prefix: ""},
    mappings: {},
    porlets: {},
    current: {page: "", vpage: "", blk: ""},
    listener: {},
    addListener: function(key, fn) {
        Router.listener[key] = fn;

    },
    init: function(mappings, porlets) {
        Router.mappings = mappings;
        Router.porlets = porlets;
        Router.current = {page: "", vpage: "", blk: ""},
        $(window).bind('hashchange', function(e) {
            Router.onHashChange(location.href);
        });
    },
    loadbBlocks: function(box) {

        if (box.link && box.box) {

            $(box.box).load(box.link, function() {

                var blks = getPorlets(box.porlets, Router.porlets);

                loadPorlets(blks);

            });

        } else {

            var blks = getPorlets(box.porlets, Router.porlets);

            loadPorlets(blks);

        }


        function loadPorlets(porlets) {

            for (var i = 0; i < porlets.length; i++) {
                var ablock = porlets[i];
                if (ablock) {
                    PorletLoader.loadPorlet(ablock.box, [ablock.porlet]);
                }

            }
        }

    },
    gotoPage: function(params) {
        console.log("Goto " + JSON.stringify(params || {}));
        if (!Router.mappings)
            return;

        //获取mappings  
        if (!params.page) {
            params.page = "index"; //default   
        }

        var pageBox = Router.mappings[params.page];
        if (!pageBox) {
            //no page defined
            return;

        }
        var vpageBox = {};
        if (params.vpage && params.vpage !== '') {

            vpageBox = pageBox[params.vpage];
        } else {
            vpageBox = pageBox["main"]; //defalut  
            params.vpage = "main";
        }

        if (!vpageBox) {
            //no page mapping defined
            return;
        }


        //处理页面跳转
        if (Router.current.page !== params.page) {


            Router.loadbBlocks(vpageBox);

            Router.current = {};
            $.extend(Router.current, params);

        } else if ((Router.current.vpage !== params.vpage)) {

            //虚拟页面跳转，只加载变化部分
            //上一个页面
            var lastpage = pageBox[Router.current.vpage];

            var targetPorlet = {porlets: {}};

            for (var key in vpageBox.porlets || {}) {

                if (lastpage.porlets[key]) {
                    continue;
                }

                targetPorlet.porlets[key] = vpageBox.porlets[key];

            }

            if (targetPorlet.porlets.length <= 0) {
                //no porlet to load
                return;
            }

            //有没有布局要加载
            if (((lastpage.box || {}) !== (vpageBox.box || {}))
                    || ((lastpage.link || {}) !== (vpageBox.link || {}))) {
                //要加载布局
                if (vpageBox.box) {
                    targetPorlet.box = vpageBox.box;
                    targetPorlet.link = vpageBox.link;
                }

            }

            Router.loadbBlocks(targetPorlet);
            Router.current = {};
            $.extend(Router.current, params);


        } else {
            //处理页内跳转,只需要load块 
            if ((Router.current.blk) && (Router.current.blk === params.blk)) {
                return;
            }//no changes

            if (!params.blk) {
                //update all page
                Router.loadbBlocks(vpageBox);
                Router.current = {};
                $.extend(Router.current, params);
                return;
            }

            var blk = vpageBox.porlets[params.blk];
            if (blk) {

                PorletLoader.loadPorlet(blk.box, [Router.porlets[params.blk]]);
                Router.current.blk = params.blk;
            }
        }
    },
    goto: function() {

        Router.gotoPage(Router.parseHash());

    },
    getblock: function(url) {

        var arr = url.split('#'),
                hash = arr[1];
        if (hash) {
            var hashArr = hash.replace('page=', '').split('?'),
                    key = hashArr[0];
            return key;
        }

        return null;
    },
    onHashChange: function(url) {

        var params = Router.parseHash();

        Router.gotoPage(params);

        if (Router.listener) {

            for (var name in Router.listener) {
                if (name) {
                    Router.listener[name](url, key);

                }
            }
        }
    },
    getHashArgs: function(hash) {
        var arr1 = hash.replace('#', '').replace('page=', '').split('?'), // 起码不强求必须有#
                arr2 = arr1[1],
                args = [];
        if (typeof arr2 !== 'undefined') {
            arr2 = arr1[1].split('&');
            for (var i = 0, len = arr2.length; i < len; i++) {
                var tempArr = arr2[i].split('=');

                args.push(tempArr[1]);

            }
        }
        return args;
    },
    parseHash: function() {
        //utl patten: xxxx.html#page=xxxxx:xxxx?xxx=&xxx=
        var result = {};


        var path = location.href.split('#');

        var url = path[0];
        result.page = url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf("."));

        var vpage = "";
        if (path.length > 1) {

            var key = path[1].split("?");

            vpage = key[0].replace("page=", '');
            vpage = vpage.split(":");

            result.vpage = vpage[0];
            if (vpage.length > 1) {

                result.blk = vpage[1];
            }
        }

        result.params = Utils.getUrlParams(location.href);
        return result;
    }


};







