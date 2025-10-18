import { EmptyProductPageIcon } from "@/icons";
import { Box, Typography } from "@mui/material";


export function EmptyComponent ({text}:{text:string}){
    return(
        <Box sx={{py:16}}>
            <Box sx={{display:"grid" , justifyItems:"center"}}>
                <EmptyProductPageIcon />
            </Box>
            <Typography align="center" variant="h6" pt={2}>{text}</Typography>
        </Box>
    )
} 