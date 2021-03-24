
import { combineReducers } from 'redux'  
import GameReducer from './GameReducer'
import DetaiReducer from './DetailReducer'

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
    GameReducer,
    DetaiReducer
})