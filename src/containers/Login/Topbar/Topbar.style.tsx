import { styled } from 'baseui';
import { NavLink as RRNavLink } from 'react-router-dom';

export const TopbarWrapper = styled('div', () => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  padding: '10px 60px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 1)',
  position: 'relative',
  zIndex: 10,

  '@media only screen and (max-width: 767px)': {
    padding: '10px',
  },

  '@media only screen and (max-width: 1440px)': {
    padding: '10px 45px',
  },
}));

export const Logo = styled('div', () => ({
  marginRight: 'auto',
  cursor: 'pointer',
}));

export const DrawerIcon = styled('div', ({ $theme }) => ({
  color: $theme.colors.textDark,
  cursor: 'pointer',
}));

export const LogoImage = styled('img', () => ({
  display: 'block',
  backfaceVisibility: 'hidden',
}));

export const TopbarRightSide = styled('div', () => ({
  display: 'flex',
  alignItems: 'center',
}));

export const ProfileImg = styled('a', () => ({
  width: '37px',
  height: '37px',
  display: 'flex',
  borderRadius: '50%',
  overflow: 'hidden',
  cursor: 'pointer',
  flexShrink: '0',
  marginLeft: '15px',
}));

export const Image = styled('img', () => ({
  width: '100%',
  height: '100%',
  maxWidth: '125px',
  border: '10px #000',
  ':hover': {
    opacity: '0.85',
  },
}));

export const UserDropdowItem = styled('div', () => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const NavLink = styled(RRNavLink, ({ $theme }) => ({
  fontSize: '16px',
  fontWeight: '700',
  color: $theme.colors.textNormal,
  lineHeight: '1.2em',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  padding: '16px 20px',
  borderBottom: `1px solid ${$theme.colors.backgroundF7}`,
  transition: '0.15s ease-in-out',
  cursor: 'pointer',

  ':hover': {
    color: $theme.colors.primary,
  },
}));

export const SettingsLink = styled('a', ({ $theme }) => ({
  fontSize: '16px',
  fontWeight: '700',
  color: $theme.colors.textNormal,
  lineHeight: '1.2em',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  padding: '16px 20px',
  borderBottom: `1px solid ${$theme.colors.backgroundF7}`,
  transition: '0.15s ease-in-out',
  cursor: 'pointer',

  ':hover': {
    color: $theme.colors.primary,
  },
}));

export const Anchor = styled('a', ({ $theme }) => ({
  fontSize: '16px',
  fontWeight: '700',
  color: $theme.colors.textNormal,
  lineHeight: '1.2em',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  padding: '16px 20px',
  borderBottom: `1px solid ${$theme.colors.backgroundF7}`,
  transition: '0.15s ease-in-out',
  cursor: 'pointer',

  ':hover': {
    color: $theme.colors.primary,
  },
}));
