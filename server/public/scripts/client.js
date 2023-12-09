

function onStart() {
    console.log('client.js is sourced!');
    render()
}
// ! Event
// user will click a number button. This will run a function to add the number an obj specifically for display on the DOM (tempCalcs).
// other numbers clicked before the operator will be concatenated, and displayed in the input
// clicking an operater will concatenate the operater to the appropriate spot in the input display, and update in the infoToCompute obj
// and switch the number inputs to the numTwo part of the obj the renders in the input display (tempCalcs)
// when equals it hit, those numbers will be put into the infoToCompute obj, and sent to server

// Function that will POST the infoToCompute array to the server to compute
function compute(event) {
    event.preventDefault()
    // Getting the input values and assigning into their appropriate keys to POST
    // const numOneInput = document.getElementById('numOne').value
    // const numTwoInput = document.getElementById('numTwo').value
    // infoToCompute.numOne = Number(numOneInput)
    // infoToCompute.numTwo = Number(numTwoInput)
    
    //Checking to make sure that the user actually put in numbers for both, infoToCompute will default to 0
    if (tempCalcs.numOne !== '') {infoToCompute.numOne = Number(tempCalcs.numOne)}
    if (tempCalcs.numTwo !== '') {infoToCompute.numTwo = Number(tempCalcs.numTwo)}
    

    // Axios POST request
    axios({
        method: "POST",
        url: "/calculations",
        data: infoToCompute
    }).then((response) => {
        console.log('successfully POSTed');
        render()
    }).catch((err) => {
        console.log(err);
    })
}

// A function to add numbers to tempCalcs for display in the input field, called by onclick
function insertSymbol(event, symbol) {
    event.preventDefault()
    //console.log('inside insertSymbol,', symbol);
    if (currentInputNum === 1) {
        tempCalcs.numOne += symbol
    } else if ( currentInputNum === 2) {
        tempCalcs.numTwo += symbol
    }
    renderInputDisplay()

}

function clearHistory(event) {
    event.preventDefault()
    axios({
        method: "DELETE",
        url: "/history"
    }).then((response) => {
        console.log('in clear history function');
        clearInputs()
        render()
    }).catch((err) => {
        console.log(err);
    })
}

// ! State
let infoToCompute = {
    numOne: 0,
    numTwo: 0,
    operator: '+'
}
let tempCalcs = {
    numOne: '',
    numTwo: '',
    operator: '',
}
let currentInputNum = 1

// A function to change the operator in the infoToCompute obj
function assignOperator(event, operator) {
    event.preventDefault()

    switch (operator) {
        case '+':
            infoToCompute.operator = '+'
            tempCalcs.operator = '+'
            currentInputNum = 2
            renderInputDisplay()
            break
        case '-':
            infoToCompute.operator = '-'
            tempCalcs.operator = '-'
            currentInputNum = 2
            renderInputDisplay()
            break
        case '*':
            infoToCompute.operator = '*'
            tempCalcs.operator = '*'
            currentInputNum = 2
            renderInputDisplay()
            break
        case '/':
            infoToCompute.operator = '/'
            tempCalcs.operator = '/'
            currentInputNum = 2
            renderInputDisplay()
            break
    }
    console.log('assigned new operator', operator);
}

// ! Render
// Client:

function render() {
    axios({
        method: "GET",
        url: "/calculations"
    }).then((response) => {
        //console.log('renders. current history:', response.data);
        const arrayWithHistory = response.data
        const recentResult = document.getElementById('recentResult')
        recentResult.innerHTML = ''
        if (arrayWithHistory[arrayWithHistory.length - 1]) {

            recentResult.innerHTML = `
            <p class="result">Result: ${arrayWithHistory[arrayWithHistory.length - 1].result}</p>
        `
        }

        // Displaying the history
        const calculationHistory = document.getElementById('resultHistory')
        calculationHistory.innerHTML = ''
        for (let i = arrayWithHistory.length - 1; i > -1; i--) {
            let currentObj = arrayWithHistory[i]
            calculationHistory.innerHTML += `
                <p>${currentObj.numOne} ${currentObj.operator} ${currentObj.numTwo} = ${currentObj.result}</p>
                `
        }

    }).catch((err) => {
        console.log(err);
    })
}


// A function for rendering the tempCalcs obj to the DOM
function renderInputDisplay() {
    const inputDisplay = document.getElementById('showsCalculation')
    inputDisplay.value = `
    ${tempCalcs.numOne}${tempCalcs.operator}${tempCalcs.numTwo}
    `
}

// Function to clear inputs
function clearInputs() {
    document.getElementById('numOne').value = ''
    document.getElementById('numTwo').value = ''

}

onStart()