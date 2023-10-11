import React from 'react';
import {Paper, Typography} from "@mui/material";
import {TbAlertTriangle} from "react-icons/tb";

interface props {
    message?: string;
}

const Error: React.FC<props> = ({ message}) => {
    return(
        <Paper className="p-4">
            <div className="flex items-center">
                <TbAlertTriangle size={30} className="mr-2 text-primary" />
                <Typography variant="h6" color="primary" >Oh no! There was a problem.</Typography>
            </div>
            <Typography variant="body1" color="error"> {`${message}`}</Typography>
        </Paper>
    )
}

export default Error;