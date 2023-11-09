import React from 'react';
import { Filter } from "../Types";
import {Chip, Typography} from "@mui/material";

interface props {
    filter: Filter;
}

const SearchFilter: React.FC<props> = ({filter}) => {
    console.log(filter.type);

    // filter type sheet
    if ( filter.type === "sheet_title" ) return(
        <div className="flex items-center">
            <Typography variant="h6" className="lowercase">{filter.label}</Typography>
            <div className="flex-1" />
            <Chip label={`${ filter.count } ${ filter.count > 1 ? "pieces" : "piece" }`} size="small" />
        </div>
    );

    // filter type piece
    if ( filter.type === "piece_title") return(
        <div className="flex items-center">
            <Typography variant="h6" className="lowercase italic font-normal">"{filter.label}"</Typography>
            <div className="flex-1" />
            <Chip label="flash piece" size="small" className="mr-1 italic" />
        </div>
    );

    // filter type sheet tag
    if ( filter.type === "sheet_tag" ) return(
        <div className="flex items-center">
            <Typography variant="h6" className="lowercase font-normal">{filter.label}</Typography>
            <div className="flex-1" />
            <Chip label={`${filter.count} ${ filter.count > 1 ? "sheets" : "sheet" }`} size="small" />
        </div>
    );

    // filter type tag ( default )
    return(
        <div className="flex items-center">
            <Typography variant="h6" className="lowercase font-normal">{filter.label}</Typography>
            <div className="flex-1" />
            <Chip label={`${filter.count} ${ filter.count > 1 ? "pieces" : "piece" }`} size="small" />
        </div>
    );
}

export default SearchFilter;