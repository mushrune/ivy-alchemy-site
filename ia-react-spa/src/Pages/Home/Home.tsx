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
import {Filter, FlashSheet, SearchOption, TonePosition} from './Types'
import { computeSearchOptions, computeSelectedSheets } from "./Functions";
import SearchSelector from "./Components/SearchSelector";
import FlashContainer from "./Components/FlashContainer";
import { useLoaderData } from "react-router-dom";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import ToneSelector, { initialTone } from "./Components/ToneSelector";
import {CgClose} from "react-icons/cg";
import {CustomLinearProgress} from "../../Components/Widgets/CustomLinearProgress";
import MarqueeText from "../../Components/Widgets/MarqueeText";

export const homeLoader = () => {
    return fetch('/api/flash/sheets');
}

enum selectorState {
    none,
    tone,
    search
};

// TODO: Reducer function to manipulate state logic'
const Home: React.FC = () => {

    // States for managing the search features
    const [ filters, setFilters ] = useState<Filter[] | null>(null);
    const [ flashSheets, setFlashSheets ] = useState<FlashSheet[]>([]);
    // States for managing call to API
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string>("");
    // Page states
    const [ tonePosition, setTonePosition ] = useState<TonePosition>(initialTone)
    const [ selector, setSelector ] = useState<selectorState>(selectorState.none)

    const handleSelectionChange = ( event: any, value: Filter[] | null ) => {
        setFilters(value)
        //setSelectedSheets( computeSelectedSheets( value, flashSheets ))
    }

    const handleToneChange = ( value: TonePosition ) => setTonePosition(value);

    // Side effect for fetching data from the API
    useEffect( () => {
        ( async () => {
            setIsLoading(true);
            const raw = await fetch('/api/flash/sheets', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
            });
            const content = await raw.json();
            const sheets = JSON.parse( content ) as FlashSheet[];
            setFlashSheets(sheets);
            setIsLoading(false);
        })();
    },[filters])

    if ( error ) { return( <Error message={error} /> ) }

    // These two states are for the sheets loading
    const flashContainer = (
        <div>
            { flashSheets.map( ( flashSheet, index ) => (
                <FlashContainer tone={tonePosition.tone} flashSheet={flashSheet} index={index} key={index} showDivider={ flashSheets.length - 1 != index } />
            ))}
        </div>
    )
    const loading = (
        <div className="m-auto mt-32 mb-40 w-fit flex flex-col items-center">
            <img src="./ripley.png" alt="ripley" className="w-20 mt-4 animate-pulse" style={{ filter: "grayscale(100%) invert(90%) sepia(15%) saturate(1157%) hue-rotate(75deg) brightness(99%) contrast(89%)" }} />
            <Typography variant="h5" color="primary" className="m-2">loading...</Typography>
            <CustomLinearProgress className="w-full" />
        </div>
    )

    // These states are for the 3 selector states, one for the tone slider, the search bar, and with neither selected.
    const selectorStateNone = (
        <span className="flex justify-between items-center w-full h-10">
                        <IconButton onClick={() => setSelector(selectorState.tone)} className="items-center">
                            <div style={{ height: 35, width: 35 }} className="relative">
                                <div className="
                                    absolute top-0 right-0 left-0 bottom-0 rounded-full
                                " style={{ backgroundColor: tonePosition.tone }} />
                                <TbDropCircle size={35} className="
                                    absolute top-0 right-0 left-0 bottom-0 m-auto
                                    text-primary hover:text-white transition duration-300
                                " />
                            </div>
                        </IconButton>
                        <MarqueeText text="flash sheets" />
                        <IconButton onClick={() => setSelector(selectorState.search)} className="text-primary">
                            <TbSearch size={30} />
                        </IconButton>
                    </span>
    );
    const selectorStateSearch = (
        <span className="flex justify-between items-center w-full h-fit">
                        <SearchSelector
                            changeHandler={ handleSelectionChange }
                            selectedFilters={ filters }
                        />
                        <IconButton onClick={() => setSelector(selectorState.none)}>
                            <CgClose className="text-primary hover:text-white transition duration-300" size={25} />
                        </IconButton>
                    </span>
    );
    const selectorStateTone = (
        <span className="flex items-center w-full h-10">
                        <IconButton onClick={() => setSelector(selectorState.none)}>
                            <CgClose className="text-primary hover:text-white transition duration-300" size={25} />
                        </IconButton>
                        <ToneSelector onChange={handleToneChange} initialValue={tonePosition.position} />
                    </span>
    );
    return(
        <Paper className="rounded-2xl px-2 overflow-hidden pt-1 max-w-2xl mx-auto flex flex-col" elevation={0}>
            <div className="w-full pt-2 pb-4 sm:p-4">
                { selector == selectorState.none && selectorStateNone }
                { selector == selectorState.search && selectorStateSearch }
                { selector == selectorState.tone && selectorStateTone }
            </div>
            { isLoading ? loading : flashContainer }
        </Paper>
    )
}

export default Home;