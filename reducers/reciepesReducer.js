import preReciepes from '../assets/reciepes.json'

let key = 5;
const initialState = []

const reciepesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD':
            return [...state,
            {
                name: action.name,
                tags: action.tags,
                ingredients: action.ingredients,
                description: action.description,
                key: '' + key++
            }
            ]
        case 'REMOVE':
            return state
    }
}