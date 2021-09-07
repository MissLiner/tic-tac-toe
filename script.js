const gameBoxes = document.querySelectorAll('.game-box');
const gameMessages = document.getElementById('game-messages');
const playerForm = document.getElementById('player-form');
const startBtn = document.getElementById('start-btn');
const playerInput1 = document.getElementById('player-input-1');
const playerInput2 = document.getElementById('player-input-2');
const playAgainBtn = document.getElementById('play-again-btn');
const clearBoardBtn = document.getElementById('clear-board-btn');
const newPlayersBtn = document.getElementById('new-players-btn');

const playerFactory = (name, marker) => {
    this.name = name;
    this.marker = marker;
    this.wins = 0;
    return {name, marker, wins};
};

const player1 = playerFactory('', 'x');
const player2 = playerFactory('', 'o');

startBtn.addEventListener('click', () => {
    player1.name = playerInput1.value;
    player2.name = playerInput2.value;
    playerInput1.value = '';
    playerInput2.value = '';
    playerForm.classList.add('hidden');
    gameMessages.textContent = `${player1.name}, you start!`
})

const Gameboard = (() => {
    //hold board piece position info
    const board = ['', '', '', '', '', '', '', '', ''];
    let newOutcome = 'start';
    const getNewOutcome = () => newOutcome;

    //check for win or draw
    const checkLines = () => {
        const row = [];
        const column = [];
        const diag = [[0, 4, 8], [2, 4, 6]];
    
        for (i = 0; i < 3; i++) {
            row.push([i * 3, i * 3 + 1, i * 3 +2]);
        }
        for (i = 0; i < 3; i++) {
            column.push([i, i + 3, i + 6]);
        }
        checkEquality = (a, b, c) => {
            if (board[a] && board[a] === board[b] && 
                board[b] === board[c]) { return true };
        }
        checkLine = (array) => {
            for (i = 0; i < array.length; i++) {
                if (checkEquality(array[i][0], array[i][1], array[i][2]) === true) { 
                    console.log(array);
                    return true };
            }
        }
        if ((checkLine(row) || checkLine(column) || checkLine(diag)) === true) { 
            newOutcome = `won` 
        }

        else if (newOutcome === 'playing' && Controller.getTurnCounter() === 8) {
            // gameMessages.textContent = 'It\'s a draw! Play again?';
            newOutcome = 'draw';
            // playAgainBtn.classList.remove('hidden');
            // newPlayersBtn.classList.remove('hidden');
        }
        else { newOutcome = 'playing' }
    }
    //update board on player move
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (newOutcome === 'won' || newOutcome === 'draw') { 
                newOutcome = 'gameover';
            }
            else if (newOutcome === 'start' || newOutcome === 'playing') {
                if (box.textContent === '' && !newOutcome.includes('player')) {
                    if (Controller.getTurn() === `${player1.name}`) {
                        box.textContent = 'X';
                        board[box.id] = '1';
                    }
                    else {
                        box.textContent = 'O';
                        board[box.id] = '2';
                    };
                checkLines();
                };
            }
        });
    });
    clearBoard = () => {
        for (i = 0; i < 9; i++) {
            board[i] = '';
        }
        gameBoxes.forEach(box => {
            box.textContent = '';
        })
        newOutcome = 'start';
    }
    return {
        getNewOutcome,
        clearBoard,
    }
})()

const Controller = (() => {
    //keep track of how many turns have been taken
    gameMessages.textContent = 'Who wants to play?'
    let turnCounter = 0;
    const getTurnCounter = () => turnCounter;
    //update game status
    let outcome = 'start';
    const getOutcome = () => outcome;
    //switch turns
    let turn = '';
    startBtn.addEventListener('click', () => {
        turn = player1.name;
    })
    const getTurn = () => turn;
    const switchTurn = () => {
        if (turn === `${player1.name}`) {
            turn = `${player2.name}`;
        }
        else if (turn === `${player2.name}`) {
            turn = `${player1.name}`;
        }
        gameMessages.textContent = `${turn}, it's your turn!`
        turnCounter++;
    }
    const winGame = (winner, loser) => {
        winner.wins++;
        gameMessages.textContent = `${winner.name} wins! 
            You've won ${winner.wins}, and ${loser.name} has won ${loser.wins}. 
            Play again?`;
        playAgainBtn.classList.remove('hidden');
        newPlayersBtn.classList.remove('hidden');
        turn = loser.name;
    }
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            outcome = Gameboard.getNewOutcome();
            // if (getOutcome() === 'playing' && getTurnCounter() === 8) {
            //     gameMessages.textContent = 'It\'s a draw! Play again?';
            //     Gameboard.getNewOutcome() = 'draw';
            //     playAgainBtn.classList.remove('hidden');
            //     newPlayersBtn.classList.remove('hidden');
            // }
            if (outcome === 'won') {
                if (turn === player1.name) {
                    winGame(player1, player2);
                }
                else {
                    winGame(player2, player1);
                }
            }
            else if (outcome === 'draw') {
                gameMessages.textContent = 'It\'s a draw! Play again?';
                playAgainBtn.classList.remove('hidden');
                newPlayersBtn.classList.remove('hidden');
            }
            else if (outcome === 'gameover') { return }
            else {
            switchTurn();
            }
        });
    });

    clearBoardBtn.addEventListener('click', () => {
        if (outcome === 'start' || outcome === 'playing') {
            if (turnCounter % 2 === 1) {
                if (turn.includes('1')) {
                turn = player2.name;
                }
                else { turn = player1.name; }
            }
            gameMessages.textContent = `${turn}, you start again`;
            clearBoard();
        }
    })
    playAgain = () => {
        Gameboard.clearBoard();
        // Gameboard.getNewOutcome() = 'start';
        outcome = 'start';
        turnCounter = 0;
        playAgainBtn.classList.add('hidden');
        newPlayersBtn.classList.add('hidden');
        gameMessages.textContent = `${turn}, you start, since you lost`
        // getTurn().wins++;
    }
    playAgainBtn.addEventListener('click', () => {
        playAgain();
    })

    resetPlayers = () => {
        playAgain();
        gameMessages.textContent = ``;
        playerForm.classList.remove('hidden');
        player1.wins = 0;
        player2.wins = 0;
    }

    newPlayersBtn.addEventListener('click', () => {
        resetPlayers();
    }
    )
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

//NEXT STEP ADD DRAW LOG