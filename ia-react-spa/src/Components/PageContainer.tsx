import React, { ReactNode } from 'react';
import { Paper, Typography } from "@mui/material";
import LeafSeperator from "./Widgets/LeafSeperator";

interface props {
    title: string,
    icon: ReactNode,
    children: ReactNode
}

const PageContainer: React.FC<props> = ({ title, icon, children }) => {
    return(
        <Paper className="p-4 rounded-2xl" elevation={0}>
            <div className="flex justify-between">
                <Typography variant="h4" className="tracking-wider">{title}</Typography>
                { icon }
            </div>
            <LeafSeperator />
            <div className="max-w-xl mx-auto mt-4">{children}</div>
        </Paper>
    )
}

export default PageContainer;