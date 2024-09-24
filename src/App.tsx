import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage.tsx";
import LoginForm from "./components/LoginForm.tsx";
import "./components/LoginForm.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Auth" element={<LoginForm />} />
                <Route path="/Home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;