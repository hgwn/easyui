/** 
 * 用于实现页面 Map 对象，Key只能是String，对象随意 
 */  
var AssetMap = function(){  
    this._entrys = new Array();  
      
    this.put = function(key, value){  
        if (key == null || key == undefined) {  
            return;  
        }  
        var index = this._getIndex(key);  
        if (index == -1) {  
            var entry = new Object();  
            entry.key = key;  
            entry.value = value;  
            this._entrys[this._entrys.length] = entry;  
        }else{  
            this._entrys[index].value = value;  
        }          
    };  
    this.get = function(key){  
        var index = this._getIndex(key);  
        return (index != -1) ? this._entrys[index].value : null;  
    };  
    this.remove = function(key){  
        var index = this._getIndex(key);  
        if (index != -1) {  
            this._entrys.splice(index, 1);  
        }  
    };  
    this.clear = function(){  
        this._entrys.length = 0;;  
    };  
    this.contains = function(key){  
        var index = this._getIndex(key);  
        return (index != -1) ? true : false;  
    };  
    this.getCount = function(){  
        return this._entrys.length;  
    };  
    this.getEntrys =  function(){  
        return this._entrys;  
    };  
   this._getIndex = function(key){  
        if (key == null || key == undefined) {  
            return -1;  
        }  
        var _length = this._entrys.length;  
        for (var i = 0; i < _length; i++) {  
            var entry = this._entrys[i];  
            if (entry == null || entry == undefined) {  
                continue;  
            }  
            if (entry.key === key) {//equal  
                return i;  
            }  
        }  
        return -1;  
    };  
} 


var assetControl = {
	asset_data : {},
	current_id : "",
	current_title:"",
	back_title:"",
	forward_title:"",
	map : new AssetMap(),
	getChildren : function(data, id) {
		for (var e in data) {
			if (data[e].id == id) {
				return data[e].list;
			}
			if (data[e].list && data[e].list.length > 0) {
				var nodes = assetControl.getChildren(data[e].list,id);
				if (nodes) {
					return nodes;
				}
			}
		}
		return null;
	},
	getNav : function(id) {
		for ( var e in assetControl.asset_data) {
			if (assetControl.asset_data[e].id == id) {
				return assetControl.asset_data[e].list;
			}
		}
	},
	getChildrenByTitle:function(data,title){
		for (var e in data) {
			//console.log("data[e].name="+data[e].name);
			if (data[e].name == title) {
				assetControl.map.put(title,data[e].id);
				return data[e].list;
			}
		}
		return null;
	},
	toolBarFilter : function(toolBar) {
		assetControl.current_id = assetControl.map.get(assetControl.current_title);
		var result = [];
		var nodes = [];
		nodes = assetControl.getChildren(assetControl.asset_data,assetControl.current_id);
		for ( var t in toolBar) {
			if (toolBar[t] != '-') {
				for ( var n in nodes) {
					if (nodes[n].name == toolBar[t].text) {
						result.push(toolBar[t]);
						result.push('-');
					}
				}
			}
		}
		return result;
	},
	easyuiMenuFilter:function(ele){
		var nodes = [];
		nodes = assetControl.getChildren(assetControl.asset_data,assetControl.current_id);
		$(ele+">div").each(function(key){
            var html = $(this).find("div.menu-text").html();
            if(html){
            	html = $.trim(html);
    			var flag = true;
    			for ( var n in nodes) {
    				if (nodes[n].name == html) {
    					flag = false;
    				}
    			}
    			if(flag){
    				$(this).find("div.menu-text").parent().hide();
    			}
            }
		});
	},
	easyuiALinkFilter:function(ele){
		var nodes = [];
		//先根据跳转前tab-title获取id
		var id = assetControl.map.get(assetControl.back_title);
		//获取到转跳前的按钮
		nodes = assetControl.getChildren(assetControl.asset_data,id);
		//根据新tab-title获取按钮
		nodes = assetControl.getChildrenByTitle(nodes,assetControl.forward_title);
		$(ele+">a").each(function(key){
            var html = $(this).find("span.l-btn-text").html();
            if(html){
            	html = $.trim(html);
    			var flag = true;
    			for ( var n in nodes) {
    				if (nodes[n].name == html) {
    					flag = false;
    				}
    			}
    			if(flag){
    				$(this).find("span.l-btn-text").parent().parent().hide();
    			}
            }
		});
	}
};

