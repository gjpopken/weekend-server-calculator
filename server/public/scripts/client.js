

function onStart() {
    console.log('client.js is sourced!');
    render()
}
// ! Event

// Function that will POST the infoToCompute array to the server to compute
function compute(event) {
    event.preventDefault()

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
        // we can't input more than 1 full stop
        if (symbol !== '.') {
            tempCalcs.numOne += symbol
        } else if (!tempCalcs.numOne.includes('.')) {
            console.log('doesnt have the dot already');
            tempCalcs.numOne += symbol
        }
        
    } else if ( currentInputNum === 2) {
        if (symbol !== '.') {
            tempCalcs.numTwo += symbol
        } else if (!tempCalcs.numTwo.includes('.')) {
            console.log('doesnt have the dot already');
            tempCalcs.numTwo += symbol
        }
    }
    renderInputDisplay()

}

// New function to clear the input display and start a new calculation
function clearField(event) {
    event.preventDefault()
    tempCalcs = {
        numOne: '',
        numTwo: '',
        operator: '',
    }
    infoToCompute = {
        numOne: 0,
        numTwo: 0,
        operator: '+'
    }
    currentInputNum = 1
    renderInputDisplay()
}

function clearHistory(event) {
    event.preventDefault()
    axios({
        method: "DELETE",
        url: "/history"
    }).then((response) => {
        console.log('in clear history function');
        // clearInputs()
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
                <p>🧪 ${currentObj.numOne} ${currentObj.operator} ${currentObj.numTwo} = ${currentObj.result}</p>
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

onStart()