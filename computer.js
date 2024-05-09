document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const startButton = document.getElementById("computer-el");
    const winningMessage = document.querySelector(".winning-message");
    const winningMessageText = document.querySelector("[data-winning-message-text]");
    const startEl = document.getElementById("start-el")
    const restartButton = document.getElementById("restart-el");

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let boardGame = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let gameActive = false;
    let againstComputer = true; // Indicate that the game is against a computer
    startButton.addEventListener("click", startGame);
    restartButton.addEventListener("click", restartBoard);

    function startGame() {
        gameActive = true;
       
    }

    function restartBoard() {
        boardGame = ['','','','','','','','',''];
        currentPlayer = 'X';
        winningMessage.setAttribute("aria-hidden", "true");
        cells.forEach(cell => {
            cell.textContent = "";
        });
        gameActive = false;
        updateBoard();
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
                    currentPlayer = 'O'; // Switch to the computer's turn
                    computerMove();
                    currentPlayer = 'X'; // Switch back to the human's turn
                }
            }
        });
    });

    
});
