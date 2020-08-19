import React from 'react';
import {useSelector} from 'react-redux';
import { CardComponent } from '../card/CardComponent';
import {} from './Stage.css';
import { EmptyCard } from '../card/EmptyCard';

export const Stage = (props) => {

    let staged = useSelector(state => state.stagedCards)

    const generateCards = (_cards) => {
        return _cards.map((card, index) => {
            if(!card.suit) {
                return (index === _cards.length -1 ) ? (
                    <EmptyCard 
                        origin="stage"
                        number={card.number}
                        suit={card.suit}
                    />
                ) : null;
            } else {
                card.faceUp = card.faceUp || index === _cards.length -1 
                return (
                    <CardComponent 
                        origin="stage"
                        className="stacked-below"
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
                {generateCards(col)}
            </div>
        ))
    }

    return (
        <div className="Stage">
            {generateColumns(staged)}
        </div>
    );
}