import { combineReducers } from 'redux';
import blogReducer from './blogs';
import postReducer from './posts';
import notifyReducer from './notify';
import galleriesReducr from './galleries';

const rootReducer = combineReducers({
  blogs: blogReducer,
  posts: postReducer,
  notify: notifyReducer,
  galleries: galleriesReducr,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
