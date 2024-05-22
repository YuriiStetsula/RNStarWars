import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import {People, Person} from './types';
import {fetchPeople} from '../api';
import {PeopleResponse} from '../api/responses';
import URIJS from 'urijs';
import {AppDispatch, AppRootState} from './configureStore';

import {fetchPlanets, fetchSpecies} from '../api/api';
import {setPlanet} from './planets';
import {uniqueArray} from '../utils';
import {setSpecies} from './species';

const initialState: People = {
  count: 0,
  next: '1',
  previous: null,
  results: undefined,
};

/* ******************************************************************** */
/*                             NORMALIZERS                              */
/* ******************************************************************** */

const normalizePeopleResponse = (
  response: PeopleResponse,
  currentPage: string,
): People => {
  const {results, previous, next, count} = response;
  const nextPage = new URIJS(next).search(true)?.page;
  const previousPage = previous && new URIJS(previous).search(true)?.page;

  return {
    previous: previousPage,
    next: nextPage,
    count,
    results: {
      [currentPage]: results.map(
        ({
          hair_color,
          skin_color,
          eye_color,
          birth_year,
          ...result
        }): Person => {
          return {
            ...result,
            hairColor: hair_color,
            skinColor: skin_color,
            eyeColor: eye_color,
            birthYear: birth_year,
            planet: new URIJS(result.homeworld)
              .segment()
              .find(entry => !isNaN(+entry)),
            species: result.species.map(specieUrl =>
              new URIJS(specieUrl).segment().find(entry => !isNaN(+entry)),
            ),
          };
        },
      ),
    },
  };
};

/* ******************************************************************** */
/*                             ACTIONS                                  */
/* ******************************************************************** */

const GET_PEOPLE = 'GET_PEOPLE';

export const getPeopleAction = createAsyncThunk<
  People,
  {
    page: string;
  },
  {
    dispatch: AppDispatch;
    state: AppRootState;
  }
>(GET_PEOPLE, async (params, thunkAPI) => {
  const state = thunkAPI.getState();
  let people = state.people;

  if (+params.page > +state.people.next) {
    return state.people;
  }

  if (!people.results?.[params.page]) {
    const peopleResponse = await fetchPeople(params);
    people = normalizePeopleResponse(peopleResponse, params.page);
  }

  const planetsToFetch = uniqueArray(
    people.results?.[params.page]
      ?.filter(person => !state.planets[person.planet])
      ?.map(person => person.planet),
  );

  const speciesToFetch = uniqueArray(
    people.results?.[params.page]
      ?.filter(person => person.species.some(specie => !state.species[specie]))
      ?.flatMap(person => person.species),
  );

  if (planetsToFetch?.length) {
    const promises = planetsToFetch.map(planet => fetchPlanets({page: planet}));
    Promise.all(promises)
      .then(result => {
        result.forEach(entry => thunkAPI.dispatch(setPlanet(entry)));
      })
      .catch(console.warn);
  }

  if (speciesToFetch?.length) {
    const promises = speciesToFetch.map(specie => fetchSpecies({page: specie}));
    Promise.all(promises)
      .then(result => {
        result.forEach(entry => thunkAPI.dispatch(setSpecies(entry)));
      })
      .catch(console.warn);
  }

  return people;
});

/* ******************************************************************** */
/*                             REDUCERS                                 */
/* ******************************************************************** */

const reducer = createReducer(initialState, builder => {
  builder.addCase(getPeopleAction.fulfilled, (state, action) => ({
    ...state,
    ...action.payload,
    results: {
      ...state?.results,
      ...action.payload?.results,
    },
  }));
});

export default reducer;
