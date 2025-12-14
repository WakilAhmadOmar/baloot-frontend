import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import { useGetProductFromEntrepotByProductIdQuery } from "@/hooks/api/invoice/queries/use-get-product-from-entrepots-by-product-id";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { Add, InfoCircle } from "iconsax-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type AddNewRowProps = {
  getSelectedProduct: (product: any) => void;
};

export function AddNewRow({ getSelectedProduct }: AddNewRowProps) {
  const t = useTranslations("invoice");
  const { control , reset } = useForm();
  const theme = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [warehouses, setWarehouses] = useState<any>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");
  const {
    data: productCount,
    isLoading,
    refetch,
  } = useGetProductFromEntrepotByProductIdQuery(
    { productId: selectedProduct?._id },
    !!selectedProduct?._id
  );

  const openDialogFunction = () => {
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    if (selectedProduct?._id) {
      const warehouse = productCount?.map((ware: any) => {
        let amount = 0;
        const expireInDate: any = [];
        let measureName = "";
        ware?.ware?.[0]?.productInfo?.forEach((item: any) => {
          amount += item?.amountOfProduct || 0;
          measureName = item?.measureId?.name;
          expireInDate.push(item?.expireInDate);
        });

        return {
          _id: ware?._id,
          name: ware?.name,
          amountOfProducts: amount,
          measureName,
          expireInDate: expireInDate,
        };
      });

      setWarehouses(warehouse);
      refetch();
    }
  }, [
    JSON.stringify(selectedProduct?._id),
    refetch,
    JSON.stringify(productCount),
  ]);

  const handleAddProductFunction = () => {
    const measures = selectedProduct?.price?.map(
      (item: any, index: number) => ({
        measureId: item?.measureId?._id,
        amount: 1,
        sellPrice: item?.sellPrice,
        discount: 0,
        selected: index === 0,
        measureName: item?.measureId?.name,
        discountPercentage: 0,
      })
    );
    const newProduct = {
      productId: selectedProduct?._id,
      productName: selectedProduct?.name,
      warehouse: selectedWarehouse,
      warehouseName: warehouses?.filter(
        (item: any) => item?._id === selectedWarehouse
      )?.[0]?.name,
      measures,
      expireInDate : warehouses?.filter(
        (item: any) => item?._id === selectedWarehouse
      )?.[0]?.expireInDate
    };
    getSelectedProduct(newProduct);
    setSelectedProduct(null)
    setWarehouses(null)
    reset()
    openDialogFunction();
  };

  return (
    <Box>
      <Button
        startIcon={<Add style={{ margin: "0 1rem" }} />}
        variant={"outlined"}
        size={"small"}
        onClick={openDialogFunction}
      >
        {t("insert_new_row")}
      </Button>

      <Dialog
        open={openDialog}
        keepMounted
        onClose={openDialogFunction}
        aria-describedby="alert-dialog-slide-description"
        dir={t("dir")}
        fullWidth
      >
        <DialogTitle
          className="dialogTitleDelete"
          display={"flex"}
          gap={1}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">{t("add_new_product")}</Typography>
          <InfoCircle size="32" color={theme.palette.warning.main} />
        </DialogTitle>
        <DialogContent className="dialogContentDelete">
          <Grid2 container spacing={3}>
            <Grid2 size={6}>
              <InputLabel>{t("product_name")}</InputLabel>
              <ProductsAutoComplete
              limit={100}
                getProduct={(product) => {
                  setSelectedProduct(product);
                }}
                isTable
              />
            </Grid2>
            <Grid2 size={6}>
              <InputLabel>{t("warehouse")}</InputLabel>
              <Controller
                control={control}
                name={`warehouse`}
                render={({ field }) => (
                  <Select
                    fullWidth
                    size={"small"}
                    value={selectedWarehouse}
                    required
                    onChange={(event) => {
                      setSelectedWarehouse(event?.target?.value as string);
                      console.log("event.target.value", event.target.value);
                    }}
                  >
                    {warehouses?.map((item: any) => {
                      return (
                        <MenuItem
                          key={item?._id}
                          value={item?._id}
                          dir={t("dir")}
                          disabled={item?.amountOfProducts === 0}
                        >
                          {item?.name} ({item?.amountOfProducts}{" "}
                          {item?.measureName})
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions
          className="dialogActionDelete"
          sx={{ display: "flex", gap: "1rem" }}
        >
          <Button onClick={openDialogFunction} variant="outlined">
            {t("cancel")}
          </Button>
          <Button onClick={handleAddProductFunction} variant="contained">
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
