import React from 'react';
import { Block } from 'baseui/block';

const DrawerBox = ({ overrides, children }: any) => {
  return (
    <Block
      overrides={{
        Block: {
          style: {
            width: '100%',
            height: 'auto',
            padding: '30px',
            margin: '30px 0',
            borderRadius: '3px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
          },
        },
        ...overrides,
      }}
    >
      {children}
    </Block>
  );
};

export default DrawerBox;
