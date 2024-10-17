import { Button, Input, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
                <Menu.Item key="home">Trang chủ</Menu.Item>
                <Menu.Item key="courses">Về chúng tôi</Menu.Item>
                <Menu.Item key="blog">Bài học</Menu.Item>
                <Menu.Item key="contact">Liên hệ</Menu.Item>
                <Menu.Item key="pricing">Thanh toán</Menu.Item>
            </Menu>
            <Button type="primary">Tạo tài khoản miễn phí</Button>
        </header>
    );
};

export default Header;