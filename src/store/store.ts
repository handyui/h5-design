import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// import { routerMiddleware } from 'connected-react-router';
// import thunkMiddleware from 'redux-thunk';
// import { createBrowserHistory } from 'history';
// // import reducersGroup from './reducers';
// export const history = createBrowserHistory();
// // For Redux Browser Extension
// const composeEnhancers = compose;
// const store = createStore(
//   reducersGroup(history),
//   composeEnhancers(applyMiddleware(
//     routerMiddleware(history),
//     thunkMiddleware,
//   )),
// )
import layoutReducer from './reducers/dragDataReducer'

let reducers = combineReducers({
  dragData: layoutReducer,
})
const store = createStore(reducers, applyMiddleware(thunk))


// eslint-disable-next-line no-underscore-dangle

export default store;
