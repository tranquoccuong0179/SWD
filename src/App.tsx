import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage.tsx";
import LoginPage from "./pages/LogIn/AuthPage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/LogIn" element={<LoginPage />} />
                <Route path="/Home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;