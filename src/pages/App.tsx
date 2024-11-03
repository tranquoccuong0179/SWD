import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from "./LogIn/LoginPage.tsx";
import RegisterPage from './LogIn/RegisterPage.tsx';
import LandingPage from "./LandingPage/LandingPage.tsx";
import TopicPage from "./TopicPage/TopicPage.tsx";
import SubjectPage from './SubjectPage/SubjectPage.tsx';
import ChapterPage from './ChapterPage/ChapterPage.tsx';
import WalletDetails from "./WalletPage/WalletDetails.tsx";
import ComingSoonPage from '../components/ComingSoon.tsx';
import TopicDetails from '../pages/TopicDetails/TopicDetails.tsx'
import AdminDashboard from './AdminDashboard/AdminDashboard.tsx';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/Home" element={<LandingPage />} />

                <Route path="/Subject" element={<SubjectPage />} />
                {/* <Route path="/Chapter" element={<ChapterPage />} /> */}
                <Route path="/Subject/:id" element={<ChapterPage />} />
                {/* <Route path="/Topic" element={<TopicPage />} /> */}
                <Route path="/Chapter/:id" element={<TopicPage />} />     
                <Route path="/TopicDetails" element={<TopicDetails />} />
                <Route path="/Topic/:id" element={<TopicDetails />} />
                
                <Route path="/Comingsoon" element={<ComingSoonPage />} />
                
                <Route path="/Wallet" element={<WalletDetails />} />

                <Route path="/Admin" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;