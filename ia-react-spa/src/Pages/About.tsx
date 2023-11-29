import React from 'react';
import { TbInfoHexagon } from "react-icons/tb";
import PageContainer from "../Components/PageContainer";
import DocumentViewer from "../Components/DocumentViewer";

const About: React.FC = () => {
    return(
        <PageContainer title="About" icon={<TbInfoHexagon size={40} className="ml-2" />}>
            <div className="mt-4 max-w-md mx-auto">
                <img src="./ivy.jpeg" alt="ivy alchemist" className="w-full rounded-lg" />
            </div>
            <DocumentViewer documentTitle={"About Me"} />
        </PageContainer>
    )
}

export default About;