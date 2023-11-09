import React from 'react';
import { Slider } from "@mui/material";
import { TonePosition } from "../Types";
import {useToneContext} from "../Providers/ToneProvider";

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

const initPos = ( Math.random() / 3 ) + 0.33
export const initialTone: TonePosition = { color: getToneFromSliderValue( initPos ), position: initPos } as TonePosition


const ToneSelector: React.FC = () => {
    const { tone, setTone } = useToneContext();

    const handleSliderChange = ( event: Event, newValue: number | number[] ) => {
        const value = newValue as number;
        const selectedTone = getToneFromSliderValue( value )
        setTone( { position: value, color: selectedTone } as TonePosition )
    }

    return(
        <div className="w-full flex justify-center px-4">
            <Slider value={tone.position} step={0.01} onChange={handleSliderChange} sx={{ color: tone }} min={0} max={1} className="w-[95%]" />
        </div>
    )
}

export default ToneSelector