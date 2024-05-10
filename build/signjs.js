const bodyEl = document.querySelector('body')
const passInpt = document.getElementById('password-inpt'),
      usernInpt = document.getElementById('username-inpt')
const expassInpt = document.getElementById('expassword-inpt'),
      exusernInpt = document.getElementById('exusername-inpt')
const signUpBtn = document.getElementById('sign-up-btn')
const signInBtn = document.getElementById('sign-in-link')
const welcomeText = document.getElementById('welcome-text')
let signUpCurrentView = true
let signInCurrentView = false

const setPass = (val1,val2) => {
    localStorage.setItem(usernInpt.value,JSON.stringify([val1,val2]))
}
const validPass = () => {
    let yourPass = passInpt.value
    let btnNxtSib = document.querySelector('#specifications')
    let whiteSpace = /\s/
    if (!(whiteSpace.test(yourPass))) {
        if (yourPass.length >= 8 && yourPass.length <= 30){  
            btnNxtSib.textContent = 'Password is Valid'
            return true
        } else {
            console.log('PASSWORD LENGTH FAILS')
            if (!(btnNxtSib.textContent)){
                btnNxtSib.textContent += `Your password must be between 8 and 30 letters`
            } else {
                btnNxtSib.textContent = `Your password must be between 8 and 30 letters`
            }
        }
    } else {
        console.log('PASSWORD HAS WHITESPACE')
        if (!(btnNxtSib.textContent)){
            btnNxtSib.textContent += `Your password must not contain spaces`
        } else {
            btnNxtSib.textContent = `Your password must not contain spaces`
        }
    }
}
const validName = () => {
    let yourName = usernInpt.value
    let usernNextSib = usernInpt.nextElementSibling
    let exName = localStorage.getItem(yourName)
    if (exName){
        console.log('NAME CHECK FAILED')
        usernNextSib.textContent = 'Name already taken'
        return false
    }
    usernNextSib.textContent = 'Your username!'
    return true
}
const allChars = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    '!', '?', '#', ',', '.'
]
const encodePass = () => {
    let passLength = passInpt.value.length
    let CodedLength = Math.floor(Math.random()*30 + 61)

    let wordPoses = []
    while (wordPoses.length !== passLength) {
        let newVal = Math.floor(Math.random()*CodedLength)
        if (!(wordPoses.includes(newVal))) {
            wordPoses.push(newVal)
        }
    }
    console.log(wordPoses)
    let encodedPass = ""
    for (let i = 0; i < CodedLength; i++) {
        if (wordPoses.includes(i)){
            encodedPass += passInpt.value[wordPoses.indexOf(i)]
        } else {
            encodedPass += allChars[Math.floor(Math.random() * allChars.length)]
        }
    }
    return [encodedPass, wordPoses]
}
const checkNameExist = () => {
    console.log('Checking whether the name exists')
    let theUserInpt = localStorage.getItem(exusernInpt.value)
    let errorUserMess = exusernInpt.nextElementSibling
    if (!theUserInpt){
        errorUserMess.textContent = "This username doesn't exist"
        return false}
        errorUserMess.textContent = 'Nice username :)'
    return true
}
const decodePass = () => {
    let DataToDecode = JSON.parse(localStorage.getItem(exusernInpt.value))
    let stringToDecode = DataToDecode[0]
    let arrToUse = DataToDecode[1][0]
    let unraveledPass = ""
    for(let i = 0; i < arrToUse.length; i++){
        unraveledPass += stringToDecode[arrToUse[i]]
    }
    return unraveledPass
}
const checkPassIs = (val) => {
    let errorForPass =  expassInpt.nextElementSibling 
    if (expassInpt.value !== val) {
        errorForPass.textContent = 'Wrong Password'
        return false
    }
    errorForPass.textContent = 'Logging in..'
    return true
}
const toggleForSignUp = () => {
    passInpt.classList.add('block')
    passInpt.classList.remove('hidden')
    usernInpt.classList.add('block')
    usernInpt.classList.remove('hidden')
    exusernInpt.classList.add('hidden')
    exusernInpt.classList.remove('block')
    expassInpt.classList.add('hidden')
    expassInpt.classList.remove('block')
    welcomeText.textContent = 'SIGN UP'
    signUpCurrentView = true
    signInCurrentView = false
}
const toggleForSignIn = () => {
    passInpt.classList.remove('block')
    passInpt.classList.add('hidden')
    usernInpt.classList.remove('block')
    usernInpt.classList.add('hidden')
    exusernInpt.classList.remove('hidden')
    exusernInpt.classList.add('block')
    expassInpt.classList.remove('hidden')
    expassInpt.classList.add('block')
    signUpCurrentView = false
    signInCurrentView = true
    welcomeText.textContent = 'WELCOME BACK!'
    let btnNxtSib = document.querySelector('#specifications')
    btnNxtSib.textContent = "(3-30 characters, no spaces)"
}
signUpBtn.addEventListener('click', function() {
    if (!signUpCurrentView){toggleForSignUp();return}
    console.log('BUTTON HAS BEEN CLICKED, BEGIN VALIDATION')
    
    result2 = validName()
    if (!result2) {return}
    console.log('NAME IS VALID')

    result = validPass()
    if (!result) {return}
    console.log('PASSWORD IS VALID')
    
    console.log('FINISHED VALIDATION')
    console.log('INITIATE STORE PASSWORD')
    console.log('BEGIN PASSWORD ENCODING')
    encodees = encodePass()
    console.log('PASSWORD SUCCESFULLY ENCODED')
    setPass(encodees[0],[encodees[1]])
    console.log('PASSWORD STORING COMPLETE')
})

signInBtn.addEventListener('click',function () {
    if (!signInCurrentView){toggleForSignIn();return}
    console.log('SIGN IN BUTTON HAS BEEN CLICKED. BEGIN USER - PASS CHECK')
    if (!checkNameExist()){return}
    console.log('THE USERNAME DOES EXIST!')
    console.log('CHECKING WHETHER PASSWORD MATCHES USERNAME')
    truePass = decodePass()
    if (!checkPassIs(truePass)){return}
    console.log('YOU MAY PROCEED TO LOG IN!!')
})

