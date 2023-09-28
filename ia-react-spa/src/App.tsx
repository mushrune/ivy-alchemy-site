import React from 'react';
import BrandLogo from "./Components/BrandLogo";
import Navigator from "./Components/Navigator";
import {Outlet} from "react-router-dom";

// Primarily handles routing and
const App: React.FC = () => {
    return (
        <div className="App">
            <Navigator />
            <Outlet />
        </div>
    );
}

export default App;
