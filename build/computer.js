document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const startButton = document.getElementById("computer-el");
    const winningMessage = document.querySelector(".winning-message");
    const winningMessageText = document.querySelector("[data-winning-message-text]");
    const restartButton = document.getElementById("restartButton");

    const WINNING_COMBINATIONS = [
        [0, 1, 2], // Rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonals
        [2, 4, 6]
    ];

    let currentPlayer = 'X';
    let gameActive = false;

    function startGame() {
        gameActive = true;
        resetBoard();
    }

    function resetBoard() {
        currentPlayer = 'X';
        winningMessage.setAttribute("aria-hidden", "true");
        cells.forEach(cell => {
            cell.textContent = "";
        });
        gameActive = true;
    }

    function checkWinner() {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => cells[index].textContent === currentPlayer);
        });
    }

    function showWinningMessage(message) {
        winningMessageText.textContent = message;
        winningMessage.removeAttribute("aria-hidden");
        gameActive = false;
    }

    function computerMove() {
        const emptyCells = Array.from(cells).filter(cell => cell.textContent === "");
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            randomCell.textContent = 'O';
        }

        if (checkWinner()) {
            showWinningMessage("Computer Wins!");
        } else if (emptyCells.length - 1 === 0) {
            showWinningMessage("It's a Draw!");
        }
    }

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (gameActive && cell.textContent === "" && currentPlayer === 'X') {
                cell.textContent = 'X';
                if (checkWinner()) {
                    showWinningMessage("You Win!");
                } else {
                    currentPlayer = 'O'; 
                    computerMove();
                    if (gameActive) { // Check if game is still active after computer's move
                        currentPlayer = 'X'; 
                    }
                }
            }
        });
    });

    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", resetBoard);
});
