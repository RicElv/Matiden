import {combineReducers} from 'redux'
import grocieresReducer from './groceriesReducer'
import recipesReducer from './reciepesReducer'

export default combineReducers({
    groceries: grocieresReducer,
    recipes: recipesReducer
});