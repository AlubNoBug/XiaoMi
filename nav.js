/**
 * 处理首页的导航部分
 * 遵从AMD规范
 */
define(["jquery"], function($){
    function download(){
        //数据下载
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(result){
                // alert(result);
                var bannerArr = result.banner;

                //通过循环将数据添加到页面上
                for(var i = 0; i < bannerArr.length; i++){
                    $(`<a href="#">
                    <img class = 'swiper-lazy swiper-lazy-loaded' src = '../images/banner/${bannerArr[i].img}' alt=""/>
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");//jquery创建图片节点，插入到目标位置

                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    node.appendTo("#J_homeSwiper .swiper-pagination");//jquery创建小圆圈节点，插入到目标位置
                    if(i == 0){
                        node.addClass("swiper-pagination-bullet-active");
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
        leftNavDownload();
        topNavDownload();
    }

    //实现轮播图的轮播效果
    function banner(){
        var iNow = 0; //当前显示图片的下标
        var aImgs = null; //记录图片
        var aBtns = null; //记录小圆圈

        //定时器，每隔2.5S切换图片
        var timer = setInterval(function(){
            iNow++;
            tab();
        }, 2500);

        //封装一个切换函数
        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");//找到图片
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");//找到小圆圈
            }
            if(iNow == 5){
                iNow = 0;//图片循环
            }

            //图片切换  先所有隐藏，然后设置透明度为0.2，再显示图片，并通过动画去设置透明度为1，时间是500毫秒。
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 500);
            
            //小圆点切换  先取消被选中样式，然后找到当前显示图片的按钮添加被选中样式
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //鼠标的移入移出
        $("#J_homeSwiper, .swiper-button-prev, .swiper-button-next").mouseenter(function(){
            clearInterval(timer); //取消定时器
        }).mouseleave(function(){
            //二次启动
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2500);
        })//链式操作

        //点击小圆圈完成切换对应的图片，实现方法：事件委托
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function(){
            iNow = $(this).index();
            tab();
            return false;//阻止a链接的默认行为（禁止链接跳转）
        })

        //添加左右按钮的点击事件
        $(".swiper-button-prev, .swiper-button-next").click(function(){
            if(this.className == "swiper-button-prev"){
                if(iNow == 0) iNow = 4;
                else iNow--;
            }else{
                iNow++;
            }
            tab();
        })
    }

    //侧边导航栏数据下载
    function leftNavDownload(){
        $.ajax({
            url: "../data/nav.json",
            success: function(result){
                var sideArr = result.sideNav;
                for(var i = 0; i < sideArr.length; i++){
                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideArr[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                            
                        </div>
                    </li>`);
                    node.appendTo("#J_categoryList");

                    //取出当前选项对应的子节点
                    var childArr = sideArr[i].child;
                    //计算一共需要多少列，并设置对应的class样式
                    var col = Math.ceil(childArr.length / 6);
                    node.find("div.children").addClass("children-col-" + col);
                    //通过循环，创建右侧的每一个数据
                    for(var j = 0; j < childArr.length; j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                        <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                            <img src="${childArr[j].img}" width="40" height="40" alt="" class="thumb">
                            <span class="text">${childArr[j].title}</span>
                        </a>
                    </li>`).appendTo(newUl);
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })   
    }

    //给侧边导航栏添加移入切换的效果 选项卡切换效果
    function leftNavTab(){
        //事件委托
        $("#J_categoryList").on("mouseenter", ".category-item", function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave", ".category-item", function(){
            $(this).removeClass("category-item-active");
        })
    }

    //下载顶部导航的数据
    function topNavDownload(){
        $.ajax({
            url: "../data/nav.json",
            success: function(result){
                var topNavArr = result.topNav;
                topNavArr.push({title: "服务"}, {title: "社区"});
                for(var i = 0; i < topNavArr.length; i++){
                    $(`<li data-index="${i}" class="nav-item">
                    <a href="javascript: void(0);"  class="link">
                        <span class="text">${topNavArr[i].title}</span>
                    </a>
                    </li>`).appendTo(".site-header .header-nav .nav-list");
                    
                    var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? "block" : "none"}"></ul>`);
                    node.appendTo("#J_navMenu .container");

                    //取出所有子菜单
                    if(topNavArr[i].childs){
                        var childsArr = topNavArr[i].childs;
                        for(var j = 0; j < childsArr.length; j++){
                            $(`<li>
                            <a href="#">
                                <div class = 'figure figure-thumb'>
                                    <img src="${childsArr[j].img}" alt=""/>
                                </div>
                                <div class = 'title'>${childsArr[j].a}</div>
                                <p class = 'price'>${childsArr[j].i}</p>
                            </a>
                            </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //顶部导航栏添加移入移出效果
    function topNavTab(){
        $(`.header-nav .nav-list`).on("mouseenter", ".nav-item", function(){
            $(this).addClass("nav-item-active");
            //找出当前移入a标签的下标
            var index = $(this).index()-1;
            if(index >= 0 && index <= 6){
                //除了“服务”和“社区”，其他都展开商品
                $("#J_navMenu").css({display: "block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display", "block").siblings("ul").css("display", "none");
            }else{
                //从其他a标签移到“服务”和“社区”时，收起
                $("#J_navMenu").css({display: "none"}).removeClass("slide-down").addClass("slide-up");
            }
        })
        $(`.header-nav .nav-list`).on("mouseleave", ".nav-item", function(){
            $(this).removeClass("nav-item-active");
        })
        //鼠标移出导航栏和商品的范围后，收起
        $(`.site-header`).mouseleave(function(){
            $("#J_navMenu").css({display: "none"}).removeClass("slide-down").addClass("slide-up");
        })
        //鼠标移入“全部商品分类”后，收起
        $(`#J_navCategory`).mouseenter(function(){
            $("#J_navMenu").css({display: "none"}).removeClass("slide-down").addClass("slide-up");
        })
    }

    //给商品列表页的侧边导航栏添加移入移出效果
    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter", ".nav-category", function(){
            $(this).addClass("link-category-active");
            $(this).find(".site-category").css("display", "block");
        })
        $(".header-nav .nav-list").on("mouseleave", ".nav-category", function(){
            $(this).removeClass("link-category-active");
            $(this).find(".site-category").css("display", "none");
        })
    }

    //搜索框
    function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
        }).blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        })
    }

    return {
        download: download,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab: searchTab,
        leftNavDownload: leftNavDownload,
        topNavDownload: topNavDownload,
        allGoodsTab: allGoodsTab
    }
})
