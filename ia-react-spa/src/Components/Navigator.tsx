import React, { useState } from 'react';
import BrandLogo from "./BrandLogo";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import {TbBrandInstagram, TbNotebook, TbSeeding, TbMenu2} from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import LeafIcon from "./Widgets/LeafIcon";

const Navigator: React.FC = () => {
    const [ menu, setMenu ] = useState<boolean>(false);
    const navigator = useNavigate();

    // handler for navigating away from the site
    const handleLink = ( link: string ) => {
        window.open(link, '_blank', 'noreferrer')
    }

    // handler for clicking a nav button, closes the menu
    const handleNavigation = ( to: string ) => {
        setMenu(false)
        navigator(to)
    }

    return(
        <div>
            <BrandLogo />
            <Typography variant="subtitle1" className="text-primary italic bg-background rounded-md px-2 text-center w-fit mx-auto border-2 border-black">creatures of all sorts, for people of all sorts</Typography>
            <div className="
                    border-primary border-2 border-solid
                    bg-background
                    p-1 my-2
                    rounded-xl
                    mx-auto
                    w-[90%]
            ">
                <div className="flex sm:justify-evenly justify-around">
                    <Button
                        onClick={() => setMenu(!menu)}
                        startIcon={ menu ? <CgClose size={25} /> : <TbMenu2 size={25} /> }
                        className="nav-button"
                    >{/* menu ? "close" : "menu" */}</Button>
                    <Button variant="contained" disableElevation className="nav-button bg-green-700" onClick={() => handleNavigation("/booking")} startIcon={<TbNotebook size={25} />}>booking</Button>
                    <Button className="nav-button" onClick={() => handleLink("https://www.instagram.com/ivy.alchemist/")} startIcon={<TbBrandInstagram size={25} />}></Button>
                </div>
                { menu && <div className="flex justify-center items-center flex-col px-3">
                    <div className="horizontal-line flex justify-center items-center">
                        <div className="bg-green-800 px-4 text-green-300">
                            <LeafIcon size={25} />
                        </div>
                    </div>
                    {/*<NavButton onClick={() => {handleNavigation("/")}} label="home" spacer icon={<TbHome size={25} />} />*/}
                    {/*<NavButton onClick={() => {handleNavigation("/about")}} label="about" spacer icon={<TbInfoHexagon size={25} />} />*/}
                    {/*<NavButton onClick={() => {handleNavigation("/pricing")}} label="pricing" spacer icon={<TbCurrencyDollar size={25} />} />*/}
                    {/*<NavButton onClick={() => {handleNavigation("/contact")}} label="contact" spacer icon={<TbFlare size={25} />} />*/}
                </div>}
            </div>
        </div>
    )
}

export default Navigator;