/**
 * Created by Administrator on 2017/9/3.
 */
window.onload = function(){
    search();
    skillSecond();
    scrollPic();
}
//头部搜索
var search = function(){
    var jdHeader = document.getElementsByClassName("jd_header_box")[0];
    var jdBanner = document.getElementsByClassName("jd_banner")[0];
    var jdBannerAway = jdBanner.offsetHeight;
    window.onscroll = function(){
        var scrollPos = document.body.scrollTop;
        if(scrollPos > jdBannerAway){
            jdHeader.style.background ="rgba(201,21,35,0.4)";
        }else{
            var op = scrollPos/jdBannerAway * 0.85;
            jdHeader.style.background = 'rgba(201,21,35,"+op+")';
            //jdHeader.style.backgroundColor = 'black';
        }
    }
}
var skillSecond = function(){
    var paretNode = document.getElementsByClassName('ski_jishi')[0];
    var childNode = paretNode.getElementsByClassName('num');
    console.log(childNode.length);
    var time = 6*60*60;
    setInterval(function(){
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);
        console.log(h+'-'+m+'-'+s);

        childNode[0].innerHTML = Math.floor(h>10?h/10:0);
        childNode[1].innerHTML = Math.floor(h>10?h%10:h);

        childNode[2].innerHTML = Math.floor(m>10?m/10:0);
        childNode[3].innerHTML= Math.floor(m>10?m%10:m);

        childNode[4].innerHTML= Math.floor(s>10?s/10:0);
        childNode[5].innerHTML = Math.floor(s>10?s%10:s);
    },1000);
}
//轮播图
var scrollPic = function()
{
    //banner
    var banner = document.getElementsByClassName("jd_banner")[0];
    var width = banner.offsetWidth;
    var imgBox = document.getElementsByTagName('ul')[0];
    var dotBox = document.getElementsByTagName('ul')[1];
    var dotList = dotBox.getElementsByTagName('li');
    console.log(dotList);
    var index = 1;
    var timer;

    //加过渡
    var addTransition = function () {
        imgBox.style.transition = 'all .3s ease 0s';
        imgBox.style.webkitTransition = 'all .3s ease 0s';
    }
    //减过渡
    var removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }
    //改变位子
    var setTransform = function (i) {
        imgBox.style.transform = 'translateX(' + i + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + i + ' px)';
        dotList[index].style.className = 'now';
   }
    imgBox.addEventListener('transitionEnd', function () {
        console.log('guoduwanle');
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        setTransform(-index * width);
    }, false);
    imgBox.addEventListener('webkitTransitionEnd', function () {
        console.log('guoduwanle');
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        setTransform(-index * width);
    }, false);
    //触摸开始事件
    imgBox.addEventListener('touchstart',function(e){
        consloe.log('start');
        startX = e.touches[0].clientX;
    });
    //触摸滑动事件
    imgBox.addEventListener('touchmove',function(e){
        clearInterval(timer);
        //清除默认的滚动事件
        e.preventDefault();
        console.log('move');
        //记录结束的位置
        endX = e.touches[0].clientX;
        //记录移动的距离
        moveX = startX-endX;
        //清除定时器
        removeTransition();
        setTransform(-index*width-moveX);
    });
    //触摸结束事件
    imgBox.addEventListener('touchend',function(e){
        //如果移动的距离大于三分之一，并且是移动过的
        if(Math.abs(moveX) > (1/3*width) && endX !=0){
            //向左
            if(moveX > 0){
                index++;
            }
            //向右
            else{
                index--;
            }
            //改变位置
            setTransform(-index*width);
        }
        //回到原来位置
            addTransition();
            setTransform(-index*width);
        //初始化
        startX = 0;
        endX = 0;
        //严谨的处理定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTransform(-index * width);
        }, 1000);
    });
}