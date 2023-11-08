import React from 'react';
import PageContainer from "../Components/PageContainer";
import {TbFirstAidKit} from "react-icons/tb";
import DocumentViewer from "../Components/DocumentViewer";

const AfterCare: React.FC = () => {
    return(
        <PageContainer title="After Care" icon={<TbFirstAidKit size={40} />} >
            <DocumentViewer documentTitle={"After Care Instructions"} />
        </PageContainer>
    )
}

export default AfterCare;