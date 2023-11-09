// npm imports
import React, { useState, useEffect } from 'react';
import {
    IconButton,
    Paper
} from "@mui/material";
import {TbArrowBackUp, TbSearch} from "react-icons/tb";
// project imports
import { Filter } from './Types'
import SearchSelector from "./Components/SearchSelector";
import FlashContainer from "./Components/FlashContainer";
import Error from "../../Components/Error";
import ToneSelector from "../../Components/ToneSelector";
import { CgClose } from "react-icons/cg";
import MarqueeText from "../../Components/Widgets/MarqueeText";
import { FaRegFaceMehBlank } from "react-icons/fa6";
import LoadingWidget from "../../Components/Widgets/LoadingWidget";
import { useToneContext } from "../../Providers/ToneProvider";
import { FlashSheet } from "../../Types";

export const homeLoader = () => {
    return fetch('/api/flash/sheets');
}

enum selectorState {
    none,
    tone,
    search
}

// TODO: Reducer function to manipulate state logic
const Home: React.FC = () => {

    // States for managing the search features
    const [ filters, setFilters ] = useState<Filter[] | null>(null);
    const [ flashSheets, setFlashSheets ] = useState<FlashSheet[]>([]);
    // States for managing call to API
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string>("");
    // Page states
    const [ selector, setSelector ] = useState<selectorState>(selectorState.none)

    const { tone } = useToneContext();

    const handleSelectionChange = ( event: any, value: Filter[] | null ) => setFilters(value)

    // Side effect for fetching data from the API
    useEffect( () => {
        ( async () => {
            setIsLoading(true);
            let sheets: FlashSheet[] = [];
            try {
                const raw = await fetch('/api/flash/sheets', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filters)
                });
                const content = await raw.json();
                sheets = JSON.parse(content) as FlashSheet[];
            } catch ( e ) {
                setError("Could not load flash sheets. Please ensure you are connected to the internet. Meow!");
                console.log(e)
            }

            setFlashSheets(sheets);
            setIsLoading(false);
        })();
    },[filters])

    if ( error ) { return( <Error message={error} /> ) }

    // These two states are for the sheets loading
    const flashContainer = (
        <div>
            { flashSheets.map( ( flashSheet, index ) => (
                <FlashContainer tone={tone.color} flashSheet={flashSheet} index={index} key={index} showDivider={ flashSheets.length - 1 !== index } />
            ))}
        </div>
    )

    // These states are for the 3 selector states, one for the tone slider, the search bar, and with neither selected.
    const selectorStateNone = (
        <span className="flex justify-between items-center w-full h-10">
                        <IconButton onClick={() => setSelector(selectorState.tone)} className="items-center">
                            <div style={{ height: 35, width: 35 }} className="relative">
                                <div className="
                                    absolute top-0 right-0 left-0 bottom-0 rounded-full
                                " style={{ backgroundColor: tone?.color }} />
                                <FaRegFaceMehBlank size={30} className={`
                                    absolute top-0 right-0 left-0 bottom-0 m-auto
                                    ${ tone?.position <= 0.5 ? "text-primary" : "text-paper-color" }
                                    transition duration-300
                                `} />
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
                            <TbArrowBackUp className="text-primary hover:text-white transition duration-300" size={25} />
                        </IconButton>
                    </span>
    );
    const selectorStateTone = (
        <span className="flex items-center w-full h-10">
                        <IconButton onClick={() => setSelector(selectorState.none)}>
                            <CgClose className="text-primary hover:text-white transition duration-300" size={25} />
                        </IconButton>
                        <ToneSelector />
                    </span>
    );
    return(
        <Paper className="rounded-2xl px-2 overflow-hidden pt-1 max-w-2xl mx-auto flex flex-col" elevation={0}>
            <div className="w-full pt-2 pb-4 sm:p-4">
                { selector === selectorState.none && selectorStateNone }
                { selector === selectorState.search && selectorStateSearch }
                { selector === selectorState.tone && selectorStateTone }
            </div>
            { isLoading ? <LoadingWidget /> : flashContainer }
        </Paper>
    )
}

export default Home;