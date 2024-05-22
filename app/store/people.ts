import {PayloadAction, createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {PeopleInitialState, Person} from './types';
import {fetchPeople} from '../api';
import {PeopleResponse} from '../api/responses';
import URIJS from 'urijs';

const initialState: PeopleInitialState = {
  count: 0,
  next: '1',
  previous: null,
  results: undefined,
};

const GET_PEOPLE = 'GET_PEOPLE';

export const getPeopleAction = createAsyncThunk<
  PeopleResponse,
  {
    page: string;
  }
>(GET_PEOPLE, async params => {
  const people = await fetchPeople(params);
  return people;
});

/* ******************************************************************** */
/*                             REDUCERS                                 */
/* ******************************************************************** */

const onPeopleFulfiled = (
  state: PeopleInitialState,
  action: PayloadAction<PeopleResponse>,
): PeopleInitialState => {
  const {results, previous, next, count} = action.payload;
  const nextPage = new URIJS(next).search(true)?.page;
  const previousPage = previous && new URIJS(previous).search(true)?.page;

  return {
    ...state,
    previous: previousPage,
    next: nextPage,
    count,
    results: results.map((result): Person => {
      return {
        ...result,
        hairColor: result.hair_color,
        skinColor: result.skin_color,
        eyeColor: result.eye_color,
        birthYear: result.birth_year,
        homeWorld: result.homeworld,
      };
    }),
  };
};

const reducer = createReducer(initialState, builder => {
  builder.addCase(getPeopleAction.fulfilled, onPeopleFulfiled);
});

export default reducer;
