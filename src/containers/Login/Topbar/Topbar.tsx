import React from 'react';
import {
  TopbarWrapper,
  Logo,
  LogoImage,
  TopbarRightSide,
  Anchor,
} from './Topbar.style';
import Logoimage from 'assets/image/logo.webp';

type Props = any;

const Topbar: React.FC<Props> = ({ data }, { refs }: any) => {
  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <a href="https://www.objectpress.io">
          <LogoImage
            src={Logoimage}
            alt="object press"
            style={{ height: '40px', width: 'auto' }}
          />
        </a>
      </Logo>

      <TopbarRightSide>
        <Anchor
          className="px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
          href="https://github.com/ObjectPress"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className=" fab fa-github fa-2x leading-lg" />
        </Anchor>
        <Anchor href="https://www.objectpress.io">Home</Anchor>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
