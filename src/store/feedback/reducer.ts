import { FeedbackActions, FeedbackActionsType, ToastData } from './actionsTypes';

export interface FeedbackState {
  toasts: ToastData[];
}

const initialState = {
  toasts: [] as ToastData[],
};

export const feedbackReducer = (
  state = initialState,
  action: FeedbackActionsType,
): FeedbackState => {
  switch (action.type) {
    case FeedbackActions.AddToast:
      return { ...state, toasts: [...state.toasts, action.payload] };
    case FeedbackActions.RemoveToast:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };
    default:
      return state;
  }
};
