// npm imports
import React, { useState, useEffect } from 'react';
import {
    Autocomplete,
    Badge,
    Box,
    Button,
    Card,
    CircularProgress,
    IconButton,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {TbCirclePlus, TbDropCircle, TbDroplet, TbSearch} from "react-icons/tb";
// project imports
import LeafSeperator from "../../Components/Widgets/LeafSeperator";
import {FlashSheet, SearchOption, TonePosition} from './Types'
import { computeSearchOptions, computeSelectedSheets } from "./Functions";
import SearchSelector from "./Components/SearchSelector";
import FlashContainer from "./Components/FlashContainer";
import { useLoaderData } from "react-router-dom";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import ToneSelector, { initialTone } from "./Components/ToneSelector";
import {CgClose} from "react-icons/cg";

export const homeLoader = () => {
    return fetch('/api/flash/sheets');
}

enum selectorState {
    none,
    tone,
    search
};

// TODO: Reducer function to manipulate state logic'
// TODO: Fix carousel implementation
// TODO: Condense slider and search
const Home: React.FC = () => {

    // States for managing the search features
    const [ selectedOptions, setSelectedOptions ] = useState<SearchOption[] | null>(null);
    const [ selectedSheets, setSelectedSheets ] = useState<FlashSheet[]>([]);
    const [ flashSheets, setFlashSheets ] = useState<FlashSheet[]>([]);
    // States for managing call to API
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string>("");
    // Page states
    const [ tonePosition, setTonePosition ] = useState<TonePosition>(initialTone)
    const [ selector, setSelector ] = useState<selectorState>(selectorState.none)

    const handleSelectionChange = ( event: any, value: SearchOption[] | null ) => {
        setSelectedOptions(value)
        setSelectedSheets( computeSelectedSheets( value, flashSheets ))
    }

    const handleToneChange = ( value: TonePosition ) => setTonePosition(value);

    // Side effect for fetching data from the API
    useEffect( () => {
        fetch('/api/flash/sheets')
            .then( response => response.json() )
            .then( data => data as FlashSheet[] )
            .then( flashSheets => {
                setFlashSheets(flashSheets)
                setSelectedSheets(flashSheets)
            })
            .catch( () => {
                setError("Unable to reach server. Please make sure you are connected to the internet.")
            })
            .finally( () => {
                setIsLoading(false)
            })
    },[])

    if ( error ) { return( <Error message={error} /> ) }

    if ( isLoading ) { return( <Loading /> ) }

    return(
        <Paper className="rounded-2xl px-2 overflow-hidden pt-1 max-w-2xl mx-auto" elevation={3}>
            {/* Container for the search selector and tone selector*/}
            <div className="w-full p-2">
                { selector == selectorState.none && (
                    <span className="flex justify-between items-center w-full h-10">
                        <IconButton onClick={() => setSelector(selectorState.tone)} className="items-center">
                            <div style={{ height: 30, width: 30 }} className="relative">
                                <div className="
                                    absolute top-0 right-0 left-0 bottom-0 rounded-full
                                " style={{ backgroundColor: tonePosition.tone }} />
                                <TbDropCircle size={30} className="
                                    absolute top-0 right-0 left-0 bottom-0 m-auto
                                    text-primary hover:text-white transition duration-300
                                " />
                            </div>
                        </IconButton>
                        <Typography variant="h5" className="italic text-primary text-2xl sm:text-4xl tracking-wide">flash</Typography>
                        <IconButton onClick={() => setSelector(selectorState.search)} className="text-primary">
                            <TbSearch size={25} />
                        </IconButton>
                    </span>
                )}
                { selector == selectorState.search && (
                    <span className="flex justify-between items-center w-full h-fit">
                        <SearchSelector
                            searchOptions={ computeSearchOptions(flashSheets) }
                            changeHandler={ handleSelectionChange }
                            selectedOptions={ selectedOptions }
                        />
                        <IconButton onClick={() => setSelector(selectorState.none)}>
                            <CgClose className="text-primary hover:text-white transition duration-300" size={25} />
                        </IconButton>
                    </span>
                )}
                { selector == selectorState.tone && (
                    <span className="flex items-center w-full h-10">
                        <IconButton onClick={() => setSelector(selectorState.none)}>
                            <CgClose className="text-primary hover:text-white transition duration-300" size={25} />
                        </IconButton>
                        <ToneSelector onChange={handleToneChange} initialValue={tonePosition.position} />
                    </span>
                )}
            </div>
            { selectedSheets.map( ( flashSheet, index ) => (
                <FlashContainer tone={tonePosition.tone} flashSheet={flashSheet} index={index} key={index} showDivider={ selectedSheets.length - 1 != index } />
            ))}
        </Paper>
    )
}

export default Home;