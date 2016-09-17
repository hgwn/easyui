
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

            //处理数组的情况
            var plst = [];
            if ($.isArray(mappings[key])) {


                for (i = 0; i < mappings[key].length; i++) {

                    var pkey = mappings[key][i];
                    plst.push(mappings[pkey]);
                }
                item = {box: keys[key].box, porlet: plst};

            } else {

                item = {box: keys[key].box, porlet: mappings[key]};

            }
            porletList.push(item);

        }

    }

    return porletList;

}


function loadPorlets(porlets, prefix) {

    for (var i = 0; i < porlets.length; i++) {
        var ablock = porlets[i];
        if (ablock) {
            if ($.isArray(ablock.porlet)) {
                PorletLoader.loadPorlet(ablock.box, ablock.porlet, prefix);

            } else {
                PorletLoader.loadPorlet(ablock.box, [ablock.porlet], prefix);
            }
        }

    }
}

Router = {
    prefix: "",
    mappings: {},
    porlets: {},
    current: {page: "", vpage: "", blk: "",params:{}},
    listener: {},
    addListener: function(key, fn) {
        Router.listener[key] = fn;

    },
    init: function(mappings, porlets, prefix) {
        Router.mappings = mappings;
        Router.porlets = porlets;
        Router.current = {page: "", vpage: "", blk: "",params:{}},
        $(window).bind('hashchange', function(e) {
            Router.onHashChange(location.href);
        });
        if (prefix) {
            this.prefix = prefix;
        }
    },
    loadbBlocks: function(vpage, added) {

        //加载布局块 
        if (vpage.link && vpage.box) {

            $(vpage.box).load(Router.prefix + vpage.link, function() {

                var blks = getPorlets(vpage.porlets, Router.porlets);

                loadPorlets(blks, Router.prefix);

            });

        } else {

            var targetPorlets = {};
            $.extend(targetPorlets, vpage.porlets);
            //可能需要加载动态块
            if (added && (!vpage.porlets[added]) && (Router.porlets[added]) && vpage.dynamic) {

                targetPorlets[added] = vpage.dynamic;


            }

            var blks = getPorlets(targetPorlets, Router.porlets);

            loadPorlets(blks, Router.prefix);
        }
    },
    gotoPage: function(params) {
        //console.log("Goto " + JSON.stringify(params || {}));
        if (!Router.mappings)
            return;
        //获取mappings  
        if (!params.page) {
            params.page = "index"; //default   
        }

        var pageBox = Router.mappings[params.page];
        if (!pageBox) {
            //no page defined,route to 404

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
        var targetPage = {};


        if (Router.current.page === "") {
            $.extend(targetPage, vpageBox);
        } else if ((Router.current.vpage !== params.vpage)) {

            //虚拟页面跳转，只加载变化部分
            //上一个页面
            var lastpage = pageBox[Router.current.vpage];

            for (var key in vpageBox.porlets || {}) {

                if (lastpage.porlets[key]) {
                    continue;
                }

                if (!targetPage.porlets) {
                    targetPage.porlets = {};
                }

                targetPage.porlets[key] = vpageBox.porlets[key];

            }

            //有没有布局要加载
            if (((lastpage.box || {}) !== (vpageBox.box || {}))
                    || ((lastpage.link || {}) !== (vpageBox.link || {}))) {
                //要加载布局
                if (vpageBox.box) {
                    targetPage.box = vpageBox.box;
                    targetPage.link = vpageBox.link;
                }

            }


        } else if (params.blk) {
            //处理页内跳转,只需要load块 
//            if (Router.current.blk === params.blk) {
//                
//                
//                return;
//            }//no changes


            targetPage = {};

            var blk = vpageBox.porlets[params.blk];


            if (blk) {
                if (!targetPage.porlets) {
                    targetPage.porlets = {};
                }

                targetPage.porlets[params.blk] = blk;

            }


        }

        //处理动态块
        if (params.blk && (!vpageBox.porlets[params.blk]) && (Router.porlets[params.blk]) && vpageBox.dynamic) {


            if (!targetPage.porlets) {
                targetPage.porlets = {};
            }

            targetPage.porlets[params.blk] = vpageBox.dynamic;
        }

        if (!$.isEmptyObject(targetPage)) {

            Router.loadbBlocks(targetPage);
            Router.current = {page: "", vpage: "", blk: ""};
            $.extend(Router.current, params);

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
                    Router.listener[name](url, params);

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







