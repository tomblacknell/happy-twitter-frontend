import { createAction } from 'redux-actions';

export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_UP = 'MOVE_UP';

export const moveDown = createAction(MOVE_DOWN);
export const moveUp = createAction(MOVE_UP);
