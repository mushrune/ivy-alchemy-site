import React from 'react';
import { SearchOption } from '../Types'
import {
    Autocomplete,
    AutocompleteProps,
    Box,
    InputAdornment, styled,
    TextField,
    Typography,
    UseAutocompleteProps
} from "@mui/material";
import { capitalizeWords } from "../Functions";

interface props {
    changeHandler: ( event: any, value: SearchOption[] | null ) => void
    searchOptions: SearchOption[],
    selectedOptions: SearchOption[] | null
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

    return(
        <div className="flex-1">
            <Autocomplete
                value={ props.selectedOptions === null ? [] : props.selectedOptions }
                onChange={props.changeHandler}
                isOptionEqualToValue={ (option, value) => option.label === value.label }
                multiple
                className=""
                size="small"
                disablePortal
                options={props.searchOptions}
                getOptionLabel={(option) => capitalizeWords( option.label ) }
                id="flash-search"
                renderOption={(props, option) => (
                    <Box component="li" {...props} className="px-2" sx={{zIndex: 3}}>
                        <div className="flex items-center">
                            <Typography variant="h6" className="lowercase">{option.label}</Typography>
                            <Typography variant="subtitle2" className="italic ml-2 flex-1 text-right">{option.ids.length} { option.ids.length > 1 ? "tattoos" : "tattoo" }</Typography>
                        </div>
                        <div className="bg-primary border-0 w-full h-px" />
                    </Box>
                )}
                renderInput={ (params) => <StyledTextField
                    variant="outlined"
                    color="primary"
                    label="search"
                    {...params}
                /> }
            />
        </div>
    )
}

export default SearchSelector;