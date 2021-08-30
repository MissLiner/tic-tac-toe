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
    //update board on player move
    gameBoxes.forEach(box => {
        box.addEventListener('click', () => {
             if (box.textContent === '') {
                if (Controller.turn === 'player1') {
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
    //check for win or draw
    //clear board

})()

const Controller = (() => {
    //switch turns
    let turn = 'player1';
    //update game status
    let outcome = 'none';
    //keep track of how many turns have been taken
    let turnCounter = 0;
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