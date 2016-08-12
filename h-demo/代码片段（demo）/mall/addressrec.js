//样式判断
function checkHeight(ele){
    var h = $(ele).height();
    if( h > 55 ){
        $(ele).css("line-height","26px")
    }else{
        $(ele).css("line-height","55px")
    }
}

/* 新增地址 修改地址 */
var address_box = {
    flag : 0,//状态 假
    open : 0,//默认地址开关
    init:function(title,area,allInfo,name,code,tel,IsDefault,proId,cityId,proName,CityName,callback){
        //过滤参数值
        area = area == undefined ? "" : area;
        allInfo = allInfo == undefined ? "" : allInfo;
        name = name == undefined ? "" : name;
        code = code == undefined ? "" : code;
        tel = tel == undefined ? "" : tel;
        IsDefault = IsDefault == undefined ? 0 : IsDefault;
        proId = proId == undefined || proId == null ? 0 : proId;
        CityId = cityId == undefined || cityId == null ? 0 : cityId;

        var bigDiv = "<div class='bigDiv'></div>";

        var oDiv = "<div class='alertBox'>";

            oDiv += "<p class='p_title'>添加地址 <span class='span_close'>";
            oDiv += "<span></span></span></p><div class='alertMain'>";
            oDiv += "<p id='p_area' class='alert_p p_instance'>";
            oDiv += "<label>所在地区<span>*</span>：</label>";
            oDiv += "<input type='text' readonly='readonly'";
            oDiv += "class='place input_place p_atten' placeholder='请选择省市'/>";
            oDiv += "<img src='images/mall/input_place.png' /></p>";
            oDiv += "<p class='alert_p p_instance'><label>详细地址<span>*</span>：";
            oDiv += "</label><textarea class='all_area p_atten' placeholder='请填写详细地址'></textarea></p>";
            oDiv += "<p class='alert_p p_instance'><label>邮政编码<span>*</span>：";
            oDiv += "</label><input type='text' class='place code p_atten'";
            oDiv += "placeholder='如您不清楚邮递区号，请填000000'/></p>";
            oDiv += "<p class='alert_p p_instance_less'><label>收货人姓名<span>*</span>：";
            oDiv += "</label><input type='text' class='place name p_atten'";
            oDiv += "placeholder='长度不超过20个字符'/></p>";
            oDiv += "<p class='alert_p p_instance '><label>手机号码<span>*</span>：";
            oDiv += "</label><input type='text' class='place tel p_atten'";
            oDiv += "placeholder='手机号码或电话号码必须填一项' /></p>";
            oDiv += "<p class='alert_p p_instance_more'><label style='line-height:25px'>默认地址：";
            oDiv += "</label><span class='switch switch_gray'><span class='span_left'></span></span></p>";
            oDiv += "<button class='assign'>确定</button><div id='selDiv'>";
            oDiv += "<select id='sel_province'><option>请选择您的省份</option></select>";
            oDiv += "<select id='sel_city'><option>请选择您的城市</option></select>";
            oDiv += "</div></div></div>"

        $(".contain_main").prepend(oDiv);
        $("body").prepend(bigDiv);

        var input_place  = $(".input_place");//获取地区$对象
        var placeStr = input_place.val();

        var proNum = 0;
        var cityNum = 0;

        //点关闭
        $(".span_close").on("click",function(){
            address_box.close();
        });


        

        //所在地区
        $("#p_area img").on("click",function(){
            $("#sel_province").find("option").not(":eq(0)").remove();//清空省份select中的option
            $("#sel_city").find("option").not(":eq(0)").remove();
            $("#selDiv").show();//select出现
            address_box.loadProvin();//同时加载省份信息加入到select省中
        });

        

        //省份select点击
        $("#sel_province").on("change",function(){
            //省份select值发生更改则清空城市select的值
            if($(this).val() !="请选择您的省份"){
                placeStr = "";//先清空地区栏的值
                var index = $(this).get(0).selectedIndex;//获取当前选中值得索引
                placeStr += $(this).val();//placeStr自加
                input_place.val(placeStr);//设置区域值
                var proId = $(this).find("option").eq(index).attr("idname");//获取id值
                address_box.loadCity(proId);//城市select加载
                proNum = 1;
            }
        });


        //城市city点击
        $("#sel_city").on("change",function(){
            if($(this).val() != "请选择您的城市"){
                placeStr += $(this).val();
                input_place.val(placeStr);
                cityNum = 1;
                $("#selDiv").hide()
            }
        });
        

        //默认地址开关
        $(".switch").bind("click",function(){
            if($(this).hasClass("switch_gray")){
                $(this).removeClass("switch_gray").addClass("switch_red");
                $(this).find("span").removeClass("span_left").addClass("span_right");
                address_box.open = 1;
            }else{
                $(this).removeClass("switch_red").addClass("switch_gray");
                $(this).find("span").removeClass("span_right").addClass("span_left");
                address_box.open = 0;
            }
        });

        
        address_box.touch($(".p_atten"),$(".assign"));
        
        $(".assign").on("click",function(){
            var provinceIndex = $("#sel_province").get(0).selectedIndex;
            var cityIndex = $("#sel_city").get(0).selectedIndex;
            var provinceId = $("#sel_province").find("option").eq(provinceIndex).attr("idname");
            var provinceName = $("#sel_province").val();
            var cityId = $("#sel_city").find("option").eq(cityIndex).attr("idname");
            var cityName = $("#sel_city").val();
            var detailAddr = $(".all_area").val();
            var consignee = $(".name").val();
            var postcode  = $(".code").val();
            var mobile = $(".tel").val();
            var isDefault = address_box.open;
            console.log(provinceId,provinceName,cityId,cityName,detailAddr,consignee,postcode,mobile,isDefault)
            address.add(provinceId,provinceName,cityId,cityName,detailAddr,consignee,postcode,mobile,"",isDefault);
        })
    },
    //关闭弹窗
    close:function(){
        $(".bigDiv,.alertBox").hide();
    },
    //检查确定按钮
    check:function($comfirm){
        if(address_box.flag){
            $comfirm.addClass("btn_bg");
            $comfirm.hover(function(){
                $(this).addClass("assign_hover");
            },function(){
                $(this).addClass("assign_hover");
            });

        }else{
            $comfirm.removeClass("btn_bg");
        }

       
    },
        
    //必选项检查
    touch:function($arr,$comfirm){
        var str = /[^\u0000-\u00FF]/;//检测中文正则
        var code = /^[1-9][0-9]{5}$/;//检测邮政编码正则
        var tel = /^1[34578]\d{9}$/; //检测手机号码正则
        
        

        $arr.on("blur",function(){
            var index = $arr.index($(this));
            if($.trim($(this).val()) != ""){
                $(this).removeClass("border_color");
            }else{
                $(this).addClass("border_color");
            }

            if(index == 2){
                if(code.test($.trim($(this).val()))){
                    $(this).removeClass("border_color");
                }else{
                    $(this).addClass("border_color");
                }
            }

            if(index == 3){
                if(str.test($.trim($(this).val()))){
                    $(this).removeClass("border_color");
                }else{
                    $(this).addClass("border_color");
                }
            }

            if( index == 4){
                if(tel.test($.trim($(this).val()))){
                    $(this).removeClass("border_color");
                }else{
                    $(this).addClass("border_color");
                }
            }
        });

        $(".alertMain").on("click",function(){
            $arr.each(function(){
                if($.trim($(this).val()) == "" || $(this).hasClass("border_color")){
                    return address_box.flag = 0;
                }else{
                    address_box.flag = 1;
                }
            });
            address_box.check($comfirm);
        })

    },

    //加载省份
    loadProvin:function(){
        var pro_url = "/dlapi/cms/areas/listProvince?parent_id=&parent_path=/系统目录/地区/";
        
        var pro_Option = "";

        DeelonService.get(pro_url,"",function(data){
            for(var i=0;i<data.length;i++){
                pro_Option += "<option idName='"+ data[i].id +"'>"+ data[i].resName +"</option>";
            };
            $("#sel_province").append(pro_Option);
        });
    },
    //加载城市
    loadCity:function(id){
        var city_url = "/dlapi/cms/areas/list/" + id;
        //每一次加载城市列表信息时需先清空子节点

        var city_Option = "";

        DeelonService.get(city_url,"",function(data){
            var city_Option = "<option>请选择您的城市</option>";
            for(var i=0;i<data.length;i++){
                city_Option += "<option idName='"+ data[i].id +"''>"+ data[i].resName +"</option>";
            };
            $("#sel_city").append(city_Option);
        });
    },
};



/* 购物车创建 购物车信息 */
var giftcar_info = {
    url:"/dlsys/market/shoppingCar",
    data:{},//数据
    light:0,
    init:function(){
        DeelonService.get(giftcar_info.url,"",function(jsonData){
            if(jsonData.code == 0 ){
                giftcar_info.data = jsonData.result;//json数据传送给data
                console.log(giftcar_info.data);
                var num = 0 ;


                if( giftcar_info.data ){
                    $("#noShopInfo").hide();
                    $("#shopInfo").show();

                    var oTable = "<table class='giftInfo'><tr>";

                    oTable += "<th style='width:458px;' class='txt_left'>";
                    oTable += "<span class='first_th_td'><input type='checkbox' />&nbsp;&nbsp;全选</span>";
                    oTable += "<span style='margin-left:168px;'>礼品名称</span></th>";
                    oTable += "<th style='width:180px;'>单件积分</th>";
                    oTable += "<th style='width:179px;'>兑换数量</th>";
                    oTable += "<th style='width:179px;'>所需积分</th>";
                    oTable += "<th>操作</th></tr></table>";

                    $(".shopCar_title").after(oTable);



                    for(var i=0;i<giftcar_info.data.length;i++){
                        var single = giftcar_info.data[i].gift;
                        //没有图片显示 则设置一个默认图片
                        if( single.giftPhotoJson == undefined || single.giftPhotoJson == "" || single.giftPhotoJson == null ){
                            if( single.giftModule == 1 ){
                                single.giftPhotoJson = "images/mall/gift_j_100.png";
                            }

                            if( single.giftModule == 2 ){
                                single.giftPhotoJson = "images/mall/temp/temp1.jpg";
                            }
                        }



                        var oTr = "<tr><td class='txt_left'><span class='first_tr_td'><input type='checkbox' /></span>";

                        oTr += "<div class='giftName'><img src='"+ single.giftPhotoJson +"' />";
                        oTr += "<span class='giftName_title'>" + single.giftName + " </span></div></td>"
                        oTr += "<td>"+ single.needPointAmount +"</td>"
                        oTr += "<td><div class='exchangeNum'><a class='reduce'>-</a>";
                        oTr += "<input type='text' readonly='readonly' class='num_value' value='"+ giftcar_info.data[i].quantity +"'/> <a class='add'>+</a></div></td>";
                        oTr += "<td>"+ parseInt(single.needPointAmount) * giftcar_info.data[i].quantity +"</td>";
                        oTr += "<td><a class='operation'>删除</a></td></tr>";

                        $(".giftInfo").append(oTr);


                        var bTn = "<p id='sub_empty'><input type='button' value='立即兑换'/><a>清空购物车</a></p>";

                        $("#shopInfo").append(bTn);

                        

                        //减法
                        $(".reduce").each(function(){
                            $(this).click(function(){
                                var $inputVal = $(this).parent().find(".num_value"),//当前文本框$对象
                                    $nextEle = $(this).parent().parent().next(),
                                    url = "/dlsys/market/shoppingCar/decreaseGift/" + single.id;
                                if( $inputVal.val() > 1 ){
                                    DeelonService.post(url,single.id,function(data){
                                        $inputVal.val(parseInt($inputVal.val()) - data.result);
                                        num = $inputVal.val();
                                        $nextEle.text( num * single.needPointAmount )
                                    })
                                }
                            })
                        });


                        //加法
                        $(".add").each(function(){
                            $(this).click(function(){
                                var $inputVal = $(this).parent().find(".num_value"),//当前文本框$对象
                                    $nextEle = $(this).parent().parent().next(),
                                    url = "/dlsys/market/shoppingCar/increaseGift/" + single.id;



                                var moreExch = single.totalGainAmount;//最多可兑换数量
                                var exChanged = single.giftExAmount;//已经兑换的数量
                                var onceExch = single.gainAmount;//每次可兑换的数量
                                var rest = single.giftLeftAmount;//礼品剩余数量

                                //判断可购买的数量
                                if( rest == -1 ){//礼品数量无限制
                                    if( moreExch == -1 ){ //可无限制兑换
                                        if( $inputVal.val() < onceExch ){ //当前期望兑换数量小于每次课兑换数量
                                            DeelonService.post(url,single.id,function(data){

                                                $inputVal.val(parseInt($inputVal.val()) + data.result);
                                                num = $inputVal.val();
                                                $nextEle.text( num * single.needPointAmount );
                                            })
                                        }
                                    }else{  //不可无限制兑换
                                        if( $inputVal.val() < moreExch - exChanged ){  //当前期望兑换数量小于 还可兑换数量
                                            DeelonService.post(url,single.id,function(data){

                                                $inputVal.val(parseInt($inputVal.val()) + data.result);
                                                num = $inputVal.val();
                                                $nextEle.text( num * single.needPointAmount );
                                            })
                                        }
                                    }
                                }else{//剩余礼品数量
                                    if( rest > moreExch - exChanged ){ //剩余礼品数量大于还可兑换数量
                                        if( $inputVal.val() < moreExch - exChanged ){//当前添加的数量 小于 还可兑换的数量
                                            DeelonService.post(url,single.id,function(data){

                                                $inputVal.val(parseInt($inputVal.val()) + data.result);
                                                num = $inputVal.val();
                                                $nextEle.text( num * single.needPointAmount );
                                            })
                                        }
                                    }else{  //剩余礼品数量小于还可兑换数量
                                        if( $inputVal.val() < moreExch - exChanged && $inputVal.val() < rest  ){ //当前期望兑换数量小于还可兑换数量且当前期望兑换数量小于剩余数量
                                            DeelonService.post(url,single.id,function(data){

                                                $inputVal.val(parseInt($inputVal.val()) + data.result);
                                                num = $inputVal.val();
                                                $nextEle.text( num * single.needPointAmount );
                                            })
                                        }
                                    }
                                }
                            })
                        });


                        //删除
                        $(".operation").each(function(){
                            $(this).click(function(){
                                var url = "/dlsys/market/shoppingCar/delGift/"+single.id;
                                $parent = $(this).parent().parent();//tr元素
                                DeelonService.del(url,single.id,function(data){
                                    $parent.remove();//删除节点
                                    giftcar_info.check();
                                })
                            })
                        });


                    }


                    //清空购物车
                    $("#sub_empty a").on("click",function(){
                        var url = "/dlsys/market/shoppingCar/clearShoppingCar";
                        DeelonService.del(url,"",function(data){
                            $(".giftInfo").remove();
                            giftcar_info.check();
                        })
                    })

                    //样式判断
                    $(".giftName_title").each(function(){
                        checkHeight(this);
                    })



                    //全选
                    $(".giftInfo th input[type='checkbox']").on("click",function(){
                        if( giftcar_info.light == 0 ){
                            giftcar_info.light = 1;
                            $(".giftInfo tr input[type='checkbox']").prop("checked","true");
                        }else{
                            giftcar_info.light = 0;
                            $(".giftInfo tr input[type='checkbox']").removeAttr("checked");
                        }
                    })


                    //全选与单选
                    $(".first_tr_td input").on("click",function(){
                        $(".first_tr_td input").each(function(){
                            if( $(this).prop("checked") ){
                                $(".first_th_td input").prop("checked","true");
                            }else{
                                $(".first_th_td input").removeAttr("checked");
                                return false;
                            }
                        })
                    })


                    //立即兑换
                    $("#sub_empty input").on("click",function(){
                        var val = 0;//状态变量
                        var arr = [];//数组
                        var giftId = "";//字符串拼接
                        var quantitie = "";//字符串拼接
                        var url = "/dlsys/market/mallOrder/confirmOrder";

                        $(".giftInfo input[type='checkbox']").each(function(){
                            if( $(this).prop("checked") ){
                                return val = 1;
                            }
                        });

                        if(user.data.id == undefined || user.data.id == "" ){
                            jAlert.info("您还没有登录！");
                        }else{
                            if( val ){
                            $(".first_tr_td input").each(function(){
                                if( $(this).prop("checked") ){
                                    var index = $($(".first_tr_td input")).index($(this)),//当前单选框所在群组的索引
                                        num = parseInt($(this).parent().parent().siblings().find(".num_value").val()),//数量
                                        son = {"giftId":giftcar_info.data[index].giftId,"quantitie":num,};
                                    arr.push(son);
                                }
                            });

                            for( var i= 0;i<arr.length;i++ ){
                                giftId += arr[i].giftId + ",";
                                quantitie +=  arr[i].quantitie + ","
                            }

                            DeelonService.post(url,{ giftId:giftId,quantitie:quantitie,userId:user.data.id },function(data){
                                
                                if(data.code == 0){
                                    global_data = data.result;
                                    window.location = "index.html#page=giftcomfirm";
                                }else{
                                    jAlert.info("数据异常，请重新操作");
                                }
                            });
                        }else{
                            jAlert.info("您还没有可以兑换的商品哦！");
                        }
                        }

                        



                    });

                }else{
                    $("#shopInfo").hide();
                    $("#noShopInfo").show();
                }



            }else{
                giftcar_info.toAlert();
            }
        })
    },
    check:function(){
        if( $(".giftInfo tr").length < 2 || $(".giftInfo") == undefined ){
            $("#noShopInfo").show();
            $("#shopInfo").hide();
        }else{
            $("#noShopInfo").hide();
            $("#shopInfo").show();
        }
    }

};


//接收数据
var global_data;

/*确认礼品信息*/
var giftcomfirm_info = {
     init:function(){
        

        //返回的数据用全局变量global_data接收  以下为处理数据
        if( global_data.addrList.length < 1 ){ //返回的数据地址组小于0 则要求添加地址
            //
        }else{
            console.log(global_data.addrList);
            var totalPoint = 0;

            var radioId = 0;//用于获取地址id索引
            //提交订单传送的参数
            
            var sub_giftId = "";//礼品id
            var sub_quantity = "";//礼品数量
            var userId = user.data.id;//用户id
            var userName = user.data.name;//用户名
            var addId = global_data.addrList[radioId].id;//用户地址id
            var remark = "";

            //提交订单传送的参数

            //创建购物车table
            giftcomfirm_info.createTab();

            for(var i=0;i<global_data.giftList.length;i++){

                var single = global_data.giftList[i];//礼物对象
                var picUrl = single.gift.giftPhotoJson;

                sub_giftId += single.giftId +",";
                sub_quantity += single.quantity + ",";

                //如果图片路径为空或null或undefined 则设置成默认图片 
                picUrl = picUrl == undefined || null || "" ? picUrl = "images/mall/gift_j_100.png" : picUrl;



                var o_tr = "<tr><td class='txt_left'><div class='giftName'>";

                o_tr += "<img src='"+ picUrl +"' class='imgLeft'/>";
                o_tr += "<span class='giftName_title'>"+ single.gift.giftName +"</span></div></td>";
                o_tr += "<td>"+ single.gift.needPointAmount +"</td><td>" + single.quantity +"</td><td>" + single.gift.needPointAmount * single.quantity + "</td>";
                
                totalPoint += single.gift.needPointAmount;

                $(".giftInfo").append(o_tr);
            }
            //创建购物车table
            
            //使用积分支付 合计积分
            giftcomfirm_info.setVal(totalPoint);
            //使用积分支付 合计积分


            var p_rec = "<p class='shopCar_title'>选择收货地址</p>";
            $(".header_links").after(p_rec); //把收货地址插入到头部链接后面

            var oDiv = "<div class='person_address'></div>";//创建收件地址div
            $(".shopCar_title").after(oDiv);//把创建的收件地址盒子放到标题后面

            //地址栏读取
            for(var i=0;i<global_data.addrList.length;i++){
                var addressInfo = global_data.addrList[i];//单条数据地址信息
                var tel = 0;//定义变量为接收的手机号码
                var isDefault = addressInfo.isDefault;//变量接收默认地址初始值

                var strDefault;//默认地址

                isDefault = isDefault ? strDefault = "默认地址" : strDefault = "";


                /* 电话号码判断 */
                if( addressInfo.mobile ){
                    tel = addressInfo.mobile;
                }else if( addressInfo.phone ){
                    tel = addressInfo.phone;
                }else{
                    jAlert.info("数据异常");
                }
                /* 电话号码判断 */

                giftcomfirm_info.createDiv(addressInfo.provinceName,addressInfo.cityName,addressInfo.detailAddr,addressInfo.consignee,tel,isDefault);

                // var sonDiv = "<div class='person_info'>";

                
                // sonDiv += "<input type='radio' name='address' />";//单选框 
                // sonDiv += "<span class='province'>" + addressInfo.provinceName + "</span>";//省份
                // sonDiv += "<span class='city'>" + addressInfo.cityName + "</span>";//城市
                // sonDiv += "<span class='all_info'>" + addressInfo.detailAddr + "</span>";//详细地址
                // sonDiv += "<div><span style='margin:0;''>(</span><span class='person_name'>" + addressInfo.consignee + "</span>收)</div>";//收件人
                // sonDiv += "<span class='tel'>" + tel + "</span>";//联系电话
                // sonDiv += "<span class='default_address'>" + isDefault +"</span>";//默认地址
                // //地址设置
                // sonDiv += "<span class='setting'><span class='span_del'>删除</span>";//删除
                // sonDiv += "<span class='span_edit'>编辑</span>";//编辑
                // sonDiv += "<span class='setDefault'>设为默认地址</span></span></div>";//设置默认地址

                //地址节点创建完成加入到收件地址盒子
                // $(".person_address").append(sonDiv);

            }
            //检测地址栏下是否存在默认地址文字  存在所在盒子添加样式 及 radio选中
            $(".person_info").each(function(){
                var address = $(this).find(".default_address").text();
                if( address != "" ){
                    $(this).addClass("checked").find("input[type='radio']").prop("checked",true);//单选框选中
                    $(this).find(".setDefault").hide();//设置默认地址隐藏
                }else{
                    $(this).removeClass("checked").find("input[type='radio']").prop("checked",false);//单选框未选中
                    $(this).find(".setDefault").show();//设置默认地址显示
                }

                
                //盒子hover事件
                $(this).hover(function(){
                    $(this).find(".setting").show();//显示编辑 删除 设置默认地址
                },function(){
                    $(this).find(".setting").hide();
                });

            })

            //删除地址栏
            $(".person_info .span_del").each(function(){
                $(this).on("click",function(){
                    var parent = $(this).parent().parent();//爷爷级Jquery对象
                    var index =  $(".person_info").index(parent);//获取索引
                    var delId = global_data.addrList[index].id;
                    var url = "/dlsys/market/userAddr/" + delId;
                    DeelonService.del(url,{id:delId},function(data){
                        if(data.code == 0){
                            parent.remove();
                        }
                    })
                });
            });

            //编辑地址栏
            $(".person_info .span_edit").each(function(){
                $(this).on("click",function(){
                    var parent = $(this).parent().parent();//爷爷级Jquery对象
                    var index =  $(".person_info").index(parent);//获取索引
                    var editId = global_data.addrList[index].id;
                    var url =  "/dlsys/market/userAddr/" + editId;
                })
            })

            //radio点击事件 -> 盒子颜色更换
            $(".person_info input[type='radio']").on("click",function(){
                $(this).parent().addClass("checked").siblings().removeClass("checked");
                radioId = $(".person_info input[type='radio']").index($(this));
            });


            //添加收货地址            
            $(".add_ress").on("click",function(){
                address_box.init("添加地址","","","","","","","","");

            });
            

            //提交订单
            $(".btn_sub").on("click",function(){
                remark = $(".remarks input").val();//获取备注信息
                giftcomfirm_info.submit(sub_giftId,sub_quantity,userId,userName,addId,remark);

            })
            
        }

        giftcomfirm_info.toChange();

    },
    //创建购物车表格
    createTab:function(){
        var oTable = "<table class='giftInfo giftInfo_car'><tr>";

        oTable += "<th>礼品名称</th><th>单件积分</th>";
        oTable += "<th>兑换数量</th><th>所需积分</th></tr></table>";

        $(".remarks").before(oTable);
        
    },
    //备注
    toChange:function(){
        $(".remarks input").on("keyup",function(){
            var $tip = $(".remarks_tip");
            var len = 35 - parseInt($(this).val().length);
            if( len < 0 ){
                $(this).val($(this).val().substr(0,35));
                len = 0;
            }
            $tip.text(len);
        })
    },
    //设置积分支付 和 合计积分
    setVal:function(val){
        $(".choose_point").text(val);
        $(".total_point").text(val);
    },
    //提交订单
    submit:function(_giftId,_quantity,_userId,_userName,_addrId,_remark){
        var url = "/dlsys/market/mallOrder/createEntity";
        DeelonService.post(url,{giftId:_giftId,quantity:_quantity,userId:_userId,userName:_userName,addrId:_addrId,remark:_remark},function(data){
            if( data.code == 0 ){
                jAlert.success("兑换成功");
                setTimeout(function(){
                    window.location = "members.html#page=gift?bread=我的礼品";
                },2000);
            }else{
                jAlert.error("数据异常，请联系管理员");
            }
        })
    },
    //创建节点
    createDiv:function(provinceName,cityName,detailAddr,consignee,tel,isDefault){
        sonDiv = "<div class='person_info'>";
        sonDiv += "<input type='radio' name='address' />";//单选框 
        sonDiv += "<span class='province'>" + provinceName + "</span>";//省份
        sonDiv += "<span class='city'>" + cityName + "</span>";//城市
        sonDiv += "<span class='all_info'>" + detailAddr + "</span>";//详细地址
        sonDiv += "<div><span style='margin:0;''>(</span><span class='person_name'>" + consignee + "</span>收)</div>";//收件人
        sonDiv += "<span class='tel'>" + tel + "</span>";//联系电话
        sonDiv += "<span class='default_address'>" + isDefault +"</span>";//默认地址
        //地址设置
        sonDiv += "<span class='setting'><span class='span_del'>删除</span>";//删除
        sonDiv += "<span class='span_edit'>编辑</span>";//编辑
        sonDiv += "<span class='setDefault'>设为默认地址</span></span></div>";//设置默认地址
        $(".person_address").append(sonDiv);
    }

    
};


var address = {
    //添加地址
    add:function(provinceId,province_name,cityId,city_name,detailAddrInfo,consignee_name,postcode_val,mobile_tel,phone_tel,isdefault){
        var url = "/dlsys/market/userAddr";
        DeelonService.post(url,{
            userId:user.data.id,
            userName:user.data.name,
            province:provinceId,
            provinceName:province_name,
            city:cityId,
            cityName:city_name,
            detailAddr:detailAddrInfo,
            consignee:consignee_name,
            postcode:postcode_val,
            mobile:mobile_tel,
            phone:phone_tel,
            isDefault:isdefault
        },function(data){
            if(data.code == 0){

            }
        })
    },
    //修改地址
    edit:function(){

    }
};



