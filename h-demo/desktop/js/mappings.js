var mappings = {
    //首页

    index: ["header", "footer"],
    main:{box:"main_box",porlets:[{link:"index/index_main.html"}]},
    getTenderProjects: {box: "main_box", porlets: [{link: "getTenderProjects/getTenderProjects.html"}]},
    //项目详情
    showProjectDetail: {box: "main_box", porlets: [{link: "getTenderProjects/showProjectDetail.html"}]},
    //我要借款
    productsLoanList: {box: "main_box", porlets: [{link: "productsLoanList/list.html"}]},
    //借款详情
    productDetail: {box: "main_box", porlets: [{link: "productsLoanList/productDetail.html"}]},
    //申请借款
    productApply: {box: "main_box", porlets: [{link: "productsLoanList/productApply.html"}]},
    //债权转让
    transfer: {box: "main_box", porlets: [{link: "transfer/transfer.html"}]},
    //债权转让详情
    transferDetail: {box: "main_box", porlets: [{link: "transfer/transferDetail.html"}]},
    //债权竞拍
    transferAuction: {box: "main_box", porlets: [{link: "transfer/transferAuction.html"}]},
    /*
     * 个人中心--我的账户
     * 注意 我的账户 accout div 片段加载多个模块
     * */
    //我的账户
    accout: {box: "main_box", porlets: [{link: "../members/accout.html"}]},
    //借款统计
    total: {box: "accout_contentBox", porlets: [{link: "business/total.html"}]},
    //我的借款
    my: {box: "accout_contentBox", porlets: [{link: "business/my.html"}]},
    mydetail: {box: "accout_contentBox", porlets: [{link: "business/myDetail.html"}]},
    //借款进度
    apply: {box: "accout_contentBox", porlets: [{link: "business/apply.html"}]},
    //额度申请记录
    progress: {box: "accout_contentBox", porlets: [{link: "business/progress.html"}]},
    //还款管理
    repay: {box: "accout_contentBox", porlets: [{link: "business/repay.html"}]},

    //还款记录
    repayment:{box:"accout_contentBox",porlets:[{link:"business/repayment.html"}]},

    //还款明细
    repdetail:{box:"accout_contentBox",porlets:[{link:"business/repaymentDetail.html"}]},
    
     //还垫付明细
    payAdvanceDetail:{box:"accout_contentBox",porlets:[{link:"business/payAdvanceDetail.html"}]},
    
    //罚金明细
    payFineDetail:{box:"accout_contentBox",porlets:[{link:"business/payFineDetail.html"}]},
    
    //提前还款明细
    repayLoanAheadDetail:{box:"accout_contentBox",porlets:[{link:"business/repayLoanAheadDetail.html"}]},

    //借款申请查询
    applysearch: {box: "accout_contentBox", porlets: [{link: "business/applysearch.html"}]},
    //我的积分记录
    pointlist: {box: "accout_contentBox", porlets: [{link: "../members/accout/pointlist.html"}]},
    //我的积分记录详情
    point: {box: "accout_contentBox", porlets: [{link: "../members/accout/point.html"}]},
    //账户绑定
    bindinfo:{box:"accout_contentBox",porlets:[{link:"../members/money/userinfo.html"}]},
    //我邀请的用户
    invite: {box: "accout_contentBox", porlets: [{link: "../members/accout/invite.html"}]},
    //我的礼品
    gift: {box: "accout_contentBox", porlets: [{link: "../members/accout/gift.html"}]},
    //我的提成记录 percentage
    percentage: {box: "accout_contentBox", porlets: [{link: "../members/accout/percentage.html"}]},
    //理财管理
    //我的投标
    bid: {box: "accout_contentBox", porlets: [{link: "financial/bid.html"}]},
    follow: {box: "accout_contentBox", porlets: [{link: "financial/follow.html"}]},
    //预约
    order: {box: "accout_contentBox", porlets: [{link: "financial/order.html"}]},
    //理财统计
    statistics: {box: "accout_contentBox", porlets: [{link: "financial/statistics.html"}]},
    //自动投标
    autobid: {box: "accout_contentBox", porlets: [{link: "financial/autobid.html"}]},
    //自动投标设置
    setbid: {box: "accout_contentBox", porlets: [{link: "financial/setbid.html"}]},
    //债权转让 credit
    credit: {box: "accout_contentBox", porlets: [{link: "credit/credit.html"}]},
    //债权转让详情
    creditdetail: {box: "accout_contentBox", porlets: [{link: "credit/creditdetail.html"}]},
    //关注债权
    creditfollow: {box: "accout_contentBox", porlets: [{link: "credit/creditfollow.html"}]},
    //债权竞标
    creditbid: {box: "accout_contentBox", porlets: [{link: "credit/creditbid.html"}]},
    //资金管理
    //充值(托管)
    recharge: {box: "accout_contentBox", porlets: [{link: "../members/money/recharge.html"}]},
    //提现(托管)
    cash: {box: "accout_contentBox", porlets: [{link: "../members/money/cash.html"}]},
    //充值(网关)
    poolrecharge: {box: "accout_contentBox", porlets: [{link: "../members/money/poolrecharge.html"}]},
    //提现(网关)
    poolcash: {box: "accout_contentBox", porlets: [{link: "../members/money/poolcash.html"}]},
    //资金记录
    frecord:{box:"accout_contentBox",porlets:[{link:"../members/money/frecord.html"}]},
    //转账单页面(托管)
    pay:["payMain"],
    payMain:{box:"main_box",porlets:[{link:"../members/money/pay.html"}]},
    //转账（资金池）
    pooltransfer: {box: "main_box", porlets: [{link: "../members/money/transfer.html"}]},
    //放款单页面
    lending:["lendingMain"],
    lendingMain:{box:"main_box",porlets:[{link:"../members/money/lending.html"}]},

    //基本设置
    //编辑个人资料
    person: {box: "accout_contentBox", porlets: [{link: "../members/basic/person.html"}]},
    //安全中心列表
    basic: {box: "accout_contentBox", porlets: [{link: "../members/basic/basic.html"}]},
    //设置密码
    password: {box: "accout_contentBox", porlets: [{link: "../members/basic/password.html"}]},
    //绑定手机
    mobile: {box: "accout_contentBox", porlets: [{link: "../members/basic/mobile.html"}]},
    //修改手机
    resetmobile: {box: "accout_contentBox", porlets: [{link: "../members/basic/reset_mobile.html"}]},
    //绑定新手机
    newmobile: {box: "accout_contentBox", porlets: [{link: "../members/basic/new_mobile.html"}]},
    //绑定邮箱
    email: {box: "accout_contentBox", porlets: [{link: "../members/basic/email.html"}]},
    //修改邮箱
    resetemail: {box: "accout_contentBox", porlets: [{link: "../members/basic/reset_email.html"}]},
    //绑定新邮箱
    newemail: {box: "accout_contentBox", porlets: [{link: "../members/basic/new_email.html"}]},
    //安全问题
    question: {box: "accout_contentBox", porlets: [{link: "../members/basic/question.html"}]},
    //实名认证
    verified: {box: "accout_contentBox", porlets: [{link: "../members/basic/verified.html"}]},
    //支付密码
    paying: {box: "accout_contentBox", porlets: [{link: "../members/basic/paying.html"}]},
    //上传认证资料
    upload: {box: "accout_contentBox", porlets: [{link: "../members/basic/upload.html"}]},
    //上传个人资料
    uploadperson: {box: "accout_contentBox", porlets: [{link: "../members/basic/uploadperson.html"}]},
    //我的通知
    notice: {box: "accout_contentBox", porlets: [{link: "../members/service/notice.html"}]},
    //我的通知详情
    noticedetail: {box: "accout_contentBox", porlets: [{link: "../members/service/noticeDetail.html"}]},
    //我的留言
    message: {box: "accout_contentBox", porlets: [{link: "../members/service/message.html"}]},
    //我的留言详情
    messagedetail: {box: "accout_contentBox", porlets: [{link: "../members/service/messageDetail.html"}]},
    //我的投诉
    complain: {box: "accout_contentBox", porlets: [{link: "../members/service/complain.html"}]},
    //

    //登录
    login: {box: "main_box", porlets: [{link: "../members/login.html"}]},
    //注册
    regist: {box: "main_box", porlets: [{link: "../members/regist.html"}]},
    //找回密码
    findpassword: {box: "main_box", porlets: [{link: "../members/findPassword.html"}]},
    regsuccess: {box: "main_box", porlets: [{link: "../members/regsuccess.html"}]},
    //公共模块
    header: {box: "header_box", porlets: [{link: "common/header.html"}]},
    footer: {box: "footer_box", porlets: [{link: "common/footer.html"}]},

    //投资成功页面
    pagesuccess:{box:"main_box",porlets:[{link:"common/pagesuccess.html"}]},
    //投资失败页面
    pagefail:{box:"main_box",porlets:[{link:"common/pagefail.html"}]},
    //计算器
    projectincomelist:{box:"main_box",porlets:[{link:"common/projectincomelist.html"}]},

    temp:{box:"main_box",porlets:[{link:"getTenderProjects/temp.html"}]},

    article: ["header", "footer"],
    folders: {box: "sidebar_box", porlets: [{link: "../articles/folders.html"}]},
    articlelist: {box: "main_box", porlets: [{link: "../articles/articlelist.html"}]},
    articledetail: {box: "main_box", porlets: [{link: "../articles/detail.html"}]},

    //积分商城
    giftlist:{box: "main_box", porlets: [{link: "../mall/giftlist.html"}]},
    giftdetail:{box: "main_box", porlets: [{link: "../mall/giftDetail.html"}]},
    giftrule:{box: "main_box", porlets: [{link: "../mall/giftRule.html"}]}
};


