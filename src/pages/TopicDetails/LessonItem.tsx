import React from 'react';
import styles from './ChapterContent.module.css';

interface LessonItemProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ title, isActive, onClick }) => {
    return (
        <div
            className={`${styles.lessonItem} ${isActive ? styles.activeLesson : styles.inactiveLesson}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
        >
            <div className={styles.lessonIcon} aria-hidden="true"></div>
            <div className={styles.lessonTitle}>{title}</div>
        </div>
    );
};

export default LessonItem;