import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import {  } from './Card.css'
import { Colors, generateFaceValue } from './Card'
import { relocateCardAction } from '../store/actionCreator';

export let CardComponent = (props) => {

    const dispatch = useDispatch();

    let getColor = (_suit) => {
        return Colors[_suit];
    }

    let generateSuitValue = () => {
        switch (props.suit) {
            case 'HEART':
                return (
                    <span className="red">&hearts;</span>
                )
            case 'DIAMOND':
                return (
                    <span className="red">&diams;</span>
                )
            case 'SPADE':
                return (
                    <span >&spades;</span>
                )
            case 'CLUB':
                return (
                    <span >&clubs;</span>
                )
        }
    }

    let cardNumber = null, suit = null, draggable = false;
    let [canDrop, updateCanDrop] = useState(false);
    let cardRef = useRef();
    let cardClassName = "Card";
    let cardKey = props.number + '_' + props.suit;

    if(props.faceUp) {
        cardNumber = generateFaceValue(props.number);
        suit = generateSuitValue();
        draggable = true;
    } else {
        cardClassName += ' back';
    }

    let drag = (e, _suit, _num) => {
        
        if (e.dataTransfer) {
            e.dataTransfer.setData("suit", props.suit);
            e.dataTransfer.setData(getColor(props.suit).toLowerCase(), "suit");
            e.dataTransfer.setData("number", props.number);
            e.dataTransfer.setData(props.number, "number");
        }
        else if (e.originalEvent.dataTransfer){
            e.originalEvent.dataTransfer.setData("suit", props.suit);
            e.originalEvent.dataTransfer.setData(getColor(props.suit).toLowerCase(), "suit");
            e.originalEvent.dataTransfer.setData("number", props.number);
            e.originalEvent.dataTransfer.setData(props.number, "number");
        }
        return true;
    }

    let onDragOver = (e) => {
        let sameSuit = e.dataTransfer.types.indexOf(getColor(props.suit).toLowerCase()) > -1;
        if(!sameSuit && props.faceUp) {
            if(!canDrop) {
                updateCanDrop(true);
            }
        }
        e.preventDefault();
        e.stopPropagation();
        if(!sameSuit && props.faceUp || props.origin === "resolved") {
            return true;
        } else {
            return false;
        }
    }

    let onDragLeave = () => {
        if(canDrop) {
            updateCanDrop(false)
        }
    }

    let allowCardRelocation = (_suit, _number) => {
        if(props.origin === "stage") {
            // Check if same suit
            const thisCardColor = getColor(props.suit);
            const otherCardColor = getColor(_suit);
            const allowSuit = (thisCardColor !== otherCardColor);

            // Check if meets number criteria
            const allowNumber = parseInt(_number) + 1 === parseInt(props.number)

            return (allowSuit && allowNumber);

        } else if (props.origin === "resolved") {

            const allowSuit = (getColor(props.suit) === getColor(_suit));
            const allowNumber = parseInt(props.number) + 1 === parseInt(_number);
            return (allowSuit && allowNumber);
        }
    }

    let onDrop = (e) => {
    
        var suit = e.dataTransfer.getData("suit");
        var number = parseInt(e.dataTransfer.getData("number"));

        if (allowCardRelocation(suit, number)) {

            dispatch(relocateCardAction(number, suit, props.number, props.suit))
            
            // const cardBeingDropped = document.getElementById(String(number + '_' + suit).toUpperCase());
            // console.log(cardKey, cardBeingDropped)
            // cardBeingDropped.parentNode.removeChild(cardBeingDropped);
            // cardRef.current.parentNode.appendChild(cardBeingDropped)
            updateCanDrop(false)
            e.preventDefault();
            e.stopPropagation();
        }
    }

    return (
        <div className={cardClassName + ((canDrop) ? ' outline' : '')} 
            ref={cardRef}
            id={cardKey}
            key={cardKey}
            draggable={draggable} 
            onDragStart={(e) => drag(e)} 
            onDragOver={(e) => onDragOver(e)} 
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e)}
            onClick={(e) => {props.click(e, props)}}>
            <div className="Card__top">
                <span>{ cardNumber }</span>
                <br></br>
                { suit }
            </div>
            <div className="Card__body">
                { suit }
            </div>
            <div className="Card__bottom">
                { cardNumber }
            </div>
            <div className="clearfix"></div>
        </div>
    )
}