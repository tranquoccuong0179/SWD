import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from "./LogIn/LoginPage.tsx";
import RegisterPage from './LogIn/RegisterPage.tsx';
import LandingPage from "./LandingPage/LandingPage.tsx";
import CoursePage from "./CoursePage/CoursePage.tsx";
import ChapterContent from "./CourseDetails/ChapterContent.tsx";
import SubjectPage from './SubjectPage/SubjectPage.tsx';
import ChapterPage from './ChapterPage/ChapterPage.tsx';
import WalletDetails from "./WalletPage/WalletDetails.tsx";
import ComingSoonPage from '../components/ComingSoon.tsx';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/Home" element={<LandingPage />} />
                <Route path="/Subject" element={<SubjectPage />} />
                <Route path="/Chapter" element={<ChapterPage />} />
                <Route path="/NewCourse" element={<CoursePage />} />
                <Route path="/CourseDetails" element={<ChapterContent />} />
                <Route path="/Comingsoon" element={<ComingSoonPage />} />
                <Route path="/Wallet" element={<WalletDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;