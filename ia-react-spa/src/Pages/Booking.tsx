import React, {useState} from 'react';
import DocumentViewer from "../Components/DocumentViewer";
import {Backdrop, Button, Checkbox, FormControlLabel, FormGroup, Paper, Typography} from "@mui/material";
import LeafSeperator from "../Components/Widgets/LeafSeperator";
import {handleLink} from "../Functions";
import {usePieceContext} from "../Providers/SelectedPieceProvider";
import {useToneContext} from "../Providers/ToneProvider";

const Booking: React.FC = () => {
    const [ policyRead, setPolicyRead ] = useState<boolean>(false);

    const { selectedPiece } = usePieceContext();
    const { tone } = useToneContext();

    const handlePolicyReadChange = ( event: any ) => {
        setPolicyRead( event.target.checked );
    }

    // TODO: Add piece title to booking form via URL query parameter
    const handleBookingSubmit = () => {
        if ( policyRead ) {
            handleLink("https://forms.gle/HKkb4VvVEpP6DzMGA")
        }
    }

    const SelectedPiecePreview = (
        <Paper
            elevation={4}
            variant="outlined"
            className="
                p-2 w-full h-fit rounded-xl mb-4
                flex items-center
        ">
            <img
                src={selectedPiece?.url}
                alt={selectedPiece?.title}
                className="w-14 bg-white rounded-md"
                style={{ backgroundColor: tone.color }}
            />
            <div>
                <Typography
                    variant="subtitle2"
                    className="ml-2"
                >Selected Piece:</Typography>
                <Typography
                    variant="subtitle2"
                    className="italic ml-2"
                >"{ selectedPiece?.title }"</Typography>
            </div>
        </Paper>
    )

    return(
        <Paper className="p-4 rounded-2xl">
            { selectedPiece !== null && SelectedPiecePreview }
            <DocumentViewer documentTitle={"Booking Policy"} />
            <LeafSeperator />
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    checked={policyRead}
                    className="w-fit mx-auto h-fit mb-4 italic font-bold"
                    onChange={handlePolicyReadChange}
                    label="I have read and understand the booking policy for Ivy Alchemist"
                />
                <Button
                    variant="contained"
                    disabled={!policyRead}
                    onClick={handleBookingSubmit}
                >continue</Button>
            </FormGroup>
        </Paper>
    )
}

export default Booking;