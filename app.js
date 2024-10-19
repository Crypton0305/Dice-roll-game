var currentPlayerIndex = 0;
var players = [];
var isGameActive = false;

function startGame() {
    var player1Choice = '';
    do {
        player1Choice = prompt("Player 1, select: Heads or Tails? (Type 'Heads' or 'Tails')").toLowerCase();
        if (player1Choice !== 'heads' && player1Choice !== 'tails') {
            alert("Please select either 'Heads' or 'Tails'.");
        }
    } while (player1Choice !== 'heads' && player1Choice !== 'tails');

    var player2Choice = (player1Choice === 'heads' )? 'tails' : 'heads'; 

    players = ["Player 1 (" + player1Choice + ")", "Player 2 (" + player2Choice + ")"];

    // Random winner ko choose krti hai
    var tossResult = (Math.random() < 0.5 ? 'heads' : 'tails'); 
    if (tossResult === player1Choice) {
        currentPlayerIndex = 0;
    } else {
        currentPlayerIndex = 1;
    }

    alert(players[currentPlayerIndex] + " wins the toss!");

    isGameActive = true;
    document.getElementById("selection").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("current-player").innerText = players[currentPlayerIndex] + "'s Turn";
    
    // toss ke bad us button ko enable krta hai jo toss win krta hai
    updateButtonStates();
}

function rollDice(playerIndex) {
    if (!isGameActive || playerIndex !== currentPlayerIndex) return; 

    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
    // Display the dice roll result
    document.getElementById("result").innerText = "You rolled: " + dice1 + " and " + dice2;

    // Check for double sixes
    if (dice1 === 6 && dice2 === 6) {
        setTimeout(function() {
            alert("You rolled a double six!" + players[currentPlayerIndex] + " wins!");
            resetGame(); 
        }, 100); 
    } else {
        currentPlayerIndex = (currentPlayerIndex + 1) % 2; // player ko change kre ga
        document.getElementById("current-player").innerText = players[currentPlayerIndex] + "'s Turn";
        updateButtonStates(); 
    }
}

function updateButtonStates() {
    // yai button enable disable k lia
    document.getElementById("player1-button").disabled = currentPlayerIndex !== 0;
    document.getElementById("player2-button").disabled = currentPlayerIndex !== 1;
}

function resetGame() {
    currentPlayerIndex = 0; 
    isGameActive = false;
    document.getElementById("selection").style.display = "block";
    document.getElementById("game").style.display = "none";
    document.getElementById("result").innerText = "";
}
