import React, {ReactNode} from 'react';
import DocumentProvider from "./DocumentProvider";
import SelectedPieceProvider from "./SelectedPieceProvider";
import ToneProvider from "./ToneProvider";

/*
    This component groups all the providers for documents, tone, and selected piece into one component to make
    index.tsx smaller.
 */

interface props {
    children: ReactNode
}

const SiteStateProviders: React.FC<props> = ({ children }) => {
    return(
        <DocumentProvider>
            <SelectedPieceProvider>
                <ToneProvider>
                    {children}
                </ToneProvider>
            </SelectedPieceProvider>
        </DocumentProvider>
    )
}

export default SiteStateProviders;