import { combineReducers } from 'redux';
import MemberProfileReducers from './MemberProfileReducers';

const rootReducer = combineReducers({
  MemberProfileData: MemberProfileReducers,
});

export default rootReducer;
