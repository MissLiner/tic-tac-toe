const gameBoxes = document.querySelectorAll('.game-box');
const gameMessages = document.getElementById('game-messages');
const playerForm = document.getElementById('player-form');
const playerBtn = document.getElementById('player-btn');
const playerInput1 = document.getElementById('player-input-1');
const playerInput2 = document.getElementById('player-input-2');
const playAgainBtn = document.getElementById('play-again-btn');

const playerFactory = (name, marker) => {
    this.name = name;
    this.marker = marker;
    this.wins = 0;
    return {name, marker, wins};
};

const player1 = playerFactory('', 'x');
const player2 = playerFactory('', 'o');

playerBtn.addEventListener('click', () => {
    player1.name = playerInput1.value;
    player2.name = playerInput2.value;
    playerInput1.value = '';
    playerInput2.value = '';
})


const Gameboard = (() => {
    //hold board piece position info
    const board = ['', '', '', '', '', '', '', '', ''];
    const outcomeUpdate = ['none'];
    //check for win or draw
    // checkWin = (a, b, c) => {
    //     if (a && a === b && b === c) {
    //         outcomeUpdate[0] = `player${a}`;
    //         return true;
    //     }
    //     else {
    //         outcomeUpdate[0] = 'draw';
    //     }
    // }


    // endGame = () => {
    //     if (checkWin(board[0], board[1], board[2]) === true) { return };//row
    //     if (checkWin(board[3], board[4], board[5]) === true) { return };//row
    //     if (checkWin(board[6], board[7], board[8]) === true) { return };//row
    //     if (checkWin(board[0], board[3], board[6]) === true) { return };//column
    //     if (checkWin(board[1], board[4], board[7]) === true) { return };//column
    //     if (checkWin(board[2], board[5], board[8]) === true) { return };//column
    //     if (checkWin(board[0], board[4], board[8]) === true) { return };//diag
    //     if (checkWin(board[2], board[4], board[6]) === true) { return };//diag
    // }
    //update board on player move
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
             if (box.textContent === '' && !outcomeUpdate[0].includes('player')) {
                if (Controller.getTurn() === '1') {
                    box.textContent = 'X';
                    board[box.id] = '1';
                }
                else {
                    box.textContent = 'O';
                    board[box.id] = '2';
                };
            };
            //checkLines();
        });
    });
    //clear board
    clearBoard = () => {
        for (i = 0; i < 9; i++) {
            board[i] = '';
        }
    }
    //return stuff
    return {
        outcomeUpdate,
        //checkLines,
        clearBoard,
        board
    }
})()

const checkLines = () => {
    let row = [];
    let column = [];
    let diag = [[0, 4, 8], [2, 4, 6]];

    for (i = 0; i < 3; i++) {
        row.push([i * 3, i * 3 + 1, i * 3 +2]);
    }
    for (i = 0; i < 3; i++) {
        column.push = [i, i + 3, i + 6]
    }
    returnBoardValue = (x) => {
        x = Gameboard.board[x];
    }
    checkEquality = (a, b, c) => {
        // returnBoardValue(a);
        // returnBoardValue(b);
        // returnBoardValue(c);
        if (Gameboard.board[a] && Gameboard.board[a] === Gameboard.board[b] && Gameboard.board[b] === Gameboard.board[c]) { return true };
    }
    checkLine = (array) => {
        for (i = 0; i < array.length; i++) {
            if (checkEquality(array[i][0], array[i][1], array[i][2]) === true) { return true };
        }
    }
    if ((checkLine(row) || checkLine(column) || checkLine(diag)) === true) { return true };
}

const Controller = (() => {
    //keep track of how many turns have been taken
    let turnCounter = 0;
    const getTurnCounter = () => turnCounter;
    //update game status
    let outcome = 'none';
    const getOutcome = () => outcome;
    //switch turns
    let turn = '1';
    const getTurn = () => turn;
    const switchTurn = () => {
        if (turn === '1') {
            turn = '2';
        }
        else if (turn === '2') {
            turn = '1';
        }
        turnCounter++;
    }
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            outcome = Gameboard.outcomeUpdate[0];
            if (getOutcome() === 'draw' && getTurnCounter() === 8) {
                gameMessages.textContent = 'It\'s a draw! Play again?';
                playAgainBtn.classList.remove('hidden');
            }
            else if (outcome.includes('player')) {
                if (turn[0] === '1') {
                    gameMessages.textContent = `${player1.name} wins! Play again?`;
                    playAgainBtn.classList.remove('hidden');
                }
                else {
                    gameMessages.textContent = `${player2.name} wins! Play again?`;
                    playAgainBtn.classList.remove('hidden');
                }
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
    playAgain = () => {
        Gameboard.clearBoard();
        gameBoxes.forEach(box => {
            box.textContent = '';
            Gameboard.outcomeUpdate[0] = 'start';
            outcome = '';
            turnCounter = 0;
        })
        // getTurn().wins++;
    }
    playAgainBtn.addEventListener('click', () => {
        playAgain();
    })
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
        getTurn,
        getTurnCounter,
        getOutcome
    }

})()