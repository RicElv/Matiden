
let key = 0;
const initialState = [{Ingredient: 'Morot', Amount: '500',
 AmountUnit: 'g', selected: false, key: '' + key++}]
const grocieriesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD':
            return [...state,
            {
            Ingredient: action.Ingredient,
            Amount: action.Amount,
            AmountUnit: action.AmountUnit,
            selected: false,
            key: '' + key++
            }
            ];
        case 'REPLACE':
            let newState = [...state];
            const item = action.item;
            const index = state.findIndex(otherItem =>
                otherItem.key === item.key
            );
            if(index >= 0){ 
                //state[index] = item;
                newState[index] = item
            }
            return newState;
        case 'REMOVESELECTED':
            return state.filter(item => 
                item.selected == false);
        case 'REMOVEALL':
            return [];
        default:
            return state;
    }
}

export default grocieriesReducer;