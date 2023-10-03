// npm imports
import React, { useState, useEffect } from 'react';
import {Autocomplete, Badge, Box, Button, Card, CircularProgress, Paper, TextField, Typography} from "@mui/material";
import { TbCirclePlus } from "react-icons/tb";
// project imports
import LeafSeperator from "../../Components/Widgets/LeafSeperator";
import { FlashSheet, SearchOption } from './Types'
import { computeSearchOptions, computeSelectedSheets } from "./Functions";
import SearchSelector from "./SearchSelector";
import FlashContainer from "./FlashContainer";
import { useLoaderData } from "react-router-dom";

export const homeLoader = () => {
    return fetch('/api/flash/sheets');
}

const Home: React.FC = () => {

    const [ selectedOptions, setSelectedOptions ] = useState<SearchOption[] | null>(null);
    const [ selectedSheets, setSelectedSheets ] = useState<FlashSheet[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string>("");
    const [ flashSheets, setFlashSheets ] = useState<FlashSheet[]>([]);

    const handleSelectionChange = ( event: any, value: SearchOption[] | null ) => setSelectedOptions(value)

    // this effect keeps the selected sheets state synced with the selected options state
    useEffect(() => {
        setSelectedSheets( computeSelectedSheets( selectedOptions, flashSheets ) )
    }, [selectedOptions] )

    // this effect fetches the flash sheet data from the API
    useEffect( () => {

        fetch('/api/flash/sheets')
            .then( response => response.json() )
            .then( data => data as FlashSheet[] )
            .then( flashSheets => {
                setFlashSheets(flashSheets)
                setSelectedSheets(flashSheets)
                setIsLoading(false)
            })
            .catch( reason => {
                setError(reason)
            });
    },[])

    if ( isLoading ) {
        return(
            <div className="mx-auto">
                <CircularProgress />
            </div>
        )
    }

    return(
        <div className="w-[95%] max-w-7xl mx-auto">
            <SearchSelector
                searchOptions={ computeSearchOptions(flashSheets) }
                changeHandler={ handleSelectionChange }
            />
            <Paper className="rounded-lg px-2 overflow-hidden pt-4" elevation={3}>
                { selectedSheets.map( ( flashSheet, index ) => (
                    <FlashContainer flashSheet={flashSheet} index={index} key={index} showDivider={ selectedSheets.length - 1 != index } />
                ))}
            </Paper>
        </div>
    )
}

export default Home;