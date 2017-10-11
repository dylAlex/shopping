/**
 * Created by Administrator on 2017/9/1.
 */
/**
 * Created by zhousg on 2015/12/11.
 */
window.onload = function(){
    initLeft();
    initRight();
};
window.onresize = function(){
    location.reload(true);
}
/*������*/
function initLeft(){
    //�ҵ�������
    var parentDom = document.getElementsByClassName("jd_category_left")[0];
    var rightDom = document.getElementsByClassName("jd_category_right")[0];
    //�ҵ�������
    var childDom = parentDom.getElementsByTagName('ul')[0];
    //��������������
    var liDom = childDom.getElementsByTagName('li');

    //ȡ�����������ݵĸ߶�
    var parentH = parentDom.offsetHeight;//��ȡ�����ӵĸ߶�
    parentH = parentH - 45;//��ȥͷ���ĸ߶Ⱦ������ݵĸ߶�
    //ȡ�����������ӵĸ߶�
    var childH = childDom.offsetHeight;

    /*��ӹ���*/
    var addTransition = function(){
        childDom.style.webkitTransition = "all .3s ease 0s";
        childDom.style.transition = "all .3s ease 0s";
    };
    /*ɾ������*/
    var removeTransition = function(){
        childDom.style.webkitTransition = "all 0s ease 0s";
        childDom.style.transition = "all 0s ease 0s";
    };

    /*����*/
    var startY = 0;//��ʼ��Y����
    var endY = 0;//������Y����
    var moveY = 0;//�����ľ���
    var currY = 0;//��ǰtranslateY��ֵ
    //������ʱ�����Ƶ���󻬶��������С��������
    var maxY = 150,minY = -(childH - parentH + 150);
    //���ʱ��
    var startTime = 0,endTime = 0;

    childDom.addEventListener('touchstart',function(e){
        console.log(0);
        //�õ���ʼ��Y����
        startY = e.touches[0].clientY;//�����ĸ�����
        startTime = new Date().getTime();
    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        console.log(1);
        //�ѵ�����ʱ���Y����
        endY = e.touches[0].clientY;
        moveY = startY - endY;
        //ֻ������������
        if((currY - moveY) <= maxY && (currY - moveY) >= minY){
            removeTransition();
            childDom.style.transform = "translateY("+(currY - moveY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY - moveY)+"px)";
        }
    },false);
    c
    hildDom.addEventListener('touchcancel',function(e){
        alert(0);
        //��������֮���¼�µ�ǰ��translateY��ֵ
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //��������0��ʱ���������������ȥ
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //������������ϻ��������ʱ���������������ȥ
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //�Ѳ�����0
        startY = 0;
        endY = 0;
        moveY = 0;
    });
    childDom.addEventListener('touchend',function(e){
        console.log(2);
        //��������֮���¼�µ�ǰ��translateY��ֵ
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //��������0��ʱ���������������ȥ
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //������������ϻ��������ʱ���������������ȥ
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }

        endTime = new Date().getTime();
        //tap
        console.log(moveY+"==="+(endTime-startTime));
        if(moveY == 0 && endTime-startTime < 200){
            var target = e.target.parentNode;
            //���class�������Ԫ�ؼ���now
            for(var i = 0 ; i < liDom.length ; i ++){
                liDom[i].index = i;
                liDom[i].className = " ";
            }
            target.className = "now";

            //������Ҫ�����ĸ߶�
            var top = target.index*50;
            if(top < (childH - parentH)){
                addTransition();
                childDom.style.transform = "translateY("+(-top)+"px)";
                childDom.style.webkitTransform = "translateY("+(-top)+"px)";
                //���õ�ǰ��translateY��ֵ
                currY = -top;
            }else{
                addTransition();
                childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
                childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
                //���õ�ǰ��translateY��ֵ
                currY = -(childH - parentH);
            }

            rightDom.style.webkitTransition= "all 0.2s ease 0s";
            rightDom.style.transition = "all 0.2s ease 0s";
            rightDom.style.opacity = 0;
            setTimeout(function(){
                rightDom.style.opacity = 1;
            },300);
        }

        //�Ѳ�����0
        startY = 0;
        endY = 0;
        moveY = 0;
    },false);



    /* for(var i = 0 ; i < liList.length ; i ++){
     liList[i].index = i;
     liList[i].addEventListener('click',function(e){
     //���class�������Ԫ�ؼ���now
     for(var j = 0 ; j < liList.length ; j ++){
     liList[j].className = " ";
     }
     this.className = "now";

     //������Ҫ�����ĸ߶�
     var top = this.index*liH;
     if(top < (childH - parentH)){
     addTransition();
     childDom.style.transform = "translateY("+(-top)+"px)";
     childDom.style.webkitTransform = "translateY("+(-top)+"px)";
     //���õ�ǰ��translateY��ֵ
     currY = -top;
     }else{
     addTransition();
     childDom.style.transform = "translateY("+(-(childH - parentH))+"px)";
     childDom.style.webkitTransform = "translateY("+(-(childH - parentH))+"px)";
     //���õ�ǰ��translateY��ֵ
     currY = -(childH - parentH);
     }

     //bug 2015-12-11 ����dom����  ���������޷�����
     //ģ�����Ч��
     /!*rightDom.style.webkitTransition= "all 0.2s ease 0s";
     rightDom.style.transition = "all 0.2s ease 0s";
     rightDom.style.opacity = 0;
     setTimeout(function(){
     rightDom.style.opacity = 1;
     },300);*!/

     },false);
     }*/
}
/*�ұ�*/
function initRight(){
    //�Ҳ�
    var parentDom = document.getElementsByClassName("jd_category_right")[0];
    //�ҵ�������
    var childDom = parentDom.getElementsByClassName('jd_catRight_con')[0];

    //ȡ�����������ݵĸ߶�
    var parentH = parentDom.offsetHeight;
    //ȡ�����������ӵĸ߶�
    var childH = childDom.offsetHeight;

    /*��ӹ���*/
    var addTransition = function(){
        childDom.style.webkitTransition = "all .3s ease 0s";
        childDom.style.transition = "all .3s ease 0s";
    };
    /*ɾ������*/
    var removeTransition = function(){
        childDom.style.webkitTransition = "all 0s ease 0s";
        childDom.style.transition = "all 0s ease 0s";
    };

    /*����*/
    var startY = 0;//��ʼ��Y����
    var endY = 0;//������Y����
    var moveY = 0;//�����ľ���
    var currY = 0;//��ǰtranslateY��ֵ
    //������ʱ�����Ƶ���󻬶��������С��������
    var maxY = 150,minY = -(childH - parentH + 150);

    childDom.addEventListener('touchstart',function(e){
        //�õ���ʼ��Y����
        startY = e.touches[0].clientY;
    },false);
    childDom.addEventListener('touchmove',function(e){
        e.preventDefault();
        //�ѵ�����ʱ���Y����
        endY = e.touches[0].clientY;
        moveY = startY - endY;
        //ֻ������������
        if((currY - moveY) <= maxY && (currY - moveY) >= minY){
            removeTransition();
            childDom.style.transform = "translateY("+(currY - moveY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY - moveY)+"px)";
        }
    },false);
    childDom.addEventListener('touchend',function(e){
        //��������֮���¼�µ�ǰ��translateY��ֵ
        if((currY - moveY) <= 0 && (currY - moveY) >= -(childH - parentH)){
            currY = currY - moveY;
        }
        //��������0��ʱ���������������ȥ
        else if((currY - moveY) > 0){
            currY = 0;
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        //������������ϻ��������ʱ���������������ȥ
        else if((currY - moveY) < -(childH - parentH)){
            currY = -(childH - parentH);
            addTransition();
            childDom.style.transform = "translateY("+(currY)+"px)";
            childDom.style.webkitTransform = "translateY("+(currY)+"px)";
        }
        startY = 0;
        endY = 0;
    },false);
}