console.log("zzzz");

//配置当前项目中引入的模块
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"]
    }
})

require(["nav","goodsDesc"], function(nav,goodsDesc){
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.leftNavDownload();
    nav.topNavDownload();
    nav.allGoodsTab();

    goodsDesc.download();
    goodsDesc.banner();
})