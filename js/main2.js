var comic = $(".comics");
var error = $(".over");
var content = $(".content");
var choice = $(".choice");
var isPhone = detectmob();
var choose = null, mouse = false, speed = 500, cspeed = 1;
var startX = startY = endX = endY = 0;
var main = $("#main");
var end = $("#end");
var leftchoice = $("#correct");
var rightchoice = $("#wrong");
var story = document.querySelector("#main");
var over = document.querySelector("#end");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");

getWidth();
mouseRead();
touchRead();

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
function Init(){
    choose = null;
    mouse = false;
    startX = startY = endX = endY = 0;
    comic.css("display","block");
    error.css("display","none");
    main.css("top",0);
    end.css("top",0);
    leftchoice.css("display","none");
    rightchoice.css("display","none");
    leftchoice.css("left","-0px");
    rightchoice.css("left","1px");
}

function nextStory(){
    document.location.href="ch01_1.html";
    // choose = null;
    // mouse = false;
    // startX = startY = endX = endY = 0;
    // main.css("top",0);
    // leftchoice.css("display","none");
    // rightchoice.css("display","none");
    // leftchoice.css("left","-0px");
    // rightchoice.css("left","1px");
}

function gameOver(){
    choose = null;
    mouse = false;
    startX = startY = endX = endY = 0;
    comic.css("display","none");
    error.css("display","block");
    main.css("top",0);
    leftchoice.css("display","none");
    rightchoice.css("display","none");
    leftchoice.css("left","-0px");
    rightchoice.css("left","1px");
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
                        if(main.position().top + disranceY * ((main.height() - $(window).height()) / speed) < (-main.height() + $(window).height())){
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

            /*//錯誤故事
            case 'gameover':
                var pos = end.offset();
                // endX = event.screenX;
                endY = event.screenY;
                // var distanceX = (endX - startX);
                var disranceY = (endY - startY);
                if(mouse && startY != Math.abs(disranceY) && event.buttons == 1){
                    if(disranceY < 0){
                        end.offset({top:pos.top + disranceY * ((end.height() - $(window).height()) / speed)});
                        if(end.position().top + disranceY * ((end.height() - $(window).height()) / speed) < (-end.height() + $(window).height()) - $(window).height()/5){
                            Init();
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
                        leftchoice.offset({left:pos.left+distanceX/cspeed});
                        if(leftchoice.position().left + distanceX / cspeed < -leftchoice.width() / 2){
                            // leftchoice.offset({left:pos.left+distanceX/cspeed});
                            // leftchoice.fadeOut();
                            nextStory();
                        }
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
                        rightchoice.offset({left:pos.left + distanceX / cspeed});
                        if(rightchoice.position().left + distanceX / cspeed > rightchoice.width() / 2){
                            gameOver();
                        }
                    }
                    startX = endX;
                }
                break;*/
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

            /*//錯誤故事
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
                break;*/
        }
    },false);

    story.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 'story';
    }, false);

    /*over.addEventListener('mousedown',function(event){
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
    }, false);*/
}

//手機指令
function touchRead(){
    window.addEventListener('touchmove',function(event){
        // event.preventDefault(); //防止預設觸控事件
    }, {passive: false});

    window.addEventListener('touchmove',function(event){
        var touch = event.targetTouches[0];
        switch(choose){
            //主軸故事
            case 'story':
                var pos = main.offset();
                // endX = touch.screenX;
                endY = touch.screenY;
                // var distanceX = (endX - startX);
                var disranceY = (endY - startY);
                if(startY != Math.abs(disranceY)){
                    if(disranceY < 0){
                        if(main.position().top + disranceY * ((main.height() - $(window).height()) / speed) > (-main.height() + $(window).height())){
                            main.offset({top:pos.top + disranceY * ((main.height() - $(window).height()) / speed)});
                        }
                        if(main.position().top + disranceY * ((main.height() - $(window).height()) / speed) < (-main.height() + $(window).height())){
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

            /*//錯誤故事
            case 'gameover':
                var pos = end.offset();
                // endX = touch.screenX;
                endY = touch.screenY;
                // var distanceX = (endX - startX);
                var disranceY = (endY - startY);
                if(startY != Math.abs(disranceY)){
                    if(disranceY < 0){
                        end.offset({top:pos.top + disranceY * ((end.height() - $(window).height()) / speed)});
                        if(end.position().top + disranceY * ((end.height() - $(window).height()) / speed) < (-end.height() + $(window).height()) - $(window).height()/5){
                            Init();
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
                endX = touch.screenX;
                // endY = touch.screenY;
                var distanceX = (endX - startX);
                // var disranceY = (endY - startY);
                if(startX != Math.abs(distanceX)){
                    if(distanceX < 0){
                        leftchoice.offset({left:pos.left+distanceX/cspeed});
                        if(leftchoice.position().left + distanceX / cspeed < -leftchoice.width() / 2){
                            // leftchoice.offset({left:pos.left+distanceX/cspeed});
                            // leftchoice.fadeOut();
                            nextStory();
                        }
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
                endX = touch.screenX;
                // endY = touch.screenY;
                var distanceX = (endX - startX);
                // var disranceY = (endY - startY);
                if(startX != Math.abs(distanceX)){
                    if(distanceX < 0){
                        if(rightchoice.position().left + distanceX / cspeed > 0)
                            rightchoice.offset({left:pos.left+distanceX/cspeed});
                    }
                    if(distanceX > 0){
                        rightchoice.offset({left:pos.left + distanceX / cspeed});
                        if(rightchoice.position().left + distanceX / cspeed > rightchoice.width() / 2){
                            gameOver();
                        }
                    }
                    startX = endX;
                }
                break;*/
        }
    });

    window.addEventListener('touchend',function(event){
        switch(choose){
            //主軸故事
            case 'story':
                choose = null;
                startX = startY = endX = endY = 0;
                break;

            /*//錯誤故事
            case 'gameover':
                choose = null;
                startX = startY = endX = endY = 0;
                break;
            
            //正確答案
            case 'correctanswer':
                choose = null;
                startX = startY = endX = endY = 0;
                break;

            //錯誤答案
            case 'wronganswer':
                choose = null;
                startX = startY = endX = endY = 0;
                break;*/
        }
    },false);

    story.addEventListener('touchstart',function(event){
        // event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'story';
    }, false);

    /*over.addEventListener('touchstart',function(event){
        // event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'gameover';
    }, false);

    correct.addEventListener('touchstart',function(event){
        // event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'correctanswer';
    }, false);

    wrong.addEventListener('touchstart',function(event){
        // event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        choose = 'wronganswer';
    }, false);*/
}