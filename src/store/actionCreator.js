import { GET_CARD, RELOCATE_CARD } from "./actions";


export const getCardAction = () => {
    return {
        type: GET_CARD
    }
}

export const relocateCardAction = (fromNumber, fromSuit, toNumber, toSuit) => {
    return {
        type: RELOCATE_CARD,
        payload: {fromNumber, fromSuit, toNumber, toSuit}
    }
}