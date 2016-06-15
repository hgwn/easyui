Router = {
    mappings: {},
    current: {},
    listener: {},
    addListener: function(key, fn) {
        Router.listener[key] = fn;
    },
    init: function(mappings) {
        Router.mappings = mappings;

        $(window).bind("hashchange", Router.onHashChange);
        //window.addEventListener('hashchange', function(e) {
        //
        //    Router.onHashChange(e.newURL);
        //}, false);
    },
    goto: function(page, defaultkey) {

        var blocks = Router.mappings[page];

        if ($.isArray(blocks)) {

            var curBlock = blocks.slice();

            var curkey = Router.getblock(location.href);

            if (!curkey) {

                curkey = defaultkey;

            }

            var inarray = false;
            for (var i = 0; i < curBlock.length; i++) {

                if (curkey === curBlock[i]) {
                    inarray = true;
                    break;
                }

            }
            if (!inarray) {

                curBlock.push(curkey);
            }

            for (var i = 0; i < curBlock.length; i++) {
                var ablock = Router.mappings[curBlock[i]];
                if (ablock) {
                    PorletLoader.loadPorlet(ablock.box, ablock.porlets);
                }

            }
        }



    },
    routeTo: function(key, args) {

        var blocks = Router.mappings[key];
        //found porlets
        if (blocks) {
            if ($.isArray(blocks)) {

                for (var i = 0; i < blocks.length; i++) {
                    var ablock = Router.mappings[blocks[i]];
                    if (ablock) {
                        PorletLoader.loadPorlet(ablock.box, ablock.porlets);
                    }

                }
            }
            else {
                PorletLoader.loadPorlet(blocks.box, blocks.porlets);
            }

        }


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
    onHashChange: function() {
        var url=window.location.href;
        var arr = url.split('#'),
                hash = arr[1],
                hashArr = hash.replace('page=', '').split('?'),
                args = Router.getHashArgs(hash),
                key = hashArr[0];
        Router.routeTo(key, args);

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
    }


};







