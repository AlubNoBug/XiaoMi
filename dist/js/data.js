//主页数据的加载
define(["jquery"], function($){
    //数据下载
    function download(){
        $.ajax({
            type: "get",
            url: "../data/data.json",
            success: function(result){
                var firstData = result[0];
                var node = $(`<div class = 'home-banner-box'>
                <a href="#">
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt=""/>
                </a>
            </div>
            <div class = "home-brick-box home-brick-row-2-box xm-plain-box">
                <div class = 'box-hd'>
                    <h2 class = 'title'>${firstData.title}</h2>
                    <div class = "more">
                        <a href="#" class = 'more-link'>
                            查看全部
                            <i class = 'iconfont iconfont-arrow-right-big'></i>
                        </a>
                    </div>
                </div>
                <div class = 'hox-bd clearfix'>
                    <div class = 'row'>
                        <div class = 'span4'>
                            <ul class = 'brick-promo-list clearfix'>
                                <li class = 'brick-item brick-item-l'>
                                    <a href="#">
                                        <img src="${firstData.img}" alt=""/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class = 'span16'>
                            <ul class = 'brick-list clearfix'>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`);
                node.appendTo(".page-main .container");

                //通过循环添加子元素在页面上
                for(var i = 0; i < firstData.childs.length; i++){
                    $(`<li class = 'brick-item brick-item-m brick-item-m-2'>
                    <a href="#">
                        <div class = 'figure figure-img'>
                            <img width="160" height="160" src="${firstData.childs[i].img}" alt=""/>
                        </div>
                        <h3 class = 'title'>
                            ${firstData.childs[i].title}
                        </h3>
                        <p class = 'desc'>${firstData.childs[i].desc}</p>
                        <p class = 'price'>
                            <span class = 'num'>${firstData.childs[i].price}</span>
                            元
                            <span>起</span>
                            ${firstData.childs[i].del == 0 ? "" : "<del>" + firstData.childs[i].del + "元</del>"}
                        </p>
                    </a>
                </li>`).appendTo(node.find(".hox-bd .span16 ul"));
                }

                //后续种类商品的数据加载(热门类)
                for(var i = 1; i < result.length; i++){
                    var node2 = $(`<div class = 'home-banner-box'>
                    <a href="#">
                        <img src="${result[i].topImg}" alt=""/>
                    </a>
                </div>
                <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                    <div class = 'box-hd clearfix'>
                        <h2 class = 'title'>${result[i].title}</h2>
                        <div class = 'more'>
                            <ul class = 'tab-list'>
                                <li class = 'tab-active'>
                                    热门
                                </li>
                                <li>
                                    ${result[i].subTitle}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class = 'box-bd'>
                        <div class = 'row'>
                            <div class = 'span4'>
                                <ul class = 'brick-promo-list clearfix'>
                                    <li class = 'brick-item  brick-item-m'>
                                        <a href="#">
                                            <img src="${result[i].leftChilds[0]}" alt=""/>
                                        </a>
                                    </li>
                                    <li class = 'brick-item  brick-item-m'>
                                        <a href="#">
                                            <img src="${result[i].leftChilds[1]}" alt=""/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class = 'span16'>
                                <ul class = "brick-list clearfix">
                                    
                                </ul>
                                <ul class = "brick-list clearfix hide">
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`);
                    node2.appendTo(".page-main .container");

                    //加载热门的子商品数据
                    var hotChilds = result[i].hotChilds;
                    for(var j = 0; j < hotChilds.length; j++){
                        $(`<div>
                        <li class = 'brick-item ${j == hotChilds.length-1 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                            <a href="#">
                                <div class = 'figure figure-img'>
                                    <img width="160" height="160" src="${hotChilds[j].img}" alt=""/>
                                </div>
                                <h3 class = 'title'>${hotChilds[j].title}</h3>
                                <p class = 'desc'>${hotChilds[j].desc}</p>
                                <p class = 'price'>
                                    <span class = 'num'>${hotChilds[j].price}</span>元
                                    ${hotChilds[j].del == 0 ? "" : "<del><span class = 'num'>" + hotChilds[j].del + "</span>元</del>"}
                                </p>
                            </a>
                        </li>
                    </div>`).appendTo(node2.find(" .box-bd .row .span16 ul").eq(0));
                    }
                    //浏览更多
                    $(`<li class = 'brick-item brick-item-s'>
                    <a href="#">
                        <div class = 'figure figure-more'>
                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class = 'more'>
                            浏览更多
                            <small>热门</small>
                        </div>
                    </a>
                </li>`).appendTo(node2.find(" .box-bd .row .span16 ul").eq(0));

                    //后续种类商品的数据加载(种类的第二部门)
                    var childs = result[i].childs;
                    for(var k = 0; k < childs.length; k++){
                        $(`<div>
                        <li class = 'brick-item ${k == childs.length-1 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                            <a href="#">
                                <div class = 'figure figure-img'>
                                    <img width="160" height="160" src="${childs[k].img}" alt=""/>
                                </div>
                                <h3 class = 'title'>${childs[k].title}</h3>
                                <p class = 'desc'>${childs[k].desc}</p>
                                <p class = 'price'>
                                    <span class = 'num'>${childs[k].price}</span>元
                                    ${childs[k].del == 0 ? "" : "<del><span class = 'num'>" + childs[k].del + "</span>元</del>"}
                                </p>
                            </a>
                        </li>
                    </div>`).appendTo(node2.find(" .box-bd .row .span16 ul").eq(1));
                    }
                    //浏览更多
                    $(`<li class = 'brick-item brick-item-s'>
                    <a href="#">
                        <div class = 'figure figure-more'>
                            <i class = 'iconfont iconfont-circle-arrow-right'></i>
                        </div>
                        <div class = 'more'>
                            浏览更多
                            <small>${result[i].subTitle}</small>
                        </div>
                    </a>
                </li>`).appendTo(node2.find(" .box-bd .row .span16 ul").eq(1));
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //添加移入移出函数，切换热门与种类第二部分
    function tabMenu(){
        $(".page-main .container").on("mouseenter", ".more .tab-list li", function(){
            $(this).addClass("tab-active").siblings("li").removeClass("tab-active");

            //同时切换显示商品的内容  根据li节点使用closest方法找到父节点".home-brick-box"，再找到两个ul都设置隐藏，最后去除所选li对应ul的隐藏
            $(this).closest(".home-brick-box").find(".box-bd .span16 ul").addClass("hide").eq($(this).index()).removeClass("hide");
        })
    }

    return {
        download: download,
        tabMenu: tabMenu
    }
})