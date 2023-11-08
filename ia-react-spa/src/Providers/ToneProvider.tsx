import React, {createContext, ReactNode, useContext, useState} from 'react';
import { TonePosition } from "../Types";
import { initialTone } from "../Components/ToneSelector";

/*
    This provider is used to manage the state of the background tone for tattoos.
    Anywhere a tone selector appears, it can change the background tone for pieces across the whole site.
*/

type ToneContextType = {
    tone: TonePosition
    setTone: ( ( tone: TonePosition ) => void );
}

const ToneContext = createContext<ToneContextType | null>(null);

export const useToneContext = () => {
    const toneContext = useContext(ToneContext);
    if ( toneContext === null ) {
        throw new Error("Tone context must be called within a ToneProvider component");
        return {
            tone: initialTone,
            setTone: ( tone: TonePosition ) => { }
        }
    }

    return toneContext;
}

interface toneProviderProps {
    children: ReactNode
}

const ToneProvider: React.FC<toneProviderProps> = ({ children }) => {
    const [ tone, setTone ] = useState<TonePosition>( initialTone );

    const handleSetTone = ( tone: TonePosition ) => {
        setTone( tone );
    }

    return(
        <ToneContext.Provider value = {{ tone: tone, setTone: handleSetTone }} >
            {children}
        </ToneContext.Provider>
    )
}

export default ToneProvider;