
import { Skeleton } from "@mui/material";

const SkeletonComponentBox = () =>( 
  Array(10)
  .fill(null)
  ?.map((_, index:number)=><Skeleton key={index + "skeleton"} height={"20rem"} variant="rectangular" width="16rem" sx={{marginTop:"1rem" , borderRadius:"1rem"}}/>)
);

export  {SkeletonComponentBox};
