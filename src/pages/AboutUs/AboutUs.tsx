import React from 'react';
import { Layout, Typography, Card, Row, Col, Timeline } from 'antd';
import {
    RocketOutlined,
    TeamOutlined,
    BulbOutlined,
    TrophyOutlined,
    CheckCircleOutlined,
    BookOutlined,
    ExperimentOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BackToTopButton from '../../components/BackToTop';
import Logo from '../../assets/logo.jpg'

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUs = () => {
    const stats = [
        { number: "10,000+", label: "Học viên", icon: <TeamOutlined /> },
        { number: "500+", label: "Bài học", icon: <BookOutlined /> },
        { number: "50+", label: "Giảng viên", icon: <ExperimentOutlined /> },
        { number: "98%", label: "Học viên hài lòng", icon: <CheckCircleOutlined /> }
    ];
    const images = [
        "https://real.itu.dk/people/sebastian-risi/avatar_hufaf1540bad1d633a363e87a51e088ee9_635670_270x270_fill_q75_lanczos_center.jpg",
        "https://media.licdn.com/dms/image/v2/D5622AQE7RTscPXAGLQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1680192436729?e=2147483647&v=beta&t=JI4UeNEyjUbmlwEnXjo3uUBt9leDLdrNIKTddR0bMJE",
        "https://pbs.twimg.com/profile_images/1789489585073876993/EXzN4ggz_400x400.jpg"
    ];

    return (
        <Layout className="min-h-screen bg-white">
            <Header />
            <Content>
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                                Về Manim AI Physics Visualizer
                            </h1>
                            <p className="mt-6 max-w-3xl mx-auto text-xl leading-relaxed text-blue-50">
                                Chúng tôi đang định hình lại cách học Vật lý thông qua công nghệ AI và
                                trực quan hóa, giúp mọi người tiếp cận kiến thức một cách dễ dàng và hiệu quả hơn.
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                className="text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow"
                            >
                                <div className="text-blue-500 text-3xl mb-4">
                                    {stat.icon}
                                </div>
                                <Title level={2} className="m-0 text-4xl font-bold">
                                    {stat.number}
                                </Title>
                                <Paragraph className="text-gray-600 text-lg mb-0">
                                    {stat.label}
                                </Paragraph>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Mission Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <Row gutter={[48, 48]} align="middle">
                        <Col xs={24} md={12}>
                            <div className="space-y-6">
                                <Title level={2} className="text-3xl font-bold">
                                    Sứ mệnh của chúng tôi
                                </Title>
                                <Paragraph className="text-lg text-gray-600 leading-relaxed">
                                    Manim AI Physics Visualizer được thành lập với một sứ mệnh rõ ràng:
                                    Biến việc học Vật lý trở nên trực quan và dễ tiếp cận hơn cho mọi người.
                                    Chúng tôi tin rằng công nghệ AI và animation có thể phá vỡ rào cản
                                    trong việc học tập các khái niệm Vật lý phức tạp.
                                </Paragraph>
                                <Timeline className="pt-6">
                                    <Timeline.Item dot={<RocketOutlined className="text-xl" />}>
                                        <Title level={4}>Khởi động dự án</Title>
                                        <Paragraph>Bắt đầu với ý tưởng đổi mới cách học Vật lý</Paragraph>
                                    </Timeline.Item>
                                    <Timeline.Item dot={<GlobalOutlined className="text-xl" />}>
                                        <Title level={4}>Mở rộng cộng đồng</Title>
                                        <Paragraph>Xây dựng nền tảng học tập trực tuyến</Paragraph>
                                    </Timeline.Item>
                                    <Timeline.Item dot={<TrophyOutlined className="text-xl" />}>
                                        <Title level={4}>Phát triển liên tục</Title>
                                        <Paragraph>Không ngừng cải tiến và nâng cao chất lượng</Paragraph>
                                    </Timeline.Item>
                                </Timeline>
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <Card className="overflow-hidden rounded-2xl shadow-xl border-0">
                                <img
                                    // src="https://files.oaiusercontent.com/file-6eq98JAy3vO0QpUSPaXukS4b?se=2024-11-06T08%3A46%3A37Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D170f6717-f0a4-4e71-890f-175a6a2da4ae.webp&sig=g0u3M%2BPO0bdyNF9CIzvPIDsLzKqftjDeiXnTWU3WQng%3D"
                                    src={Logo}
                                    alt="Our Mission"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Values Section */}
                <div className="bg-gray-50 py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <Title level={2} className="text-3xl font-bold">
                                Giá trị cốt lõi
                            </Title>
                            <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Những giá trị định hình nên cách chúng tôi phát triển và cung cấp
                                dịch vụ giáo dục chất lượng cao.
                            </Paragraph>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <BulbOutlined className="text-4xl text-yellow-500" />,
                                    title: "Sáng tạo & Đổi mới",
                                    description: "Luôn tìm tòi và áp dụng những phương pháp mới trong giảng dạy"
                                },
                                {
                                    icon: <TeamOutlined className="text-4xl text-blue-500" />,
                                    title: "Hợp tác & Phát triển",
                                    description: "Xây dựng môi trường học tập tương tác và hỗ trợ lẫn nhau"
                                },
                                {
                                    icon: <CheckCircleOutlined className="text-4xl text-green-500" />,
                                    title: "Chất lượng & Hiệu quả",
                                    description: "Cam kết mang đến trải nghiệm học tập chất lượng cao"
                                }
                            ].map((value, index) => (
                                <Card
                                    key={index}
                                    className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg"
                                >
                                    <div className="space-y-4">
                                        <div className="inline-block p-4 rounded-full bg-gray-50">
                                            {value.icon}
                                        </div>
                                        <Title level={3} className="text-xl font-bold">
                                            {value.title}
                                        </Title>
                                        <Paragraph className="text-gray-600">
                                            {value.description}
                                        </Paragraph>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center mb-16">
                        <Title level={2} className="text-3xl font-bold">
                            Đội ngũ chuyên gia
                        </Title>
                        <Paragraph className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Những người đứng sau sự thành công của Manim AI Physics Visualizer
                        </Paragraph>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((member) => (
                            <Card
                                key={member}
                                className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow overflow-hidden"
                            >
                                <img
                                    src={`/api/placeholder/300/300`}
                                    alt={`Team Member ${member}`}
                                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                                />
                                <Title level={4} className="mb-2">Chuyên gia {member}</Title>
                                <Paragraph className="text-gray-600 mb-4">Tiến sĩ Vật lý</Paragraph>
                                <Paragraph className="text-gray-500">
                                    Với hơn 10 năm kinh nghiệm trong lĩnh vực giảng dạy và nghiên cứu Vật lý
                                </Paragraph>
                            </Card>
                        ))}
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((member) => (
                            <Card
                                key={member}
                                className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow overflow-hidden"
                            >
                                <img
                                    src={images[member - 1]}
                                    alt={`Team Member ${member}`}
                                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                                />
                                <Title level={4} className="mb-2">Chuyên gia {member}</Title>
                                <Paragraph className="text-gray-600 mb-4">Tiến sĩ Vật lý</Paragraph>
                                <Paragraph className="text-gray-500">
                                    Với hơn 10 năm kinh nghiệm trong lĩnh vực giảng dạy và nghiên cứu Vật lý
                                </Paragraph>
                            </Card>
                        ))}
                    </div>
                </div>
            </Content>
            <BackToTopButton />
            <Footer />
        </Layout>
    );
};

export default AboutUs;