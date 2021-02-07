import generateRandomKey from '../../utils/generateRandomKey';
import { FeedbackActions, ToastData } from './actionsTypes';

export const addToast = (data: Omit<ToastData, 'id'>) => {
  const payload = {
    id: generateRandomKey(8),
    ...data,
  };

  return {
    type: FeedbackActions.AddToast,
    payload,
  };
};

export const removeToast = (id: string) => {
  return {
    type: FeedbackActions.RemoveToast,
    payload: id,
  };
};
