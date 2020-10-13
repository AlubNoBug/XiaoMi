console.log("AAA");

//配置当前项目引入的模块

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "goodsCart": "goodsCart"
    },
    shim: {
        //设置依赖关系
        "jquery-cookie": ["jquery"]
    }
})

require(["goodsCart"], function(goodsCart){
    goodsCart.download();
    goodsCart.cartHover();
    goodsCart.loadCarData();
    goodsCart.checkFunc();
    goodsCart.changeCars();
})
