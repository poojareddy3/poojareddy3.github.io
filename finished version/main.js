//makes sure JS is processed after HTML as we put script tag in the head which processes script before the HTML
window.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const playerTurns = document.querySelector('.turns-player');
    const resetButton = document.querySelector('#reset');
    const resultDisplay = document.querySelector('.results');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    let PLAYERX_WON = 'PLAYERX_WON';
    let PLAYERO_WON = 'PLAYERO_WON';
    let TIE = 'TIE';

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        let gameWin = false;
        //loops through the winning cominations array and checks if we have winner
        for(let i = 0; i < winningCombinations.length; i++){
            let tile1 = board[winningCombinations[i][0]];
            let tile2 = board[winningCombinations[i][1]];
            let tile3 = board[winningCombinations[i][2]];
            if(tile1 === tile2 && tile2 === tile3 && tile1 != ''){
                gameWin = true;
            }
        }
        if (gameWin) {  //If gameWin is true display the result
            // console.log(gameWin);
            display(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        if (!board.includes('')) {  //if there are no empty spaces in the board the game is a tie
            display(TIE);
        }
    }

    function display(result) {
        if (result == PLAYERO_WON) {
            resultDisplay.innerHTML = 'Player <span class="playerO">O</span> Won';
        } else if (result == PLAYERX_WON) {
            resultDisplay.innerHTML = 'Player <span class="playerX">X</span> Won';
        } else {
            resultDisplay.innerHTML = 'Game is a TIE';
        }
        resultDisplay.classList.remove('hide');  //it displays the hidden resultDisplay div
    }

    function isCellMarked(cell) {
        if (cell.innerText === 'X' || cell.innerText === 'O') { //if the cell is marked it prevents us to mark it again
            return false;
        }
        return true;
    }
    function updateBoard(index) {
        board[index] = currentPlayer; //updates the current player
    }

    function changePlayer() {
        playerTurns.classList.remove(`player${currentPlayer}`); //removes the current players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; //change the player
        playerTurns.innerText = currentPlayer;
        playerTurns.classList.add(`player${currentPlayer}`); //displays the current player
    }

    function markCell(cell, index) {
        if (isCellMarked(cell) && isGameActive) {  //checks if the cell is already marked or if the game is active 
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            checkWinner();
            changePlayer();
        }
    }

    function resetBoard() {
        window.location.reload();
    }

    //Event Listener for all the cells the board
    cells.forEach((cell, index) => { //it refers to every cell and it's index in the cell array...it has indexes from 0 to 8
        cell.addEventListener('click', () => markCell(cell, index));
    });

    resetButton.addEventListener('click', resetBoard); //Event Listener for reset button
});