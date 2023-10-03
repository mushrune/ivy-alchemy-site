import React from 'react';
import {Button, Typography} from "@mui/material";
import {TbCirclePlus} from "react-icons/tb";
import LeafSeperator from "../../Components/Widgets/LeafSeperator";
import { FlashSheet } from "./Types";

interface props {
    flashSheet: FlashSheet;
    showDivider: boolean;
    index: number;
}

const FlashContainer: React.FC<props> = ({ flashSheet, showDivider, index }) => {
    return(
        <div className={`
                w-full h-fit overflow-hidden p-0 sm:px-4 ${ !showDivider && "pb-4" }
            `}
            key={index}>
            <div className="flex flex-around items-center mb-2">
                <Typography variant="h6" className="w-full text-left text-sm sm:text-xl">{flashSheet.title}</Typography>
                <Button variant="outlined" size="small" className="nav-button px-8" startIcon={<TbCirclePlus size={20} />} sx={{zIndex: 0}}>browse</Button>
            </div>
            <img className="w-full rounded-md max-w-lg mx-auto" src={flashSheet.url} alt={flashSheet.title} />
            { showDivider && <LeafSeperator /> }
        </div>
    )
}

export default FlashContainer;