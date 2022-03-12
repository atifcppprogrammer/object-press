import { styled, withStyle } from 'baseui';
import {
  StyledTable as BaseStyledTable,
  StyledHeadCell as BaseStyledHeadCell,
  StyledBodyCell as BaseStyledCell,
} from 'baseui/table-grid';
import { createThemedUseStyletron } from 'baseui';
import { Row as Rows, Col as Column } from 'components/FlexBox/FlexBox';

const getClearStyle = ({ $theme }) => {
  return $theme.typography.fontBold14;
};

export const Category = styled('div', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
  display: 'flex',
  alignItems: 'center',
  lineHeight: '1',
  textTransform: 'capitalize',
  width: '100%',

  ':before': {
    content: '""',
    width: '10px',
    height: '10px',
    display: 'inline-block',
    borderRadius: '10px',
    backgroundColor: $theme.borders.borderE6,
    marginRight: '10px',
  },
}));

export const ImageWrapper = styled('div', ({ $theme }) => ({
  width: '40px',
  height: '40px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  backgroundColor: $theme.colors.backgroundF7,
}));

export const Icon = styled('span', () => ({
  width: '100%',
  height: 'auto',
}));

export const TableWrapper = styled('div', () => ({
  width: '100%',
  height: '450px',
}));

export const StyledTable = withStyle(BaseStyledTable, () => ({
  borderTopLeftRadius: '0 !important',
  borderTopRightRadius: '0 !important',
  borderBottomLeftRadius: '0 !important',
  borderBottomRightRadius: '0 !important',
  alignContent: 'start',
}));

export const StyledHeadCell = withStyle(BaseStyledHeadCell, () => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 700,
  color: '#161F6A !important',
  alignItems: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  borderTopColor: 'rgba(0, 0, 0, 0.12)',
  borderRightColor: 'rgba(0, 0, 0, 0.12)',
  borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  borderLeftColor: 'rgba(0, 0, 0, 0.12)',
  alignSelf: 'start',
}));

export const StyledCell = withStyle(BaseStyledCell, () => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 400,
  color: '#161F6A !important',
  alignSelf: 'center',
}));

export const StyledHeadCellCenter = withStyle(BaseStyledHeadCell, () => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 700,
  color: '#161F6A !important',
  alignItems: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  borderColor: 'rgba(0, 0, 0, 0.12)',
  alignSelf: 'start',
  justifyContent: 'center',
}));

export const StyledCellCenter = withStyle(BaseStyledCell, () => ({
  fontFamily: "'Lato', sans-serif",
  fontWeight: 400,
  color: '#161F6A !important',
  alignSelf: 'center',
  justifyContent: 'center',
}));

export const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 767px)': {
    marginBottom: '20px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

export const Row = withStyle(Rows, () => ({
  '@media only screen and (min-width: 768px)': {
    alignItems: 'center',
  },
}));

export const Remove = styled('button', ({ $theme }) => ({
  outline: '0',
  border: 'none',
  padding: '0',
  margin: '0 5',
  backgroundColor: 'transparent',
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textNormal,
  cursor: 'pointer',
  ...getClearStyle({ $theme }),
}));

type CustomThemeT = { red400: string; textNormal: string; colors: any };

export const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();
