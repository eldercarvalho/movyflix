export enum FeedbackActions {
  AddToast = 'ADD_TOAST',
  RemoveToast = 'REMOVE_TOAST',
}

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export interface AddToastAction {
  type: FeedbackActions.AddToast;
  payload: ToastData;
}

export interface RemoveToastAction {
  type: FeedbackActions.RemoveToast;
  payload: string;
}

export type FeedbackActionsType = AddToastAction | RemoveToastAction;
