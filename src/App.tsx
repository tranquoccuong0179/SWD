import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage.tsx";
import LoginPage from "./pages/LogIn/AuthPage.tsx";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import CoursePage from "./pages/CoursePage/CoursePage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Auth" element={<LoginPage />} />
                <Route path="/Courses" element={<HomePage />} />
                <Route path="/Home" element={<LandingPage />} />
                <Route path="/NewCourse" element={<CoursePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;