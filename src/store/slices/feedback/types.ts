export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export type ToastDataPayload = Omit<ToastData, 'id'>;
