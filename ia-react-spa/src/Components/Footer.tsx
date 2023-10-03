import React from 'react';
import {Typography} from "@mui/material";

// Footer component. Shown at the bottom of all web pages.
const Footer: React.FC = () => {
    const currentYear: number = (new Date()).getFullYear();

    return(
        <div className="
            flex items-center
            h-10 p-3 w-full
            select-none
        ">
            <img src="/logo192.png" alt="puck logo" className="h-full px-1" style={{ filter: "invert(100%)"}} />
            <Typography variant="subtitle2" className="text-[10px]">
                © {currentYear} IVY ALCHEMY
            </Typography>
            <img src="/tg_logo192.png" alt="puck logo" className="h-full pr-1 ml-auto"/>
        </div>
    )
}

export default Footer;