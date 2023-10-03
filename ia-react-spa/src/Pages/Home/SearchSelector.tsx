import React from 'react';
import { SearchOption, FlashSheet } from './Types'
import {Autocomplete, AutocompleteProps, Box, TextField, Typography, UseAutocompleteProps} from "@mui/material";
import { capitalizeWords } from "./Functions";

interface props {
    changeHandler: ( event: any, value: SearchOption[] | null ) => void
    searchOptions: SearchOption[]
}

const SearchSelector: React.FC<props> = (props) => {
    return(
        <Autocomplete
            onChange={props.changeHandler}
            isOptionEqualToValue={ (option, value) => option.label === value.label }
            multiple
            className="my-2 rounded-lg"
            size="small"
            disablePortal
            options={props.searchOptions}
            getOptionLabel={(option) => capitalizeWords( option.label ) }
            id="flash-search"
            renderOption={(props, option) => (
                <Box component="li" {...props} className="flex flex-col px-2">
                    <Typography variant="h6">{capitalizeWords(option.label)}</Typography>
                    <Typography variant="subtitle2" className="italic ml-2">{option.ids.length} { option.ids.length > 1 ? "flash sheets" : "flash sheet" }</Typography>
                    <div className="bg-primary border-0 w-full h-px" />
                </Box>
            )}
            renderInput={ (params) => <TextField
                variant="outlined"
                label="search"
                {...params}
            /> }
        />
    )
}

export default SearchSelector;