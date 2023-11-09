import React from 'react';
import { FlashPiece } from "../../../Types";
import {Button, Chip, Paper, Typography} from "@mui/material";
import {useToneContext} from "../../../Providers/ToneProvider";
import ToneSelector from "../../../Components/ToneSelector";
import {usePieceContext} from "../../../Providers/SelectedPieceProvider";
import {useNavigate} from "react-router-dom";
import LeafSeparator from "../../../Components/Widgets/LeafSeparator";
import Options from "../../../Theme/MUITheme";

interface props {
    piece: FlashPiece | null,
    handleInfoClose: () => void
}

const PieceInfo: React.FC<props> = ({ piece, handleInfoClose}) => {

    const { tone } = useToneContext();
    const { setSelectedPiece } = usePieceContext();
    const navigator = useNavigate();

    if ( piece === null ) {
        handleInfoClose();
        return(<div />);
    }

    const handlePropagation = ( event: React.MouseEvent<HTMLElement> ) => {
        event.stopPropagation();
    }
    const handleSelectPiece = () => {
        setSelectedPiece(piece)
        navigator("/booking")
    }

    return(
        <Paper
            className="p-2 m-1 rounded-xl flex flex-col max-h-[98%]"
            variant="outlined" elevation={3}
            onClick={handlePropagation}
        >
            <Typography variant="h4" className="flex-1 text-xl mb-1 italic uppercase text-center tracking-wide">"{ piece.title }"</Typography>
            <img
                src={piece.url}
                alt={piece.title}
                style={{ backgroundColor: tone.color }}
                className="w-full rounded-xl max-w-2xl mx-auto mb-0 sm:mb-2"
            />
            <ToneSelector />
            <div className="max-h-[2%] overflow-hidden flex items-center relative">
                <LeafSeparator />
            </div>
            <div className="relative px-2 overflow-y-auto flex-1 w-full">
                <div className="fixed h-10" style={{ background: `linear-gradient(to top, black, ${Options.palette?.background?.paper})`}} />
                <Typography variant="h6" className="font-bold mr-1 h-fit">size range:</Typography>
                <Typography variant="h6" className="italic lowercase h-fit">{piece.size_range}</Typography>
                <Typography variant="h6" className="font-bold mr-1 h-fit">tags:</Typography>
                <div className="h-fit">
                    { piece.tags.map( ( tag, index ) =>
                        <Chip key={index} className="m-1 h-fit" label={tag}/>
                    )}
                </div>
                <Typography variant="h6" className="font-bold mr-1 h-fit">shared on:</Typography>
                <Typography variant="h6" className="italic h-fit">{new Date(piece.created_date).toLocaleString('en-us', { year: "numeric", month: "long"})}</Typography>
            </div>
            <div className="flex mt-1">
                <Button variant="outlined" className="mr-1 w-fit lowercase italic" onClick={handleInfoClose}>close</Button>
                <Button variant="contained" className="ml-1 flex-1 lowercase italic" onClick={handleSelectPiece}>book</Button>
            </div>
        </Paper>
    )
}

export default PieceInfo;