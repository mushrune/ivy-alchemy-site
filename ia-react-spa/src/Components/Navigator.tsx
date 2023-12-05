import React, { useCallback, useEffect, useState } from 'react';
import BrandLogo from "./BrandLogo";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import {
    TbBrandInstagram, TbNotebook,
    TbMenu2, TbInfoHexagon,
    TbCurrencyDollar, TbFlare,
    TbFirstAidKit, TbPhotoStar
} from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import LeafSeparator from "./Widgets/LeafSeparator";
import { handleLink } from "../Functions";
import { Transition } from "@headlessui/react";

/*
     note:
         The navigator has a menu that pops open and covers the content. However, when the page is first rendered the content of the webpage
         needs to be offset from the top of the screen so that it is not initially covered by the menu. Also, when the user scrolls the
         page, the content needs to go behind the menu to keep things cohesive. To do that and to account for all device dimentions and zoom levels,
         I have some states that watch the height of the menu when it is not opened, and use that to set the height of the offset and the
         background element that covers the content as it passes underneath the menu.
 */

// TODO: Brand logo & motto are hidden when the page is scrolled down

const Navigator: React.FC = () => {
    // state for tracking if the menu is open
    const [ menu, setMenu ] = useState<boolean>(false);
    // height used to offset content from the top of the screen so the menu doesn't block it
    const [ offsetHeight, setOffsetHeight ] = useState<number>(0);
    const [ menuNode, setMenuNode ] = useState<HTMLElement | null>(null);
    const [ isTransitioning, setIsTransitioning ] = useState<boolean>(false);

    // callback ref for menu height
    const menuHeightRef = useCallback( ( node: HTMLElement | null ) => setMenuNode( node ), [setMenuNode])

    // this function sets the menu height given the menu node
    const setMenuState = () => {
        // if the menu node exists and the menu is closed, set the menu node height
        if ( menuNode !== null && !menu && !isTransitioning ) {
            const height = menuNode.getBoundingClientRect().height
            setOffsetHeight(height)
        }
    }

    // effect that mounts and unmounts the resize observer
    useEffect( () => {
        if ( menuNode !== null ) {
            const observer = new ResizeObserver(setMenuState)
            observer.observe(menuNode)

            return () => {
                observer.disconnect()
            }
        }
    })

    const navigator = useNavigate();

    // handler for clicking a nav button, closes the menu
    const handleNavigation = ( to: string ) => {
        setMenu(false)
        navigator(to)
    }

    return(
        // This element acts as a spacer and contains the entire navigation menu
        <div style={{ height: `${offsetHeight}px`}} >
            {/*This element blocks the items on the webpage from being seen behind the navigator*/}
            <div style={{ height: `${offsetHeight}px`}} className={`fixed top-0 w-full pb-8 z-[1000]`} >
                <div className="bg-background-color shadow-xl shadow-background-color h-full w-full" />
            </div>
            {/*This element contains the navigator, logo, menu, etc...*/}
            <div  ref={menuHeightRef} className="w-screen fixed top-0 z-[1000]">
                <div className="max-w-7xl mx-auto">
                    <BrandLogo />
                    <Typography variant="subtitle1" className="text-primary italic rounded-md px-2 text-center w-fit mx-auto">creatures of all sorts, for people of all sorts</Typography>
                    <div className={`
                        transition duration-300
                        ${ menu ? "border-white" : "border-primary" } border-2 border-solid
                        bg-background-color
                        p-1 my-2
                        rounded-xl
                        mx-auto
                        w-[95%]
                `}>
                        <div className="flex sm:justify-evenly justify-evenly">
                            <IconButton className={`nav-button`} onClick={() => setMenu(!menu)}>
                                { menu ? <CgClose size={25} /> : <TbMenu2 size={25} /> }
                            </IconButton>
                            <Button
                                variant="contained"
                                disableElevation
                                className={`nav-button ${ menu ? "bg-background-color" : "bg-green-700"}`}
                                onClick={() => handleNavigation("/booking")}
                                startIcon={<TbNotebook size={25} />}
                            >booking</Button>
                            <IconButton className="nav-button" onClick={() => handleLink(`${process.env.REACT_APP_INSTAGRAM_LINK}`)}>
                                <TbBrandInstagram size={25} />
                            </IconButton>
                        </div>
                        <Transition
                            show={ menu }
                            beforeLeave={ () => setIsTransitioning(true) }
                            className="transition-all duration-500 overflow-hidden"
                            enter="ease-in-out" enterFrom="max-h-0 opacity-0" enterTo="max-h-60 opacity-100"
                            leave="ease-out" leaveFrom="max-h-60 opacity-100" leaveTo="max-h-0 opacity-0"
                            afterLeave={() => setIsTransitioning(false) }
                        >
                            <div className="flex justify-center items-center flex-col px-3 h-58 overflow-hidden">
                                <LeafSeparator />
                                <div className="grid grid-cols-2 gap-6 mb-4 w-full">
                                    <Button className="nav-button" onClick={() => handleNavigation("/")} startIcon={<TbPhotoStar size={25} />}>flash</Button>
                                    <Button className="nav-button" onClick={() => handleNavigation("/about")} startIcon={<TbInfoHexagon size={25} />}>about</Button>
                                    <Button className="nav-button" onClick={() => handleNavigation("/pricing")} startIcon={<TbCurrencyDollar size={25} />}>pricing</Button>
                                    <Button className="nav-button" onClick={() => handleNavigation("/contact")} startIcon={<TbFlare size={25} />}>contact</Button>
                                    <Button className="nav-button" onClick={() => handleNavigation("/after-care")} startIcon={<TbFirstAidKit size={25} />}>after care</Button>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navigator;