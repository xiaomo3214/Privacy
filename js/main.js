var comic = $(".comics");
var content = $(".content");
var choice = $(".choice");
var isPhone = detectmob();

getWidth();

//設定寬度
function getWidth(event){
    var scaleimg = $(window).width()/148;  //148為原先選項的圖片寬度
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

var sleep = $(".right");
var choosesleep = document.querySelector(".right");
var wakeup = $(".left");
var choosewakeup = document.querySelector(".left");
var startX = startY = endX = endY = 0;
var choose = 0, mouse = false;
//computer
function mouseevent(){
    choosesleep.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 1;
    }, false);
    choosewakeup.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 2;
    }, false);
    window.addEventListener('mousemove',function(event){
        // event.preventDefault();
        if(choose == 1){
            var pos1 = sleep.offset();
            endX = event.screenX;
            endY = event.screenY;
            var distanceX = (endX - startX);
            // var distanceY = (endY - startY);
            if(mouse && (startX!=Math.abs(distanceX)) && event.buttons == 1){
                if(distanceX < 0){
                    sleep.offset({left:pos1.left+distanceX});
                }
                if(distanceX > 0){
                    sleep.offset({left:pos1.left+distanceX});
                }
                // if(distanceY < 0){
                //     sleep.offset({top:pos1.top+distanceY});
                // }
                // if(distanceY > 0){
                //     sleep.offset({top:pos1.top+distanceY});
                // }
                startX = endX;
                // startY = endY;
            }
        }

        if(choose == 2){
            var pos1 = wakeup.offset();
            endX = event.screenX;
            endY = event.screenY;
            var distanceX = (endX - startX);
            // var distanceY = (endY - startY);
            if(mouse && (startX!=Math.abs(distanceX)) && event.buttons == 1){
                if(distanceX < 0){
                    wakeup.offset({left:pos1.left+distanceX});
                }
                if(distanceX > 0){
                    wakeup.offset({left:pos1.left+distanceX});
                }
                // if(distanceY < 0){
                //     sleep.offset({top:pos1.top+distanceY});
                // }
                // if(distanceY > 0){
                //     sleep.offset({top:pos1.top+distanceY});
                // }
                startX = endX;
                // startY = endY;
            }
        }
    }, false);
}