import { styled } from 'baseui';

export const Wrapper = styled('div', ({ $theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const FormWrapper = styled('div', () => ({
  width: '470px',
  borderRadius: '3px',
  backgroundColor: 'transparent',
  padding: '50px',
  display: 'flex',
  flexDirection: 'column',
}));

export const LogoWrapper = styled('div', () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
}));

export const LogoImage = styled('img', () => ({
  display: 'block',
  backfaceVisibility: 'hidden',
  maxWidth: '150px',
}));
