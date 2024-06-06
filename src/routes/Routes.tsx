import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Home from '../pages/Home';
import Map from '../components/map/Map';


const AppRouter = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home /> } />
                    <Route path="/prueba" element={<Map />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </>

    );
};

export default AppRouter;