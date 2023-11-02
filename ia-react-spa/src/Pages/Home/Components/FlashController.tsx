import React, {useContext, useEffect, useState} from 'react';
import {
    Backdrop,
    Button, IconButton, Paper,
    Typography
} from "@mui/material";
import {ButtonBack, ButtonNext, CarouselContext} from 'pure-react-carousel';
import {FlashPiece, FlashSheet} from "../Types";
import {TbArrowBigLeft, TbArrowBigRight} from "react-icons/tb";
import { CustomLinearProgress } from "../../../Components/Widgets/CustomLinearProgress";
import {CgClose} from "react-icons/cg";
import SheetInfo from "./SheetInfo";

interface props {
    flashSheet: FlashSheet
}

function getSliderProgress( currentSlide: number, totalPieces: number ): number {
    const currentPieceIndex = currentSlide
    const progressPercentage = currentPieceIndex / totalPieces
    return progressPercentage * 100
}

const FlashController: React.FC<props> = ({ flashSheet }) => {
    const carouselContext = useContext( CarouselContext );
    const [ currentSlide, setCurrentSlide ] = useState(carouselContext.state.currentSlide);
    const [ currentPiece, setCurrentPiece ] = useState<FlashPiece | null>(null)
    const [ infoOpen, setInfoOpen ] = useState<boolean>(false);
    const handleInfoClose = () => setInfoOpen(false)
    const handleInfoOpen = () => setInfoOpen(true)


    useEffect( () => {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
            const pieceIndex = carouselContext.state.currentSlide - 1
            if ( pieceIndex >= 0 ) { setCurrentPiece(flashSheet.flash_pieces[pieceIndex]) }
            else { setCurrentPiece(null) }
        }
        carouselContext.subscribe(onChange);

        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext])

    const sheetDescriptor = (
        <Typography variant="h2" className="mx-auto italic my-auto text-lg uppercase text-center">{flashSheet.title}</Typography>
    )

    const pieceDescriptor = (
        <div className="flex-1">
            <Typography className="italic lowercase w-full text-center">"{currentPiece?.title}"</Typography>
            <Typography className="lowercase w-full text-center font-bold">{currentPiece?.size_range}</Typography>
        </div>
    )

    const sheetInfoPanel = (
        <Typography variant="h4" className="mx-auto my-auto text-lg uppercase text-center">{flashSheet.title}</Typography>
    )

    return(
        <div>
            <CustomLinearProgress
                variant="determinate"
                value={getSliderProgress( currentSlide, flashSheet.flash_pieces.length )}
            />
            <div className="w-full h-10 flex items-center mt-4">
                <ButtonBack className="slider-navigator select-none"><TbArrowBigLeft size={30} /></ButtonBack>
                { currentPiece === null ? sheetDescriptor : pieceDescriptor }
                <ButtonNext
                    className="slider-navigator select-none"
                    onClick={() => console.log(currentPiece?.title)}
                ><TbArrowBigRight size={30} className="transform rotate-90" /></ButtonNext>
            </div>
            { currentPiece !== null &&
                <div className="w-full h-10 flex items-center mt-2">
                    <Button variant="outlined" size="small" onClick={handleInfoOpen} className="flex-1 lowercase italic mx-1">info</Button>
                </div>
            }
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={infoOpen}
                onClick={handleInfoClose}
            >
                <SheetInfo flashSheet={flashSheet} handleInfoClose={handleInfoClose} currentPieceIndex={carouselContext.state.currentSlide - 1}  />
            </Backdrop>
        </div>
    )
}

export default FlashController;