const gameBoxes = document.querySelectorAll('.game-box');
const gameMessages = document.getElementById('game-messages');
const playerForm = document.getElementById('player-form');
const playerInput1 = document.getElementById('player-input-1');
const playerInput2 = document.getElementById('player-input-2');

const playerFactory = (name, marker, turn) => {
    this.name = name;
    this.marker = marker;
    this.turn = `player${turn}`
    this.wins = 0;
    return {name, marker, wins};
};

playerForm.addEventListener('submit', () => {
    const player1 = playerFactory(playerInput1.textContent, 'x', '1');
    const player2 = playerFactory(playerInput2.textContent, 'o', '2');
})
// const player1 = playerFactory('Caroline', 'x');
// const player2 = playerFactory('Annabelle', 'o');

const Gameboard = (() => {
    //hold board piece position info
    const board = ['', '', '', '', '', '', '', '', ''];
    const outcomeUpdate = ['none'];
    //check for win or draw
    checkWin = (a, b, c) => {
        if (a && a === b && b === c) {
            outcomeUpdate[0] = `player${a}`;
            return true;
        }
        else {
            outcomeUpdate[0] = 'draw';
        }
    }
    endGame = () => {
        if (checkWin(board[0], board[1], board[2]) === true) { return };
        if (checkWin(board[3], board[4], board[5]) === true) { return };
        if (checkWin(board[6], board[7], board[8]) === true) { return };
        if (checkWin(board[0], board[3], board[6]) === true) { return };
        if (checkWin(board[1], board[4], board[7]) === true) { return };
        if (checkWin(board[2], board[5], board[8]) === true) { return };
        if (checkWin(board[0], board[4], board[8]) === true) { return };
        if (checkWin(board[2], board[4], board[6]) === true) { return };
    }
    //update board on player move
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
             if (box.textContent === '') {
                if (Controller.turn[0] === 'player1') {
                    box.textContent = 'X';
                    board[box.id] = '1';
                }
                else {
                    box.textContent = 'O';
                    board[box.id] = '2';
                };
            };
            endGame();
        });
    });
    //clear board
    //return stuff
    return {
        outcomeUpdate,
    }
})()

const Controller = (() => {
    //keep track of how many turns have been taken
    const turnCounter = [0];
    //update game status
    const outcome = ['none'];
    //switch turns
    const turn = player1;
    switchTurn = () => {
        if (turn[0] === player1) {
            console.log('hello');
            turn[0] = player2;
        }
        else if (turn[0] === player2) {
            console.log('yo');
            turn[0] = player1;
        }
        turnCounter[0] = turnCounter[0]+1;
    }
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            outcome[0] = Gameboard.outcomeUpdate[0];
            if (outcome[0].includes('player')) {
               
                gameMessages.classList.remove('hidden');
                gameMessages.textContent = `${turn[0].name} wins!`;
            }
            else {
            switchTurn();
            }
        });
    });
    //create players

        //assign player marker
        //use playerFactory
    //change outcome on win or draw
    //ask if they want to play again or reset for new players
    //1. play again
        //reset turn counter
        //increment player win
        //clear board array
        //clear board display
    //reset for new players
        //reset turn counter
        //clear player info
        //clear board array
        //clear board display
        //create players
    //return stuff
    return {
        outcome,
        turn,
        turnCounter,
    }

})()