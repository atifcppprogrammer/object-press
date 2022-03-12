import { styled } from 'baseui';
import Images from '../Image/Image';

export const ProductCardWrapper = styled('div', ({ $theme }) => ({
  height: '100%',
  width: '100%',
  backgroundColor: '#ffffff',
  position: 'relative',
  fontFamily: $theme.typography.primaryFontFamily,
  cursor: 'pointer',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
}));

export const ProductImageWrapper = styled('div', ({ $theme }) => ({
  height: '240px',
  padding: '5px',
  position: 'relative',
  borderBottom: `1px solid ${$theme.borders.borderE6}`,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media only screen and (max-width: 767px)': {
    height: '165px',
  },
}));

export const Image = styled(Images, () => ({
  maxWidth: '100%',
  maxHeight: '100%',
  display: 'inline-block',
}));

export const ProductInfo = styled('div', ({ $theme }) => ({
  padding: '20px 25px 30px',

  '@media only screen and (max-width: 767px)': {
    padding: '15px 20px',
    // minHeight: '123px',
  },
}));

export const ProductTitle = styled('h3', ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  color: $theme.colors.textDark,
  margin: '0 0 7px 0',
  minHeight: '48px',

  '@media only screen and (max-width: 767px)': {
    ...$theme.typography.fontBold14,
    margin: '0 0 5px 0',
  },
}));

export const ProductWeight = styled('span', ({ $theme }) => ({
  ...$theme.typography.font14,
  color: $theme.colors.textNormal,

  '@media only screen and (max-width: 767px)': {
    ...$theme.typography.font12,
  },
}));

export const ProductMeta = styled('div', ({ $theme }) => ({
  marginTop: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media only screen and (max-width: 767px)': {
    // minHeight: '32px',
  },
}));

export const OrderID = styled('span', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,

  '@media only screen and (max-width: 767px)': {
    ...$theme.typography.fontBold12,
  },
}));

export const ProductPriceWrapper = styled('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}));

export const ProductPrice = styled('span', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.primary,

  '@media only screen and (max-width: 767px)': {
    ...$theme.typography.fontBold12,
  },
}));

export const DiscountedPrice = styled('span', ({ $theme }) => ({
  ...$theme.typography.font11,
  color: $theme.colors.textNormal,
  padding: '0 5px',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 10px',

  ':before': {
    content: '""',
    width: '100%',
    height: '1px',
    display: 'inline-block',
    backgroundColor: $theme.colors.textNormal,
    position: 'absolute',
    top: '50%',
    left: '0',
  },
}));
