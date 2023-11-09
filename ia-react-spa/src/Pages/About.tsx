import React from 'react';
import { TbInfoHexagon } from "react-icons/tb";
import PageContainer from "../Components/PageContainer";
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