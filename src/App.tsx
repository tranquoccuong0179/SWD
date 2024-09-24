import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../src/pages/HomePage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/Home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;