import { styled } from 'baseui';

export const ButtonGroup = styled('div', ({ $theme }) => ({
  width: '100%',
  height: '100%',
  '@media only screen and (max-width: 767px)': {
    padding: '20px 30px',
  },
}));
