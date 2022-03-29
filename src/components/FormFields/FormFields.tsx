import React from 'react';
import { Block } from 'baseui/block';
import { styled } from 'baseui';

const Title = styled('h3', ({ $theme }) => ({
  ...$theme.typography.font18,
  marginTop: '0',
  marginBottom: '0',
  color: $theme.colors.textDark,
  textAlign: 'center',
}));

const Label = styled('label', ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  marginBottom: '10px',
  color: $theme.colors.textDark,
}));

const ErrorMsg = styled('span', ({ $theme }) => ({
  fontSize: '12px',
  color: $theme.colors.red400,
  marginTop: '5px',
  marginRight: 'auto',
}));

const Msg = styled('span', ({ $theme }) => ({
  color: 'rgb(84,84,84)',
  fontSize: '12px',
  marginTop: '5px',
  marginRight: 'auto',
}));

export const FormFields = ({ children }) => {
  return (
    <Block
      overrides={{
        Block: {
          style: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            margin: '20px 0',

            ':first-child': {
              marginTop: 0,
            },

            ':last-child': {
              marginBottom: 0,
            },

            ':only-child': {
              margin: 0,
            },
          },
        },
      }}
    >
      {children}
    </Block>
  );
};

export const FormLabel = ({ children }) => {
  return <Label>{children}</Label>;
};

export const FormTitle = ({ children }) => {
  return <Title>{children}</Title>;
};

export const Error = ({ children }) => {
  return <ErrorMsg>{children}</ErrorMsg>;
};

export const Message = ({ children }) => {
  return <Msg>{children}</Msg>;
};
