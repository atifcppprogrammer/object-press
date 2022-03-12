import { styled } from 'baseui';

export const ToastWrapper = styled('div', () => ({
  position: 'absolute',
  bottom: 0,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100vw',
  display: 'flex',
  justifyContent: 'center',
}));
