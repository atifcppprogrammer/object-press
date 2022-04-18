import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
  SidebarWrapper,
  NavLink,
  MenuWrapper,
  Svg,
  LogoutBtn,
} from './Sidebar.style';
import { AuthContext } from 'context/auth';

const sidebarMenus = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    exact: true,
    icon: <i className="fas fa-tv" />,
  },
  {
    name: 'Blogs',
    path: '/blogs',
    exact: false,
    icon: <i className="fas fa-book" />,
  },
  {
    name: 'Posts',
    path: '/posts',
    exact: false,
    icon: <i className="fas fa-file-export" />,
  },
  {
    name: 'Galleries',
    path: '/galleries',
    exact: true,
    icon: <i className="fas fa-images" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    exact: true,
    icon: <i className="fas fa-cogs" />,
  },
];

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const { signout } = useContext(AuthContext);
  async function handleLogout() {
    await signout();
  }

  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper>
        {sidebarMenus.map((menu: any, index: number) => (
          <NavLink
            to={menu.path}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: 'rgba(59, 130, 246, 1)',
              backgroundColor: '#f7f7f7',
              borderRadius: '50px 0 0 50px',
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? (
              <Svg style={{ marginRight: 10 }}>{menu.icon}</Svg>
            ) : (
              ''
            )}
            {menu.name}
          </NavLink>
        ))}

        <LogoutBtn onClick={handleLogout}>
          <Svg>
            <i className="fas fa-sign-out-alt" />
          </Svg>
          Logout
        </LogoutBtn>
      </MenuWrapper>
    </SidebarWrapper>
  );
});
