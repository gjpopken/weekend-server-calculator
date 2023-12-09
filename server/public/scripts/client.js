

function onStart() {
    console.log('client.js is sourced!');
    render()
}
// ! Event


// Function that will POST the infoToCompute array to the server to compute
function compute(event) {
    event.preventDefault()
    // Getting the input values and assigning into their appropriate keys to POST
    const numOneInput = document.getElementById('numOne').value
    const numTwoInput = document.getElementById('numTwo').value
    infoToCompute.numOne = Number(numOneInput)
    infoToCompute.numTwo = Number(numTwoInput)

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
// ! State
let infoToCompute = {
    numOne: 0,
    numTwo: 0,
    operator: '+'
}

// A function to change the operator in the infoToCompute obj
function assignOperator(event, operator) {
    event.preventDefault()

    switch (operator) {
        case '+':
            infoToCompute.operator = '+'
            break
        case '-':
            infoToCompute.operator = '-'
            break
        case '*':
            infoToCompute.operator = '*'
            break
        case '/':
            infoToCompute.operator = '/'
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

// Function to clear inputs
function clearInputs() {
    document.getElementById('numOne').value = ''
    document.getElementById('numTwo').value = ''

}

onStart()