import React from 'react';
import { FooterWrapper, Anchor } from './Footer.style';

type Props = any;

const Footer: React.FC<Props> = ({ data }, { refs }: any) => {
  return (
    <FooterWrapper ref={refs}>
      © {new Date().getFullYear()}{' '}
      <Anchor href="https://www.objectpress.io">Object Press LLC</Anchor>
    </FooterWrapper>
  );
};

export default Footer;
