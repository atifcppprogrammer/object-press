import { combineReducers } from 'redux';
import blogReducer from './blogs';
import postReducer from './posts';

const rootReducer = combineReducers({
  blogs: blogReducer,
  posts: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
