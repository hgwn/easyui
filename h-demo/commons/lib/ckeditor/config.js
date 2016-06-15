/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights
 *          reserved. For licensing, see LICENSE.md or
 *          http://ckeditor.com/license
 */

/*
 * CKEDITOR.editorConfig = function( config ) { // Define changes to default
 * configuration here. For example: // config.language = 'fr'; // config.uiColor =
 * '#AADC6E'; config.enterMode = CKEDITOR.ENTER_BR;
 * config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+config.font_names; //
 * 工具栏默认是否展开 config.toolbarStartupExpanded = false;
 * config.image_previewText="无图片";
 * config.filebrowserImageUploadUrl=factory.url.uploadCheditor+"/"+op.data.id+"?loginName="+op.data.name+"&catKey=ATTACH_TYPE&nodeKey=IMAGE"; //
 * config.filebrowserUploadUrl="/platform/system/sysFile/fileUpload.ht;jsessionid="+__jsessionId+"?catKey=ATTACH_TYPE&nodeKey=FILE"; //
 * config.filebrowserFlashUploadUrl="/platform/system/sysFile/fileUpload.ht;jsessionid="+__jsessionId+"?catKey=ATTACH_TYPE&nodeKey=FLASH";
 * config.font_names="宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;方正舒体/方正舒体;方正姚体/方正姚体;华文彩云/华文彩云;华文仿宋/华文仿宋;华文行楷/华文行楷;华文琥珀/华文琥珀;华文楷体/华文楷体;华文隶书/华文隶书;华文宋体/华文宋体;华文细黑/华文细黑;华文新魏/华文新魏;华文中宋/华文中宋;新宋/新宋;"+config.font_names;
 * //config.enterMode = CKEDITOR.ENTER_BR; //config.shiftEnterMode =
 * CKEDITOR.ENTER_BR; };
 */
CKEDITOR.editorConfig = function(config) {
	config.image_previewText="无图片";
	config.filebrowserImageUploadUrl=factory.url.uploadCheditor+"/"+op.data.id+"?loginName="+op.data.name+"&catKey=ATTACH_TYPE&nodeKey=IMAGE"; //
	//config.filebrowserImageUploadUrl=factory_gqzc.url.uploadCheditor+"/"+op.data.id+"?loginName="+op.data.name+"&catKey=ATTACH_TYPE&nodeKey=IMAGE"; //
	//config.filebrowserImageUploadUrl=factory_gqzc.url.uploadCheditor+"/"+sessionUser.getUser().id+"?loginName="+sessionUser.getUser().name+"&catKey=ATTACH_TYPE&nodeKey=IMAGE"; //
};
