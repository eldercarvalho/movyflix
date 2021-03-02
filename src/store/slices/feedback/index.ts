import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastData, ToastDataPayload } from './types';

export * from './types';

export interface FeedbackState {
  toasts: ToastData[];
}

const initialState = {
  toasts: [] as ToastData[],
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<ToastDataPayload>) {
      state.toasts.push({
        id: '',
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
