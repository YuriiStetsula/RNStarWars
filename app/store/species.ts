import {createAction, createReducer} from '@reduxjs/toolkit';
import {Species} from './types';

const initialState: Species = {};

const SET_SPECIES = 'SET_SPECIES';

export const setSpecies = createAction<{index: string; name: string}>(
  SET_SPECIES,
);

const reducer = createReducer(initialState, builder => {
  builder.addCase(setSpecies, (state, action) => {
    return {
      ...state,
      [action.payload.index]: action.payload.name,
    };
  });
});

export default reducer;
