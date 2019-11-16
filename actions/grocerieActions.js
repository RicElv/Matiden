
export const ADD = (Ingredient, Amount, AmountUnit) => {
    return {
        type: 'ADD',
        Ingredient,
        Amount,
        AmountUnit
    }
}

export const REPLACE = item => {
    return {
        type: 'REPLACE',
        item
    }
}

export const REMOVESELECTED = () => {
    return {
        type: 'REMOVESELECTED',
    }
}

export const REMOVEALL = () => {
    return{
        type: 'REMOVEALL'
    }
}