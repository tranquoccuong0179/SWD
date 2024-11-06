import { Button, Input, Menu, Dropdown } from 'antd';
import { SearchOutlined, UserOutlined, LogoutOutlined, WalletOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../store/user/action.ts';
import "./Header.css";

interface RootState {
  USER: {
    uid: string | null;
  };
}

const Header = () => {
  const id = useSelector((state: RootState) => state.USER.uid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('fullName');
    localStorage.removeItem('id');
    window.location.href = '/home';
  };


  const handleDashboardClick = () => {
    navigate('/admin')
  }
  const handleWalletClick = () => {
    navigate('/wallet')
  }
  const handleProfileClick = () => {
    navigate('/profile');
  };


  const userMenuItems = [
    {
      key: 'Dashboard',
      icon: <AreaChartOutlined />,
      label: 'Dashboard',
      onClick: handleDashboardClick,
      style: localStorage?.getItem('role') === 'AdminSystem' ? {} : { display: 'none' }
    },
    {
      type: 'divider',
      style: localStorage?.getItem('role') === 'AdminSystem' ? {} : { display: 'none' }
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      onClick: handleProfileClick,
      style: { color: 'blue' }
    },
    {
      type: 'divider',
    },
    {
      key: 'wallet',
      icon: <WalletOutlined />,
      label: 'Ví của tôi',
      onClick: handleWalletClick,
      style: localStorage?.getItem('role') === 'User' ? {color: 'green'} : { display: 'none' }
    },
    {
      type: 'divider',
      style: localStorage?.getItem('role') === 'User' ? {color: 'green'} : { display: 'none' }
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="https://i.postimg.cc/xT0JJZbJ/physics-logo.jpg"
          alt="Logo"
          className="logo"
        />
      </div>

      <Input
        placeholder="Bạn muốn học gì?"
        prefix={<SearchOutlined />}
        className="search-input"
      />

      <Menu mode="horizontal" className="nav-menu">
        <Menu.Item key="home">
          <Link to="/Home">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="courses">
          <Link to="/AboutUs">Về chúng tôi</Link>
        </Menu.Item>
        <Menu.Item key="blog">
          <Link to="/Subject">Môn học</Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/Contact">Liên hệ</Link>
        </Menu.Item>
      </Menu>

      {/* {id ? ( */}
      {localStorage?.getItem('id') ? (
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
          trigger={['click']}
        >
          <Button
            type="text"
            icon={<UserOutlined />}
            className="user-icon-button"
          />
        </Dropdown>
      ) : (
        <Link to="/login">
          <Button type="primary">Đăng Nhập</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;