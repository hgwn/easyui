

//加载公共底部
function LoadFootNav(){
    var tpl='<footer id="footernav"></footer>',url='html/comm/FooterNav.html';
    var len=$("#footernav").length;
    if(len<0){
        $('#index_section').append(tpl);
        $("#footernav").load(url);
    }else{
        $("#footernav").load(url);
    }
}
//获取指定key的hash值
function getHash(key, url) {
    var hash;
    if (!!url) {
        hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        hash = (hash == url) ? "" : hash;
    } else {
        hash = self.location.hash;
    }
    hash = "" + hash;
    hash = hash.replace(/^[?#]/, '');
    hash = "&" + hash;
    var val = hash.match(new RegExp("[\&]" + key + "=([^\&]+)", "i"));
    if (val == null || val.length < 1) {
        return null;
    } else {
        return decodeURIComponent(val[1]);
    }
}
function loadPanel() {
    var page = getHash("page"),z_head=$('#loadheader'),z_main=$("#main_article");
    console.log(page);
    if (page == 'recharge') {
        $("#footernav").remove();
        $("#main_article").css('bottom','0px');
        z_head.load('html/recharge/header.html');
        z_main.load('html/recharge/main.html',function(){pagescroll('#main_article');});
    }
    if (page == 'cash') {
        $("#footernav").remove();
        $("#main_article").css('bottom','0px');
        z_head.load('html/cash/header.html');
        z_main.load('html/cash/main.html',function(){pagescroll('#main_article');});
    }
    if(page == null){
        z_head.load('html/index/header.html');
        LoadFootNav();//加载底部
        z_main.load('html/index/main.html');//main.html有二级加载页面，滚动初始化需要在二级页面上初始化
    }
}
$(window).bind("hashchange", loadPanel);

//页面滚动初始化
var pagescroll=function(obj){
    var myScroll = new IScroll(obj,{
        preventDefault: false,
        mouseWheel: true,
        scrollbars : 'custom',
        fadeScrollbars : true,
        click : true
    });
}



$(function(){
    $(window).trigger("hashchange");

    $('.historyback').on('click',function(){
        alert(1);
        history.back(-1);
    })

})

