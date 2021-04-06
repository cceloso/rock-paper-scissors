const options = ["Rock", "Paper", "Scissors"];
const buttons = document.querySelectorAll('button');
const roundResult = document.querySelector('#round-result');
const runningScore = document.querySelector('#running-score');
const endResult = document.querySelector('#end-result');

let score = 0;
let numOfPlays = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateResultsMessage(resultIndex, winner, loser) {
    let resultsArr = ["Lose", "Win"];
    
    return `You ${resultsArr[resultIndex]}! ${capitalizeFirstLetter(winner)} beats ${capitalizeFirstLetter(loser)}.`;
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        endResult.textContent = "";
        let playerSelection = button.id;
        let computerSelection = computerPlay().toLowerCase();
        // console.log(`playerSelection: ${playerSelection}, computerSelection: ${computerSelection}`);
        score += playRound(playerSelection, computerSelection);
        numOfPlays++;

        runningScore.textContent = `\n Score: ${score}/${numOfPlays}`;

        if(numOfPlays == 5) {
            if(score >= 3) {
                endResult.textContent = "Player won!";
            } else {
                endResult.textContent = "Computer won!";
            }
            score = 0;
            numOfPlays = 0;
            endResult.textContent += "\n Score has been reset!";
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
            console.log("Inside rock!");
            if(computerSelection == "paper") {
                playerWon = 0;
            } else if(computerSelection == "scissors") {
                playerWon = 1;
            } else if(computerSelection == "rock") {
                playerWon = 2;
            }
            break;
        case "paper":
            console.log("Inside paper!");
            if(computerSelection == "scissors") {
                playerWon = 0;
            } else if(computerSelection == "rock") {
                playerWon = 1;
            } else if(computerSelection == "paper") {
                playerWon = 2;
            }
            break;
        case "scissors":
            console.log("Inside scissors!");
            if(computerSelection == "rock") {
                playerWon = 0;
            } else if(computerSelection == "paper") {
                playerWon = 1;
            } else if(computerSelection == "scissors") {
                playerWon = 2;
            }
            break;
    }
    
    // console.log(`playerWon: ${playerWon}`);

    if (playerWon == 2) {
        roundResult.textContent = "It's a tie!";
        return 0;
    } else if(playerWon == 1) {
        // console.log(`You ${resultsArr[1]}! ${playerSelection} beats ${computerSelection}.`);
        roundResult.textContent = generateResultsMessage(1, playerSelection, computerSelection);
        return 1;
    } else if (playerWon == 0){
        // console.log(`You ${resultsArr[0]}! ${computerSelection} beats ${playerSelection}.`);
        roundResult.textContent = generateResultsMessage(0, computerSelection, playerSelection);
        return 0;
    }
}

function game() {
    let playerSelection;
    let computerSelection;
    let result = 0;
    for(let i = 0; i < 5; i++) {
        let playerSelection = prompt();
        playerSelection = playerSelection.toLowerCase();
        let computerSelection = computerPlay().toLowerCase();
        result += playRound(playerSelection, computerSelection);
    }

    if(result >= 3) {
        console.log("Player won!");
    } else {
        console.log("Computer won!");
    }

    console.log(`Score: ${result}/5`);
}

// game();