import {Typography} from "@mui/material";
import {CustomLinearProgress} from "./CustomLinearProgress";
import React, {ReactNode} from "react";

const LoadingWidget: React.FC = () => { return(
    <div className="m-auto mt-32 mb-40 w-fit flex flex-col items-center">
        <img src="./ripley.png" alt="ripley" className="w-20 mt-4 animate-pulse"
             style={{filter: "grayscale(100%) invert(90%) sepia(15%) saturate(1157%) hue-rotate(75deg) brightness(99%) contrast(89%)"}}/>
        <Typography variant="h5" color="primary" className="m-2">loading...</Typography>
        <CustomLinearProgress className="w-full"/>
    </div>
)}

export default LoadingWidget;