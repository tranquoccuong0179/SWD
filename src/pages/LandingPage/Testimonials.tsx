import { Avatar, Card } from 'antd';

const testimonials = [
    {
        id: 1,
        name: 'Trần Văn A',
        role: 'Giáo viên',
        comment: 'Trải nghiệm Manim AI Physics Visualizer thú vị. Tích hợp các bài tập tính toán và đồ thị trực quan giúp học sinh hiểu sâu các khái niệm vật lý.',
        avatar: '/avatar1.png',
    },
    {
        id: 2,
        name: 'Nguyễn Văn B',
        role: 'Học sinh',
        comment: 'Manim AI giúp việc học vật lý trở nên thú vị hơn. Các đồ thị động và mô phỏng trực quan giúp tôi hiểu rõ các khái niệm phức tạp.',
        avatar: '/avatar2.png',
    },
    {
        id: 3,
        name: 'Bùi Văn C',
        role: 'Phụ huynh',
        comment: 'Con trai tôi rất thích học với Manim AI. Các bài giảng trực quan và tương tác giúp cháu duy trì hứng thú với môn vật lý.',
        avatar: '/avatar3.png',
    },
    {
        id: 4,
        name: 'Lê Thị D',
        role: 'Sinh viên',
        comment: 'Manim AI giúp tôi ôn tập vật lý hiệu quả. Các mô phỏng động giúp tôi hiểu sâu hơn về các hiện tượng vật lý phức tạp.',
        avatar: '/avatar4.png',
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials">
            <h2>Họ nói gì về chúng tôi?</h2>
            <div className="testimonial-list">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="testimonial-card">
                        <Avatar src={testimonial.avatar} size={64} />
                        <h3>{testimonial.name}</h3>
                        <h4>{testimonial.role}</h4>
                        <p>{testimonial.comment}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;