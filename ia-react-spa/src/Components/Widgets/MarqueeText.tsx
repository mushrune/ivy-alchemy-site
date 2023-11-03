import React, {useCallback, useEffect, useState} from 'react';
import {Typography, useMediaQuery} from "@mui/material";
import Options from "../../Theme/MUITheme";

interface props {
    text: string;
}

const MarqueeText: React.FC<props> = ({text}) => {
    // TODO: Inherit color of shaded transparent border elements to inherit from the main element ( solves elevated paper issue )

    const [ limitMotion, setLimitMotion ] = useState<boolean>(false);
    const [ textNode, setTextNode ] = useState<HTMLElement | null>(null);
    const [ parentWidth, setParentWidth ] = useState<number>(0);

    // callback ref for text width
    const textRef = useCallback( ( node: HTMLElement | null ) => setTextNode(node), [setTextNode])
    // this function sets the parent width given the text node
    const setParentWidthState = () => {
        if ( textNode !== null ) {
            const height = textNode.getBoundingClientRect().width;
            setParentWidth(height)
        }
    }
    // side effect for managing component width
    useEffect( () => {
        if ( textNode !== null ) {
            const observer = new ResizeObserver(setParentWidthState);
            observer.observe(textNode);

            return () => {
                observer.disconnect()
            }
        }
    });

    // find if user has motion limited
    const limitMotionMatches = useMediaQuery('(prefers-reduced-motion: reduce)');
    // side effect for detecting if the user has motion limited
    useEffect( () => {
        if ( limitMotionMatches ) { setLimitMotion(true) }
    }, [])
    // if the user prefers limited motion, disable the marque and return something else that doesn't move.
    if ( limitMotion ) { return(
        <Typography variant="h5" className="px-4 whitespace-nowrap italic text-primary text-2xl sm:text-4xl tracking-wide select-none">{text}</Typography>
    )}

    return(
        <div className="overflow-hidden h-fit flex relative mx-auto" style={{ width: parentWidth }}>
            <Typography ref={textRef} variant="h5" className="animate-marquee_start px-4 whitespace-nowrap italic text-primary text-3xl sm:text-4xl tracking-wide select-none">{text}</Typography>
            <Typography variant="h5" className="animate-marquee_end px-4 absolute top-0 whitespace-nowrap italic text-primary text-3xl sm:text-4xl tracking-wide select-none">{text}</Typography>
            <div className="absolute left-0 w-10 h-full" style={{ background: `linear-gradient(to left, transparent, ${Options.palette?.background?.paper})`}} />
            <div className="absolute right-0 w-10 h-full" style={{ background: `linear-gradient(to right, transparent, ${Options.palette?.background?.paper})`}} />
        </div>
    )
}

export default MarqueeText