let userScore = 0 ;
let compScore = 0 ;

// Accessing things
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");



 // RANDOM NO GENERATOR
const genCompChoice = () => {
    const options = ["rock" , "paper" , "scissors"];
   
   const randIdx = Math.floor(Math.random()*3);
   return options[randIdx];
}

// MESSAGE TO SHOW TO USER
const drawGame = () =>{
    console.log("draw");
    msg.innerText = "Game was Draw";
    msg.style.backgroundColor = "yellow";
    msg.style.color = "black";
};
const showWinner = (userWin , userChoice , compChoice) => {
    if (userWin){
        userScore++;
        userScorePara.innerText = userScore;
        console.log("You win");
        msg.innerText = `You Won ! Your ${compChoice} beats  ${userChoice}`;
         msg.style.backgroundColor = "green";
         msg.style.color = "white";
    }
    else {
        compScore++;
        compScorePara.innerText = compScore;
        console.log("You Lost");
        msg.innerText = `You Lost ! ${userChoice} beats your ${compChoice}`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
    }
};

// CONDITIONS / CODE
const playGame = (userChoice) => 
   { console.log("user choice =" , userChoice);
    
    const compChoice = genCompChoice();
    console.log("comp choice =" , compChoice);

    // DRAW
     if ( userChoice === compChoice ){
            drawGame();
        }
    //OTHERS 
     else {
         let userWin = true;
         if (userChoice === "rock") {
             userWin = compChoice ==="paper" ? false : true ;
         }
         else if( userChoice ==="paper"){
             userWin=compChoice==="scissors" ? false : true ;
         }
         else {
            userWin=compChoice==="rock" ? false : true ;
         }
         showWinner(userWin , compChoice , userChoice);
        }
    };
// WHAT USER CHOSE
choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        
        playGame(userChoice);

    })
})
