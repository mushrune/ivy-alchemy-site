import React from 'react'
import {useDocumentContext} from "../Providers/DocumentProvider";
import LoadingWidget from "./Widgets/LoadingWidget";
import MuiMarkdown, {getOverrides, Overrides} from "mui-markdown";
import {Typography} from "@mui/material";
import Markdown from "react-markdown";
import LeafSeperator from "./Widgets/LeafSeperator";

interface props {
    documentTitle: string;
    documentBody?: string;
}

// TODO: Override img tag so images can be included in documents.
const markdownOverrides: Overrides = {
    ...getOverrides(),
    h1: {
        component: Typography,
        props: {
            variant: "h1",
            className: "text-4xl font-bold mb-4 text-center sm:text-left w-full"
        }
    },
    h2: {
        component: Typography,
        props: {
            variant: "h3",
            className: "text-2xl font-bold my-4 text-center sm:text-left w-full"
        }
    },
    h3: {
        component: Typography,
        props: {
            variant: "h3",
            className: "text-xl italic my-3 text-center sm:text-left w-full"
        }
    },
    hr: {
        component: LeafSeperator
    }
}

const DocumentViewer: React.FC<props> = ({ documentTitle, documentBody }) => {

    const documents = useDocumentContext();
    const selectedDocument = documents.find( d => d.title === documentTitle )

    if ( !selectedDocument ) { return(
        <LoadingWidget />
    )}

    if ( documentBody ) { return(
        <MuiMarkdown overrides={markdownOverrides}>{documentBody}</MuiMarkdown>
    )}
    return(
        <MuiMarkdown overrides={markdownOverrides}>{selectedDocument.body}</MuiMarkdown>
    )
}

export default DocumentViewer;