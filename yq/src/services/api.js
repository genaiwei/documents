export default {
    login: "system/login", // 管理员登录接口，usertype '1管理员,2预防支付用户,3其它用户', 根据该参数显示不同菜单
    logout: "system/logout",
    systemparameter: {//系统参数管理
        area:'system/systemparameter/area',
    },
    system:{
        uploadFile: 'system/uploadFile',//人员管理之批量导入--文件上传独立
    },
    wechat: {
        getOpenid: 'system/commn/authorization', //获取openid
        sendWxMsg: 'system/commn/sendWxMsg', //获取openid
    },
    user: {//业务管理
        userQuery: 'system/user/query', //业务查询 包括查询下拉数据
        userAdd: 'system/user/add', //业务新增
        userUpdate: 'system/user/update',  //业务修改
        userDelete: 'system/user/delete', //业务删除 userids多个逗号分开
        queryBusiness: 'system/user/queryBusiness' ,//业务查询 包括查询下拉数据
        deleteuser: 'system/user/deleteuser',
        adduser: 'system/user/adduser',
        updateuser:'system/user/updateUser',
        queryuser:'system/user/queryUser',
    },
    firstorg: {
        getMaxnumber: '/system/firstorg/getMaxnumber',
        query: 'system/firstorg/query', //卫生院查询
        add: 'system/firstorg/add', //卫生院新增
        update: 'system/firstorg/update', //卫生院更新
        delete: 'system/firstorg/delete', //卫生院删除
    },
    secondorg: {
        getMaxnumber: '/system/secondorg/getMaxnumber',
        query: 'system/secondorg/query', //卫生室查询
        add: 'system/secondorg/add', //卫生室新增
        update: 'system/secondorg/update', //卫生室更新
        delete: 'system/secondorg/delete', //卫生室删除
    },
    commn:{
        action:'system/commn/action',
        actionapi:'system/api/actionapi',
        getNumber:'system/commn/getNumber',
        getuuid:'system/commn/getUUID',
        udpAction:'/system/commn/udpAction',
        getapplyqc:'/system/commn/getapplyqc',
        exportFile:'/system/commn/exportFile'
    },
    cwweb:{
        action:'system/commn/action',
    },
    api: {
        getAddress:'api/getaddress',
    }
};
