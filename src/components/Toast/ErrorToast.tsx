import React from 'react';
import { Toast, ToasterContainer, KIND } from 'baseui/toast';
import { useProgressDispatch } from 'context/ProgressContext';
import { ToastWrapper } from './Toast.style';

type Props = any;

const ErrorToast: React.FC<Props> = (props) => {
  const dispatch = useProgressDispatch();
  setTimeout(() => {
    dispatch({ type: 'CANCEL_MODAL' });
  }, 3000);

  return (
    <ToastWrapper>
      <ToasterContainer />
      <Toast kind={KIND.negative}>Error!</Toast>
    </ToastWrapper>
  );
};

export default ErrorToast;
