 ---For Tests---
 Client: form has special ID, inputs need particular placeholders, buttons have particular innerText, two sections with particular IDs
 
 
 ! Event 
 Client: clicking the = will POST the input data:
 {
    numOne: 1,
    numTwo: 2,
    operator: '+'
 }

  Clear button clears the inputs

 Server:
 receiving POST, and running the calculation in a separate function, and then pushing that array into the calc history array
 
 ! State 
 Server:
 an array of objects that has the history of calculations
 data structure:
 [{
    numOne: 1,
    numTwo: 2,
    operator: '+',
    result: 3
 },
 {
    numOne: 1,
    numTwo: 2,
    operator: '+',
    result: 3
 }]


 ! Render
 Client:
 Render on start
 GET: get the data structure to render to DOM
 Recent RESULT displayed (the last in the array that is GETted)
 history minus the recent result


 ---Stretch---

 
