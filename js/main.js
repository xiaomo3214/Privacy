var comic = $(".comics");
var content = $(".content");
var choice = $(".choice");
var isPhone = detectmob();
var choose = null, mouse = false;
var startX = startY = endX = endY = 0;
var story = document.querySelector(".comics");
var over = document.querySelector(".over");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");

getWidth();
mouseRead();

//設定寬度
function getWidth(event){
    var scaleimg = $(window).width()/148;  //148為原先選項的圖片寬度
    if(isPhone){
        var dWidth = $(window).width();
        comic.width(dWidth);
        content.width(dWidth);
        choice.width(70*scaleimg);
    }
    else{
        comic.width("375px");
        content.width("375px");
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

//電腦指令
function mouseRead(){
    window.addEventListener('mousedown',function(event){
        event.preventDefault(); //防止預設觸控事件
    }, {passive: false});

    window.addEventListener('mousemove',function(event){
        switch(choose){
            //主軸故事
            case 'story':

                break;

            //選錯選項
            case 'gameover':

                break;
            
            //正確答案
            case 'correctanswer':

                break;

            //錯誤答案
            case 'wronganswer':

                break;
        }
    });

    window.addEventListener('mouseup',function(event){
        choose = null;
        mouse = false;
        startX = startY = endX = endY = 0;
        // switch(choose){
        //     //主軸故事
        //     case 'story':
        //         choose = null;
        //         break;

        //     //選錯選項
        //     case 'gameover':
        //         choose = null;
        //         break;
            
        //     //正確答案
        //     case 'correctanswer':
        //         choose = null;
        //         break;

        //     //錯誤答案
        //     case 'wronganswer':
        //         choose = null;
        //         break;
        // }
    },false);

    story.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 'story';
    }, false);

    over.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 'gameover';
    }, false);

    correct.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 'correctanswer';
    }, false);

    wrong.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 'wronganswer';
    }, false);
}