import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import generateRandomKey from '../../../utils/generateRandomKey';
import { ToastData, ToastDataPayload } from './types';

export * from './types';

export interface FeedbackState {
  toasts: ToastData[];
}

const initialState: FeedbackState = {
  toasts: [] as ToastData[],
};

const { actions, reducer } = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<ToastDataPayload>) {
      state.toasts.push({
        id: generateRandomKey(8),
        ...action.payload,
      });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = actions;

export default reducer;
