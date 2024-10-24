import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from "./LogIn/LoginPage.tsx";
import RegisterPage from './LogIn/RegisterPage.tsx';
import LandingPage from "./LandingPage/LandingPage.tsx";
import CoursePage from "./CoursePage/CoursePage.tsx";
import ChapterContent from "./CourseDetails/ChapterContent.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/Home" element={<LandingPage />} />
                <Route path="/NewCourse" element={<CoursePage />} />
                <Route path="/CourseDetails" element={<ChapterContent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;