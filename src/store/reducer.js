import { Deck } from "../deck/Deck";
import { GET_CARD, RELOCATE_CARD } from "./actions";
import { cardsAreEqual, Card } from "../card/Card";

const initialState = {
    cards: [],
    unflippedCards: [],
    flippedCards: [],
    stagedCards: [],
    resolvedCards: []
}

const reducer = (state, action) => {
    if(!state) {
        return initializeState(initialState);
    }
    switch (action.type) {
        case GET_CARD : return getCard(state)
        case RELOCATE_CARD : return relocateCard(state, action.payload)
    }
    return state;
}

const initializeState = (_init) => {
    const cards = new Deck().cards;
    const { cutCards, staged } = initializeStagedCards(cards);
    _init.cards = cards;
    _init.unflippedCards = cutCards;
    _init.stagedCards = staged;
    _init.resolvedCards = [...new Array(4)].map((x) => [new Card(0, null)]);
    console.log(_init);
    return _init;
}

const initializeStagedCards = (_cards) => {

    let cutCards = [..._cards];
    let staged = [...new Array(7)].map((x) => []);

    if(cutCards && cutCards.length >0) {
        for(let i = 0; i < 7; i++) {
            let counter = i + 1;
            console.log(counter)
            while (counter > 0) {
                staged[i].push(cutCards.pop());
                counter --;
            }
        }
    }
    return { cutCards, staged };
}

let getCard = (state) => {
    let unflippedCards = [...state.unflippedCards];
    let flippedCards = [...state.flippedCards];
    if(state.unflippedCards && state.unflippedCards.length > 0) {
        // Push card to flipped array
        let card = unflippedCards.pop();
        flippedCards.push(card);
    } else {
        // Rotate Cards back to deck
        unflippedCards = flippedCards.reverse();
        flippedCards = [];
    }
    return {
        ...state,
        unflippedCards,
        flippedCards
    }
}

let relocateCard = (state, payload) => {
    let flippedCards = removeCardFromStack(state.flippedCards, payload);
    let stagedCards = [...state.stagedCards];
    let resolvedCards = [...state.resolvedCards];

    // Need to seach the stage and resolved cards for location payload
    _relocateCard(stagedCards, payload);
    _relocateCard(resolvedCards, payload);

    console.log(stagedCards);
    if(resolvedCards.length >= 51) {
        alert('good Job Mike!');
    }
    return {
        ...state,
        flippedCards,
        stagedCards,
        resolvedCards
    }
}

let removeCardFromStack = (arr, payload) => {
    return arr.filter(card => !cardsAreEqual(card.number, card.suit, payload.fromNumber, payload.fromSuit))
}

let _relocateCard = (arr, payload) => {

    let carStack = [];

    for(let i in arr) {
        for(let c in arr[i]) {
            const card = arr[i][c];
            // Delete Previous Location
            if(cardsAreEqual(card.number, card.suit, payload.fromNumber, payload.fromSuit)) {
                const newArr = [...arr[i].slice(0, c)];
                carStack = [...arr[i].slice(c)];
                console.log(carStack);
                arr[i] = (newArr.length > 0) ? newArr : [new Card(0, null)];
                console.log('removed', i, c);
                break;
            }
        }
    }
    console.log('preserve stack', carStack);
    for(let i in arr) {
        for(let c in arr[i]) {

            const card = arr[i][c];
            // Append To New Location
            if(cardsAreEqual(card.number, card.suit, payload.toNumber, payload.toSuit)) {
                card.faceUp = true;
                const newArr = [
                    ...arr[i].slice(0, c + 1), 
                ];
                if (carStack.length > 0) {
                    newArr.push(...carStack);
                } else {
                    newArr.push(new Card(payload.fromNumber, payload.fromSuit, true));
                }
                arr[i] = newArr;
                console.log('added to',card,  i, c);
                break;
            }
        }
    }
}


export default reducer;