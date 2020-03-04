import quiz from './reducers/quiz';
import user from './reducers/user';
import account from './reducers/account';

import { combineReducers } from 'redux';

export default combineReducers({
  quiz,
  user,
  account
});
