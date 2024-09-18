import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Define routes */}
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;