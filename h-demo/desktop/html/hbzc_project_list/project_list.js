var _current_page = 0;

var ProjectListJS={
	typeArray : {},
	percent : 0,
	nowDate : 0,
	isPage : false,
	TotalPages : "",
    init:function(){
        var This = this;
        ProjectListJS.render();
        ProjectListJS.state();
        ProjectListJS.type();
        ProjectListJS.city();
        ProjectListJS.pagination();
    },
    state : function () {
    	var stateUrl = path.cms + '/sysDic/list?parent_id=&pageNum=1&pageSize=100&parent_path=/系统目录/数据字典/hbzc/项目状态/';
		stateUrl = encodeURI(stateUrl);
    	$.getJSON(stateUrl, function (data) {
            //绑定众筹状态数据
            var json = new Array();
            if(data.content != null && data.content.length > 0){
            	for(var i = 0; i < data.content.length; i++){
            		switch(data.content[i].resName){
            			case "众筹中":
            				json[json.length] = data.content[i];
            				break;
            			case "满标":
            				json[json.length] = data.content[i];
            				break;
            			case "众筹成功":
            				json[json.length] = data.content[i];
            				break;
            			case "预热中":
            				json[json.length] = data.content[i];
            				break;
            			default:
            				break;
            		}
            	}
            }
            Utils.bindList("#state", "#state_item", json , null ,function (item,data) {
            	$(item).on("click",function () {
            		$("#state_data").val(data.itemValue);
            		$("#pageNum").val("1");
            		_current_page = 0;
					setTimeout(function(){
						ProjectListJS.pagination();
					},30)

            	});
            });

    	});
    },
    type : function () {
    	var typeUrl = path.cms + '/sysDic/list?parent_id=&pageNum=1&pageSize=100&parent_path=/系统目录/数据字典/hbzc/项目类别/';
		typeUrl = encodeURI(typeUrl);
    	$.getJSON(typeUrl, function (data) {
    		
    		ProjectListJS.typeArray = data.content;
    		
    		//绑定项目行业数据
            Utils.bindList("#type", "#type_item", data.content , null ,function (item,data) {
            	$(item).on("click",function () {
            		$("#type_data").val(data.itemValue);
            		$("#pageNum").val("1");
            		_current_page = 0;
            		ProjectListJS.pagination();
            	});
            });
    	});
    },
    city : function () {
    	var cityUrl = path.cms + '/areas/search?pageNum=1&pageSize=10000&column=&condition=&queryParams={"depth":"2","isRecommented":"1"}';
    	$.getJSON(cityUrl, function (data) {
    		//绑定所在地区数据
            Utils.bindList($("#city"), $("#city_item"), data.content , null ,function (item,data) {
            	$(item).on("click",function () {
            		$("#city_data").val(data.id);
            		$("#pageNum").val("1");
            		_current_page = 0;
            		ProjectListJS.pagination();
            	});
            });
    	});
    },
    render:function(){

		//返回页面顶部
		var goTopRight = ($(window).width()-1180)/2-50;
		$('.project_go_top').css("right",goTopRight+"px");
		$('.project_go_top').on("click",function(){
			$(this).addClass("on");
			$('html, body').stop().animate({scrollTop: 0},800,function(){
				$('.project_go_top').removeClass("on");
				$('.project_go_top').hide();
			});
		})

		$(window).scroll(function(){
			//返回顶部按钮出现
			if(goTopRight<0){
				goTopRight = ($(window).width()-1180)/2-50;
				$('.project_go_top').css("right",goTopRight+"px");
			}
			if ($(window).scrollTop() > 500) {
				$('.project_go_top').show();
			} else {
				$('.project_go_top').hide();
			}
		})


		//列表清单
        $('.main-list ul li').click(function(){
            $(this).addClass('current').siblings().removeClass('current');
        	var who = $(this).attr("data-value");
        	switch(who){
        		case "state":
        			$("#state_data").val("");
        		  	break;
        		case "type":
        			$("#type_data").val("");
        		  	break;
        		case "city":
        			$("#city_data").val("");
        		  	break;
        		default:
        			break;
        	}
        	$("#pageNum").val("1");
        	_current_page = 0;
        	ProjectListJS.pagination();
        });

        // 列表排序
        $(".main-list-bt ul li a").click(function(){
        	var sort = "";
        	var who = $(this).attr("data-value");
            if($(this).hasClass('active')){
            	$(".active").removeClass('active');
            	$(".active_second").removeClass('active_second');
                $(this).removeClass('active');
                $(this).addClass('active_second').siblings().removeClass('active_second');
                sort = "1";
            }else{
            	$(".active").removeClass('active');
            	$(".active_second").removeClass('active_second');
                $(this).removeClass('active_second')
                $(this).addClass('active').siblings().removeClass('active');
                sort = "2";
            }
            
            $("#createTime_sort").val("");
            $("#financing_sort").val("");
            $("#pcomplete_sort").val("");
            $("#invest_sort").val("");
			switch(who){
		    	case "createTime":
		    		$("#createTime_sort").val(sort);
				  	break;
		    	case "financing":
		    		$("#financing_sort").val(sort);
				  	break;
		    	case "pcomplete":
		    		$("#pcomplete_sort").val(sort);
				  	break;
		    	case "invest":
		    		$("#invest_sort").val(sort);
				  	break;
				default:
					break;
			}
			$("#pageNum").val(1);
			_current_page = 0;
			ProjectListJS.pagination();
        });

        $(".imgLeft").bind("click", function() {
        	var pageNum = $("#pageNum").val();
        	if((pageNum*1) > 1){
        		ProjectListJS.isPage = true;
        		pageNum--;

				if(Number(pageNum)==1){
					$('.imgLeft').addClass('disabled');
					if(ProjectListJS.TotalPages>1){
						$('.imgRight').removeClass('disabled');
					}
				}else if(Number(pageNum)>1 && Number(pageNum)<ProjectListJS.TotalPages){
					$('.imgLeft').removeClass('disabled');
					$('.imgRight').removeClass('disabled');
				}else if(Number(pageNum)==ProjectListJS.TotalPages){
					$('.imgRight').addClass('disabled');
					if(ProjectListJS.TotalPages>1){
						$('.imgLeft').removeClass('disabled');
					}
				}

        		$("#pageNum").val(pageNum);
        		
        		_current_page = pageNum - 1;
        		
        		ProjectListJS.pagination();
        	}
        });
        
        $(".imgRight").bind("click", function() {

        	var pageNum = $("#pageNum").val();
        	var pageSize = $("#pageSize").val();
        	if((pageNum*1) < (pageSize*1)){
        		ProjectListJS.isPage = true;
        		pageNum++;

				if(Number(pageNum)==1){
					$('.imgLeft').addClass('disabled');
					if(ProjectListJS.TotalPages>1){
						$('.imgRight').removeClass('disabled');
					}
				}else if(Number(pageNum)>1 && Number(pageNum)<ProjectListJS.TotalPages){
					$('.imgLeft').removeClass('disabled');
					$('.imgRight').removeClass('disabled');
				}else if(Number(pageNum)==ProjectListJS.TotalPages){
					$('.imgRight').addClass('disabled');
					if(ProjectListJS.TotalPages>1){
						$('.imgLeft').removeClass('disabled');
					}
				}

        		$("#pageNum").val(pageNum);
        		
        		_current_page = pageNum - 1;
        		
        		ProjectListJS.pagination();
        	}
        });

    },
    pagination : function() {
    	var state = $("#state_data").val()  == "-1" ? "": $("#state_data").val();
    	var type = $("#type_data").val() == "-1" ? "": $("#type_data").val();
    	var city = $("#city_data").val()  == "-1" ? "": $("#city_data").val();
    	var createTime = $("#createTime_sort").val();
    	var financing = $("#financing_sort").val();
    	var pcomplete = $("#pcomplete_sort").val();
    	var invest = $("#invest_sort").val();
    	var pageNum = $("#pageNum").val();
    	
    	var url = path.hbzc + "/tgproject/list";
    	var params = "userId=&createTime=" + createTime + "&pcomplete=" + pcomplete + "&financing=" + financing + "&invest=" + invest + "&type="+type+"&city="+city+"&state="+state+"&pageSize=10&pageNum="+pageNum;
    	// 同步方法
    	DeelonService.ajaxAsync(url, "GET", "json", params, function(data){
    		ProjectListJS.percent = data.extraMap.percent;
    		ProjectListJS.nowDate = data.extraMap.newDate;
			$("#pagination").pagination(data.totalElements, {
				prev_text : "前一页",
				next_text : "后一页",
				num_edge_entries : 2,
				num_display_entries : 4,
				callback : ProjectListJS.callback,
				items_per_page : 10,
				current_page:_current_page
			});
    	});
    },
    callback : function(index, jq) {
    	var pageNum;
    	if(ProjectListJS.isPage){
    		ProjectListJS.isPage = false;
    		pageNum = $("#pageNum").val();
    	} else {
    		pageNum = index + 1;
    	}

    	var state = $("#state_data").val()  == "-1" ? "": $("#state_data").val();
    	var type = $("#type_data").val() == "-1" ? "": $("#type_data").val();
    	var city = $("#city_data").val()  == "-1" ? "": $("#city_data").val();
    	var createTime = $("#createTime_sort").val();
    	var financing = $("#financing_sort").val();
    	var pcomplete = $("#pcomplete_sort").val();
    	var invest = $("#invest_sort").val();

		//初始定位页面顶部
		document.documentElement.scrollTop = document.body.scrollTop =0;
    	
    	var url = path.hbzc + "/tgproject/list";
    	var params = "userId=&createTime=" + createTime + "&pcomplete=" + pcomplete + "&financing=" + financing + "&invest=" + invest + "&type="+type+"&city="+city+"&state="+state+"&pageSize=10&pageNum="+pageNum;
    	
    	DeelonService.get(url, params, function(data) {

    		$("#pageNumShow").text(data.number <= 0 ? 1 : data.number);
    		$("#pageSizeShow").text(data.totalPages <= 0 ? 1 : data.totalPages);
    		
    		$("#pageNum").val(data.number <= 0 ? 1 : data.number);
    		$("#pageSize").val(data.totalPages <= 0 ? 1 : data.totalPages);
			//保存总页数
			ProjectListJS.TotalPages = data.totalPages;




			if(Number($('#pageNumShow').html())==1){
				$('.imgLeft').addClass('disabled');
				if(ProjectListJS.TotalPages>1){
					$('.imgRight').removeClass('disabled');
				}
			}else if(Number($('#pageNumShow').html())>1 && Number($('#pageNumShow').html())<ProjectListJS.TotalPages){
				$('.imgLeft').removeClass('disabled');
				$('.imgRight').removeClass('disabled');
			}else if(Number($('#pageNumShow').html())==ProjectListJS.TotalPages){
				$('.imgRight').addClass('disabled');
				if(ProjectListJS.TotalPages>1){
					$('.imgLeft').removeClass('disabled');
				}
			}



    		
    		if(data.content.length > 0){
    			$("#repayContent").show();
    			$(".no_info").hide();
    			$("#pagination").removeClass("hide");
    			ProjectListJS.bindData(data.content);
    		} else {
    			$(".no_info").show();
    			$("#repayContent").hide();
    			$("#pagination").addClass("hide");
    			
    		}
		});
    },
    tpl : '<li style="display: list-item;" class="porject">'+
		    '<a class="main-banner" onclick="toProjectDetail($projectId);">'+
		    '<div class="loadimg">'+
		    '<img width="382" height="280" data-original="/hbzc/desktop/images/default_m.jpg" class="lazy" src="/hbzc/desktop/images/loading.gif">'+
		    '</div>'+
		    //    <!--项目状态 左边文字  s1:预约中  s2:众筹中 s3:满标  s4:众筹成功-->
		    '<span class="projectState">--</span>'+
		    '</a>'+
		    '<div class="porject_r">'+
		    '<div class="article">'+
		    '<h2><a onclick="toProjectDetail($projectId);">$pname</a></h2>'+
		    '<p class="explain ccsl">$pdesc</p>'+
		    '<ul class="clearfix project_detail">'+
		    '<li class="get_ponit">--</li>'+
		'<li class="total financingAmount"><p class="money pfinancingamount"></p><span>融资总额</span></li>'+
		'</ul>'+
		'<div class="article_bt">'+
		    '<span class="map_pic">$pprovincesname  $pcityname</span>'+
		    '<span class="class_pic">--</span>'+
		    '</div>'+
		    '</div>'+
		    //    <!--倒计时 加上t2的时候 闹钟的图标会消失  去掉t2 闹钟就会出来 下面的P标签 加 hide 隐藏倒计时-->
		    '<div style="display: block;" class="timer">'+
		    '<p name="timer">倒计时：<span id="t_d_$projectId">00</span>&nbsp;天 <span id="t_h_$projectId">00</span>&nbsp;时 <span id="t_m_$projectId" >00</span>&nbsp;分</p>'+
		    //<!--进度条 加上 hide d进度条消失  去掉hide 进度条出来  加上over是超募的状态的进度条效果-->
		'<span class="prograss-bar"><em style="width:0%" class="prograss-bar-inner"></em></span>'+
		'<em class="percentage_pic">$pcomplete%</em>'+
		    '</div>'+
		    //   <!--右边的项目状态图标 pic1:推荐 pic2:达标  pic3超募  pic4：通过满标审核  不加为没有图片  -->
		    '<!--<div class="statePic pic1"></div>-->'+
		    '<div class="statePic"></div>'+
		    '</div>'+
		    '</li>',
    bindData : function(json) {
    	
    	$("#repayContent").children().remove();//清除旧信息
        Utils.bindList("#repayContent", $(ProjectListJS.tpl), json , null , function (item , data) {

        	if(data.ppic1 != null && data.ppic1 != ""){
				var srcUrl = path.cms + "/archive/download?fullPath=&id="+data.ppic1;
        		//$(item).find("img").attr("src",srcUrl).attr("onerror","this.src='../../images/default_m.jpg',this.onerror=null;");
        		$(item).find("img").attr("data-original",srcUrl).attr("onerror","this.src='../../images/default_m.jpg',this.onerror=null;");
        	} else {
        		//$(item).find("img").attr("src","../../images/default_m.jpg").attr("onerror","this.src='../../images/default_m.jpg',this.onerror=null;");
        		$(item).find("img").attr("data-original","../../images/default_m.jpg").attr("onerror","this.src='../../images/default_m.jpg',this.onerror=null;");
        	}
        	
        	//项目状态 左边文字  s1:预约中  s2:众筹中 s3:满标  s4:众筹成功
        	var stateClazz = "";
        	var stateText = "";
        	var ponit = "<p><span class='money'>" + formatCurrency.formatCurrency(data.pinvestamount) + "</span></p><span>已筹集</span>";
        	var isStandard = true;
			switch(data.pstateid){
		    	case "3":
		    		stateClazz = "s2";
		    		stateText = "众筹中";
		    		$(item).find(".timer").addClass("t2");
				  	break;
		    	case "4":
		    		stateClazz = "s3";
		    		stateText = "满标";
		    		isStandard = false;
		    		$(item).find(".statePic").addClass("pic4");
		    		$(item).find(".timer").addClass("t2");
		    		$(item).find("[name='timer']").hide();
				  	break;
		    	case "8":
		    		stateClazz = "s4";
		    		stateText = "众筹<br />成功";
		    		isStandard = false;
		    		$(item).find(".timer").addClass("t2");
		    		$(item).find("[name='timer']").hide();
				  	break;
		    	case "11":
		    		stateClazz = "s1";
		    		stateText = "预热中";
		    		//$(item).find(".timer").hide();
		    		ponit = "<p><span>" + data.bespeak + "</span></p><span>预约</span>";
		    		$(item).find(".prograss-bar").addClass("hide");
		    		$(item).find(".percentage_pic").addClass("hide");
				  	break;
				default:
					break;
			}


			$(item).find(".percentage_pic").html(Math.ceil(data.pcomplete)+"%");
			$(item).find(".pfinancingamount").text(formatCurrency.formatCurrency(data.pfinancingamount));
			$(item).find(".projectState").addClass(stateClazz);
        	$(item).find(".projectState").html(stateText);
        	
        	$(item).find(".get_ponit").html(ponit);
        	
			if(data.pisrecommended == "1" && isStandard){
		    	$(item).find(".statePic").addClass("pic1");
			}
			//if((data.pisfull == "1" || (data.pcomplete >= ProjectListJS.percent && data.pcomplete <= 100) ) && isStandard){
			if((data.pisfull == "1" || data.pcomplete >= ProjectListJS.percent ) && isStandard){
				$(item).find(".statePic").addClass("pic2");
			}
			data.pcomplete = (data.pcomplete>0 && data.pcomplete<=4)?4:data.pcomplete;
			$(item).find(".prograss-bar-inner").css("width",data.pcomplete+'%')
			if(data.pcomplete >= 100){
				$(item).find(".prograss-bar-inner").addClass("over");
				var width = data.pcomplete % 100;
				var sty = width +"%";
				$(item).find(".prograss-bar-inner").css("width","100%");
				//if(isStandard){
				//	$(item).find(".statePic").addClass("pic3");
				//}
			}
			
        	//倒计时
			var endDate = data.pclosedate;
			if(data.pstateid == "11"){
				endDate = data.popendate;
			}
			endDate = endDate.replace(new RegExp("-","gm"),"/");
			//转换时间格式
			endDate = (new Date(endDate)).getTime();
			var timeDifference = dateDiff(new Date(endDate),new Date(ProjectListJS.nowDate));
			if(timeDifference != "已结束"){
				var day = timeDifference.date < 10 ? "0"+timeDifference.date : timeDifference.date;
				$(item).find("#t_d_" + data.projectId).html(day); //天
				var hour = timeDifference.hour < 10 ? "0"+timeDifference.hour : timeDifference.hour;
				$(item).find("#t_h_" + data.projectId).html(hour); //时
				var minute = timeDifference.minute < 10 ? "0"+timeDifference.minute : timeDifference.minute;
				$(item).find("#t_m_" + data.projectId).html(minute); //分
				var second = timeDifference.second < 10 ? "0"+timeDifference.second : timeDifference.second;
				$(item).find("#t_s_" + data.projectId).html(timeDifference.second); //秒
			}

			var countDown = new CountDown(new Date(ProjectListJS.nowDate) , 60000, data.projectId ,endDate,'date');
			countDown.start();

			//行业
			var array = ProjectListJS.typeArray;
			for(var i = 0;i < array.length; i++){
				if(array[i].itemValue == data.ptypeid){
					$(item).find(".class_pic").text(array[i].resName);
					break;
				}
			}
        });

		// 图片预加载
		$("img.lazy").lazyload({
			placeholder:"/hbzc/desktop/images/loading.gif",
			effect : "fadeIn",
			threshold : 200
		})

    }
};

// 页面信息初始化
ProjectListJS.init();


