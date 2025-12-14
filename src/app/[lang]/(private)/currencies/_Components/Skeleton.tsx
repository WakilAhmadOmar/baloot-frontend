import { Box, Skeleton } from "@mui/material";

export function CurrencySkeleton() {
  return (
    <Box height={"fit-content"}>
      <Skeleton variant="rectangular" width={"30rem"} height={265} sx={{borderRadius:"14px"}} />
    </Box>
  );
}
