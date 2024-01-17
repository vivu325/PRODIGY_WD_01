document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Represents the 3x3 game board

    // Function to handle cell clicks
    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            render();
            if (checkWinner()) {
                status.innerHTML = `Player ${currentPlayer} wins!`;
            } else if (!gameBoard.includes("")) {
                status.innerHTML = "It's a tie!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.innerHTML = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8], // Rows
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8], // Columns
            [0, 4, 8],
            [2, 4, 6] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }
        return false;
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        render();
        status.innerHTML = "Player X's turn";
    }

    // Function to render the game board
    function render() {
        grid.innerHTML = "";
        gameBoard.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerHTML = value;
            cell.addEventListener("click", () => handleCellClick(index));
            grid.appendChild(cell);
        });
    }

    // Event listener for the reset button
    resetBtn.addEventListener("click", resetGame);

    // Initial game render
    render();
});