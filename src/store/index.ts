import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares: any[] = [
  /* other middlewares */
  sagaMiddleware,
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const appReducers = combineReducers({
  counter: counterSlice,
});

export const store = configureStore({
  reducer: appReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(middlewares as any),
});

sagaMiddleware.run(rootSaga);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
