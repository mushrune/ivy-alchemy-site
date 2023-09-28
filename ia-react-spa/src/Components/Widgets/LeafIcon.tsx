import React, {useEffect, useState} from 'react';
import { TbLeaf, TbBrandAmongUs } from 'react-icons/tb';

interface props {
    size: number;
}

const LeafIcon: React.FC<props> = ({size}) => {
    const [isAmongUs, setIsAmongUs] = useState<boolean>(false);

    useEffect(() => {
        const randomNumber = Math.floor( Math.random() * 10000 )
        if ( randomNumber === 7 ) {
            setIsAmongUs(true);
        }
    }, [setIsAmongUs])

    if ( isAmongUs ) {
        return(<TbBrandAmongUs size={size} />)
    }

    return (
        <TbLeaf size={size} />
    )
}

export default LeafIcon;