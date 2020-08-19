class Card {

    suit;
    number;
    faceUp;

    constructor(num, suit, faceUp = false) {
        this.number = num || rng();
        this.suit = suit;
        this.faceUp = faceUp;
    }

};

const Suits = {
    HEART: "HEART",
    DIAMOND: "DIAMOND",
    SPADE: "SPADE",
    CLUB: "CLUB"
};

const Colors = {
    HEART: "RED",
    DIAMOND: "RED",
    SPADE: "BLACK",
    CLUB: "BLACK"
};

let generateFaceValue = (num) => {

    switch (num) {
        case 1:
            num = 'A';
            break;
        case 11:
            num = 'J';
            break;
        case 12:
            num = 'Q';
            break;
        case 13:
            num = 'K';
            break;
    }
    return num;

}

let cardsAreEqual = (num1, suit1, num2, suit2) => num1 === num2 && suit1 === suit2;

let rng = () => ('id-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

export {
    Card,
    Suits,
    Colors,
    generateFaceValue,
    cardsAreEqual,
    rng
}