import { combineReducers } from 'redux'
import HeroReducer from './heroes'

export default combineReducers({
  heroes: HeroReducer
})
