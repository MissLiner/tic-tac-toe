const gameBoxes = document.querySelectorAll('.game-box');
const gameMessages = document.getElementById('game-messages');
const playerForm = document.getElementById('player-form');
const startBtn = document.getElementById('start-btn');
const playerInput1 = document.getElementById('player-input-1');
const playerInput2 = document.getElementById('player-input-2');
const clearBoardBtn = document.getElementById('clear-board-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const newPlayersBtn = document.getElementById('new-players-btn');
const scoreboard = document.getElementById('scoreboard');
const boardBtns = document.getElementById('board-btns');

const playerFactory = (name, marker) => {
    this.name = name;
    this.marker = marker;
    this.wins = 0;
    return {name, marker, wins};
};

const player1 = playerFactory('', 'X');
const player2 = playerFactory('', 'O');

startBtn.addEventListener('click', () => {
    if (playerInput1.value && playerInput2.value) {
        player1.name = playerInput1.value;
        player2.name = playerInput2.value;
        playerInput1.value = '';
        playerInput2.value = '';
        gameMessages.textContent = `${player1.name}, you start!`
        playerForm.classList.add('hidden');
        scoreboard.classList.remove('hidden');
        boardBtns.classList.remove('hidden');
    }
})

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    let newOutcome = 'start';
    const getNewOutcome = () => newOutcome;

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
        const checkEquality = (a, b, c) => {
            if (board[a] && board[a] === board[b] && 
                board[b] === board[c]) { return true };
        }
        const checkLine = (array) => {
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
            newOutcome = 'draw';
        }
        else { newOutcome = 'playing' }
    }

    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (newOutcome === 'won' || newOutcome === 'draw')  {
                newOutcome = 'gameover';
            }
            else if (newOutcome === 'start' || newOutcome === 'playing') {
                if (box.textContent === '' && player1.name !== '' && player2.name !== '') {
                    if (Controller.getTurn() === `${player1.name}`) {
                        box.textContent = player1.marker;
                        board[box.id] = '1';
                    }
                    else {
                        box.textContent = player2.marker;
                        board[box.id] = '2';
                    };
                checkLines();
                };
            }
        });
    });

    const clearBoard = () => {
        board.fill('');
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
    gameMessages.textContent = 'Who wants to play?'

    let turn = '';
    const getTurn = () => turn;
    let turnCounter = 0;
    const getTurnCounter = () => turnCounter;
    let outcome = 'start';
    const getOutcome = () => outcome;
    let drawCounter = 0;

    startBtn.addEventListener('click', () => {
        turn = player1.name;
    })
    
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

    const updateScoreboard = () => {
        document.getElementById('scoreboard1').textContent = `${player1.name}: ${player1.wins}`;
        document.getElementById('scoreboard2').textContent = `${player2.name}: ${player2.wins}`;
        document.getElementById('scoreboard3').textContent = `Draws: ${drawCounter}`;
    }

    startBtn.addEventListener('click', () => {
        updateScoreboard();
    })

    const winGame = (winner, loser) => {
        winner.wins++;
        gameMessages.textContent = `${winner.name} wins! Play again?`
        updateScoreboard();
        playAgainBtn.classList.remove('hidden');
        turn = loser.name;
    }

    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            outcome = Gameboard.getNewOutcome();
            if (outcome === 'won') {
                if (turn === player1.name) {
                    winGame(player1, player2);
                }
                else {
                    winGame(player2, player1);
                }
            }
            else if (outcome === 'draw') {
                drawCounter++;
                gameMessages.textContent = 'It\'s a draw! Play again?';
                updateScoreboard();
                playAgainBtn.classList.remove('hidden');
            }
            else if (outcome === 'playing') {
                switchTurn();
            }
        });
    });

    clearBoardBtn.addEventListener('click', () => {
        if (outcome === 'playing') {
            if (turnCounter % 2 === 1) {
                switchTurn();
            }
            gameMessages.textContent = `${turn}, you start again`;
            turnCounter = 0;
            Gameboard.clearBoard();
        }
    })

    const playAgain = () => {
        Gameboard.clearBoard();
        outcome = 'start';
        turnCounter = 0;
        playAgainBtn.classList.add('hidden');
        gameMessages.textContent = `Loser goes first, so it's ${turn}'s turn`
    }
    playAgainBtn.addEventListener('click', () => {
        playAgain();
    })

    const resetPlayers = () => {
        playAgain();
        gameMessages.textContent = 'Who wants to play?'
        playerForm.classList.remove('hidden');
        document.getElementById('scoreboard1').textContent = '';
        document.getElementById('scoreboard2').textContent = '';
        document.getElementById('scoreboard3').textContent = '';
        player1.wins = 0;
        player2.wins = 0;
        drawCounter = 0;
    }
    newPlayersBtn.addEventListener('click', () => {
        resetPlayers();
    })

    return {
        getTurn,
        getTurnCounter,
        getOutcome
    }

})()