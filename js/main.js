var comic = $(".comics");
var content = $(".content");
var choice = $(".choice");
var isPhone = detectmob();
var choose = null, mouse = false, speed = 500, cspeed = 1;
var startX = startY = endX = endY = 0;
var main = $("#main");
var end = $("#end");
var leftchoice = $(".correct");
var rightchoice = $(".wrong");
var story = document.querySelector("#main");
var over = document.querySelector("#end");
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
                var pos = main.offset();
                // endX = event.screenX;
                endY = event.screenY;
                // var distanceX = (endX - startX);
                var disranceY = (endY - startY);
                if(mouse && startY != Math.abs(disranceY) && event.buttons == 1){
                    if(disranceY < 0){
                        if(main.position().top + disranceY * ((main.height() - $(window).height()) / speed) > (-main.height() + $(window).height())){
                            main.offset({top:pos.top + disranceY * ((main.height() - $(window).height()) / speed)});
                        }
                        if(main.position().top + disranceY * ((main.height() - $(window).height()) / speed) < -890){
                            $(".correct").fadeIn();
                            $(".wrong").fadeIn();
                        }
                        else{
                            $(".correct").fadeOut();
                            $(".wrong").fadeOut();
                        }
                    }
                    else if(disranceY > 0){
                        if(main.position().top + disranceY * ((main.height() - $(window).height()) / speed) < 0){
                            main.offset({top:pos.top + disranceY * ((main.height() - $(window).height()) / speed)});
                        }
                        if(main.position().top + disranceY * ((main.height() - $(window).height()) / speed) < 0){
                            $(".correct").fadeOut();
                            $(".wrong").fadeOut();
                        }
                    }
                    startY = endY;
                }
                break;

            //結束故事
            case 'gameover':
                var pos = end.offset();
                // endX = event.screenX;
                endY = event.screenY;
                // var distanceX = (endX - startX);
                var disranceY = (endY - startY);
                if(mouse && startY != Math.abs(disranceY) && event.buttons == 1){
                    if(disranceY < 0){
                        if(end.position().top + disranceY * ((end.height() - $(window).height()) / speed) > (-end.height() + $(window).height())){
                            end.offset({top:pos.top + disranceY * ((end.height() - $(window).height()) / speed)});
                        }
                    }
                    else if(disranceY > 0){
                        if(end.position().top + disranceY * ((end.height() - $(window).height()) / speed) < 0){
                            end.offset({top:pos.top + disranceY * ((end.height() - $(window).height()) / speed)});
                        }
                    }
                    startY = endY;
                }
                break;
            
            //正確答案
            case 'correctanswer':
                var pos = leftchoice.offset();
                endX = event.screenX;
                // endY = event.screenY;
                var distanceX = (endX - startX);
                // var disranceY = (endY - startY);
                if(mouse && startX != Math.abs(distanceX) && event.buttons == 1){
                    if(distanceX < 0){
                        if(leftchoice.position().left + distanceX / cspeed > -100)
                            leftchoice.offset({left:pos.left+distanceX/cspeed});
                    }
                    if(distanceX > 0){
                        if(leftchoice.position().left + distanceX / cspeed < 0)
                            leftchoice.offset({left:pos.left+distanceX/cspeed});
                    }
                    startX = endX;
                }
                break;

            //錯誤答案
            case 'wronganswer':
                var pos = rightchoice.offset();
                endX = event.screenX;
                // endY = event.screenY;
                var distanceX = (endX - startX);
                // var disranceY = (endY - startY);
                if(mouse && startX != Math.abs(distanceX) && event.buttons == 1){
                    if(distanceX < 0){
                        if(rightchoice.position().left + distanceX / cspeed > 0)
                            rightchoice.offset({left:pos.left+distanceX/cspeed});
                    }
                    if(distanceX > 0){
                        if(rightchoice.position().left + distanceX / cspeed)
                            rightchoice.offset({left:pos.left+distanceX/cspeed});
                    }
                    startX = endX;
                }
                break;
        }
    });

    window.addEventListener('mouseup',function(event){
        choose = null;
        mouse = false;
        startX = startY = endX = endY = 0;
        switch(choose){
            //主軸故事
            case 'story':
                choose = null;
                mouse = false;
                startX = startY = endX = endY = 0;
                break;

            //選錯選項
            case 'gameover':
                choose = null;
                mouse = false;
                startX = startY = endX = endY = 0;
                break;
            
            //正確答案
            case 'correctanswer':
                choose = null;
                mouse = false;
                startX = startY = endX = endY = 0;
                break;

            //錯誤答案
            case 'wronganswer':
                choose = null;
                mouse = false;
                startX = startY = endX = endY = 0;
                break;
        }
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