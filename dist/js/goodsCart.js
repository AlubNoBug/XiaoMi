define(["jquery", "jquery-cookie"], function($){

    //加载已经加入购物车的商品
    /**
     * 1、cookie 只存储商品的id和数量
     * 2、加载数据，必须要使用商品的具体信息，数据源
     *      goodsCarList.json
     *      goodsList2.json(goodsList.json的数据更详细，不过用2也可以)
     *   【注】找出加入到购物车的商品的详细信息
     *    new Promise处理两次按照顺序加载数据的流程（异步串行）
     */
    function loadCarData(){

        //清空上一次的数据
        $("#J_cartListBody .J_cartGoods").html("");

        new Promise(function(resolve, reject){
            $.ajax({
                url: "../data/goodsCarList.json",
                success: function(obj){
                    resolve(obj.data);
                },
                error: function(msg){
                    reject(msg);
                }
            })
        }).then(function(arr1){
            //下载第二份代码
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: "../data/goodsList2.json",
                    success: function(arr2){
                        //将两份数据合并成一份
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);
                    },
                    error: function(msg){
                        reject(msg);
                    }
                })
            })
        }).then(function(arr){
            //arr 是所有商品的信息，我们需要的是加入到购物车的商品的信息
            //通过加入购物车的数据从arr里找出对应的商品信息
            //1、拿到购物车的数据
            var cookieStr = $.cookie("goods");
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];//newArr 存储的都是加入购物车里的商品的id、num、信息

                for(var i = 0; i < cookieArr.length; i++){
                    for(var j = 0; j < arr.length; j++){
                        if(cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid){
                            arr[j].num = cookieArr[i].num; //购物车里的商品数量
                            //设置商品id
                            arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                            newArr.push(arr[j]);
                        }
                    }
                }

                //通过循环，将newArr的数据加载到页面上
                for(var i = 0; i < newArr.length; i++){
                    $(`<div class="item-table J_cartGoods" data-info="{ commodity_id:'1192300048', gettype:'buy', itemid:'2192300031_0_buy', num:'1'} ">  
                <div class="item-row clearfix" id = "${newArr[i].id}"> 
                    <div class="col col-check">  
                        <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                    </div> 
                    <div class="col col-img">  
                        <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                            <img alt="" src="${newArr[i].image};" width="80" height="80"> 
                        </a>  
                    </div> 
                    <div class="col col-name">  
                        <div class="tags">   
                        </div>     
                        <div class="tags">  
                        </div>   
                        <h3 class="name">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                ${newArr[i].name}
                            </a>  
                        </h3>        
                    </div> 
                    <div class="col col-price"> 
                        ${newArr[i].price}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-num">  
                        <div class="change-goods-num clearfix J_changeGoodsNum"> 
                            <a href="javascript:void(0)" class="J_minus">
                                <i class="iconfont"></i>
                            </a> 
                            <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                            <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                        </div>  
                    </div> 
                    <div class="col col-total"> 
                        ${(newArr[i].num * newArr[i].price).toFixed(1)}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-action"> 
                        <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                    </div> 
                </div>
        </div>`).appendTo("#J_cartListBody .item-box");
                }
                isCheckAll();
            }
        })
    }

    function download(){
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function(result){
                var arr = result.data;
                for(var i = 0; i < arr.length; i++){
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src="${arr[i].image}" srcset="" alt=""> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="#"> 
                                ${arr[i].name}
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a href="#" class = "btn btn-small btn-line-primary J_xm-recommend_btn" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>`).appendTo("#J_miRecommendBox .xm-recommend ul");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function cartHover(){
        //事件委托，实现移入、移出操作
        $("#J_miRecommendBox .xm-recommend ul").on("mouseenter", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "block");
        })

        $("#J_miRecommendBox .xm-recommend ul").on("mouseleave", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "none");
        })

        //事件委托，实现加入购物车操作
        $("#J_miRecommendBox .xm-recommend ul").on("click", ".xm-recommend-tips .btn", function(){
            var id = this.id;

            //判断是否第一次添加该商品
            var first = $.cookie("goods") == null ? true : false;
            
            if(first){
                var cookieArr = [{id: id, num: 1}];
            }else{
                var same = false;
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if(!same){
                    var obj = {id: id, num: 1};
                    cookieArr.push(obj);
                }
            }
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires:7
            })
            // alert($.cookie("goods"));
            isCheckAll();
            loadCarData();
            return false;
        })
    }

    //全选按钮和单选按钮 添加点击事件
    function checkFunc(){
        //全选
        $("#J_selectAll").click(function(){
            //获取每个单选按钮，实现全选对单选的控制
            var allChecks = $("#J_cartListBody").find(".item-row .col-check").find("i");

            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            }else{
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
        //单选
        $("#J_cartListBody").on("click", ".item-row .col-check i", function(){
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
            }else{
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
    }

    //判断有多少个被选中
    function isCheckAll(){
        var allChecks = $("#J_cartListBody").find(".item-row");
        var isAll = true; //假设被选中
        var total = 0; //计算总数
        var count = 0; //记录被选中的商品数量
        var totalCount = 0; //记录购物车的总数
        allChecks.each(function(index, item){
            //参数是下标和节点
            if(!$(item).find(".col-check i").hasClass("icon-checkbox-selected")){
                //false, 其中有未被选中的商品
                isAll = false;
            }else{
                total += parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(this).find(".col-num input").val());
                count += parseInt($(this).find(".col-num input").val());
            }
            totalCount += parseInt($(this).find(".col-num input").val());//【注】跟count是不一样的！
        })
        //设置
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalNum").html(totalCount);
        $("#J_cartTotalPrice").html(total);

        //判断当前是否全选
        if(isAll){
            $("#J_selectAll").addClass("icon-checkbox-selected");
        }else{
            $("#J_selectAll").removeClass("icon-checkbox-selected");
        }
    }

    //加、减、删除都是ajax后添加进来的，所以要用事件委托添加事件
    //给购物车添加 加、减、删除 操作
    function changeCars(){
        //给每个删除按钮添加事件
        $("#J_cartListBody").on("click", ".col-action .J_delGoods", function(){
            var id = $(this).closest(".item-row").remove().attr("id"); //找到class为item-row的父节点的id,并删除（页面上删除，下一步是删除cookie）

            //在cookie中删除
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    //删除数据, 数组中删除i位置的1个元素
                    cookieArr.splice(i, 1);
                    break;
                }
            }
            //若数组为空就清空cookie，否则更新cookie
            cookieArr.length == 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr), {expires: 7});
            isCheckAll();
            return false;//阻止a标签的默认行为
        })

        //给每一个+和-添加事件
        $("#J_cartListBody").on("click", ".J_plus, .J_minus", function(){
            var id = $(this).closest(".item-row").attr("id"); //找到class为item-row的父节点的id
            
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(id == cookieArr[i].id){
                    //在cookie中找到该商品，执行对应操作
                    if(this.className == "J_minus"){
                        cookieArr[i].num == 1 ? alert("数量至少为1，不能再减了！") : cookieArr[i].num--;
                    }else{
                        cookieArr[i].num++;
                    }
                    break;
                }
            }
            //更新页面
            $(this).siblings("input").val(cookieArr[i].num);
            //找到单价
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
            $(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1) + "元");
            //更新cookie
            $.cookie("goods", JSON.stringify(cookieArr), {expires: 7});
            //重新计算总价
            isCheckAll();
            return false;//阻止a标签的默认行为
        })
    }


    return {
        download: download,
        cartHover: cartHover,
        loadCarData: loadCarData,
        checkFunc: checkFunc,
        changeCars: changeCars,
        isCheckAll: isCheckAll
    }
})