import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

/*
 This component loads all the documents on the webpage ( about me, after care instructions,
 etc.. ) from the API when the site loads, instead of when the user visits a particular page
 on the site. It makes the document consumable to components using a DocumentProvider component.
 Site experience is faster, API is called less.
 */

type Document = {
    id: string;
    title: string;
    description: string;
    type: string;
    body: string;
}

const documentContext = createContext<Document[] | undefined>(undefined)

export const useDocumentContext = () => {
    const docContext = useContext(documentContext);
    if ( !docContext ) {
        throw new Error("Document context must be used within a document provider!")
    }
    return docContext
}

interface documentProviderProps {
    children: ReactNode;
}

const DocumentProvider: React.FC<documentProviderProps> = ({ children }) => {
    const [ documents, setDocuments ] = useState<Document[]>([])

    useEffect( () => {
        ( async () => {
            let docs: Document[] = [];
            try {
                const raw = await fetch('/api/documents',{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    },
                });
                const content = await raw.json();
                docs = JSON.parse(content) as Document[];
            } catch ( e ) {
                console.log(e)
            }
            setDocuments(docs);
        })();
    }, [])

    return(
        <documentContext.Provider value={ documents } >
            {children}
        </documentContext.Provider>
    )
}

export default DocumentProvider;