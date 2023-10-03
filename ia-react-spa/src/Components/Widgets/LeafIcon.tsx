import React, {ReactElement, useEffect, useState} from 'react';
import { TbLeaf, TbBrandAmongUs, TbSeeding, TbHeart } from 'react-icons/tb';

type ItemWeight = {
    weight: number;
    item: ReactElement
}

const items: ItemWeight[] = [
    {
        weight: 7777,
        item: ( <TbLeaf size={25} /> )
    },
    {
        weight: 7777,
        item: ( <TbSeeding size={25} /> )
    },
    {
        weight: 777,
        item: ( <img src="./ripley.png" alt="ripley" style={{ width: 20, filter: "grayscale(100%) invert(90%) sepia(15%) saturate(1157%) hue-rotate(75deg) brightness(99%) contrast(89%)" }} /> )
    },
    {
        weight: 1,
        item: ( <TbBrandAmongUs size={25} /> )
    },
    {
        weight: 7777,
        item: ( <TbHeart size={25} /> )
    }
]

interface props {
    size: number;
}

const LeafIcon: React.FC<props> = ({size}) => {
    let index = 0

    function randomItemSelect( items: ItemWeight[] ): number {
        // Calculate total weight for all items
        const totalWeight = items.reduce( ( sum, item ) => sum + item.weight, 0 )

        let randomNumber = Math.random() * totalWeight;

        for ( const item of items ) {
            if ( randomNumber < item.weight ) {
                return items.indexOf(item)
            }
            randomNumber -= item.weight
        }

        return 0
    }

    index = randomItemSelect(items)

    return ( items[index].item )
}

export default LeafIcon;