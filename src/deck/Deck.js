import { Card, Suits } from '../card/Card';

export class Deck {

    cards = [];

    constructor() {
        this.cards = this.generateCards();
        this.cards = this.shuffle(this.cards);
        this.cards = this.shuffle(this.cards);
        this.cards = this.shuffle(this.cards);
    }

    shuffle(_cards) {
        let counter = _cards.length -1;
        while (counter >= 0) {
            let idx = Math.floor(Math.random() * counter);
            let _tempElem = _cards[counter];
            _cards[counter] = _cards[idx];
            _cards[idx] = _tempElem;
            counter --;
        }
        return _cards;
    }

    // getCard() {
    //     let card = this.cards.pop();
    //     this.viewedCards.push(card);
    //     console.log(this.cards.length);
    //     console.log(this.viewedCards.length);
    //     return card;
    // }

    generateCards() {
        let _cards = [];
        for (let i = 1; i <= 13; i++ ) {
            for (let suit of Object.keys(Suits) ) {
                _cards.push(new Card(i, suit));
            }
        }
        return _cards;
    }

}