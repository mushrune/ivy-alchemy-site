import React, {useContext, useEffect, useState} from 'react';
import {
    Typography
} from "@mui/material";
import {ButtonBack, ButtonNext, CarouselContext} from 'pure-react-carousel';
import {FlashPiece, FlashSheet} from "../Types";
import {TbArrowBigLeft, TbArrowBigRight} from "react-icons/tb";
import { CustomLinearProgress } from "../../../Components/Widgets/CustomLinearProgress";

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

    return(
        <div>
            <CustomLinearProgress
                variant="determinate"
                value={getSliderProgress( currentSlide, flashSheet.flash_pieces.length )}
            />
            <div className="w-full h-10 flex items-center mt-2">
                <ButtonBack className="slider-navigator"><TbArrowBigLeft size={30} /></ButtonBack>
                { currentPiece === null ? (
                    <Typography variant="h4" className="mx-auto my-auto text-lg uppercase text-center">{flashSheet.title}</Typography>
                ) : (
                    <Typography className="italic lowercase w-full text-center">"{currentPiece?.title}"</Typography>
                )}
                <ButtonNext
                    className="slider-navigator"
                    onClick={() => console.log(currentPiece?.title)}
                ><TbArrowBigRight size={30} className="transform rotate-90" /></ButtonNext>
            </div>
        </div>
    )
}

export default FlashController;