import React from 'react';
import {FlashPiece, FlashSheet} from "../../../Types";
import {IconButton, Paper, Typography} from "@mui/material";
import {CgClose} from "react-icons/cg";

interface props {
    flashSheet: FlashSheet,
    currentPieceIndex?: number,
    handleInfoClose?: () => void
}

const SheetInfo: React.FC<props> = ({flashSheet, currentPieceIndex, handleInfoClose}) => {

    let currentPiece: FlashPiece | null = null;
    if ( currentPieceIndex && currentPieceIndex > -1 ) {
        currentPiece = flashSheet.flash_pieces[currentPieceIndex]
    }

    return(
        <Paper className="p-2 rounded-xl relative">
            <div className="h-6 flex items-center">
                <Typography variant="h4" className="flex-1 text-lg italic uppercase text-left">"{ currentPiece === null ? flashSheet.title : currentPiece.title }"</Typography>
                <IconButton className="text-primary" onClick={handleInfoClose}><CgClose size={20} /></IconButton>
            </div>
            <Typography variant="subtitle1" className="w-full text-center text-xs">{currentPiece === null ? "flash sheet" : "flash piece" }</Typography>
        </Paper>
    )
}

export default SheetInfo;