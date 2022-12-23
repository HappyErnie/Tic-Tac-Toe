// <<< DEFINITIONS >>>
// The getElementById() is a JavaScript function that lets you grab an HTML element, by its id , and perform an action on it.
// JavaScript classList is a DOM property of JavaScript that allows for styling the CSS (Cascading Style Sheet) classes of an element.
// The innerText property of the HTMLElement interface represents the rendered text content of a node and its descendants.
// parseInt() is a JavaScript function that parses a string and returns an integer.

let board;
let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;
let gameOver = false;

// Reset game
window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let r=0; r<3; r++) {
        for (let c=0; c<3; c++) {
            // Assign an unique id to each tile. <div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            
            // Apply CSS to each tile
            tile.classList.add("tile");
            if (r==0 || r==1) { 
                tile.classList.add("horizontal-line"); 
            }
            if (c==0 || c==1) { 
                tile.classList.add("vertical-line"); 
            }

            // Add a click event to each tile.
            tile.addEventListener("click", setTile);
            
            // Add each tile to the board.
            document.getElementById("board").append(tile); 
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); // "1-1" -> ["1", "1"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // Check if the tile is blank
    if (board[r][c] != ' ') {
        return;
    }

    board[r][c] = currentPlayer; // Mark the board
    this.innerText = currentPlayer; // Update HTML

    // Alternate between playerO and playerX
    if (currentPlayer == playerO) {
        currentPlayer = playerX;
    } else {
        currentPlayer = playerO;
    }

    checkWinner();

}

function checkWinner() {
    // Check horizontally
    for (let r=0; r<3; r++) {
        if (board[r][0]==board[r][1] && board[r][1]==board[r][2] && board[r][0]!=' ') {
            for (let i=0; i<3; i++) { // To apply the winner tile
                let tile = document.getElementById(r.toString() + '-' + i.toString()); 
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    // Check vertically
    for (let c=0; c<3; c++) {
        if (board[0][c]==board[1][c] && board[1][c]==board[2][c] && board[0][c]!=' ') {
            for (let i=0; i<3; i++) { // To apply the winner tile
                let tile = document.getElementById(i.toString() + '-' + c.toString()); 
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    // Check diagonally
    if (board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[0][0]!=' ') {
        for (let i=0; i<3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    // Check anti-diagonally
    if (board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[0][2]!=' ') {
        //0-2
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");
        //1-1
        tile = document.getElementById("1-1");
        tile.classList.add("winner");
        //2-0
        tile = document.getElementById("2-0");
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}

function refreshPage(){
    window.location.reload();
} 