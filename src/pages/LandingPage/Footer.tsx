import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
    return (
        <AntFooter className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Product</h3>
                    <ul>
                        <li>Overview</li>
                        <li>Features</li>
                        <li>Solutions</li>
                        <li>Tutorials</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Company</h3>
                    <ul>
                        <li>About us</li>
                        <li>Careers</li>
                        <li>Press</li>
                        <li>News</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Social</h3>
                    <ul>
                        <li>Twitter</li>
                        <li>LinkedIn</li>
                        <li>GitHub</li>
                        <li>Dribbble</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li>Terms</li>
                        <li>Privacy</li>
                        <li>Cookies</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Manim AI Physics Visualizer. All rights reserved.</p>
                <div className="social-icons">
                    {/* Add social media icons here */}
                </div>
            </div>
        </AntFooter>
    );
};

export default Footer;