const Gameboard = (function() {
    const board = ['', '', '', '', '', '', '', '', ''];
    return board;
})()

const gameBoxes = document.querySelectorAll('.game-box');

(gameController = () => {
    let turn = 'player1';
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (turn === 'player1') {
                box.textContent = 'X';
                Gameboard[box.id] = 'X';
                turn = 'player2';
            }
            else {
                box.textContent = 'O';
                Gameboard[box.id] = 'O';
                turn = 'player1';
            }
        })
    })
    // for (i = 0; i < 9; i++) {
    //     gameBoxes[i].textContent = Gameboard[i];
    // }
})()

const playerFactory = (name, marker) => {
    this.name = name;
    this.marker = marker;
    return {name, marker};
};

const player1 = playerFactory('Caroline', 'x');
const player2 = playerFactory('Annabelle', 'o');



//create a gameboard that is 3x3
//name each box
//create two players
//allow each player to be assigned xs or os
//log which box a player puts their marker into
//notice when three of the same marker are in a row
//declare a winner
//cleat the board