const gameBoxes = document.querySelectorAll('.game-box');
const gameMessages = document.getElementById('game-messages');

const playerFactory = (name, marker) => {
    this.name = name;
    this.marker = marker;
    this.wins = 0;
    return {name, marker, wins};
};

const Gameboard = (() => {
    //hold board piece position info
    const board = ['', '', '', '', '', '', '', '', ''];
    //check for win or draw
    checkWin = (a, b, c) => {
        if (a && a === b && b === c) {
            Controller.outcome = `player${a}`;
        }
        else {
            Controller.outcome = 'draw';
        }
    }
    endGame = () => {
    checkWin(board[0], board[1], board[2]);
    checkWin(board[3], board[4], board[5]);
    checkWin(board[6], board[7], board[8]);
    checkWin(board[0], board[3], board[6]);
    checkWin(board[1], board[4], board[7]);
    checkWin(board[2], board[5], board[8]);
    checkWin(board[0], board[4], board[8]);
    checkWin(board[2], board[4], board[6]);
    }
    //update board on player move
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
             if (box.textContent === '') {
                if (Controller.turn === 'player1') {
                    box.textContent = 'X';
                    board[box.id] = '1';
                    turn = 'player2';
                }
                else {
                    box.textContent = 'O';
                    board[box.id] = '2';
                    turn = 'player1';
                };
            };
            endGame();
        });
    });
    //clear board
})()

const Controller = (() => {
    //keep track of how many turns have been taken
    let turnCounter = 0;
    //update game status
    let outcome = 'none';
    //switch turns
    let turn = 'player1';
    switchTurn = () => {
        if (turn === 'player1') {
            turn = 'player2';
        }
        else {
            turn = 'player1'
        }
        turnCounter++;
    }


    //create players
        //ask for name
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


})()