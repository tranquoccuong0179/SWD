// import React from 'react';
// import styles from './ChapterContent.module.css';
// import LessonItem from './LessonItem';

// interface Lesson {
//     id: number;
//     title: string;
// }

// const lessons: Lesson[] = [
//     { id: 1, title: "DAO ĐỘNG ĐIỀU HÒA" },
//     { id: 2, title: "CON LẮC LÒ XO" },
//     { id: 3, title: "CON LẮC ĐƠN" },
//     { id: 4, title: "DAO ĐỘNG TẮT DẦN - DAO ĐỘNG C..." },
//     { id: 5, title: "TỔNG HỢP HAI DAO ĐỘNG ĐIỀU HÒA..." },
//     { id: 6, title: "THỰC HÀNH: KHẢO SÁT THỰC NGHIỆ..." },
//     { id: 7, title: "BÀI 7" },
//     { id: 8, title: "BÀI 8" },
//     { id: 9, title: "BÀI 9" },
//     { id: 10, title: "BÀI 10" },
//     { id: 11, title: "BÀI 11" },
//     { id: 12, title: "BÀI 12" },
//     { id: 13, title: "BÀI 13" },
//     { id: 14, title: "BÀI 14" },
//     { id: 15, title: "BÀI 15" },
//     { id: 16, title: "BÀI 16" },
// ];

// const ChapterContent: React.FC = () => {
//     const [activeLesson, setActiveLesson] = React.useState(1);

//     return (
//         <main className={styles.container}>
//             <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/a49b9f76d2c6410a72bb32902dda0366c84ae15c6fce46e6c4c16a415ea1274c?placeholderIfAbsent=true&apiKey=41832340d6f545c2a0509736ad9e1693"
//                 className={styles.chapterIcon}
//                 alt="Chapter icon"
//             />
//             <h1 className={styles.chapterTitle}>CHƯƠNG 1: DAO ĐỘNG CƠ</h1>
//             <nav>
//                 {lessons.map((lesson) => (
//                     <LessonItem
//                         key={lesson.id}
//                         title={lesson.title}
//                         isActive={activeLesson === lesson.id}
//                         onClick={() => setActiveLesson(lesson.id)}
//                     />
//                 ))}
//             </nav>
//         </main>
//     );
// };

// export default ChapterContent;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChapterContent.module.css';

interface Lesson {
    id: number;
    title: string;
}

const lessons: Lesson[] = [
    { id: 1, title: "DAO ĐỘNG ĐIỀU HÒA" },
    { id: 2, title: "CON LẮC LÒ XO" },
    { id: 3, title: "CON LẮC ĐƠN" },
    { id: 4, title: "DAO ĐỘNG TẮT DẦN - DAO ĐỘNG C..." },
    { id: 5, title: "TỔNG HỢP HAI DAO ĐỘNG ĐIỀU HÒA..." },
    { id: 6, title: "THỰC HÀNH: KHẢO SÁT THỰC NGHIỆ..." },
    { id: 7, title: "BÀI 7" },
    { id: 8, title: "BÀI 8" },
    // ... other lessons
];

const ChapterContent: React.FC = () => {
    const [activeLesson, setActiveLesson] = React.useState(1);

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-2/12 pr-4">
                    <Link to="/NewCourse" className="block mb-4">
                        <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a49b9f76d2c6410a72bb32902dda0366c84ae15c6fce46e6c4c16a415ea1274c?placeholderIfAbsent=true&apiKey=41832340d6f545c2a0509736ad9e1693"
                className={styles.chapterIcon}
                alt="Chapter icon"
            />
                    </Link>
                    <h1 className="text-2xl font-bold mb-4">CHƯƠNG 1: DAO ĐỘNG CƠ</h1>
                    <nav>
                        {lessons.map((lesson) => (
                            <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson.id)}
                                className={`w-full text-left p-2 mb-2 rounded ${
                                    activeLesson === lesson.id
                                        ? 'bg-green-500 text-white'
                                        : 'bg-green-100 text-gray-800 hover:bg-green-200'
                                }`}
                            >
                                {lesson.title}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="md:w-8/12">
                    {/* Content for the selected lesson would go here */}
                    <p className="text-lg"> {lessons.find(l => l.id === activeLesson)?.title}</p>
                </div>
            </div>
        </div>
    );
};

export default ChapterContent;