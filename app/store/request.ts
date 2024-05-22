import {createReducer} from '@reduxjs/toolkit';
import {getPeopleAction} from './people';

const initialState: {people: {isFetching: boolean}} = {
  people: {
    isFetching: false,
  },
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(getPeopleAction.pending, state => ({
    ...state,
    people: {
      isFetching: true,
    },
  })),
    builder.addCase(getPeopleAction.rejected, state => ({
      ...state,
      people: {
        isFetching: false,
      },
    })),
    builder.addCase(getPeopleAction.fulfilled, state => ({
      ...state,
      people: {
        isFetching: false,
      },
    }));
});

export default reducer;
