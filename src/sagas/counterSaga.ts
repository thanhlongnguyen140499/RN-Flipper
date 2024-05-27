import {
  call,
  debounce,
  put,
  // takeEvery,
  // takeLatest,
  // takeLeading,
  // throttle,
} from 'redux-saga/effects';
import {
  incrementAsync,
  incrementByAmount,
} from '../features/counter/counterSlice';

// Mock async func: E.g: return 5
const fetchIncrementAmount = () =>
  new Promise<number>(resolve => {
    setTimeout(() => resolve(5), 2000);
  });

function* handleIncrementAsync() {
  const amount: number = yield call(fetchIncrementAmount);
  yield put(incrementByAmount(amount));
}

function* watchIncrementAsync() {
  // yield takeEvery(incrementAsync.type, handleIncrementAsync);
  // yield takeLatest(incrementAsync.type, handleIncrementAsync);
  // yield takeLeading(incrementAsync.type, handleIncrementAsync);
  // yield throttle(1000, incrementAsync.type, handleIncrementAsync);
  yield debounce(1000, incrementAsync.type, handleIncrementAsync);
}

export default watchIncrementAsync;
