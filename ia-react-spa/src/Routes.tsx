// NPM imports:
import React from 'react';
import { RouteObject, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
// Project imports:
import App from "./App";
import Home, { homeLoader } from "./Pages/Home/Home";
import About from "./Pages/About";
import Booking from "./Pages/Booking";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";

// This component handles wildcard inputs. For now, I have it structured as a not found page that can direct you home.
const HandleWildcard: React.FC = () => {
    const navigator = useNavigate();

    return(
        <div className="py-40 flex flex-col">
            <Typography variant="h4" className="text-center text-lg">Page not found... oops!</Typography>
            <img src="./ripley.png" alt="Ripley the cat" className="w-36 mx-auto mt-6" />
            <Button variant="outlined" onClick={() => {navigator("/")}} className="w-fit mx-auto my-10 lowercase">go home</Button>
        </div>
    )
}

// Dedicated routes object
export const Routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About />},
            { path: "booking", element: <Booking />},
            { path: "pricing", element: <Pricing />},
            { path: "contact", element: <Contact />},
            { path: "*", element: <HandleWildcard />}
        ]
    }
]