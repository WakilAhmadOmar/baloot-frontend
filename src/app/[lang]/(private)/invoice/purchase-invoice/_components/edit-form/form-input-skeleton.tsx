import { Box, Skeleton } from "@mui/material";

export function FormInputSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangular" width={"100%"} height={"40px"} />
    </Box>
  );
}
