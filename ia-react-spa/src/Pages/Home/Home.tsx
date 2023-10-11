// npm imports
import React, { useState, useEffect } from 'react';
import {Autocomplete, Badge, Box, Button, Card, CircularProgress, Paper, TextField, Typography} from "@mui/material";
import { TbCirclePlus } from "react-icons/tb";
// project imports
import LeafSeperator from "../../Components/Widgets/LeafSeperator";
import { FlashSheet, SearchOption } from './Types'
import { computeSearchOptions, computeSelectedSheets } from "./Functions";
import SearchSelector from "./Components/SearchSelector";
import FlashContainer from "./Components/FlashContainer";
import { useLoaderData } from "react-router-dom";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import ToneSelector, { initialTone } from "./Components/ToneSelector";

export const homeLoader = () => {
    return fetch('/api/flash/sheets');
}


// TODO: Reducer function to manipulate state logic
const Home: React.FC = () => {

    // States for managing the search features
    const [ selectedOptions, setSelectedOptions ] = useState<SearchOption[] | null>(null);
    const [ selectedSheets, setSelectedSheets ] = useState<FlashSheet[]>([]);
    const [ flashSheets, setFlashSheets ] = useState<FlashSheet[]>([]);
    // States for managing call to API
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string>("");
    // Other state ( for background tone )
    const [ tone, setTone ] = useState<string>(initialTone)

    const handleSelectionChange = ( event: any, value: SearchOption[] | null ) => {
        setSelectedOptions(value)
        setSelectedSheets( computeSelectedSheets( value, flashSheets ))
    }

    const handleToneChange = ( value: string ) => setTone(value);

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
        <div>
            <Paper className="rounded-2xl px-2 overflow-hidden pt-1" elevation={3}>
                <SearchSelector
                    searchOptions={ computeSearchOptions(flashSheets) }
                    changeHandler={ handleSelectionChange }
                />
                <ToneSelector onChange={handleToneChange} />
                { selectedSheets.map( ( flashSheet, index ) => (
                    <FlashContainer tone={tone} flashSheet={flashSheet} index={index} key={index} showDivider={ selectedSheets.length - 1 != index } />
                ))}
            </Paper>
        </div>
    )
}

export default Home;