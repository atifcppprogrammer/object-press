import { styled } from 'baseui';
import { NavLink } from 'react-router-dom';

export const Card = styled('div', () => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '30px',
  borderRadius: '6px',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
}));

export const TopInfo = styled('div', () => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
}));

export const TitleWrapper = styled('div', () => ({
  width: 'calc(100% - 60px)',
  display: 'flex',
  flexDirection: 'column',
}));

export const Title = styled('span', ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: '1.2',
  color: $theme.colors.textDark,
  marginBottom: '10px',
}));

export const SubTitle = styled('span', ({ $theme }) => ({
  ...$theme.typography.fontBold13,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: '1.2',
  color: $theme.colors.textNormal,
  marginBottom: '0px',
}));

export const IconBox = styled('div', ({ $theme }) => ({
  width: '48px',
  height: '48px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Price = styled('span', ({ $theme }) => ({
  ...$theme.typography.fontBold21,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: '1.2',
  color: $theme.colors.textDark,
  marginBottom: '10px',
}));

export const Text = styled('span', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  fontFamily: $theme.typography.primaryFontFamily,
  lineHeight: '1.2',
  marginBottom: '50px',
}));

export const Note = styled('span', ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textNormal,
  lineHeight: '1.2',
}));

export const Link = styled(NavLink, ({ $theme }) => ({
  ...$theme.typography.fontBold13,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.purple400,
  lineHeight: '1.2',
  textDecoration: 'none',
}));
