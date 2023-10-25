import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

export const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5
    }
}))