import React, {ReactNode} from 'react';
import { Typography } from "@mui/material";
import { TbCurrencyDollar } from "react-icons/tb";
import PageContainer from "../../Components/PageContainer";
import DocumentViewer from "../../Components/DocumentViewer";
import {Overrides} from "mui-markdown";

interface trProps {
    children: ReactNode;
}

const tableRow: React.FC<trProps> = ({ children }) => {
    return(
        <span className="relative tr flex w-full justify-between mb-2">
            <span className="absolute w-full top-0 left-0 mt-4 h-[1px] bg-primary" />
            {children}
        </span>
    )
}

const pricingOverrides: Overrides = {
    td: {
        component: Typography,
        props: {
            variant: "h6",
            className: "td italic z-[1] px-3 bg-paper-color"
        }
    },
    th: {
        component: Typography,
        props: {
            variant: "h6",
            className: "td italic z-[1] px-3 bg-paper-color"
        }
    },
    tr: {
        component: tableRow,
        props: { }
    }
}

const Pricing: React.FC = () => {
    return(
        <PageContainer title={'Pricing'} icon={<TbCurrencyDollar size={40} />}>
            <DocumentViewer documentTitle="Pricing Policy" overrides={pricingOverrides} />
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