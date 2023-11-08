import React, {createContext, ReactNode, useContext, useState} from 'react';
import { FlashPiece } from "../Types";

/*
    This provider is used to manage the state of a client selecting a piece to book.
 */

type PieceContextType = {
    selectedPiece: FlashPiece | null
    setSelectedPiece: (piece: FlashPiece ) => void;
}

const SelectedPieceContext = createContext<PieceContextType | null >( null );

export const usePieceContext = () => {
    const pieceContext = useContext(SelectedPieceContext);
    if ( pieceContext === null ) {
        throw new Error("Piece context must be called within a SelectedPieceProvider component.");
    }

    return pieceContext;
}

interface selectedPieceProviderProps {
    children: ReactNode
}

const SelectedPieceProvider: React.FC<selectedPieceProviderProps> = ({ children }) => {
    const [ selectedPiece, setSelectedPiece ] = useState<FlashPiece | null>( null );
    const handleSelectPiece = ( piece: FlashPiece ) => {
        setSelectedPiece( piece )
    }

    return(
        <SelectedPieceContext.Provider value = {{ selectedPiece: selectedPiece, setSelectedPiece: handleSelectPiece }}>
            {children}
        </SelectedPieceContext.Provider>
    )
}

export default SelectedPieceProvider;
