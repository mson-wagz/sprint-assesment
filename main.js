const cellElements = document.querySelectorAll('data-cell')

cellElements.forEach(cell => {
    cell.addEventListener('click', handleclick, { once: true})
})

function handleclick(){
    
}