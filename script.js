const options = ["Rock", "Paper", "Scissors"];
const buttons = document.querySelectorAll('img');
const runningScore = document.querySelector('#running-score');
const roundResult = document.querySelector('#round-result');
const endResult = document.querySelector('#end-result');
const reset = document.querySelector('#reset');

let playerScore = 0;
let numOfPlays = 0;
let hasWinner = false;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateResultsMessage(resultIndex, winner, loser) {
    let resultsArr = ["lose", "win"];
    
    return `Result of round: You ${resultsArr[resultIndex]}! ${capitalizeFirstLetter(winner)} beats ${capitalizeFirstLetter(loser)}.`;
}

reset.addEventListener('click', () => {
    playerScore = 0;
    numOfPlays = 0;
    hasWinner = false;

    runningScore.textContent = `Score: ${playerScore}/${numOfPlays}`;
    roundResult.textContent = "";
    endResult.textContent = "";
});

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(hasWinner == true) {
            button.disabled = true;
        } else {
            endResult.textContent = "";
            let playerSelection = button.id;
            let computerSelection = computerPlay().toLowerCase();

            playerScore += playRound(playerSelection, computerSelection);

            runningScore.textContent = `Score: ${playerScore}/${numOfPlays}`;

            if(playerScore == 5 || (numOfPlays - playerScore == 5)) {
                if(playerScore >= 5) {
                    endResult.textContent = "Congratulations! You win! 🎉";
                } else {
                    endResult.textContent = "Aww, you lose. Better luck next time. 😔";
                }

                hasWinner = true;
                endResult.textContent += " Press the reset button above to play again.";
            }
        }
    });
});

function computerPlay() {
    return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerSelection, computerSelection) {
    let playerWon; // 0 - lose, 1 - win, 2 - tie
    // let resultsArr = ["Lose", "Win"];

    switch(playerSelection) {
        case "rock":
            if(computerSelection == "paper") {
                playerWon = 0;
            } else if(computerSelection == "scissors") {
                playerWon = 1;
            } else if(computerSelection == "rock") {
                playerWon = 2;
            }
            break;
        case "paper":
            if(computerSelection == "scissors") {
                playerWon = 0;
            } else if(computerSelection == "rock") {
                playerWon = 1;
            } else if(computerSelection == "paper") {
                playerWon = 2;
            }
            break;
        case "scissors":
            if(computerSelection == "rock") {
                playerWon = 0;
            } else if(computerSelection == "paper") {
                playerWon = 1;
            } else if(computerSelection == "scissors") {
                playerWon = 2;
            }
            break;
    }

    if (playerWon == 2) {
        roundResult.textContent = "Result of round: It's a tie!";
        return 0;
    } else if(playerWon == 1) {
        roundResult.textContent = generateResultsMessage(1, playerSelection, computerSelection);
        numOfPlays++;
        return 1;
    } else if (playerWon == 0){
        roundResult.textContent = generateResultsMessage(0, computerSelection, playerSelection);
        numOfPlays++;
        return 0;
    }
}

// Function for playing five rounds via console

// function game() {
//     let playerSelection;
//     let computerSelection;
//     let result = 0;
//     for(let i = 0; i < 5; i++) {
//         let playerSelection = prompt();
//         playerSelection = playerSelection.toLowerCase();
//         let computerSelection = computerPlay().toLowerCase();
//         result += playRound(playerSelection, computerSelection);
//     }

//     if(result >= 3) {
//         console.log("Congratulations! You win! &#127881");
//     } else {
//         console.log("Aww, you lose. Better luck next time. &#57432");
//     }

//     console.log(`Score: ${result}/5`);
// }

function toggleDarkMode() {
    let elem = document.body;
    elem.classList.toggle("dark-mode");
}