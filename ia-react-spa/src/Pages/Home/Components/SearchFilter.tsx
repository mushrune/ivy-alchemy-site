import React from 'react';
import { Filter } from "../Types";
import {Chip, Typography} from "@mui/material";

interface props {
    filter: Filter;
}

const SearchFilter: React.FC<props> = ({filter}) => {
    // filter type sheet
    if ( filter.type === "sheet" ) return(
        <div className="flex items-center">
            <Chip label="sheet" size="small" className="mr-1 italic" />
            <Typography variant="h6" className="lowercase">{filter.label}</Typography>
            <div className="flex-1" />
            <Chip label={`${ filter.count } ${ filter.count > 1 ? "tattoos" : "tattoo" }`} size="small" />
        </div>
    );

    // filter type piece
    if ( filter.type === "piece") return(
        <div className="flex items-center">
            <Chip label="piece" size="small" className="mr-1 italic" />
            <Typography variant="h6" className="lowercase">{filter.label}</Typography>
            <div className="flex-1" />
        </div>
    );

    // filter type tag ( default )
    return(
        <div className="flex items-center">
            <Chip label="tag" size="small" className="mr-1 italic" />
            <Typography variant="h6" className="lowercase">{filter.label}</Typography>
            <div className="flex-1" />
            <Chip label={filter.count} size="small" />
        </div>
    );
}

export default SearchFilter;