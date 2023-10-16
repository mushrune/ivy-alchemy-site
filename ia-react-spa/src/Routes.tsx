// NPM imports:
import React from 'react';
import { RouteObject, useNavigate } from "react-router-dom";
import {Button, Paper, Typography} from "@mui/material";
// Project imports:
import App from "./App";
import Home from "./Pages/Home/Home";
import About from "./Pages/About";
import Booking from "./Pages/Booking";
import Pricing from "./Pages/Pricing/Pricing";
import Contact from "./Pages/Contact";

// This component handles wildcard inputs. For now, I have it structured as a not found page that can direct you home.
const HandleWildcard: React.FC = () => {
    const navigator = useNavigate();

    return(
        <Paper className="mt-20 mx-auto w-[80%] rounded-2xl flex flex-col p-4">
            <Typography variant="h4" className="text-center text-lg">Page not found... oops!</Typography>
            <img src="/ripley.png" alt="Ripley the cat" className="w-36 mx-auto mt-6" />
            <Button variant="outlined" onClick={() => {navigator("/")}} className="w-fit mx-auto mt-5 lowercase">go home</Button>
        </Paper>
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