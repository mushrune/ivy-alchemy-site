import React, {useEffect, useMemo, useState} from 'react';
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import LeafSeparator from "../../../Components/Widgets/LeafSeparator";
import { FlashSheet } from "../../../Types";
import FlashController from "./FlashController";

interface props {
    flashSheet: FlashSheet;
    showDivider: boolean;
    index: number;
    tone: string;
}

const framePaths: string[] = [
    "./flash_frames/frame_1.png",
    "./flash_frames/frame_2.png"
]

function getRandomFramePath(): string {
    const randomIndex = Math.floor( Math.random() * framePaths.length )
    return framePaths[randomIndex]
}

const FlashContainer: React.FC<props> = ({ flashSheet, showDivider, index, tone }) => {

    // bool that shows if the sheet's pieces have been filtered. The component behaves differently if this is true.
    const isFiltered = flashSheet.piece_ids.length > flashSheet.flash_pieces.length
    const framePath: string = useMemo(() => getRandomFramePath(),[] );

    const [ flashSheetState, setFlashSheetState ] = useState<FlashSheet>( flashSheet );

    useEffect( () => {
        setFlashSheetState( flashSheet )
    }, [ flashSheetState, flashSheet ] )

    return(
        <div className={`
                w-full h-fit overflow-hidden p-0 sm:px-4 
                ${ !showDivider ? "pb-4" : "pb-2" }
            `}
            key={index}>
            <CarouselProvider
                naturalSlideHeight={30}
                naturalSlideWidth={30}
                totalSlides={ flashSheet.flash_pieces.length + 1 }
                isIntrinsicHeight
                currentSlide={ isFiltered ? 1 : 0 }
            >
                <div className="relative w-full">
                    <div className="w-full">
                        <Slider
                            className="
                            relative
                            rounded-md
                            select-none
                            absolute top-0 right-0 left-0 bottom-0
                            w-full overflow-hidden
                        "
                            style={{zIndex: 10, transition: "transform 330ms ease-in-out"}}
                            preventVerticalScrollOnTouch
                            moveThreshold={0.1}
                        >
                            <Slide index={0} className="">
                                <img className="w-full rounded-md" src={flashSheet.url} alt={flashSheet.title} />
                            </Slide>
                            { flashSheet.flash_pieces.map( ( piece, index ) => (
                                <Slide index={index + 1} key={index} className="">
                                    <img className="w-full" src={piece.url} alt={piece.title} />
                                </Slide>
                            ))}
                        </Slider>
                    </div>
                    <img
                        className="
                            w-full rounded-md
                            absolute top-0 right-0 left-0 bottom-0
                        "
                        style={{ backgroundColor: tone }}
                        src={framePath}
                        alt="flash frame"
                    />
                </div>
                <FlashController flashSheet={flashSheetState} />
            </CarouselProvider>
            { showDivider && <LeafSeparator /> }
        </div>
    )
}

export default FlashContainer;