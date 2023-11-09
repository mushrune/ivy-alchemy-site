import React from 'react';
import LeafIcon from "./LeafIcon";

const LeafSeparator: React.FC = () => {
    return(
        <div className="my-1 w-full flex justify-center items-center">
            <div className="bg-primary border-0 w-full h-px ml-2" />
            <div className="px-4 pt-2 text-primary">
                <LeafIcon size={25} />
            </div>
            <div className="bg-primary border-0 w-full h-px mr-2" />
        </div>
    )
}

export default LeafSeparator;