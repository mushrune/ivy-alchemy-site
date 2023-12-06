import React, { memo, ReactElement } from 'react';
import { TbLeaf, TbBrandAmongUs, TbSeeding, TbHeart } from 'react-icons/tb';

type ItemWeight = {
    weight: number;
    item: ReactElement
}

interface props {
    size: number;
}

const LeafIcon: React.FC<props> = ({ size }) => {
    const items: ItemWeight[] = [
        {
            weight: 7777,
            item: ( <TbLeaf size={size} /> )
        },
        {
            weight: 7777,
            item: ( <TbSeeding size={size} /> )
        },
        {
            weight: 777,
            item: ( <img src="/ripley.webp" alt="ripley" style={{ width: size - 5, filter: "grayscale(100%) invert(90%) sepia(15%) saturate(1157%) hue-rotate(75deg) brightness(99%) contrast(89%)" }} /> )
        },
        {
            weight: 1,
            item: ( <TbBrandAmongUs size={size} /> )
        },
        {
            weight: 7777,
            item: ( <TbHeart size={size} /> )
        }
    ]

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

    let index = randomItemSelect(items)

    return ( items[index].item )
};

export default memo(LeafIcon);