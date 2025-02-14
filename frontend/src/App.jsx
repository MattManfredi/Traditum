import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Prestadores from "./pages/Prestadores";
import Planes from "./pages/Planes";
import Practicas from "./pages/Practicas";
import PrestadorDetalle from "./pages/PrestadorDetalle";
import NavBar from "./components/NavBar";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prestadores" element={<Prestadores />} />
                <Route path="/planes" element={<Planes />} />
                <Route path="/practicas" element={<Practicas />} />
                <Route path="/prestadores/:id" element={<PrestadorDetalle />} />
            </Routes>
        </Router>
    );
}

export default App;
