document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const cells = Array.from(board.getElementsByClassName("cell"));
    const restartButton = document.getElementById("restart-game");
    const winningMessageText = document.querySelector(
      "[data-winning-message-text]"
    );
    const winningMessage = document.getElementById("winning-message");
  
    const playerSymbol = "X"; // Human player
    const aiSymbol = "O"; // AI/computer player
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    let isHumanTurn = true;
    let gameActive = true;
  
    // Function to start or restart the game
    function startGame() {
      isHumanTurn = true;
      gameActive = true;
      cells.forEach((cell) => {
        cell.innerText = "";
        cell.classList.remove("winning-cell");
      });
      winningMessage.classList.add("hidden");
    }
  
    // Function to handle cell clicks
    function handleCellClick(e) {
      if (!gameActive || !isHumanTurn) return;
  
      const cell = e.target;
      if (cell.innerText === "") {
        cell.innerText = playerSymbol;
        isHumanTurn = false;
  
        if (checkWin(playerSymbol)) {
          endGame(false, "You win!");
        } else if (checkDraw()) {
          endGame(true, "It's a draw!");
        } else {
          setTimeout(aiMove, 500); // AI makes a move after a delay
        }
      }
    }
  
    // AI's move using Minimax algorithm
    function aiMove() {
      const bestMove = findBestMove();
      if (bestMove !== null) {
        const cell = cells[bestMove];
        cell.innerText = aiSymbol;
  
        if (checkWin(aiSymbol)) {
          endGame(false, "AI wins!");
        } else if (checkDraw()) {
          endGame(true, "It's a draw!");
        } else {
          isHumanTurn = true;
        }
      }
    }
  
    // Minimax algorithm to determine the best move
    function findBestMove() {
      let bestValue = -Infinity;
      let bestMove = null;
  
      cells.forEach((cell, index) => {
        if (cell.innerText === "") {
          cell.innerText = aiSymbol;
          const moveValue = minimax(false);
          cell.innerText = "";
  
          if (moveValue > bestValue) {
            bestValue = moveValue;
            bestMove = index;
          }
        }
      });
  
      return bestMove;
    }
  
    // Minimax function to calculate the best move
    function minimax(isMaximizing) {
      if (checkWin(aiSymbol)) return 10; // AI wins
      if (checkWin(playerSymbol)) return -10; // Human wins
      if (checkDraw()) return 0; // Draw
  
      if (isMaximizing) {
        let best = -Infinity;
        cells.forEach((cell, index) => {
          if (cell.innerText === "") {
            cell.innerText = aiSymbol;
            best = Math.max(best, minimax(false));
            cell.innerText = "";
          }
        });
        return best;
      } else {
        let best = Infinity;
        cells.forEach((cell, index) => {
          if (cell.innerText === "") {
            cell.innerText = playerSymbol;
            best = Math.min(best, minimax(true));
            cell.innerText = "";
          }
        });
        return best;
      }
    }
  
    // Function to check for a win
    function checkWin(symbol) {
      return winCombinations.some((combination) =>
        combination.every((index) => cells[index].innerText === symbol)
      );
    }
  
    // Function to check for a draw
    function checkDraw() {
      return cells.every((cell) => cell.innerText !== "");
    }
  
    // Function to end the game
    function endGame(isDraw, message) {
      gameActive = false;
      winningMessageText.innerText = message;
      winningMessage.classList.remove("hidden");
  
      if (!isDraw) {
        const winningCombination = winCombinations.find(
          (combination) =>
            combination.every((index) => cells[index].innerText === aiSymbol || playerSymbol)
        );
  
        if (winningCombination) {
          winningCombination.forEach((index) =>
            cells[index].classList.add("winning-cell")
          );
        }
      }
    }
  
    // Event listeners
    restartButton.addEventListener("click", startGame);
    cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  
    // Start game on page load
    startGame();
  });
  