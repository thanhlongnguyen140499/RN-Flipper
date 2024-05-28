import {
  call,
  debounce,
  put,
  takeEvery,
  // takeEvery,
  // takeLatest,
  // takeLeading,
  // throttle,
} from 'redux-saga/effects';
import {
  increment,
  incrementAsync,
  incrementByAmount,
  incrementByAmoutAsync,
} from '../features/counter/counterSlice';
import {PayloadAction} from '@reduxjs/toolkit';

// Mock async func: E.g: return 5
const fetchIncrementAmount = () =>
  new Promise<number>(resolve => {
    setTimeout(() => resolve(5), 2000);
  });

const fetchIncrementByAmout = (value: number) =>
  new Promise<number>(resolve => {
    setTimeout(() => resolve(value), 2000);
  });

function* handleIncrementAsync() {
  const amount: number = yield call(fetchIncrementAmount);
  yield put(incrementByAmount(amount));
}

function* handleIncrementByAmountAsync(action: PayloadAction) {
  try {
    const number: number = Number(action.payload);
    yield call(fetchIncrementByAmout, number);
    yield put(increment());
  } catch (error) {
    // console.log('error: ', error);
  }
}

function* watchIncrementAsync() {
  // yield takeEvery(incrementAsync.type, handleIncrementAsync);
  // yield takeLatest(incrementAsync.type, handleIncrementAsync);
  // yield takeLeading(incrementAsync.type, handleIncrementAsync);
  // yield throttle(1000, incrementAsync.type, handleIncrementAsync);
  yield debounce(1000, incrementAsync.type, handleIncrementAsync);
  yield takeEvery(incrementByAmoutAsync.type, handleIncrementByAmountAsync);
}

export default watchIncrementAsync;
