/**
 * Created by Administrator on 2017/9/4.
 */
/**
 * Created by zhousg on 2015/12/13.
 */
window.onload = function(){
    checkBox();
}
//¸´Ñ¡¿ò
var checkBox = function(){
    var checkBoxList = document.getElementsByClassName('jd_check_box');
    console.log(checkBoxList.length);
    for (var i = 0;i<checkBoxList.length;i++ ){
        checkBoxList[i].onclick = function(){
            var hasChecked = this.getAttribute('checked');
            if()
        }
    }
}