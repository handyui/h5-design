import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
// import { reducer as formReducer } from 'redux-form';
import layoutReducer from './reducers/dragDataReducer'
// import authReducer from './authReducer';
// import ticketsReducer from './ticketsReducer';
// import notificationReducer from './notificationReducer';
// import ticketInfoReducer from './ticketInfoReducer';
// import adminReducer from './adminReducer';
// import usersReducer from './usersReducer';
// import richtextReducer from './richtextReducer';

const reducersGroup = (history:any) => combineReducers({
    dragData: layoutReducer,
//   auth: authReducer,
//   admin: adminReducer,
//   tickets: ticketsReducer,
//   ticketInfo: ticketInfoReducer,
//   notification: notificationReducer,
//   users: usersReducer,
//   richtext: richtextReducer,
//   router: connectRouter(history),
//   form: formReducer,
});

export default reducersGroup;