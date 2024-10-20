import React, { useState } from 'react';
import axios from 'axios';
import styles from './AuthPage.module.css';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api/auth/SignIn', {
                username,
                password
            });
            // Handle successful login, such as storing tokens
            console.log('Login Success:', response.data);
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    return (
        <main className={styles.loginContainer}>
            <div className={styles.contentWrapper}>
                <section className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/eea3ceb13561f8f15a433fc4cda3735e569c9cdef17ebeeeee1a6cdc2428d58b"
                            alt="Manim AI Physic Visualizer background"
                            className={styles.backgroundImage}
                        />
                        <h1 className={styles.title}>MANIM AI PHYSIC VISUALIZER</h1>
                        <p className={styles.subtitle}>Học Vật Lý chưa bao giờ dễ đến thế!</p>
                    </div>
                </section>
                <section className={styles.formColumn}>
                    <div className={styles.formWrapper}>
                        <h2 className={styles.welcomeText}>
                            Chào mừng bạn đến với Manim AI Physic Visualizer!
                        </h2>
                        <div className={styles.authOptions}>
                            <button
                                className={`${styles.authButton} ${isLogin ? styles.activeButton : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                Đăng nhập
                            </button>
                            <button
                                className={`${styles.authButton} ${!isLogin ? styles.activeButton : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                Đăng kí
                            </button>
                        </div>
                        <div className={styles.formsContainer}>
                            <div className={`${styles.formSlider} ${!isLogin ? styles.slideLeft : ''}`}>
                                <div className={`${styles.formContent} ${isLogin ? styles.fadeIn : styles.fadeOut}`}>
                                    <p className={styles.loginPrompt}>
                                        Đăng nhập ngay để trải nghiệm các tính năng của Manim AI Physic Visualizer!
                                    </p>
                                    <form onSubmit={handleLogin}>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="username" className={styles.inputLabel}>
                                                Tên đăng nhập
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                className={styles.inputField}
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Nhập vào tên đăng nhập"
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="password" className={styles.inputLabel}>
                                                Mật khẩu
                                            </label>
                                            <div className={styles.passwordWrapper}>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Nhập mật khẩu"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className={styles.submitButton}>
                                            Đăng nhập
                                        </button>
                                    </form>
                                </div>

                                <div className={`${styles.formContent} ${!isLogin ? styles.fadeIn : styles.fadeOut}`}>
                                    <p className={styles.loginPrompt}>
                                        Đăng ký để bắt đầu hành trình học Vật lý cùng chúng tôi!
                                    </p>
                                    <form>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="username" className={styles.inputLabel}>
                                                Tên đăng nhập
                                            </label>
                                            <input
                                                type="text"
                                                id="username"
                                                className={styles.inputField}
                                                placeholder="Nhập vào tên đăng nhập"
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="email" className={styles.inputLabel}>
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className={styles.inputField}
                                                placeholder="Nhập vào email của bạn"
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label htmlFor="password" className={styles.inputLabel}>
                                                Mật khẩu
                                            </label>
                                            <div className={styles.passwordWrapper}>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    placeholder="Nhập mật khẩu"
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className={styles.submitButton}>
                                            Đăng kí
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
            </div>
        </section>
</div>
</main>
)
    ;
};

export default AuthPage;