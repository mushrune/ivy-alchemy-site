import React from 'react';
import { Button } from "@mui/material";
import { TbLeaf } from "react-icons/tb";

const Home: React.FC = () => {
    return(
        <div>
            <Button variant="contained" className="m-4 bg-red-500" startIcon={<TbLeaf />}>Hello I am a button</Button>
        </div>
    )
}

export default Home;