import type {RootState, AppDispatch} from '../../store';
import {useDispatch, useSelector} from 'react-redux';

export {default as useCounterHook} from './counterHook';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
