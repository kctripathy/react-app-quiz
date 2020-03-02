import quiz from './reducers/quiz';
import user from './reducers/user';
import { combineReducers } from 'redux';

export default combineReducers({
  quiz,
  user
});
