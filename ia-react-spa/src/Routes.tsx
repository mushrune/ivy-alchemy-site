// NPM imports:
import React from 'react';
import { RouteObject, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
// Project imports:
import App from "./App";
import Home from "./Pages/Home";
import About from "./Pages/About";

// This component handles wildcard inputs. For now, I have it structured as a not found page that can direct you home.
const HandleWildcard: React.FC = () => {
    const navigator = useNavigate();

    return(
        <div className="py-40 flex flex-col">
            <Typography variant="h3" className="text-center">Page not found... oops!</Typography>
            <Button variant="contained" onClick={() => {navigator("/")}} className="w-fit mx-auto my-10">GO HOME</Button>
        </div>
    )
}

// Dedicated routes object
export const Routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home />},
            { path: "about", element: <About />},
            { path: "*", element: <HandleWildcard />}
        ]
    }
]