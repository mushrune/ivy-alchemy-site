import React from 'react';
import {Link, Paper, Typography} from "@mui/material";
import { TbCurrencyDollar } from "react-icons/tb";
import LeafSeperator from "../../Components/Widgets/LeafSeperator";
import {PricedItem} from "./Types";
import Item from "./Components/Item";
import PageContainer from "../../Components/PageContainer";
import DocumentViewer from "../../Components/DocumentViewer";

const items: PricedItem[] = [
    { title: "Hourly Rate", description: "", price: 150, frequency: "hour" },
    { title: "Drawing Fee", description: "", price: 100, frequency: "hour" },
    { title: "Deposit Fee", description: "", price: 50, frequency: "hour" }
];

const Pricing: React.FC = () => {
    return(
        <PageContainer title={'Pricing'} icon={<TbCurrencyDollar size={40} />}>
            { items.map( ( item, index ) =>
                <Item key={index} item={item} />
            )}
            <DocumentViewer documentTitle="Pricing Policy" />
            {/*<Typography variant="body1" className="italic mt-4">*/}
            {/*    A deposit fee is required to confirm a tattoo appointment with me. The deposit you*/}
            {/*    pay will secure your appointment and will be deduced from the final cost of your tattoo.*/}
            {/*    <br /><br />*/}
            {/*    Some flash pieces are priced individually. In such cases, the price listed or displayed*/}
            {/*    is the final price for the tattoo. On the day of your appointment, expect to pay the listed price minus your deposit fee.*/}
            {/*    <br /><br />*/}
            {/*    Custom pieces do not have stated prices and are billed hourly. Each custom tattoo incurs an additional <b>drawing fee. </b>*/}
            {/*    The drawing fee <b>is not </b> deducted from the final price of the tattoo.*/}
            {/*    <br /><br />*/}
            {/*    For additional information, please read the <Link href="/booking/policy"> booking policy</Link>.*/}
            {/*</Typography>*/}
        </PageContainer>
    )
}

export default Pricing;