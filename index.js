var buttonColors=["green", "yellow", "red", "blue"];
var started=false;
var level=0;

var gamePattern=[];
var userClickedPattern=[];


$(document).keydown(function(){
    if(!started){
        nextSequence();
        $("h1").text("Level "+level);
        started=true;
    }
});

//click function
$(".btn").click(function(){
    var buttonClicked=$(this).attr("id");
    userClickedPattern.push(buttonClicked);

    animatePress(buttonClicked)
    playSound(buttonClicked);
    
    console.log(userClickedPattern.length);
    checkAnswer(userClickedPattern.length-1);
})

//check if the user have clicked the right button
function checkAnswer(click){
    if(userClickedPattern[click]===gamePattern[click]){
        if(gamePattern.length===userClickedPattern.length){
            nextSequence();
        }
    }else{
        playSound("wrong");

        $("h1").text("Game Over...Press Any Key To Restart");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        //starts the game with key press
        startOver();
    }
}


//next sequence
function nextSequence(){
   
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*3+1);
    var randomColor=buttonColors[randomNumber];

    gamePattern.push(randomColor);
    $("div."+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
   

}


function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


function startOver(){
    userClickedPattern=[];
    gamePattern=[];
    level=0;
    started=false;
}

function animatePress(pressedButton){
    $("div."+pressedButton).addClass("pressed");

    setTimeout(function(){
        $("div."+pressedButton).removeClass("pressed");
    }, 200);
}