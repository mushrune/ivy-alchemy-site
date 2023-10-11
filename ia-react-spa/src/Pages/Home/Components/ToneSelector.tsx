import React, { useState } from 'react';
import {createMuiTheme, createTheme, Slider as MuiSlider, styled} from "@mui/material";

const tones = [
    "#3b2219",
    "#a16e4b",
    "#d4aa78",
    "#e6bc98",
    "#ffe7d1"
];

// functions for converting between hex and rgb
function hexToRgb( hex: string ): number[] {
    hex = hex.replace("#", "")
    var bigint = parseInt( hex, 16 );
    return [
        ( bigint >> 16 ) & 255,
        ( bigint >> 8 ) & 255,
        bigint & 255
    ]
}
function rgbToHex( rgb: number[] ): string {
    const hex = rgb.map( ( color ) => {
        const hexColor = color.toString(16);
        return hexColor.length === 1 ? "0" + hexColor : hexColor;
    } )
    return `#${hex[0]}${hex[1]}${hex[2]}`;
}
// given two rgb colors, this function finds a value between them given a position argument between 0 and 1
function interpolateRgbPair( position: number, startRgb: number[], endRgb: number[] ): number[] {
    var interpolatedRgb: number[] = [ 0, 0, 0 ]
    for ( let i = 0; i < 3; i++ ) {
        const diff = Math.abs( startRgb[i] - endRgb[i] )
        interpolatedRgb[i] = Math.floor( diff * position ) + startRgb[i]
    }
    return interpolatedRgb
}

// this function transforms a value from 0 to 1 into an interpolated color from the given tone spectrum
function getToneFromSliderValue( value: number ): string {
    const position: number = value * ( tones.length - 1 )
    const previousColorIndex = Math.floor( position )
    const nextColorIndex = Math.ceil( position )
    const intervalPosition = position - previousColorIndex

    const previousColorRgb: number[] = hexToRgb( tones[previousColorIndex] )
    const nextColorRbg: number[] = hexToRgb( tones[nextColorIndex] )
    const interpolatedRgb: number[] = interpolateRgbPair( intervalPosition, previousColorRgb, nextColorRbg )
    return rgbToHex( interpolatedRgb )
}

export const initialTone: string = getToneFromSliderValue( 0.5 );

interface props {
    onChange: ( value: string ) => void;
}

const ToneSelector: React.FC<props> = ({ onChange }) => {
    const [ value, setValue ] = useState<number>( 0.5 );
    const [ tone, setTone ] = useState<string>( getToneFromSliderValue( 0.5 ) )

    const handleSliderChange = ( event: Event, newValue: number | number[] ) => {
        const value = newValue as number;
        onChange(getToneFromSliderValue(value))
        setTone( getToneFromSliderValue( value ))
        setValue(value)
    }

    return(
        <div className="w-full flex justify-center" style={{ "--slider-color": tone } as React.CSSProperties }>
            <MuiSlider value={value} step={0.01} onChange={handleSliderChange} sx={{ backgroundColor: tone }} min={0} max={1} className="w-[95%]" />
        </div>
    )
}

export default ToneSelector