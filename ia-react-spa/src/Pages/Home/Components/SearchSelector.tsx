import React, {useEffect, useState} from 'react';
import { Filter } from '../Types'
import {
    Autocomplete,
    AutocompleteProps,
    Box, CircularProgress,
    InputAdornment, styled,
    TextField,
    Typography,
    UseAutocompleteProps
} from "@mui/material";
import { capitalizeWords } from "../Functions";
import SearchFilter from "./SearchFilter";

interface props {
    changeHandler: ( event: any, value: Filter[] | null ) => void
    selectedFilters: Filter[] | null
}

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        textColor: 'white',
        '& fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
            borderRadius: 12
        },
        '&:hover fieldset': {
            borderColor: "white"
        }
    }
}));

const SearchSelector: React.FC<props> = (props) => {

    const [ open, setOpen ] = useState<boolean>(false);
    const [ filters, setFilters ] = useState<Filter[]>([]);
    const [ error, setError ] = useState<string>("");
    const loading = open && filters.length === 0;

    useEffect( () => {
        let active = true;

        if ( !loading ) {
            return undefined;
        }

        if ( filters.length === 0 ) {( async () => {
            let filters: Filter[] = [];

            // fetch search options here
            await fetch('/api/flash/search_filters')
                .then( response => response.json() )
                .then( data => data as Filter[] )
                .then( loadedFilters => {
                    filters = loadedFilters;
                })
                .catch( () => {
                    setError("Unable to reach server. Please make sure you are connected to the internet.")
                })
                .finally( () => {
                })

            // order filters by count
            filters = filters.sort( (a, b) => b.count - a.count );

            if (active) { setFilters(filters) }
        })()};

        return () => {
            active = false;
        }
    }, [loading])

    return(
        <div className="flex-1">
            <Autocomplete
                value={ props.selectedFilters === null ? [] : props.selectedFilters }
                disableCloseOnSelect
                onChange={ props.changeHandler }
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                loading={loading}
                isOptionEqualToValue={ (filter, value) => filter.label === value.label }
                multiple
                size="small"
                disablePortal
                options={filters}
                getOptionLabel={(filter) => filter.label }
                id="flash-search"
                renderOption={(props, filter) => (
                    <Box component="li" {...props} className="px-2" sx={{zIndex: 1}}>
                        <SearchFilter filter={filter} />
                        <div className="bg-primary border-0 w-full h-px" />
                    </Box>
                )}
                renderInput={ (params) => <StyledTextField
                    {...params}
                    variant="outlined"
                    color="primary"
                    label="search"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                { loading ? <CircularProgress color="inherit" size={20} /> : null }
                                { params.InputProps.endAdornment }
                            </React.Fragment>
                        )
                    }}
                /> }
            />
        </div>
    )
}

export default SearchSelector;