// ARRAYS TO BE USED:
var colorArray = ["green","red","yellow","blue"];
var randomArray = [];
var userArray = [];


// VARIABLES TO BE USED:
var userArrayLength = 0;
var randomArrayLength = 0;
var level = 0;
var timesGameStarted = 0;


// Check if User pressed on a key:
$(document).keydown(function(){
    timesGameStarted++;
    startGame();
});

// Start the Game:
function startGame()
{
    if(timesGameStarted===1)
    {
        $("h1").text(`level ${level}`);
        randomArrayFill();
    }
}


// Fill the Random Array with Color Randomly:
function randomArrayFill()
{
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colorArray[randomNumber];
    randomArray.push(randomColor);
    randomArrayLength = randomArray.length;

    pressedAnimation(randomColor);
    soundPlay(randomColor);
}

// Fill the User Array with Color Based on his Clicks:
function userArrayFill(color)
{

    userArray.push(color);
    userArrayLength = userArray.length;

    if(userArrayLength===randomArrayLength)
    {
        checkGameArray();
    }
}

// Check both User&Random Array:
function checkGameArray()
{
    var sequenceError = 0;

    for(var i = 0; i<randomArrayLength; i++)
    {
        if(userArray[i]!==randomArray[i])
        {
            sequenceError=1;
            break;
        }
    }

    if(sequenceError===1)
    {
        gameOver();
    }
    else
    {
        userArray = [];
        level++;
        $("h1").text(`level ${level}`)
        setTimeout(function(){randomArrayFill()},700);
    }
}

// Game is Over Reset all the Functions:
function gameOver()
{
    userArray = [];
    randomArray= [];
    timesGameStarted = 0;
    level = 0;

    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},700);

    $("h1").text("Game Over");
    setTimeout(function(){$("h1").text("Press A key to Start")},700);

}

// Function to Animate Pressing:
function pressedAnimation(color)
{
    $("#"+color).addClass("pressed");
    setTimeout(function(){$("#"+color).removeClass("pressed")},100);
}

//  function to Play Sound:
function soundPlay(color)
{
    var sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}

// Respond to clicks from the User:
$("#green").click(function(){
    pressedAnimation("green");
    soundPlay("green");
    userArrayFill("green");
});
$("#red").click(function(){
    pressedAnimation("red");
    soundPlay("red");
    userArrayFill("red");
});
$("#yellow").click(function(){
    pressedAnimation("yellow");
    soundPlay("yellow");
    userArrayFill("yellow");
});
$("#blue").click(function(){
    pressedAnimation("blue");
    soundPlay("blue");
    userArrayFill("blue");
});
