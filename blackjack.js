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