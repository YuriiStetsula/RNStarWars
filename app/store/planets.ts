import {createAction, createReducer} from '@reduxjs/toolkit';
import {Planets} from './types';

const initialState: Planets = {};

const SET_PLANET = 'SET_PLANET';

export const setPlanet = createAction<{index: string; name: string}>(
  SET_PLANET,
);

const reducer = createReducer(initialState, builder => {
  builder.addCase(setPlanet, (state, action) => {
    return {
      ...state,
      [action.payload.index]: action.payload.name,
    };
  });
});

export default reducer;
