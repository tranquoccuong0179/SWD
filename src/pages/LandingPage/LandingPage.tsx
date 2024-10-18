import { Layout, Button, Typography } from 'antd';
import Header from '../../components/Header';
import FeaturedCourses from './FeaturedCourses';
import Testimonials from './Testimonials';
import Footer from '../../components/Footer/Footer.tsx';
import './LandingPage.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
    return (
        <Layout className="landing-page">
            <Header />
            <Content>
                <section className="hero full-width">
                    <div className="hero-content">
                        <Title level={1}>Nâng Tầm Trải Nghiệm Học Vật Lý Với Manim AI!</Title>
                        <Paragraph>
                            Học Vật Lý theo một cách mới với Manim AI Physics Visualizer. Nền tảng học trực tuyến và công cụ để tạo mô phỏng giúp bạn hiểu nhanh hơn.
                        </Paragraph>
                        <div className="hero-buttons">
                            <Button type="primary" size="large">Đăng nhập ngay</Button>
                            <Button size="large">Tạo tài khoản mới</Button>
                        </div>
                    </div>
                </section>

                <section className="features full-width">
                    <div className="feature">
                        <img src="/icon-develop.png" alt="Phát triển tư duy" />
                        <span>Phát triển tư duy</span>
                    </div>
                    <div className="feature">
                        <img src="/icon-system.png" alt="Hệ thống kiến thức" />
                        <span>Hệ thống kiến thức</span>
                    </div>
                    <div className="feature">
                        <img src="/icon-practice.png" alt="Đồ thị tập luyện" />
                        <span>Đồ thị tập luyện</span>
                    </div>
                </section>

                <FeaturedCourses />

                <section className="cta full-width">
                    <Title level={2}>Bắt đầu hành trình học Vật lý của bạn ngay hôm nay!</Title>
                    <Button type="primary" size="large">Đăng ký miễn phí</Button>
                </section>

                <Testimonials />

                <section className="stats full-width">
                    <div className="stat">
                        <Title level={1}>10k+</Title>
                        <Paragraph>Học viên</Paragraph>
                    </div>
                    <div className="stat">
                        <Title level={1}>500+</Title>
                        <Paragraph>Bài học</Paragraph>
                    </div>
                    <div className="stat">
                        <Title level={1}>98%</Title>
                        <Paragraph>Hài lòng</Paragraph>
                    </div>
                </section>
            </Content>
            <Footer />
        </Layout>
    );
};

export default LandingPage;