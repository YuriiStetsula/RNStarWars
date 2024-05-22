import {createAction, createReducer} from '@reduxjs/toolkit';
import {FavoriteType, Favorites} from './types';

const initialState: Favorites = {
  [FavoriteType.male]: 0,
  [FavoriteType.female]: 0,
  [FavoriteType.other]: 0,
  ids: [],
};

const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const toggleFavorite = createAction<{
  type: keyof Favorites;
  id: string;
}>(TOGGLE_FAVORITE);

const FLUSH_FAVORITES = 'FLUSH_FAVORITES';
export const clearFavorites = createAction(FLUSH_FAVORITES);

const reducer = createReducer(initialState, builder => {
  builder.addCase(toggleFavorite, (state, action) => {
    const {ids} = state;
    const {type, id} = action.payload;
    const cuurentValue = state[type];
    if (ids.includes(id)) {
      return {
        ...state,
        [action.payload.type]: +cuurentValue - 1,
        ids: ids.filter(listedId => listedId !== id),
      };
    }
    return {
      ...state,
      [action.payload.type]: +cuurentValue + 1,
      ids: [...state.ids, id],
    };
  });
  builder.addCase(clearFavorites, () => initialState);
});

export default reducer;
