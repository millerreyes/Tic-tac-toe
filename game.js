let currentPlayer = "X";
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
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
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