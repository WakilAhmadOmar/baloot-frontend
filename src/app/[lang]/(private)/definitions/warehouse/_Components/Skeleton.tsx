
import { Skeleton } from "@mui/material";

const SkeletonComponent = () =>( 
  Array(7)
  .fill(null)
  ?.map((_, index:number)=><Skeleton key={index + "skeleton"} height={60} variant="rectangular" width={"100%"} sx={{marginTop:"1rem" , borderRadius:"1rem"}}/>)
);

export default SkeletonComponent;
