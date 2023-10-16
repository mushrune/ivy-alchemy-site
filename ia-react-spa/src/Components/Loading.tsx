import React from 'react';
import {CircularProgress, LinearProgress, Paper, Typography} from "@mui/material";

const Loading: React.FC = () => {
    return(
        <Paper className="m-auto mt-40 w-fit flex flex-col items-center px-4 pt-2 pb-4" elevation={2}>
            <img src="./ripley.png" alt="ripley" className="w-20 mt-4 animate-pulse" style={{ filter: "grayscale(100%) invert(90%) sepia(15%) saturate(1157%) hue-rotate(75deg) brightness(99%) contrast(89%)" }} />
            <Typography variant="h5" color="primary" className="m-2">loading...</Typography>
            <LinearProgress className="w-full" />
        </Paper>
    )
}

export default Loading