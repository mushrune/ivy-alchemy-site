import React, {useEffect} from 'react';
import {Paper, Typography} from "@mui/material";
import LeafSeperator from "../Components/Widgets/LeafSeperator";
import {TbCurrencyDollar, TbInfoHexagon} from "react-icons/tb";
import PageContainer from "../Components/PageContainer";
import {useDocumentContext} from "../Providers/DocumentProvider";
import MuiMarkdown from "mui-markdown";
import LoadingWidget from "../Components/Widgets/LoadingWidget";
import DocumentViewer from "../Components/DocumentViewer";

const greetings: string[] = [
    "Meow,",
    "Hello,",
    "Hi,",
    "Well,",
    "Sup,",
    "Help,",
    "Uhm,",
    "Hey there,",
    "Help!"
];

const About: React.FC = () => {

    const greeting = greetings[ Math.floor( Math.random() * greetings.length ) ]

    const documents = useDocumentContext();
    const aboutMe = documents.find( d => d.title === "About Me")

    return(
        <PageContainer title={`${greeting} I'm Ivy.`} icon={<TbInfoHexagon size={40} className="ml-2" />}>
            <div className="mt-4 max-w-md mx-auto">
                <img src="./ivy.jpeg" alt="ivy alchemist" className="w-full rounded-lg" />
            </div>
            <DocumentViewer documentTitle={"About Me"} />
        </PageContainer>
    )
}

export default About;