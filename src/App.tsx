import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage1 from "./pages/LogIn/LoginPage.tsx";
import RegisterPage from './pages/LogIn/RegisterPage.tsx';
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import CoursePage from "./pages/CoursePage/CoursePage.tsx";
import ChapterContent from "./pages/CourseDetails/ChapterContent.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<LoginPage1 />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/Home" element={<LandingPage />} />
                <Route path="/NewCourse" element={<CoursePage />} />
                <Route path="/CourseDetails" element={<ChapterContent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;