onStart()

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
// ! State
// A place to store the obj that will be sent to the server
let infoToCompute = {
    numOne: '',
    numTow: '',
    operator: ''
}

// ! Render
// Client:
//  Render on start
//  GET: get the data structure to render to DOM
//  Recent RESULT displayed (the last in the array that is GETted)
//  history minus the recent result