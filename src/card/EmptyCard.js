import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { relocateCardAction } from '../store/actionCreator';

export const EmptyCard = (props) => {

    const dispatch = useDispatch();
    let [canDrop, updateCanDrop] = useState(false);

    let allowCardRelocation = (_suit, _number) => {
        return props.origin === "resolved" && _number === 1 || props.origin === "stage" && _number === 13;
    }
    let onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(!canDrop) {
            updateCanDrop(true)
        }
        return true
    }
    let onDragLeave = () => {
        if(canDrop) {
            updateCanDrop(false)
        }
    }

    let onDrop = (e) => {
    
        var suit = e.dataTransfer.getData("suit");
        var number = parseInt(e.dataTransfer.getData("number"));

        console.log(props.origin, suit, number, allowCardRelocation(suit, number))
        if (allowCardRelocation(suit, number)) {

            dispatch(relocateCardAction(number, suit, props.number, props.suit))
            
            // const cardBeingDropped = document.getElementById(String(number + '_' + suit).toUpperCase());
            // console.log(cardKey, cardBeingDropped)
            // cardBeingDropped.parentNode.removeChild(cardBeingDropped);
            // cardRef.current.parentNode.appendChild(cardBeingDropped)
            e.preventDefault();
            e.stopPropagation();
        }
    }

    return (
        <div 
        className="Card empty" 
        onClick={(e) => {props.click(e, props)}}
        onDragOver={(e) => onDragOver(e)} 
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e)}>
            <div className="Card__top"></div>
            <div className="Card__body"></div>
            <div className="Card__bottom"></div>
            <div className="clearfix"></div>
        </div>
    )
}