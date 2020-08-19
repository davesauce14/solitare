import React from 'react';
import { useSelector } from 'react-redux';
import { EmptyCard } from '../card/EmptyCard';
import { CardComponent } from '../card/CardComponent';
import {} from './Resolved.css'

export const Resolved = (props) => {

    let resolvedCards = useSelector(state => state.resolvedCards);

    const generateCards = (_cards) => {
        return _cards.map((card) => {
            if(!card.suit) {
                return (<EmptyCard 
                    origin="resolved"
                    number={card.number}
                    suit={card.suit}/>)
            } else {
                return (
                    <CardComponent 
                          className="stacked-below"
                          origin="resolved"
                          number={card.number}
                          suit={card.suit}
                          faceUp={card.faceUp}
                          click={() => {}}
                        />
                )
            }
        })
    }

    const generateColumns = (columns) => {
        return columns.map((col) => (
            <div className="Stage__Column">
                {generateCards(col)[col.length-1]}
            </div>
        ))
    }

    return (
        <div className="Resolved">
            {generateColumns(resolvedCards)}
        </div>
    );
}