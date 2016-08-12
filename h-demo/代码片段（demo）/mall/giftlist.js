// //秒杀红包
// var giftlist_top_f = function(){
//     var page = 1;
//     var i = 2;
//     //向后 按钮
//     $(".giftlist_top_bar-next").click(function(){
//         var $parent = $(this).parent("div.giftlist_top_bar"); //根据当前点击元素获取到父元素
//         var $v_content = $parent.find("#giftlist_top_barLink");  //寻找到“视频内容展示区域”外围的DIV元素
//         var $v_show = $v_content.find("ul");       //寻找到“视频内容展示区域”
//         var v_width = $v_content.width() ;
//         var len = $v_show.find("li").length;
//         var page_count = Math.ceil(len / i) ;
//         if( !$v_show.is(":animated") ){
//             if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
//                 $v_show.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面
//                 page = 1;
//             }else{
//                 $v_show.animate({ left : '-='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
//                 page++;
//             }
//         }
//     });
//     //往前 按钮
//     $(".giftlist_top_bar-prev").click(function(){
//         var $parent = $(this).parent("div.giftlist_top_bar");
//         var $v_content = $parent.find("#giftlist_top_barLink");
//         var $v_show = $v_content.find("ul");
//         var v_width = $v_content.width();
//         var len = $v_show.find("li").length;
//         var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
//         if( !$v_show.is(":animated") ){
//             if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
//                 $v_show.animate({ left : '-='+v_width*(page_count-1) }, "slow");
//                 page = page_count;
//             }else{
//                 $v_show.animate({ left : '+='+v_width }, "slow");
//                 page--;
//             }
//         }
//     });
// };

// 图片的滚动
$.fn.giftlist_turns= function(){
    $(this).each(function() {
        var shrink_page=0;
        var ul=$(this).find('ul');
        var size=ul.find('li').size();
        var width=ul.find('li').outerWidth(true);
        var divWidth=ul.parent().outerWidth(true);
        $(this).find('.giftlist_md_bar-prev').click(function(){
            if (shrink_page>0) {
                ul.stop(false,true).animate({"left":'+='+width+"px"},500);
                shrink_page--;
            }
        });
        $(this).find('.giftlist_md_bar-next').click(function(){
            if (shrink_page<size-4) {
                ul.stop(false,true).animate({"left":'-='+width+"px"},500);
                shrink_page++;
            }
        });

    });
}

