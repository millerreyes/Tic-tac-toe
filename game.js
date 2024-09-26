let currentPlayer = "X"; // X will be the player, O will be the PC
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

const statusDisplay = document.getElementById('game-status');

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        document.getElementById(`cell-${index}`).textContent = currentPlayer;
        document.getElementById(`cell-${index}`).style.pointerEvents = "none"; // Disable further clicks on the cell
        checkWinner();
        if (gameActive) {
            currentPlayer = "O"; // Switch to PC
            statusDisplay.textContent = `Player O's (PC) turn`;
            setTimeout(pcMove, 500); // Give the PC half a second to make a move
        }
    }
}

function pcMove() {
    if (!gameActive) return; // If the game is over, don't make a move

    let availableMoves = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            availableMoves.push(i); // Collect all available moves
        }
    }

    if (availableMoves.length > 0) {
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[randomMove] = "O";
        document.getElementById(`cell-${randomMove}`).textContent = "O";
        document.getElementById(`cell-${randomMove}`).style.pointerEvents = "none"; // Disable further clicks on the cell
        checkWinner();
        if (gameActive) {
            currentPlayer = "X"; // Switch back to player
            statusDisplay.textContent = `Player X's turn`;
        }
    }
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            highlightWinningCells(a, b, c); // Highlight the winning combination
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        setTimeout(resetGame, 2000); // Auto reset after 2 seconds
    } else if (!board.includes("")) {
        statusDisplay.textContent = "It's a tie!";
        gameActive = false;
        setTimeout(resetGame, 2000); // Auto reset after 2 seconds
    }
}

function highlightWinningCells(a, b, c) {
    document.getElementById(`cell-${a}`).style.backgroundColor = 'lightgreen';
    document.getElementById(`cell-${b}`).style.backgroundColor = 'lightgreen';
    document.getElementById(`cell-${c}`).style.backgroundColor = 'lightgreen';
}

function resetGame() {
    // Clear the board array
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true; // Set gameActive back to true to allow clicks
    currentPlayer = "X"; // Set currentPlayer back to X
    statusDisplay.textContent = `Player X's turn`; // Reset the status display

    // Loop through each cell and clear the text and styles
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).textContent = "";
        document.getElementById(`cell-${i}`).style.backgroundColor = ""; // Reset the cell color
        document.getElementById(`cell-${i}`).style.pointerEvents = "auto"; // Re-enable clicking on the cell
    }
}
