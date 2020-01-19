/**
 * Created by Fly on 2018/3/30.
 */
window.onload = function () {
    $(document).scrollTop(0);
};
// var a=document.querySelectorAll('.bg')
// document.onclick=function () {
//     alert(1234);
//     alert(a.CSS.width);
//     console.log(123);
//
// }
//头部点击出现消失

// (function () {    // 头部热点轮播
//     var $img1=$(".header .content .zhong .imgg1");
//     var $img2=$(".header .content .zhong .imgg2");
//
//     // $img1.mouseenter(function () {
//     //     $img1.css({opacity:0});
//     //     $img2.css({display:'block'});
//     //
//     // })
//     // $img1.mouseleave(function () {
//     //     $img1.css({opacity:'1'});
//     //     // $img2.css({display:'none'});
//     //
//     // })
//     // $img2.mouseenter(function () {
//     //     $img1.css({opacity:'0'});
//     // })
//     // $img2.mouseleave(function () {
//     //     $img1.css({opacity:'1'});
//     //     $img2.css({display:'none'});
//     //
//     // })
// })();

$(function () {   //第一行
    //头部滚动
    (function () {    // 头部热点轮播
        var $banner = $('.header .content .nav-tabs .nav-item #banner');
        var $li = $banner.children();
        $banner.append($li.eq(0).clone());
        var num = 0;
        (function request() {
            num++;
            $banner.animate({top: -num * $li.eq(0).height()}, function () {
                if (num == $li.length) {
                    num = 0;
                    $banner.css({top: 0})
                }

            });
            setTimeout(request, 2000);
        })();
    })();

    //首屏滑动

    (function () {
        var $embed=$("#bg .bg1 embed");
        var $logo=$("#wrap").find(".wswiper #logo");
        var $swp2=$("#wrap").find(".wswiper .swp2");
        var $swp3=$("#wrap").find(".wswiper .swp3");
        var $swp4=$("#wrap").find(".wswiper .swp4");
        var $vBtn=$('#wrap').find('.videoBtn');
        var $video=$('#wrap').find('.video');
        var $video1=$('#wrap').find('.video video');
        var $i=$('#wrap').find('#video .close');
        setTimeout(function () {
            $embed.css("opacity" , 1);
        },1500);

        //fadeIn的同时改变left的值
        // $logo.fadeIn(1000);
        $logo.animate({
            opacity:1,
            left:0
        }, 1500);
        $swp2.animate({
            opacity:1,
            right:20,
        }, 1500);
        $swp3.animate({
            opacity:1,
            top:70,
        }, 1500);
        $swp4.animate({
            opacity:1,
            top:510,
        }, 1500);
        //视频播放：
        $vBtn.click(function () {
            $video.css({display:'block'});
            $video1[0].play();
        })
        $i.click(function () {
            $video.css({display:'none'});
            $video1[0].pause();
        })

    })();
    
    // 最新情报弹窗
    (function () {
        // 显示隐藏
        var $newinfo=$("#newinfo"),
            $title=$newinfo.find(".title"),
            $infolist=$newinfo.find(".infolist ul li"),
            $pop=$newinfo.find(".popwindow"),
            $popLi=$newinfo.find(".content ul li"),
            $popclose=$pop.find(".close"),
            $txt=$pop.find('.content .txt'),
            $btn=$pop.find('.content .btn'),
            txtH=$txt.height(),
            index=0,
            length= $popLi.length;
        // console.log(txtH);

        // 自定义滚动条
            // console.log(txtH);
        $txt.each(function () {
            // console.log(1);
            var $mainTxt=$(this).find('.mainTxt'),
                $scroll=$(this).find('.scroll'),
                $bar=$(this).find('.bar'),
                mainH = $mainTxt.height(),
                barH=txtH*txtH/mainH,
                topMax=txtH-barH,
                topMin=0;
            $bar.height(barH);  //滚动条长度
            // console.log(barH);
            // console.log(mainH);
            // 按住滚动条滚动内容
            $bar.mousedown(function (e) {
                // console.log(2);
                var sY=e.clientY;
                var sTop=$(this).position().top;
                var $This=$(this);

                var $mainTxt=$(this).parent().siblings();
                // 按住滚动条滚动内容
                $(document).mousemove(function (e) {
                    // console.log(3);
                    var nY =e.clientY;
                    var top=sTop + nY - sY;
                    top=Math.min(top , topMax);
                    top=Math.max(top , topMin);
                    $This.css("top" , top);
                    $mainTxt.css("top" , -top*mainH/txtH);
                }).mouseup(function () {
                    $(this).off("mousemove").off("mouseup");
                });
                return false;
            });
            // 鼠标滚轮事件
            $(this).mousewheel(function (e,d) {
                // 向下滚动 d < 0
                // 向上滚动 d > 0
                // console.log(d);
                var top = $bar.position().top;
                if (d < 0){
                    top += 10;
                }else{
                    top -= 10;
                }
                top=Math.min(top , topMax);
                top=Math.max(top , topMin);
                $bar.css("top" , top);
                $mainTxt.css("top" , -top*mainH/txtH);
                return false;  //避免触发浏览器的默认滚动事件，
            });
            // 点击滚动条的动画
            $scroll.click(function (e) {
                if ( e.target === this ){
                    var y = e.clientY-($(this).offset().top-$(document).scrollTop()),
                        top = $bar.position().top;
                    top = y<top?top-100:top+100;
                    top = Math.min(top , topMax);
                    top = Math.max(top , topMin);
                    $bar.stop().animate({"top" : top},500);
                    $mainTxt.stop().animate({"top" : -top*mainH/txtH},500);
                }
            });
        });

        $pop.hide().css("opacity" , 1);
        $popLi.hide();

        // 点击弹出弹窗
        $infolist.click(function () {
            index = $(this).index();
            // console.log(index);
            $(document.body).addClass("noScroll");
            $pop.show();
            $popLi.eq(index).show().siblings().hide();
        });
        // 点击关闭弹窗
        $popclose.click(function () {
            $(document.body).removeClass("noScroll");
            $pop.hide();
        });
        // 弹窗层左右按钮
        $btn.click(function () {
            if ($(this).index(".content .btn")){ //在".content .btn" 选择器里面的序列号
                index++;
                index %= length;
            }else{
                index--;
                if (index<0) index=length-1;
            }
            $popLi.eq(index).show().siblings().hide();
        });
        
    })();
    // 游戏特色banner
    (function () {
        var $game = $("#game"),
            $picLi = $game.find(".pic ul li"),
            $btn=$game.find(".btn span"),
            index = 0,
            length = $picLi.length;

        $picLi.click(function () {
            if ( $(this).index() !== index ){
                index = $(this).index();
                var lIndex = index - 1,
                    rIndex = index + 1;
                if ( lIndex < 0 )lIndex = length-1;
                if (rIndex >= length)rIndex = 0;
                $picLi.removeClass("left mid right");
                $picLi.eq(lIndex).addClass("left");
                $picLi.eq(index).addClass("mid");
                $picLi.eq(rIndex).addClass("right");
            }
        });
        // 左右按钮
        $btn.click(function () {
            if ( $(this).index() ){
                index ++;
                index %= length;
            }else{
                index --;
                if(index<0)index=length-1;
            }
            change();
        });

        function change() {
            var lIndex = index - 1,
                rIndex = index + 1;
            if ( lIndex < 0 )lIndex = length-1;
            if (rIndex >= length)rIndex = 0;
            $picLi.removeClass("left mid right");
            $picLi.eq(lIndex).addClass("left");
            $picLi.eq(index).addClass("mid");
            $picLi.eq(rIndex).addClass("right");
        }
    })();
    
    // 滚轮的延迟显示
    (function () {  // 滚轮的延迟显示
        var $newinfo=$("#newinfo"),
            $title=$newinfo.find(".title"),
            $infolist=$newinfo.find(".infolist ul li"),
            objArr = [];

        init($title,$infolist);

        $(window).scroll(function () {
            var height = $(document).scrollTop() + $(window).height();
            for (var i = objArr.length-1; i >= 0; i--) {
                var obj = objArr[i];
                if (height >= obj.oddTop ){
                    (function () {
                        var $This = $(obj);
                        setTimeout(function () {
                            $This.removeClass("hide");
                        },($This.index()%3)*200);   //延迟
                        objArr.slice(i,1);
                    })();
                }
            }
        });
        function init() {
            for (var i = 0,length=arguments.length; i < length; i++) {
                arguments[i].each(function () {
                    this.oddTop = $(this).offset().top;
                    objArr.push(this);
                });
            }
        }

    })();
})















