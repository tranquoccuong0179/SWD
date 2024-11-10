import { Avatar, Card } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const testimonials = [
    {
        id: 1,
        name: 'Phan Tấn Abe',
        role: 'Giáo viên',
        comment: 'Tôi đã có một trải nghiệm Manim AI Physics Visualizer đầy thú vị. Việc tích hợp các bài tập tính toán và đồ thị trực quan giúp học sinh dễ dàng hiểu sâu các khái niệm vật lý.',
        avatar: 'https://cdn-web.onlive.vn/onlive/image-news/thay%20giao%20ba.jpg',
    },
    {
        id: 2,
        name: 'Trần Ngọc Minh Anh',
        role: 'Học sinh',
        comment: 'Manim AI Physics Visualizer giúp việc học vật lý trở nên thú vị hơn. Các đồ thị động và mô phỏng trực quan giúp em hiểu rõ các khái niệm phức tạp.',
        avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-2.jpg',
    },
    {
        id: 3,
        name: 'Vũ Hồng Nhung',
        role: 'Phụ huynh',
        comment: 'Con trai tôi rất thích học trên Manim AI Physics Visualizer. Các bài giảng trực quan và tương tác giúp cháu duy trì hứng thú với môn vật lý.',
        avatar: 'https://www.cet.edu.vn/wp-content/uploads/2019/08/nhieu-phu-huynh-ung-ho-con-hoc-trung-cap.jpg',
    },
    {
        id: 4,
        name: 'Phạm Thùy Linh',
        role: 'Sinh viên',
        comment: 'Manim AI Physics Visualizer giúp mình ôn tập vật lý hiệu quả. Các mô phỏng động giúp mình hiểu sâu hơn về các hiện tượng vật lý phức tạp.',
        avatar: 'https://images2.thanhnien.vn/528068263637045248/2023/3/17/anh-3-16790138162871188530045.jpg',
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials">
            <Title level={2}>Người dùng nói gì về chúng tôi?</Title>
            <div className="testimonial-list">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="testimonial-card">
                        <Avatar src={testimonial.avatar} size={64} />
                        <h3 className='mb-2 fw-bold'>{testimonial.name}</h3>
                        <h4 className='mb-2'>{testimonial.role}</h4>
                        <p>{testimonial.comment}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;