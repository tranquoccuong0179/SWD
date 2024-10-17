import { Card, Rate } from 'antd';

const courses = [
    {
        id: 1,
        title: 'Con lắc lò xo',
        description: 'Động con lắc lò xo để nghiên cứu dao động điều hòa và năng lượng học trong vật lý động lực học',
        image: '/con-lac-lo-xo.png',
        price: 17.84,
        rating: 4.3,
        reviews: 18321,
    },
    {
        id: 2,
        title: 'Con lắc đơn',
        description: 'Vở con lắc đơn, thành phần lực tác động và động học của vật',
        image: '/con-lac-don.png',
        price: 8.99,
        rating: 3.9,
        reviews: 8321,
    },
    {
        id: 3,
        title: 'Dao động điều hòa',
        description: 'Dao động điều hòa được dùng trong đời sống và các hiện tượng vật lý để mô tả các chuyển động ...',
        image: '/dao-dong-dieu-hoa.png',
        price: 11.70,
        rating: 4.2,
        reviews: 1231,
    },
];

const FeaturedCourses = () => {
    return (
        <section className="featured-courses">
            <h2>Các chương phổ biến nhất</h2>
            <div className="course-list">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        hoverable
                        cover={<img alt={course.title} src={course.image} />}
                        actions={[<span>${course.price.toFixed(2)}</span>]}
                        className="course-card"
                    >
                        <Card.Meta
                            title={course.title}
                            description={course.description}
                        />
                        <div className="course-rating">
                            <Rate disabled defaultValue={course.rating} />
                            <span>({course.reviews.toLocaleString()})</span>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCourses;