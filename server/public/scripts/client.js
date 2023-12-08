

function onStart() {
    console.log('client.js is sourced!');
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
    }).catch((err) => {
        console.log(err);
    })
}
// ! State
// A place to store the obj that will be sent to the server
let infoToCompute = {
    numOne: 0,
    numTwo: 0,
    operator: '+'
}

// ! Render
// Client:
//  Render on start
//  GET: get the data structure to render to DOM
//  Recent RESULT displayed (the last in the array that is GETted)
//  history minus the recent result

onStart()