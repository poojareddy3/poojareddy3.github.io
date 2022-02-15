let board;
let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;
let gameOver = false;

//let gameBoard = document.querySelector("#board");

window.onload = function() {
    startGame();
}

function startGame(){
    board =[
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

//creating the 3X3 grid using DOM
for(let row = 0; row < 3; row++){     //loops through 3 rows
    for(let col = 0; col < 3; col++){  //loops through 3 columns for every row
        let cell = document.createElement("div");
        cell.id = row.toString() + "-" + col.toString(); //creating id's for all the cells Ex: row1-col1
        console.log(cell.id);
        cell.classList.add("cell");
        if(row == 0 || row == 1){
            cell.classList.add("horizontal-lines");
        }
        if(col == 0 || col == 1){
            cell.classList.add("vertical-lines");
        }
        cell.addEventListener('click', markCell);
        document.getElementById("board").append(cell); //appends the 3X3 grid to the board
    }
}
}

function markCell() {

    if(gameOver){  //if the game is done exit the game
        return; 
    }
    let pos = this.id.split("-"); //the position of each cell when we click on it Ex: if id is 1-1 it splits into row1 and col 1 seperately
    let row = parseInt(pos[0]); 
    let col = parseInt(pos[1]);

    if(board[row][col] != ' '){  //if a cell is already marked you cannot mark it again
        return;
    }
    board[row][col] = currentPlayer;
    this.innerText = currentPlayer;

    changePlayer();
    checkWinner();   //checks for winner
}

function checkWinner() {

    for(let row = 0; row < 3; row++){   //to check if a row has same symbol in all the 3 cells
        if(board[row][0] == board[row][1] && board[row][1] == board[row][2] && board[row][0] != ' '){
                        for(let i = 0; i < 3; i++){  //applies winner style to the winning tiles
                let cell = document.getElementById(row.toString() + "-" + i.toString());  
                cell.classList.add("winner");
            }
            gameOver = true;
            if(board[row][0] == 'O'){
            alert(`PlayerO won the Game!`);
            } else {
                alert(`PlayerX won the Game!`);
            }
        }
    }

    for(let col = 0; col < 3; col++){ //to check if a col has same symbol in all cells
        if(board[0][col] == board[1][col] && board[1][col] == board[2][col] && board[0][col] != ' '){
            for(let j = 0; j < 3; j++){
                let cell = document.getElementById(j.toString() + "-" + col.toString());
                cell.classList.add("winner");
            }
            gameOver = true;
            if(board[0][col] == 'O'){
                alert(`PlayerO won the Game!`);
                } else {
                    alert(`PlayerX won the Game!`);
                }
        }
    }
    
    //checks if all symbols are same diagonally
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' '){
        for(let i = 0; i < 3; i++){
            let cell = document.getElementById(i.toString() + "-" + i.toString());
            cell.classList.add("winner");
        }
        gameOver = true;
        if(board[0][0] == 'O'){
            alert(`PlayerO won the Game!`);
            } else {
                alert(`PlayerX won the Game!`);
            }
    }

    //checks if all symbols are same anti-diagonally

    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' '){
        
        let cell = document.getElementById("0-2");
        cell.classList.add("winner");

        cell = document.getElementById("1-1");
        cell.classList.add("winner");

        cell = document.getElementById("2-0");
        cell.classList.add("winner");

        gameOver = true;
        if(board[0][2] == 'O'){
            alert(`PlayerO won the Game!`);
            } else {
                alert(`PlayerX won the Game!`);
            }
    }
}


function replay() {

}

function changePlayer() {
    if(currentPlayer == playerO){   //it changes the player once their turn is done
        currentPlayer = playerX;
    } else {
        currentPlayer = playerO;
    }
    return currentPlayer;
}