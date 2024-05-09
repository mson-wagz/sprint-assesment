document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const board = document.getElementById("board");
    const startButton = document.getElementById("start-el");
    const winningMessage = document.querySelector(".winning-message");
    const winningMessageText = document.querySelector("[data-winning-message-text]");
    const restartButton = document.getElementById("restartButton");
    
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

    let currentPlayer = 'X';
    let gameActive = false;

    startButton.addEventListener("click", () => {
        gameActive = true;
        resetBoard();
    });

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (gameActive && cell.textContent === "") {
                cell.textContent = currentPlayer;
                if (checkWinner()) {
                    showWinningMessage(`${currentPlayer} Wins!`);
                } else if ([...cells].every(cell => cell.textContent !== "")) {
                    showWinningMessage("Draw!");
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        });
    });

    restartButton.addEventListener("click", resetBoard);

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
});


 



