var comic = $(".comics");
var error = $(".over");
var content = $(".content");
var dot = $(".flex-dot");
var dt = 0;
var speedplus = 3;

// var startInertiaMoveTime = 0;
// var lastMoveStart = 0;
// var stopInertiaMove = false; //是否開始緩動
// var minusMove = 0;
// var slideTime = 0;


/**
 * 用于缓动的变量
 */
 var lastMoveTime = 0;
 var lastMoveStart = 0;
 var stopInertiaMove = false; // 是否停止缓动 
 var flg = false; //標記是否移動


var one = document.getElementById('dot1');
var two = document.getElementById('dot2');
var three = document.getElementById('dot3');
var four = document.getElementById('dot4');
var five = document.getElementById('dot5');

var choice = $(".choice");
var isPhone = detectmob();
var choose = null, mouse = false, speed = 5000, cspeed = 1;
var lastY = 0;
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
Getdot();

//window.onscroll = function() {touchRead()};

//設定寬度
function getWidth(event){
    var scaleimg = $(window).width()/148;  //148為原先選項的圖片寬度
    if(isPhone){
        var dWidth = $(window).width();
        comic.width(dWidth);
        content.width(dWidth);
        choice.width(dWidth);
        dot.width(dWidth);
    }
    else{
        comic.width("375px");
        content.width("375px");
        dot.width("375px");
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

function Getdot(){
    dot1.style.display = 'none';
    dot2.style.display = 'none';
    dot3.style.display = 'none';
    dot4.style.display = 'none';
    dot5.style.display = 'none';
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function Init(){
    choose = null;
    mouse = false;
    startX = startY = endX = endY = 0;
    comic.css("display","block");
    error.css("display","none");
    main.css("top",0);
    end.css("top",0);
    dt = 0;
    leftchoice.css("display","none");
    rightchoice.css("display","none");
    leftchoice.css("left","-0px");
    rightchoice.css("left","1px");
}

function nextStory(){

    document.location.href="ch01_2.html";


    // if(document.location.href == "ch01_1.html"){
    //     document.location.href="index.html";
    // }
    // if(document.location.href == "ch01_3.html"){
    //     document.location.href="ch01_2.html";
    // }



    // if(window.location.href == "ch01_1.html"){
    //     document.location.href="index.html";
    // }
    // if(window.location.href == "ch01_3.html"){
    //     document.location.href="ch01_2.html";
    // }



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
                        main.offset({top:pos.top + disranceY-speedplus});
                        if(main.position().top + disranceY < (-main.height() + $(window).height())){
                            var dot = $(window).height()/25;
                            
                        }
                        if(main.position().top + disranceY < (-main.height() + $(window).height()) - $(window).height()/5){
                            console.log(dt);
                            dt++;
                            if(dt == 1){
                                dot1.style.display = 'block';
                            }
                            if(dt == 3){
                                dot2.style.display = 'block';
                            }
                            if(dt == 5){
                                dot3.style.display = 'block';
                            }
                            if(dt == 7){
                                dot4.style.display = 'block';
                            }
                            if(dt == 9){
                                dot5.style.display = 'block';
                            }
                            if(dt == 10){
                                nextStory();
                            }
                            
                        }
                    }
                    else if(disranceY > 0){
                        if(main.position().top + disranceY < 0){
                            main.offset({top:pos.top + disranceY+speedplus});
                        }
                    }
                    startY = endY;
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

            
        }
    },false);

    story.addEventListener('mousedown',function(event){
        // event.preventDefault();
        mouse = true;
        startX = event.screenX;
        startY = event.screenY;
        choose = 'story';
    }, false);

    
}

//手機指令

function touchRead(){
    window.addEventListener('touchmove',function(event){
        event.preventDefault(); //防止預設觸控事件
    }, {passive: false});

    window.addEventListener('touchmove',function(event){
        var touch = event.targetTouches[0];
        switch(choose){
            //主軸故事
            case 'story':
                flg = true;
                var pos = main.offset();
                // endX = touch.screenX;
                endY = touch.screenY;

                // var distanceX = (endX - startX);
                var disranceY = (endY - startY);
                //slideTime++;
                //console.log(slideTime);
                // if(slideTime >4){
                if(flg){
                    if(startY != Math.abs(disranceY)){
                        if(disranceY < 0){
                            
                            // $(main).stop().animate()({
                                
                            // }, 1000)
                            main.offset({top:pos.top + disranceY-speedplus});
                            if(main.position().top + disranceY < (-main.height() + $(window).height()) - $(window).height()/5){
                                console.log(dt);
                                dt++;
                                if(dt == 1){
                                    dot1.style.display = 'block';
                                }
                                if(dt == 3){
                                    dot2.style.display = 'block';
                                }
                                if(dt == 5){
                                    dot3.style.display = 'block';
                                }
                                if(dt == 7){
                                    dot4.style.display = 'block';
                                }
                                if(dt == 9){
                                    dot5.style.display = 'block';
                                }
                                if(dt == 10){
                                    nextStory();
                                }
                            }
                        }
                        else if(disranceY > 0){
                            if(main.position().top + disranceY < 0){
                                main.offset({top:pos.top + disranceY+speedplus});
                            }
                        }
                        
                        startY = endY;
                    }

                    //慣性緩動
                    var nowTime = new Date().getTime();
                    stopInertiaMove = true;
                    if(nowTime - lastMoveTime > 300){
                        lastMoveTime = nowTime;
                        lastMoveStart = endY;
                    }

                }



                // }
                // else if(slideTime < 4){
                //     if(disranceY < 0){
                //         startInertiaMoveTime++;
                //         console.log(startInertiaMoveTime);
                //         console.log(minusMove);
                        
                //         if(disranceY + minusMove != 0 ){
                //             main.offset({top:pos.top + disranceY});
                //             sleep(1000);
                //             disranceY = disranceY - minusMove;
                //             minusMove = minusMove + startInertiaMoveTime;
                //             console.log(disranceY);
                //         }
                        
                //     }
                //     startInertiaMoveTime =0;

                // }
                break;   
        }
    });

    window.addEventListener('touchend',function(event){
        
        switch(choose){
            //主軸故事
            case 'story':
                flg = false;
                choose = null;
                startX = startY = endX = endY = 0;
                //slideTime = 0;
                
                //慣性緩動
                var nowTime = new Date().getTime();
                var v = (endY - lastMoveStart) / (nowTime-lastMoveTime);
                stopInertiaMove = false;
                break;

            
        }
    },false);

    story.addEventListener('touchstart',function(event){
        // event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.screenX;
        startY = touch.screenY;
        
        
        //慣性緩動
        lastMoveStart = lastY;
        lastMoveTime = new Date().getTime();
        stopInertiaMove = true;   

        choose = 'story';
        //console.log(choose);
    }, false);
}