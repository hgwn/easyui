
var porlets = {
    header: {link: "block/header_blk.html", name: ""},
    footer: {link: "block/footer_blk.html", name: ""},
    banner: {link: "biz/banner_blk.html", name: ""},
    hotproj: {link: "biz/hotproj_blk.html", name: ""},
    news: {link: "biz/news_blk.html", name: ""},
    loadapply: {link: "apply/apply_blk.html"},
    folder:{link:"articles/folder.html"}
};

var mappings = {
    version: 2.0,
    index: {
        main: {
            box: "#main_box",
            link: "main_box.html",
            porlets: {
                header: {box: "#header_box"},
                footer: {box: "#footer_box"},
                banner: {box: "#banner_box"},
                hotproj: {box: "#hot_box"},
                news: {box: "#news_box"}

            }

        },
        load: {
            porlets: {
                header: {box: "#header_box"},
                footer: {box: "#footer_box"},
                loadapply: {box: "#main_box"}
            }
        },
        my: {
            porlets: {
                header: {box: "#header_box"},
                footer: {box: "#footer_box"},
            }

        }
    },
    about:{
        folders:{
            porlets: {
                header: {box: "#header_box"},
                footer: {box: "#footer_box"},
                folder: {box: "#sidebar_box"}
            }
        }
    }
};

