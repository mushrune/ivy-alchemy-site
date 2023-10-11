import React, { ReactNode } from 'react';
import {IconType} from "react-icons";
import {Paper, Typography} from "@mui/material";
import {TbFlare} from "react-icons/tb";
import LeafSeperator from "./Widgets/LeafSeperator";

interface props {
    title: string,
    icon: ReactNode,
    children: ReactNode
}

const PageContainer: React.FC<props> = ({ title, icon, children }) => {
    return(
        <Paper className="p-4 rounded-2xl">
            <div className="flex justify-between">
                <Typography variant="h4">{title}</Typography>
                { icon }
            </div>
            <LeafSeperator />
            <div className="max-w-xl mx-auto mt-4">{children}</div>
        </Paper>
    )
}

export default PageContainer;