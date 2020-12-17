var comic = $(".comics");
var content = $(".content");
var choice = $(".choice");
var isPhone = detectmob();

getWidth();

//設定寬度
function getWidth(event){
    var scaleimg = $(window).width()/148;
    if(isPhone){
        var dWidth = $(window).width();
        content.width(dWidth);
        comic.width(dWidth);
        choice.width(70*scaleimg);
    }
    else{
        content.width("375px");
        comic.width("375px");
    }
}

//偵測是否為手機
function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}