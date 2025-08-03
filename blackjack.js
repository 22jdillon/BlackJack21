var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; //allows the plater to draw while yourSum <= 21
var visHit = true;
var visStand = true;
var visRestart = false;

window.onload = function() {
    buildDeck();
    shuffleDuck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    console.log(deck);
}

function shuffleDuck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); //Math.random is going to give a number between 0 and 1 and then it will multiply that by the length of the deck which gives us a number which gives us a floating number between 0-51.999... so we will use math.floor to get an intiger. 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop(); //Pop is going to remove a card from the end of the arry
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    console.log(hidden);
    console.log(dealerSum);
    
    // This is appending cards to the dealers hand until the dealer reaches a sum of 17 or above
    while (dealerSum < 17) {
        let cardImg = document.createElement("img"); // Its creating an image tag like <img>
        let card = deck.pop(); // This gets a card form the deck
        cardImg.src = "./images/" + card + ".png"; // Then it snets the source of the image tag (src="") then in those quotations it print ./cards/ followed by the card type e.g. 8-C then it end it with the ".png" for this exsample that will come out to "<img src="./cards/8-C.png">
        dealerSum += getValue(card); // This increments the dealer sum
        dealerAceCount += checkAce(card); // This does the ace count for the dealer
        document.getElementById("dealer-cards").append(cardImg); // Then it takes the image tag "<img src="./cards/8-C.png">" and appends it to the "dealer-cards" div
    }
    console.log(dealerSum);

    for (let i =0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".png";
        yourSum += getValue(card); 
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("restart").addEventListener("click", restart);

    document.getElementById("hit").style.display = "inline";
    document.getElementById("stand").style.display = "inline";

    document.getElementById("restart").style.display = "none";
}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./images/" + card + ".png";
    yourSum += getValue(card); 
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    let adjustedSum = reduceAce(yourSum, yourAceCount)
    
    if (adjustedSum > 21) {
        canHit = false;
        stand();
    } 
    
    if (reduceAce(yourSum, yourAceCount) > 20)
        canHit = false;

}


function stand() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./images/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You Win!"
    }
    else if (yourSum == dealerSum) {
        message = "Tie!"
    }
    else if (yourSum > dealerSum) {
        message = "You Win!"
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!"
    }

    document.getElementById("dealer-sum").innerText = dealerSum
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;

    document.getElementById("hit").style.display = "none";
    document.getElementById("stand").style.display = "none";

    document.getElementById("restart").style.display = "inline";
}

function restart() {
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    canHit = true;

    document.getElementById("dealer-cards").innerHTML = '<img id="hidden" src="./images/BACK.png">';
    document.getElementById("your-cards").innerHTML = "";
    document.getElementById("dealer-sum").innerText = "";
    document.getElementById("your-sum").innerText = "";
    document.getElementById("results").innerText = "";

    buildDeck()
    shuffleDuck()
    startGame()

}

// function toggle() {
//     let toggle = () => {
//         let element = document.getElementById("button");
//         let hidden = element.getAttribute("hidden")

//         if (hidden) {
//             element.removeAttribute("hidden");
//         } else {
//             element.setAttribute("hidden", "hidden");
//         }
//     }
// }

function getValue(card) {
    let data = card.split("-"); // Each card is has a value (A, 1, 2, ect) and then the type of card (C-clubs, D-diamonds, H-harts and S-spades) for exsample "4-S" or 4 of spades so when we call split on the dash its splitting the values into 2 parts and get an array ["4", "S"]
    let value = data[0];

    // This is checking if the card is a letter (Ace, Jack, Queen or King) Then if the card is an ace it will assign a value of 11 to it. If its another letter (Jack, Queen or King) it will give it a value of 10. But if the card is a number then it will just give it the corisponding value e.g. 7 of harts (["7", "H"]) would be assined a value of 7.

    if (isNaN(value)) {
        if (value == "A") {
            return 11; 
        }
        return 10;
    }

    return parseInt(value);

}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -=1;
    }
    return playerSum;
}