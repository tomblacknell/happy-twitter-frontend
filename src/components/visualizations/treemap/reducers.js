import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { MOVE_DOWN, MOVE_UP } from './actions';
import { reducer as tooltip } from 'redux-tooltip';
import { LOCATION_CHANGE } from 'react-router-redux';

const initial = {
  path: [],
  base: null,
};

function app(state = initial, action) {
  switch (action.type) {
  case LOCATION_CHANGE:
    // Get base path from first location change
    if (state.base === null) {
      return { ...state, base: action.payload.pathname };
    } else {
      return state;
    }
  case MOVE_DOWN:
    return { ...state, path: state.path.concat([action.payload]) };
  case MOVE_UP:
    return { ...state, path: state.path.slice(0, -1) };
  default:
    return state;
  }
}

export default combineReducers(
  { app, tooltip, routing: routerReducer }
);
