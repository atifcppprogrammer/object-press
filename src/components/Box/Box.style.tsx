import { styled } from 'baseui';

export const TitleWrapper = styled('div', () => ({
  padding: '30px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-betwween',
}));

export const BoxHeading = styled('h3', ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  lineHeight: '1.3',
  margin: 0,

  '@media only screen and (max-width: 767px)': {
    display: 'block',
  },
}));

const BoxWrapper = styled('div', () => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  borderRadius: '3px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
  overflow: 'hidden',
}));

export const BoxContentWrapper = styled('div', () => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
}));

export default BoxWrapper;
