import { combineReducers } from 'redux';
import blogReducer from './blogs';
import postReducer from './posts';
import notifyReducer from './notify';

const rootReducer = combineReducers({
  blogs: blogReducer,
  posts: postReducer,
  notify: notifyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
