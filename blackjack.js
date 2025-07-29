var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; //allows the plater to draw while yourSum <= 21

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
    // console.log(deck);
}

function shuffleDuck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); //Math.random is going to give a number between 0 and 1 and then it will multiply that by the length of the deck which gives us a number which gives us a floating number between 0-51.999... so we will use math.floor to get an intiger. 
        let temp = deck[i];
        deck[i] = deck[j]
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop(); //Pop is going to remove a card from the end of the arry
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    
    // This is appending cards to the dealers hand until the dealer reaches a sum of 17 or above
    while (dealerSum < 17) {
        let cardImg = document.createElement("img") // Its creating an image tag like <img>
        let card = deck.pop(); // This gets a card form the deck
        cardImg.src = "./images/" + card + ".png"; // Then it snets the source of the image tag (src="") then in those quotations it print ./cards/ followed by the card type e.g. 8-C then it end it with the ".png" for this exsample that will come out to "<img src="./cards/8-C.png">
        dealerSum += getValue(card); // This increments the dealer sum
        dealerAceCount += checkAce(card); // This does the ace count for the dealer
        document.getElementById("dealer-cards").append(cardImg); // Then it takes the image tag "<img src="./cards/8-C.png">" and appends it to the "dealer-cards" div
    }
    console.log(dealerSum);
}

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