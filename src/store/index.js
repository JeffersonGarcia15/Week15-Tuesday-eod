/* eslint-disable no-undef */
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import { scientistReducer } from "./scientist";
const scientistsReducer = combineReducers({
	scientists: scientistReducer,
});
const logger = require("redux-logger").default;
const composeEnhancers = 
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(logger));

export function configureStore(preloadedState) {
	return createStore(scientistsReducer, preloadedState, enhancer);
}

export default configureStore;