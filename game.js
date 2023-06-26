// Game messages
let winMsg = 'Victory'; //Message for winning
let loseMsg = 'Defeat'; // Message for losing
let tieMsg = 'Tie'; // Message for a tie

// Elements
let moveDisplays = document.querySelectorAll(".move-display h2"); // Selects move display elements
let moveList = ['Rock', 'Paper', 'Scissors']; // List of available moves
let btns = document.querySelectorAll("button"); // Selects button elements
let moves = {}; // Object to store moves

// Start the game
let startGame = () => {
  document.getElementById("status-head").innerHTML = "Choose"; // Set initial game status

  for (let i = 0; i < btns.length; i++) {
    btns[i].removeEventListener("click", startGame); // Remove previous event listener
    btns[i].addEventListener("click", endGame); // Add event listener to buttons
    btns[i].style.visibility = 'visible'; // Make buttons visible
    btns[i].innerHTML = moveList[i]; // Set button text
    btns[i].style.display = 'inline-block'; // Display buttons as inline-block
  }

  for (let i = 0; i < moveDisplays.length; i++) {
    moveDisplays[i].style.visibility = 'hidden'; // Hide move displays
  }
}

// End the game
let endGame = (event) => {
  let userText = event.target.innerHTML; // Get the text of the clicked button
  let userMove = moveList.indexOf(userText); // Get the index of the user's move in the moveList array

  let comMove = randomMove(); // Generate a random move for the computer
  let moves = calculate(userMove, comMove); // Calculate the result of the game

  document.getElementById("status-head").innerHTML = moves["Message"]; // Update game status

  for (let i = 0; i < btns.length; i = i + 2) {
    btns[i].style.visibility = 'hidden'; // Hide buttons
  }

  document.querySelectorAll("button")[1].innerHTML = "Play Again"; // Set "Play Again" button text
  btns[1].addEventListener("click", startGame); // Add event listener to "Play Again" button

  for (let i = 0; i < moveDisplays.length; i++) {
    moveDisplays[i].style.visibility = 'visible'; // Show move displays
  }

  moveDisplays[0].innerHTML = "Your played " + moveList[parseInt(moves["User"])]; // Update user's move display
  moveDisplays[1].innerHTML = "Computer played " + moveList[parseInt(moves["Computer"])]; // Update computer's move display
}

// Generate a random move for the computer
let randomMove = () => {
  return Math.floor(Math.random() * 3); // Generate a random number between 0 and 2
}

// Calculate the result of the game
let calculate = (move1, move2) => {
  if (move1 == move2) {
    return {
      "Message": tieMsg,
      "User": move1,
      "Computer": move2
    };
  } else if ((move1 == "0" && move2 == "2") || (move1 == "1" && move2 == "0") || (move1 == "2" && move2 == "1")) {
    return {
      "Message": winMsg,
      "User": move1,
      "Computer": move2
  };
} else{
  return {
      "Message": loseMsg,
      "User": move1,
      "Computer": move2
  };
}
}

document.addEventListener("onload", startGame());