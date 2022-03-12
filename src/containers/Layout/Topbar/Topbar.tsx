import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Popover, { PLACEMENT } from 'components/Popover/Popover';
import { AuthContext } from 'context/auth';

import { ArrowLeftRound } from 'assets/icons/ArrowLeftRound';
import { MenuIcon } from 'assets/icons/MenuIcon';
import {
  TopbarWrapper,
  Logo,
  LogoImage,
  TopbarRightSide,
  ProfileImg,
  Image,
  UserDropdowItem,
  LogoutBtn,
  DrawerIcon,
  CloseButton,
  DrawerWrapper,
  Anchor,
  NavLink,
} from './Topbar.style';
import Logoimage from 'assets/image/logo.webp';
import LogoIcon from 'assets/image/logo-icon.png';
import Drawer, { ANCHOR } from 'components/Drawer/Drawer';
import Sidebar from '../Sidebar/Sidebar';
import NotificationList from 'components/Notification/NotificationList';

type Props = any;

const Topbar: React.FC<Props> = ({ data }, { refs }: any) => {
  const { signout } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  async function handleLogout() {
    await signout();
  }

  return (
    <TopbarWrapper ref={refs} style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 1)' }}>
      <Logo>
        <Link to="/dashboard">
          <LogoImage
            src={Logoimage}
            alt="object press"
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
      </Logo>

      <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: '1',
              },
            },
            DrawerBody: {
              style: {
                marginRight: '0',
                marginLeft: '0',
                '@media only screen and (max-width: 767px)': {
                  marginLeft: '30px',
                },
              },
            },
            DrawerContainer: {
              style: {
                width: '270px',
                '@media only screen and (max-width: 767px)': {
                  width: '80%',
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        <NotificationList />

        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <Anchor href="https://www.objectpress.io">Home</Anchor>
              <NavLink to="/settings">Settings</NavLink>
              <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: '220px',
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <ProfileImg>
            <Image src={LogoIcon} alt="user" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
