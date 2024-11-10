import { Card, Rate } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const courses = [
    {
        id: 1,
        title: 'Con lắc lò xo',
        description: 'Động con lắc lò xo để nghiên cứu dao động điều hòa và năng lượng học trong vật lý động lực học...',
        image: 'https://thidaihoc.vn/wp-content/uploads/2021/07/con-lac-lo-xo-treo-thang-dung.jpg',
        price: 200000,
        rating: 5,
        reviews: 6938,
    },
    {
        id: 2,
        title: 'Con lắc đơn',
        description: 'Con lắc đơn là hệ thống gồm sợi dây không dãn, chiều dài, khối lượng không đáng kể, với một đầu gắn cố định...',
        image: 'https://i.ytimg.com/vi/32C191fJRs8/sddefault.jpg',
        price: 300000,
        rating: 5,
        reviews: 8472,
    },
    {
        id: 3,
        title: 'Dao động điều hòa',
        description: 'Dao động điều hòa được dùng trong đời sống và các hiện tượng vật lý để mô tả các chuyển động...',
        image: 'https://blog.marathon.edu.vn/wp-content/uploads/2022/03/cac-dai-luong-dac-trung-cua-dao-dong-dieu-hoa.jpg',
        price: 100000,
        rating: 4.2,
        reviews: 4523,
    },
];

const FeaturedCourses = () => {
    return (
        <section className="featured-courses">
            {/* <h1 className='featured-courses-title mb-10'>Các chương phổ biến nhất</h1> */}
            <Title level={2} className='mb-5'>Các bài học phổ biến nhất</Title>
            <div className="course-list">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        hoverable
                        cover={<img alt={course.title} src={course.image} />}
                        actions={[<span>{course.price.toFixed(2)} VNĐ</span>]}
                        className="course-card"
                    >
                        <Card.Meta
                            title={course.title}
                            description={course.description}
                        />
                        <div className="course-rating">
                            <Rate disabled defaultValue={course.rating} />
                            {/* <p>({course.reviews.toLocaleString()})</p> */}
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCourses;