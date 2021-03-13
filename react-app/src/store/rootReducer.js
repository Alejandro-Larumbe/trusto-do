import { combineReducers } from 'redux';
import task from '../components/task/reducer';
import lists from '../components/lists/reducer';
import ui from '../components/ui/reducer';

const rootReducer = combineReducers({
  lists,
  task,
  ui
});

export default rootReducer;
