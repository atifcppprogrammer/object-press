import { styled } from 'baseui';
import { NavLink as NavLinks } from 'react-router-dom';

export const SidebarWrapper = styled('div', ({ $theme }) => ({
  width: '270px',
  height: '100vh',
  display: 'flex',
  flexShrink: '0',
  backgroundColor: $theme.colors.white,
  flexDirection: 'column',

  '@media only screen and (max-width: 767px)': {
    // width: 'calc(100% - 65px)',
    width: 'auto',
    padding: '0',
    height: '100%',
  },
}));

export const MenuWrapper = styled('div', ({ $theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '45px 0',
  overflowY: 'auto',

  '@media only screen and (max-width: 767px)': {
    padding: '20px 0',
    // alignItems: 'flex-start',
  },

  '&.active': {
    color: 'rgba(59, 130, 246, 1)',
    backgroundColor: $theme.colors.backgroundF7,
    borderRadius: '50px 0 0 50px',
  },
}));

export const NavLink = styled(NavLinks, ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  width: 'calc(100% - 30px)',
  outline: '0',
  color: $theme.colors.textDark,
  display: 'flex',
  alignItems: 'center',
  padding: '20px 55px 20px 30px',
  textDecoration: 'none',
  transition: '0.15s ease-in-out',

  '@media only screen and (max-width: 767px)': {
    width: '100%',
    padding: '20px 35px',
  },
}));

export const SettingsLink = styled('a', ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  width: 'calc(100% - 30px)',
  outline: '0',
  color: $theme.colors.textDark,
  display: 'flex',
  alignItems: 'center',
  padding: '20px 55px 20px 30px',
  textDecoration: 'none',
  transition: '0.15s ease-in-out',
  cursor: 'pointer',

  '@media only screen and (max-width: 767px)': {
    width: '100%',
    padding: '20px 35px',
  },

  '&.active': {
    color: $theme.colors.primary,
    backgroundColor: $theme.colors.backgroundF7,
    borderRadius: '50px 0 0 50px',
  },
}));

export const Svg = styled('span', ({ $theme }) => ({
  width: '16px',
  marginRight: '15px',
  display: 'flex',
  alignItems: 'center',
}));
export const LogoutBtn = styled('button', ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  width: 'calc(100% - 30px)',
  height: 'auto',
  outline: '0',
  color: $theme.colors.textDark,
  border: '0',
  display: 'flex',
  alignItems: 'center',
  padding: '20px 55px 20px 30px',
  textDecoration: 'none',
  transition: '0.15s ease-in-out',
  marginLeft: 'auto',
  marginTop: '55px',
  marginBottom: '25px',
  cursor: 'pointer',
  backgroundColor: $theme.colors.white,

  '@media only screen and (max-width: 767px)': {
    width: '100%',
    padding: '20px 35px',
  },
}));
