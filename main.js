/* const cellElements = document.querySelectorAll('data-cell')

cellElements.forEach(cell => {
    cell.addEventListener('click', handleclick, { once: true})
})

function handleclick(){
    
}  */

const myCells = document.querySelectorAll(".cell")
const gameStatus= document.getElementById("game-status")
const restartButton = document.getElementById("restartButton")

const winningConditions = [
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

function startGame() {
    myCells.forEach(cell => {
        cell.addEventListener("click", handleclick)
    })
    restartButton.addEventListener("click", function restartGame() {
        playerTurn = "X"
        space = ["", "", "", "", "", "", "", "", ""]
        gameStatus.textContent = `${playerTurn}'s starts`
        myCells.forEach(cell => cell.textContent = "")
        playing = true;
    })
    gameStatus.textContent = `${playerTurn}'s starts`
    playing = true
}

function handleclick(){
    const cellIndex = this.getAttribute("cellIndex")

    if (space[cellIndex] != "" || !playing){
        return;
    }

    updateCell(this, cellIndex)
    switchPlayer()
    confirmWinner()
}

function updateCell(cell, index) {
    space[index] = playerTurn
    cell.textContent = playerTurn
}

function switchPlayer() {
    if(playerTurn == "X"){
        playerTurn = "O"
    } else if(playerTurn = "O"){
        playerTurn = "X"
    }
    gameStatus.textContent = `${playerTurn}'s Plays`
}

function confirmWinner() {
    let gameWon = false;

    for(let i = 0; 1 < winningConditions.length; i+=1 ){
        const condition = winningConditions[i] //[0, 1, 2] , [3, 4, 5], [1, 4, 7]
        const cell1 = space[condition[0]] //3 
        const cell2 = space[condition[1]] //4
        const cell3 = space[condition[2]] //5

        if(cell1 == "" || cell2 == "" || cell3 == ""){
            continue
        }
        if(cell1 == cell2 && cell2 == cell3){
            gameWon = true
            break
        }
    }

    if(gameWon){
        switchPlayer()
        gameStatus.textContent = `${playerTurn} wins!😮‍💨`
        playing = false
    } 
    else if(!options.includes("")){ 
        gameStatus.textContent = `It's a tie!🤝`
        playing = false
    } else{
        switchPlayer()
    }
}



