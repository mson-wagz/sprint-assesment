const myCells = document.querySelectorAll(".cell")
const gameStatus = document.querySelector("#game-status")
const restartButton = document.querySelector("#restartButton")
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let space = ["", "", "", "", "", "", "", "", ""]
let playerTurn = "X"
let playing = false

startGame()

function startGame(){
    myCells.forEach(cell => cell.addEventListener("click", handleClick))
    restartButton.addEventListener("click", function restartGame(){
        playerTurn = "X"
        space = ["", "", "", "", "", "", "", "", ""]
        gameStatus.textContent = `${playerTurn}'s turn`
        myCells.forEach(cell => cell.textContent = "")
        playing = true
    })
    gameStatus.textContent = `${playerTurn}'s starts`
    playing = true
}

function handleClick(){
    const cellIndex = this.getAttribute("cellIndex")

    if(space[cellIndex] != "" || !playing){
        return
    }

    updateCell(this, cellIndex)
    confirmWinner()
}

function updateCell(cell, index){
    space[index] = playerTurn
    cell.textContent = playerTurn
}

function switchPlayer(){
    if(playerTurn == "X"){
        playerTurn = "O"
    } else{
        playerTurn = "X"
    }
    gameStatus.textContent = `${playerTurn}'s turn`
}

function confirmWinner(){
    let gameWon = false

    for(let i = 0; i < winningCombinations.length; i++){
        const condition = winningCombinations[i]
        const cell1 = space[condition[0]]
        const cell2 = space[condition[1]]
        const cell3 = space[condition[2]]

        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue
        }
        if(cell1 == cell2 && cell2 == cell3){
            gameWon = true
            break
        }
    }

    if(gameWon){
        gameStatus.textContent = `${playerTurn} wins!😮‍💨`
        playing = false
    }
    else if(!space.includes("")){
        gameStatus.textContent = `It's a tie🤝`
        playing = false
    }
    else{
        switchPlayer()
    }
}

