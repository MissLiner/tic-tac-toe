const gameBoxes = document.querySelectorAll('.game-box');
const gameMessages = document.getElementById('game-messages');

const playerFactory = (name, marker) => {
    this.name = name;
    this.marker = marker;
    this.wins = 0;
    return {name, marker, wins};
};

const player1 = playerFactory('Caroline', 'x');
const player2 = playerFactory('Annabelle', 'o');

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    checkWin = (a, b, c) => {
        if () {

        }
        else if (a && a === b && b === c) {
            outcome = 'gameOver';
            if (a === '1') {
                gameMessages.classList.remove('hidden');
                gameMessages.textContent = `${player1.name} wins!`;
            }
            else if (a === '2') {
                gameMessages.classList.remove('hidden');
                gameMessages.textContent = `${player2.name} wins!`;
            }
            }
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
    checkWin(Gameboard.board[2], Gameboard.board[4], Gameboard.board[6]);
    }
    return {
        board,
        outcome,
        endGame
    }
})()

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

const gameController = (() => {
    let turn = 'player1';
    let outcome = 'none';
    let turnCounter = 0;
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // if (Gameboard.outcome === 'gameOver') {
            //     clearBoard = () => gameBoxes.forEach(box => box.textContent = '');
            // }
             if (box.textContent === '') {
                if (turn === 'player1' && box.textContent === '') {
                    box.textContent = 'X';
                    Gameboard.board[box.id] = '1';
                    turn = 'player2';
                }
                else {
                    box.textContent = 'O';
                    Gameboard.board[box.id] = '2';
                    turn = 'player1';
                };
            };
            Gameboard.endGame();
        });
    });
})()