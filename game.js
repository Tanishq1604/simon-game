let gamepattern=[];
let userClickedPattern =[];
let lvl=0;
started =false;

$(document).keypress(()=>{
    if(!started){
        $(".level-title").text("level"+ lvl)
        sequence();
        started=true;
    }
    
})
function sequence() {
    userClickedPattern =[];
    lvl++;
    $("#level-title").text("Level " + lvl);
    let buttoncolor = ["red", "blue", "green", "yellow"] ;
    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = buttoncolor[randomNumber];
    gamepattern.push(randomColor);
    $("#"+ randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomColor);
    

}

function playsound(name){
    var audio = new Audio(`./${name}.mp3`);
     audio.play();
}
function animatepress(color){
    $(`#${color}`).addClass(`pressed`);
}
$(".btn").click(function(){
    var  userchoice=$(this).attr("id");
    userClickedPattern.push(userchoice);
    playsound(userchoice);
    animatepress(userchoice);
    setTimeout(() => {
        $(`#${userchoice}`).removeClass(`pressed`)
        
    }, 100);
    checkAnswer(userClickedPattern.length-1);


})



function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamepattern.length){
        setTimeout(function () {
          sequence();
        }, 700);
      }
    }
     else {
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function startOver() {
    lvl = 0;
    gamepattern = [];
    started = false;
  }
  