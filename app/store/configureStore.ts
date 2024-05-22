import {combineReducers, configureStore} from '@reduxjs/toolkit';
import people from './people';
import planets from './planets';
import species from './species';
import request from './request';
import favorites from './favorites';

const rootReducer = combineReducers({
  people,
  planets,
  species,
  request,
  favorites,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
