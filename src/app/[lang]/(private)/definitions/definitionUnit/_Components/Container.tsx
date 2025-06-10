"use client";
import { EmptyProductPageIcon } from "@/icons";
import EmptyPage from "@/components/util/emptyPage";
import { Box, Typography } from "@mui/material";

import { useGetMeasuresQuery } from "@/hooks/api/definitions/units/queries/use-get-meansures-query";
import { Create } from "./Create";
import { UnitItem } from "./unit-item";
import { SkeletonComponentBox } from "../../_Components/Skeleton-box";

interface IProps {
  t: any;
}
const DefinitionUnit: React.FC<IProps> = ({ t }) => {
  const { data: getMeasures, isLoading } = useGetMeasuresQuery();

  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t?.pages?.unit.define_units}
      </Typography>
      <Box>
        <Create t={t} />
        <Box display={"flex"} flexWrap={"wrap"} columnGap={2} rowGap={2}>
          {getMeasures?.map((item: any) => {
            return (
              <Box key={item?._id} display={"grid"}>
                <UnitItem item={item} canDelete={true} t={t} />
              </Box>
            );
          })}

          {isLoading && <SkeletonComponentBox />}
        </Box>
      </Box>
      {getMeasures?.length === 0 && !isLoading && (
        <Box className={"empty_page_content"}>
          <EmptyPage
            discription={t?.pages?.unit?.no_units_description}
            title={t?.pages?.unit?.no_unit_registered}
            icon={<EmptyProductPageIcon />}
          />
        </Box>
      )}
    </Box>
  );
};

export default DefinitionUnit;
