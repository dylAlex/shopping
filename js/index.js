/**
 * Created by Administrator on 2017/9/3.
 */
window.onload = function(){
    search();
    skillSecond();
    scrollPic();
}
//ͷ������
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
//�ֲ�ͼ
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

    //�ӹ���
    var addTransition = function () {
        imgBox.style.transition = 'all .3s ease 0s';
        imgBox.style.webkitTransition = 'all .3s ease 0s';
    }
    //������
    var removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    }
    //�ı�λ��
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
    //������ʼ�¼�
    imgBox.addEventListener('touchstart',function(e){
        consloe.log('start');
        startX = e.touches[0].clientX;
    });
    //���������¼�
    imgBox.addEventListener('touchmove',function(e){
        clearInterval(timer);
        //���Ĭ�ϵĹ����¼�
        e.preventDefault();
        console.log('move');
        //��¼������λ��
        endX = e.touches[0].clientX;
        //��¼�ƶ��ľ���
        moveX = startX-endX;
        //�����ʱ��
        removeTransition();
        setTransform(-index*width-moveX);
    });
    //���������¼�
    imgBox.addEventListener('touchend',function(e){
        //����ƶ��ľ����������֮һ���������ƶ�����
        if(Math.abs(moveX) > (1/3*width) && endX !=0){
            //����
            if(moveX > 0){
                index++;
            }
            //����
            else{
                index--;
            }
            //�ı�λ��
            setTransform(-index*width);
        }
        //�ص�ԭ��λ��
            addTransition();
            setTransform(-index*width);
        //��ʼ��
        startX = 0;
        endX = 0;
        //�Ͻ��Ĵ���ʱ��
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTransform(-index * width);
        }, 1000);
    });
}