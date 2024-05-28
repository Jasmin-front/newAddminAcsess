import React, { useState, useEffect } from 'react';
import Header from "./components/Header/Header.jsx";
import Pages from "./pages/Pages.jsx";
import Login from "./pages/Login/Login.jsx";
import {useNavigate} from "react-router-dom";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home')
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <Header onLogout={handleLogout}/>
                    <Pages/>
                </>
            ) : (
                <Login onLogin={handleLogin}/>
            )}
        </div>
    );
};

export default App;
