import { combineReducers } from 'redux';

import app from './app';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

export default combineReducers({ app, todos, visibilityFilter });
