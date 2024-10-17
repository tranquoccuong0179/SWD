import { Button, Input, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="/logo.png" alt="Logo" className="logo" />
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
                    <Link to="/NewCourse">Bài học</Link>
                </Menu.Item>
                <Menu.Item key="contact">
                    <Link to="/Contact">Liên hệ</Link>
                </Menu.Item>
                <Menu.Item key="pricing">
                    <Link to="/Pricing">Thanh toán</Link>
                </Menu.Item>
            </Menu>
            <Button type="primary">Tạo tài khoản miễn phí</Button>
        </header>
    );
};

export default Header;
