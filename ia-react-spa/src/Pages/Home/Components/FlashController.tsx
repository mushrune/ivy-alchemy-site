import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
    Backdrop,
    Button, IconButton, Paper,
    Typography
} from "@mui/material";
import {ButtonBack, ButtonNext, CarouselContext} from 'pure-react-carousel';
import {FlashPiece, FlashSheet} from "../Types";
import {TbArrowBigLeft, TbArrowBigRight} from "react-icons/tb";
import { CustomLinearProgress } from "../../../Components/Widgets/CustomLinearProgress";
import SheetInfo from "./SheetInfo";
import {Transition} from "@headlessui/react";

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

    function handleCarouselChange() {
        setCurrentSlide(carouselContext.state.currentSlide);
        const pieceIndex = carouselContext.state.currentSlide - 1
        if ( pieceIndex >= 0 ) {
            setCurrentPiece(flashSheet.flash_pieces[pieceIndex])
        } else {
            setCurrentPiece(null);
        }
    }
    const handleInfoClose = () => setInfoOpen(false)
    const handleInfoOpen = () => setInfoOpen(true)

    // ensures correct title and descriptor show on render
    useEffect( () => { handleCarouselChange() }, [] )

    // changes title and descriptor each time carousel state changes
    useEffect( () => {
        carouselContext.subscribe(handleCarouselChange);

        return () => carouselContext.unsubscribe(handleCarouselChange);
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
            <Transition
                show={ currentPiece !== null }
                className="transition-all duration-500"
                enter="ease-in-out" enterFrom="max-h-0 opacity-0" enterTo="max-h-10 opacity-100"
                leave="ease-out" leaveFrom="max-h-10 opacity-100" leaveTo="max-h-0 opacity-0"
            >
                <div className={`w-full overflow-hidden h-10 max-h-16 flex items-center`}>
                    <Button variant="outlined" size="small" onClick={handleInfoOpen} className="flex-1 lowercase italic mx-1 mt-auto">info</Button>
                    <Button variant="contained" size="small" onClick={handleInfoOpen} className="flex-1 lowercase italic mx-1 mt-auto">book</Button>
                </div>
            </Transition>
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