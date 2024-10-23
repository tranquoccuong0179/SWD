import { Avatar, Card } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const testimonials = [
    {
        id: 1,
        name: 'Trần Văn A',
        role: 'Giáo viên',
        comment: 'Tôi đã có một trải nghiệm Manim AI Physics Visualizer đầy thú vị. Việc tích hợp các bài tập tính toán và đồ thị trực quan giúp học sinh dễ dàng hiểu sâu các khái niệm vật lý.',
        avatar: 'https://w7.pngwing.com/pngs/490/157/png-transparent-male-avatar-boy-face-man-user-flat-classy-users-icon.png',
    },
    {
        id: 2,
        name: 'Nguyễn Văn B',
        role: 'Học sinh',
        comment: 'Manim AI Physics Visualizer giúp việc học vật lý trở nên thú vị hơn. Các đồ thị động và mô phỏng trực quan giúp tôi hiểu rõ các khái niệm phức tạp.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png',
    },
    {
        id: 3,
        name: 'Bùi Văn C',
        role: 'Phụ huynh',
        comment: 'Con trai tôi rất thích học trên Manim AI Physics Visualizer. Các bài giảng trực quan và tương tác giúp cháu duy trì hứng thú với môn vật lý.',
        avatar: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png',
    },
    {
        id: 4,
        name: 'Lê Thị D',
        role: 'Sinh viên',
        comment: 'Manim AI Physics Visualizer giúp tôi ôn tập vật lý hiệu quả. Các mô phỏng động giúp tôi hiểu sâu hơn về các hiện tượng vật lý phức tạp.',
        avatar: 'https://cdn3.iconfinder.com/data/icons/avatar-set/512/Avatar01-512.png',
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