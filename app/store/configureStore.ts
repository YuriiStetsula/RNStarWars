import {combineReducers, configureStore} from '@reduxjs/toolkit';
import people from './people';

const rootReducer = combineReducers({
  people,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
