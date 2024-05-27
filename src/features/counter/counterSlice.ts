import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  loadingCounter: boolean;
}

const initialState: CounterState = {
  value: 0,
  loadingCounter: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    incrementAsync: () => {},
  },
});

export const {increment, decrement, incrementByAmount, incrementAsync} =
  counterSlice.actions;

export default counterSlice.reducer;
