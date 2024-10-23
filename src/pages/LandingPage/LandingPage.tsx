import { Layout, Button, Typography } from 'antd';
import Header from '../../components/Header';
import FeaturedCourses from './FeaturedCourses';
import Testimonials from './Testimonials';
import Footer from '../../components/Footer/Footer.tsx';
import { Link } from 'react-router-dom';
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
                            <Link to="/login">
                            <Button type="primary" size="large">Đăng nhập ngay</Button>
                            </Link>
                            <Link to="/register">
                            <Button size="large">Tạo tài khoản mới</Button>
                            </Link>
                            
                        </div>
                    </div>
                </section>

                <section className="features full-width">
                    <div className="feature">
                        <img className="feature-img"src="https://hiec.edu.vn/files/media/202108/x50icon_nckh-1545624254.png" alt="Phát triển tư duy" />
                        <span className='fw-bold'>Phát triển tư duy</span>
                    </div>
                    <div className="feature">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWv19Kig2wMEL2R2hUirC01-4JRc6vaeAOLw&s" alt="Hệ thống kiến thức" />
                        <span className='fw-bold'>Hệ thống kiến thức</span>
                    </div>
                    <div className="feature">
                        <img src="https://png.pngtree.com/png-clipart/20231206/original/pngtree-graph-red-flat-icon-isolated-economy-photo-png-image_13786567.png" alt="Đồ thị tập luyện" />
                        <span className='fw-bold'>Đồ thị sáng tạo</span>
                    </div>
                </section>

                <FeaturedCourses />

                <section className="cta full-width">
                    <Title level={2}>Bắt đầu hành trình học Vật lý của bạn ngay hôm nay!</Title>
                    <Link to="/register">
                    <Button type="primary" size="large">Đăng ký miễn phí</Button>
                    </Link>
                    
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