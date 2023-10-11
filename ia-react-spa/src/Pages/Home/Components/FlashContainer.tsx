import React, {useState} from 'react';
import { Button, Typography, Slider as MuiSlider } from "@mui/material";
import { CarouselProvider, DotGroup, ImageWithZoom, Slide, Slider } from 'pure-react-carousel';
import LeafSeperator from "../../../Components/Widgets/LeafSeperator";
import { FlashSheet } from "../Types";

interface props {
    flashSheet: FlashSheet;
    showDivider: boolean;
    index: number;
    tone: string;
}

const FlashContainer: React.FC<props> = ({ flashSheet, showDivider, index, tone }) => {
    return(
        <div className={`
                w-full h-fit overflow-hidden p-0 sm:px-4 ${ !showDivider && "pb-4" }
            `}
            key={index}>
            <div className="flex flex-around items-center mb-2 px-2">
                <Typography variant="h6" className="w-full text-left text-md sm:text-xl">{flashSheet.title}</Typography>
                <Typography variant="h6" className="w-fit text-sm sm:text-xl italic color-primary">{flashSheet.flash_pieces.length}</Typography>
                {/*<Button variant="outlined" size="small" className="nav-button px-8" startIcon={<TbCirclePlus size={20} />} sx={{zIndex: 0}}>browse</Button>*/}
            </div>
            <CarouselProvider
                naturalSlideHeight={1}
                naturalSlideWidth={1}
                totalSlides={ flashSheet.flash_pieces.length + 1 }
                isIntrinsicHeight
                lockOnWindowScroll
            >
                <Slider className="w-[95%] mx-auto">
                    <Slide index={0} className="p-1">
                        <img className="w-full rounded-md max-w-lg mx-auto" src={flashSheet.url} alt={flashSheet.title} />
                        <Typography variant="subtitle2" className="italic text-sm w-full text-right text-primary">{flashSheet.flash_pieces.length} { flashSheet.flash_pieces.length > 1 ? "tattoos" : "tattoo" }</Typography>
                    </Slide>
                    { flashSheet.flash_pieces.map( ( piece, index ) => (
                        <Slide index={index + 1} key={index} className="p-1">
                            <img className="w-full rounded-md max-w-lg mx-auto" style={{ backgroundColor: tone }} src={piece.url} alt={piece.title} />
                            <div className="w-full flex flex-around items-center">
                                <Typography variant="subtitle2" className="italic text-sm flex-1 text-primary">"{piece.title}"</Typography>
                                <Typography variant="subtitle2" className="text-sm w-fit text-primary">{piece.size_range}</Typography>
                            </div>
                        </Slide>
                    ))}
                </Slider>
            </CarouselProvider>
            { showDivider && <LeafSeperator /> }
        </div>
    )
}

export default FlashContainer;