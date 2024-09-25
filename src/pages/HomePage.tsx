import React from 'react';
import './HomePage.css';
import { Search, ShoppingCart, Home, BookOpen, Newspaper, PlayCircle, User } from 'lucide-react';

interface Course {
    title: string;
    price: string;
    originalPrice?: string;
    students: number;
    lessons: number;
    time: string;
    image: string;
}

interface BlogPost {
    title: string;
    author: string;
    date: string;
}

interface Video {
    title: string;
    views: number;
    likes: number;
    thumbnail: string;
}

const HomePage: React.FC = () => {
    const proCourses: Course[] = [
        { title: "HTML CSS Pro", price: "2,499,000đ", students: 2500, lessons: 300, time: "34 giờ 40 phút", image: "/path/to/html-css-pro.jpg" },
        { title: "ReactJS Pro", price: "299,000đ", originalPrice: "400,000đ", students: 2500, lessons: 72, time: "14 giờ 46 phút", image: "/path/to/reactjs-pro.jpg" },
        { title: "JavaScript Pro", price: "1,299,000đ", originalPrice: "2,499,000đ", students: 500, lessons: 138, time: "34 giờ 40 phút", image: "/path/to/javascript-pro.jpg" },
    ];

    const freeCourses: Course[] = [
        { title: "Kiến Thức Nhập Môn IT", price: "Miễn phí", students: 133233, lessons: 11, time: "3 giờ 52 phút", image: "/path/to/intro-it.jpg" },
        { title: "Lập trình C++ cơ bản, nâng cao", price: "Miễn phí", students: 40316, lessons: 120, time: "20 giờ 14 phút", image: "/path/to/cpp.jpg" },
        { title: "HTML CSS từ Zero đến Hero", price: "Miễn phí", students: 207348, lessons: 117, time: "20 giờ 52 phút", image: "/path/to/html-css-zero-hero.jpg" },
        { title: "Responsive Với Grid System", price: "Miễn phí", students: 34, lessons: 11, time: "5 giờ 17 phút", image: "/path/to/responsive-grid.jpg" },
        { title: "Lập Trình JavaScript Cơ Bản", price: "Miễn phí", students: 132398, lessons: 112, time: "20 giờ 15 phút", image: "/path/to/javascript-basic.jpg" },
    ];

    const blogPosts: BlogPost[] = [
        { title: "Tổng hợp các sản phẩm của học viên tại F8", author: "Sơn Đặng", date: "3 phút đọc" },
        { title: "Phân biệt các khái niệm trong Backend và Web...", author: "Sơn Đặng", date: "6 phút đọc" },
        { title: "Cách đưa code lên GitHub và tạo GitHub Pages", author: "Minh Đức", date: "5 phút đọc" },
        { title: "Kỹ năng đặt câu hỏi khi học lập trình", author: "Đức Huy", date: "4 phút đọc" },
        { title: "Ký sự ngày thứ 25 học ở F8", author: "Dương Quang", date: "4 phút đọc" },
        { title: "Tổng hợp tài liệu tự học tiếng anh cơ bản", author: "Ngọc Thảo", date: "3 phút đọc" },
        { title: "Hướng dẫn chi tiết cách tạo tài khoản...", author: "Ngọc Phương", date: "4 phút đọc" },
        { title: "Học như thế nào là phù hợp?", author: "Văn Sơn", date: "3 phút đọc" },
    ];

    const videos: Video[] = [
        { title: "Sinh viên IT đi thực tập tại doanh nghiệp cần biết những gì?", views: 145894, likes: 2300, thumbnail: "/path/to/thumbnail1.jpg" },
        { title: "Phương pháp học lập trình của Admin", views: 80272, likes: 2100, thumbnail: "/path/to/thumbnail2.jpg" },
        { title: "Bạn sẽ làm được gì sau khóa học?", views: 17452, likes: 788, thumbnail: "/path/to/thumbnail3.jpg" },
        { title: "'Code Thiếu Nhi Battle' Tranh Giải 100 Triệu...", views: 112098, likes: 3471, thumbnail: "/path/to/thumbnail4.jpg" },
        { title: "JavaScript có thể làm được gì? Giới thiệu qua về trang F8", views: 190857, likes: 4211, thumbnail: "/path/to/thumbnail5.jpg" },
        { title: "ReactJS là gì? Tại sao nên học ReactJS?", views: 415723, likes: 5656, thumbnail: "/path/to/thumbnail6.jpg" },
        { title: "Làm sao để có thu nhập cao và đi xa hơn...", views: 194762, likes: 3547, thumbnail: "/path/to/thumbnail7.jpg" },
        { title: "Các nguồn tài nguyên hữu ích cho 1 front-end developer?", views: 68140, likes: 1102, thumbnail: "/path/to/thumbnail8.jpg" },
    ];

    return (
        <div className="home-page">
            <header className="header">
                <div className="logo">
                    <img src="/path/to/f8-logo.png" alt="F8 Logo" />
                </div>
                <div className="search-bar">
                    <Search size={20} />
                    <input type="text" placeholder="Tìm kiếm khóa học, bài viết, video..." />
                </div>
                <nav className="main-nav">
                    <a href="#" className="active"><Home size={20} /> Home</a>
                    <a href="#"><BookOpen size={20} /> Học</a>
                    <a href="#"><Newspaper size={20} /> Blog</a>
                    <a href="#"><PlayCircle size={20} /> Videos</a>
                </nav>
                <div className="user-actions">
                    <ShoppingCart size={20} />
                    <button className="login-button"><User size={20} /> Đăng nhập</button>
                </div>
            </header>

            <main>
                <section className="hero-banner">
                    <h2>Mở bán khóa JavaScript Pro</h2>
                    <p>Từ 08/08/2023 Mức học phí cực ưu đãi 1.299k (2.499.000đ) Pro: 90% khóa học có bài tập và dự án</p>
                    <button className="cta-button">Học thử miễn phí</button>
                </section>

                <section className="pro-courses">
                    <h2>Khóa học Pro <span className="badge">Mới</span></h2>
                    <div className="course-list">
                        {proCourses.map((course, index) => (
                            <div key={index} className="course-card">
                                <img src={course.image} alt={course.title} className="course-image" />
                                <h3>{course.title}</h3>
                                <p className="price">{course.price} {course.originalPrice && <span className="original-price">{course.originalPrice}</span>}</p>
                                <div className="course-meta">
                                    <span><User size={16} /> {course.students}</span>
                                    <span><BookOpen size={16} /> {course.lessons}</span>
                                    <span><PlayCircle size={16} /> {course.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="free-courses">
                    <h2>Khóa học miễn phí <a href="#" className="see-all">Xem tất cả</a></h2>
                    <div className="course-list">
                        {freeCourses.map((course, index) => (
                            <div key={index} className="course-card">
                                <img src={course.image} alt={course.title} className="course-image" />
                                <h3>{course.title}</h3>
                                <p className="price">{course.price}</p>
                                <div className="course-meta">
                                    <span><User size={16} /> {course.students}</span>
                                    <span><BookOpen size={16} /> {course.lessons}</span>
                                    <span><PlayCircle size={16} /> {course.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="blog-posts">
                    <h2>Bài viết nổi bật <a href="#" className="see-all">Xem tất cả</a></h2>
                    <div className="post-list">
                        {blogPosts.map((post, index) => (
                            <div key={index} className="post-card">
                                <h3>{post.title}</h3>
                                <p>{post.author} • {post.date}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="videos">
                    <h2>Videos nổi bật <a href="#" className="see-all">Xem tất cả</a></h2>
                    <div className="video-list">
                        {videos.map((video, index) => (
                            <div key={index} className="video-card">
                                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                                <h3>{video.title}</h3>
                                <p>{video.views.toLocaleString()} lượt xem • {video.likes.toLocaleString()} lượt thích</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>Học Lập Trình Để Đi Làm</h3>
                        <p>Phone: 0246.329.1102</p>
                        <p>Email: contact@fullstack.edu.vn</p>
                        <p>Địa chỉ: Số 26 Dương Đình Nghệ, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội</p>
                    </div>
                    <div className="footer-column">
                        <h3>Về F8</h3>
                        <ul>
                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Cơ hội việc làm</a></li>
                            <li><a href="#">Đối tác</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Sản phẩm</h3>
                        <ul>
                            <li><a href="#">Game Nester</a></li>
                            <li><a href="#">Game CSS Diner</a></li>
                            <li><a href="#">Game CSS Selectors</a></li>
                            <li><a href="#">Game Froggy</a></li>
                            <li><a href="#">Game Froggy Pro</a></li>
                            <li><a href="#">Game Scoops</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Công cụ</h3>
                        <ul>
                            <li><a href="#">Tạo CV xin việc</a></li>
                            <li><a href="#">Rút gọn liên kết</a></li>
                            <li><a href="#">Clip-path maker</a></li>
                            <li><a href="#">Snippet generator</a></li>
                            <li><a href="#">CSS Grid generator</a></li>
                            <li><a href="#">Cảnh báo sờ tay lên mặt</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2018 - 2023 F8. Nền tảng học lập trình hàng đầu Việt Nam</p>
                    <div className="social-links">
                        <a href="#"><img src="/path/to/youtube-icon.png" alt="YouTube" /></a>
                        <a href="#"><img src="/path/to/facebook-icon.png" alt="Facebook" /></a>
                        <a href="#"><img src="/path/to/tiktok-icon.png" alt="TikTok" /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;