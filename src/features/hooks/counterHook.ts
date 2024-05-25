import {decrement, increment, incrementByAmount} from '../counter/counterSlice';
import {useAppDispatch} from '.';

export default function () {
  const dispatch = useAppDispatch();

  const handleCounterIncrement = () => {
    dispatch(increment());
  };

  const handleCounterDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = (newValue: number) => {
    dispatch(incrementByAmount(newValue));
  };

  return {
    handleCounterIncrement,
    handleCounterDecrement,
    handleIncrementByAmount,
  };
}
