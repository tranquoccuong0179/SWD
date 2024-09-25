import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage.tsx";
import LoginForm from "./components/LoginForm.tsx";
import "./components/LoginForm.css";
import SignUp from "./components/SignUp.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<LoginForm />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;