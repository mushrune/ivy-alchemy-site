import React, {useEffect} from 'react';
import {Paper, Typography} from "@mui/material";
import LeafSeperator from "../Components/Widgets/LeafSeperator";
import {TbCurrencyDollar, TbInfoHexagon} from "react-icons/tb";

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
        <Paper className="p-6 rounded-2xl">
            <div className="flex justify-between items-center">
                <Typography variant="h4">{greeting} I'm Ivy.</Typography>
                <TbInfoHexagon size={40} className="ml-2" />
            </div>
            <LeafSeperator />
            <div className="mt-4 max-w-md mx-auto">
                <img src="./ivy.jpeg" alt="ivy alchemist" className="w-full rounded-lg" />
            </div>
            <Typography variant="body1">
                I am a licensed tattoo artist established in Portland OR. My styles include
                new school, blackwork and realism. I have tattood at multiple locations around PDX,
                and you have likely seen my work on my instagram - @IvyAlchemist.
                I started my career by earning my Oregon tattoo license at Point of View tattoo school.
                This is also where I started tattooing, after I completed school and attained my license
                I started working at Birdhouse Tattoo from 2021 to 2023. Now I am happily working at Paradise
                Tattoo.
                <br />
                Please do not bring me any gluten treats!
            </Typography>
        </Paper>
    )
}

export default About;