import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './contexts/AuthContext';
import CardsPage from './pages/CardsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import YourReq from './pages/YourReq';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_APP_API;
const App = () => {
    return (
        <>
            <div className="min-h-screen bg-[#f5e5b8] flex flex-col">
                <div className="bg-[#b25013] h-fit px-5 py-2 font-bold text-white leading-tight text-3xl w-full">
                    FAK <br />
                    SUE
                </div>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/cardspage"
                                element={
                                    <ProtectedRoutes>
                                        <CardsPage />
                                    </ProtectedRoutes>
                                }
                            />
                            <Route
                                path="/yourreq"
                                element={
                                    <ProtectedRoutes>
                                        <YourReq />
                                    </ProtectedRoutes>
                                }
                            />
                            <Route path="*" element={<Login />} />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </>
    );
};

export default App;
