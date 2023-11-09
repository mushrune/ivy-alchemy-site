import React, { useEffect } from 'react';
import Navigator from "./Components/Navigator";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "./Components/Footer";

// Renders the application and any elements that persist throughout.
// The height of the Outlet element is managed such that it is consistent throughout the site.
const App: React.FC = () => {
    const location = useLocation();

    useEffect( () => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    return (
        <div className="App flex flex-col min-h-screen">
            <Navigator />
            <div className="flex-1 w-[95%] max-w-7xl mx-auto">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
