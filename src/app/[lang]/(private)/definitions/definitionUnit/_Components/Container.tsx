"use client";
import { EmptyProductPageIcon } from "@/icons";
import EmptyPage from "@/components/util/emptyPage";
import { Box, Typography } from "@mui/material";

import { useGetMeasuresQuery } from "@/hooks/api/definitions/units/queries/use-get-meansures-query";
import { Create } from "./Create";
import { UnitItem } from "./unit-item";
import { SkeletonComponentBox } from "../../_Components/Skeleton-box";
import { useTranslations } from "next-intl";

const DefinitionUnit = () => {
  const t = useTranslations("pages");
  const { data: getMeasures, isLoading } = useGetMeasuresQuery();

  if (getMeasures?.length === 0 && !isLoading){
    return (
      <Box className={"empty_page_content"}>
          <EmptyPage
            discription={t("unit.no_units_description")}
            title={t("unit.no_unit_registered")}
            icon={<EmptyProductPageIcon />}
          />
        </Box>
    )
  }
  return (
    <Box>
      <Typography variant="h3" mb={2}>
        {t("unit.define_units")}
      </Typography>
      <Box>
        <Create />
        <Box display={"flex"} flexWrap={"wrap"} columnGap={2} rowGap={2}>
          {getMeasures?.map((item: any) => {
            return (
              <Box key={item?._id} display={"grid"}>
                <UnitItem item={item} canDelete={item?.isUsed} />
              </Box>
            );
          })}

          {isLoading && <SkeletonComponentBox />}
        </Box>
      </Box>

    </Box>
  );
};

export default DefinitionUnit;
