import { styled } from 'baseui';

export const FooterWrapper = styled('div', ({ $theme }) => ({
  color: $theme.colors.textNormal,
  fontSize: '16px',
  fontWeight: '700',
  width: '100%',
  text: 'center',
  backgroundColor: $theme.colors.white,
  padding: '20px 60px',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06)',
  position: 'relative',

  '@media only screen and (max-width: 767px)': {
    padding: '20px',
  },

  '@media only screen and (max-width: 1440px)': {
    padding: '20px 45px',
  },
}));

export const Anchor = styled('a', ({ $theme }) => ({
  color: $theme.colors.primary,
  lineHeight: '1.2em',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: '20',
  borderBottom: `1px solid ${$theme.colors.backgroundF7}`,
  transition: '0.15s ease-in-out',
  cursor: 'pointer',

  ':hover': {
    color: 'rgba(59, 130, 246, 1)',
  },
}));
