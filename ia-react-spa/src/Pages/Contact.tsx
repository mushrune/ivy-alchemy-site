import React, {ReactNode} from 'react';
import { IconButton, Paper, Typography } from "@mui/material";
import { TbBrandInstagram, TbClipboardCopy, TbCopy, TbFlare, TbMailHeart } from "react-icons/tb";
import PageContainer from "../Components/PageContainer";
import {handleLink} from "../Functions";

async function copyToClipboard( text: string ): Promise<void> {
    if ( 'clipboard' in navigator ) {
        return await navigator.clipboard.writeText( text )
    } else {
        document.execCommand('copy', true, text )
    }
}

type contactMethod = {
    text: string,
    icon: ReactNode,
    link: string
}

const contactMethods: contactMethod[] = [
    { text: '@ivy.alchemist', icon: ( <TbBrandInstagram size={40} /> ), link: 'https://www.instagram.com/ivy.alchemist/' },
    { text: 'contact@ivyalchemy.ink', icon: ( <TbMailHeart size={40} /> ), link: 'mailto:contact@ivyalchemy.ink' }
]

const Contact: React.FC = () => {
    return(
        <PageContainer title='Contact' icon={ <TbFlare size={40} /> }>
            <Typography variant="body1">
                You are invited to send me a message for any questions or feedback. Please be sure
                to send pictures of your healed tattoo!
            </Typography>
            { contactMethods.map( ( method ) => (
                <div className="flex mt-4 items-center">
                    <button
                        className="flex flex-1 items-center text-white bg-transparent rounded-lg border-none"
                        onClick={() => handleLink(method.link)}
                    >
                        { method.icon }
                        <Typography variant="h6" className="mx-2">{method.text}</Typography>
                    </button>
                    <IconButton onClick={() => copyToClipboard(method.text)}>
                        <TbCopy size={20} />
                    </IconButton>
                </div>
            ))}
            <Typography variant="body1" className="mt-4">
                Pet photos are highly encouraged.
            </Typography>
        </PageContainer>
    )
}

export default Contact;