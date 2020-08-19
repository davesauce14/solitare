import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CardComponent } from '../card/CardComponent';
import { EmptyCard } from '../card/EmptyCard';
import { getCardAction } from '../store/actionCreator'
import {} from './Deck.css'

export let DeckComponent = (props) => {

    let dispatch = useDispatch();

    let cards = useSelector((state) => state.unflippedCards);
    let viewedCards = useSelector((state) => state.flippedCards);

    let generateCard = (_list, index, faceUp = true) => {
        if(_list && _list[index]) {
            return (
                <CardComponent 
                  number={_list[index].number}
                  suit={_list[index].suit}
                  faceUp={faceUp}
                  click={deckClickEventHandler}
                />
              )
        } else {
            if (!faceUp) {
                // Ran out of cards instantiate dummy card
                return (
                    <EmptyCard click={deckClickEventHandler} />
                )
            }
        }
    }

    let deckClickEventHandler = (e, _props) => {
        dispatch(getCardAction());
    }

    return(
        <div className="Deck">
            <div className="Deck__stack">
                { generateCard(cards, cards.length -1, false) }
            </div>
            <div className="Deck__spread">
                <div className="Deck__spread-item one">{generateCard(viewedCards, viewedCards.length -1)}</div>
                <div className="Deck__spread-item two">{generateCard(viewedCards, viewedCards.length -2)}</div>
                <div className="Deck__spread-item three">{generateCard(viewedCards, viewedCards.length -3)}</div>
            </div>
        </div>
    )
}