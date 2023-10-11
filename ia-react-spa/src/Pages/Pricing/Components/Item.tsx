import React from 'react';
import { PricedItem } from "../Types";
import {Typography} from "@mui/material";

interface props {
    item: PricedItem
}

const Item: React.FC<props> = ({ item }) => {
    return(
        <div className="flex items-center">
            <Typography variant="h6">{item.title}</Typography>
            <div className="flex-1 h-px bg-primary mx-2" />
            <Typography variant="h6" className="italic font-bold">${item.price}</Typography>
        </div>
    )
}

export default Item;