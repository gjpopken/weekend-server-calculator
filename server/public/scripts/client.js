

function onStart() {
    console.log('client.js is sourced!');
    render()
}
// ! Event
// Client: clicking the = will POST the input data:
//  {
//     numOne: 1,
//     numTwo: 2,
//     operator: '+'
//  }

//   Clear button clears the inputs

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
// //A place to store the obj that will be sent to the server
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
//  //Render on start
//  //GET: get the data structure to render to DOM
// // Recent RESULT displayed (the last in the array that is GETted)
// // history minus the recent result

function render() {
    axios({
        method: "GET",
        url: "/calculations"
    }).then((response) => {
        console.log('renders. current history:', response.data);
        const arrayWithHistory = response.data
        // Displaying the result
        const recentResult = document.getElementById('recentResult')
        //recentResult.innerHTML = ''
        //const pForResult = document.createElement('p')
        //pForResult.classList.add('result')
        // Putting the last item in the array into the result section
        if (arrayWithHistory[arrayWithHistory.length - 1]){
            // Tests don't like when I append 😤
        // pForResult.innerText = `Result: ${arrayWithHistory[arrayWithHistory.length - 1].result}`
        // recentResult.append(pForResult)
        recentResult.innerHTML = `
            <p class="result">Result: ${arrayWithHistory[arrayWithHistory.length - 1].result}</p>
        `
    }

        // Displaying the history
        const calculationHistory = document.getElementById('resultHistory')
        calculationHistory.innerHTML = ''

        // for (let i = 0; i < arrayWithHistory.length; i++) {
        //     const pForPastCalc = document.createElement('p')
        //     let currentObj = arrayWithHistory[i]
        //     pForPastCalc.innerText = `
        //     ${currentObj.numOne} ${currentObj.operator} ${currentObj.numTwo} = ${currentObj.result}
        //     `
        //     calculationHistory.prepend(pForPastCalc)
        // }

            for (let i = arrayWithHistory.length -1 ; i > -1; i--) {
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