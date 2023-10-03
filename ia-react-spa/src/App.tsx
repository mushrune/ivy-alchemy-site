import React from 'react';
import BrandLogo from "./Components/BrandLogo";
import Navigator from "./Components/Navigator";
import {Outlet} from "react-router-dom";
import Footer from "./Components/Footer";

// Primarily handles routing and
const App: React.FC = () => {
    return (
        <div className="App">
            <Navigator />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
