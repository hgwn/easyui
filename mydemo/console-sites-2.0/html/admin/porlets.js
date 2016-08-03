
var adminporlets = {

    //=====[会员管理]=====//
    //会员查询
    member_query:{"name":"member_query","link":"html/admin/member/memberForm.html"},
    member_list:{"name":"member_list","link":"html/admin/member/memberList.html"},
    member_box:["member_query","member_list"],
    //会员邀请记录
    member_invite:{"name":"member_invite","link":"html/admin/member/member_invite_index.html"},
    //实名认证审核
    member_realauth:{"name":"member_realauth","link":"html/admin/member/member_realauth_index.html"},
    //银行卡查询
    member_bankCard:{"name":"member_bankCard","link":"html/admin/member/member_bankCard_list.html"},

    //=====[操作员和权限]=====//
    //操作员管理
    operators_query:{"name":"operator","link":"html/admin/operator/queryform.html"},
    operator:{"name":"optable","link":"html/admin/operator/list.html",dataurl : "/dlsys/admin/sdk/op/findAll"},
    operator_box:["operators_query","operator"],
    //分组管理
    group:{"link":"html/admin/group/index.html"},
    //角色管理
    role:{"link":"html/admin/role/index.html"},

    //=====[系统数据]=====//
    //数字字典
    dictionary:{link:"html/admin/system/dictionary/index.html"},
    //系统设置
    settings:{link:"html/admin/system/settings/index.html"},
    //地区管理
    areas:{link:"html/admin/system/areas/index.html"},
    //内容管理
    dir:{link:"html/admin/system/dir/index.html"},
    //模板管理
    template:{link:"html/admin/system/template/index.html"},



    //=====[消息管理]=====//
    //顶部未读信息
    notice:{"link":"html/admin/message/notice/notice_index.html"},
    //邮件管理
    email:{"name":"email","link":"html/admin/message/email/index.html"},
    //短信管理
    sms:{"name":"sms","link":"html/admin/message/sms/index.html"},
    //邮件服务器管理
    mail_config:{"name":"mail_config","link":"html/admin/message/mail_config/index.html"},
    //站内信管理

    mail_index:{"name":"mail_index","link":"html/admin/message/mail/mail_index.html"},

    //=====[系统设置]=====//
    //业务模块
    module_list:{link:"html/admin/settings/module_list.html"},
    //支付渠道
    channel_list:{link:"html/admin/settings/paychannel_list.html"},
    //证书管理
    appcert_query:{"link":"html/admin/system/appcert/listSearch.html"},
    appcert_list:{"link":"html/admin/system/appcert/listTable.html"},
    appcert_box:["appcert_query","appcert_list"]

};




