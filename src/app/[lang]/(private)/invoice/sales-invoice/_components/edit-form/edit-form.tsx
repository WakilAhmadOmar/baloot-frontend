import React, {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import ProductsAutoComplete from "@/components/Auto/productAutoComplete";
import WarehouseAutoComplete from "@/components/Auto/WarehouseAutoComplete";
import { uniqueId } from "lodash";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Add, InfoCircle, Trash } from "iconsax-react";
import { InvoiceContext } from "../../../_components/invoiceContext";
import { numberToWords } from "@/utils/numberToWords";
import { useGetProductCountInEntrepotQuery } from "@/hooks/api/invoice/queries/use-get-product-count-in-entrepot";
import Moment from "react-moment";
import EditCustomSelectMeasure from "./select-measure";
import SkeletonComponent from "../../../_components/Skeleton";
import { EditRow } from "./edit-row";
import { SaveRow } from "./save-row";

export function EditForm({ isLoadingData }: { isLoadingData: boolean }) {
  const t = useTranslations("invoice");
  const editRowRef = useRef<React.RefObject<HTMLTableRowElement>[]>([]);
  const theme = useTheme();
  const { paymentOff } = useContext(InvoiceContext);
  const [calculateSellBill, setCalculateSellBill] = useState<{
    total: number;
    discount?: number;
    totalAfterDiscount: number;
    receipt: number;
    remain: number;
  }>({
    total: 0,
    discount: 0,
    totalAfterDiscount: 0,
    receipt: 0,
    remain: 0,
  });
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const [productCount, setProductCount] = useState<{
    productId: string;
    entrepotId: string;
    rowIndex: number | undefined;
  }>({
    productId: "",
    entrepotId: "",
    rowIndex: undefined,
  });
  const [editProductId, setEditProductId] = useState<string | null>(null);
    const [modalSelectProduct, setModalSelectProduct] = useState(false);
  const [notFoundProduct, setNotFoundProduct] = useState({
      productName: "",
      warehouseName: "",
    });
  const {
    data: selectedProduct,
    isLoading: isLoadingProductCount,
    remove: removeProductCountQuery,
  } = useGetProductCountInEntrepotQuery(
    productCount,
    Boolean(productCount.productId && productCount.entrepotId)
  );

  useEffect(() => {
    if (
      selectedProduct?.productId?._id &&
      typeof productCount.rowIndex === "number" &&
      !isLoadingProductCount
    ) {
      const entrepotId = watch("warehouseId");

      const error = selectedProduct?.productInfo?.[0]?.info?.some(
        (item: any) => item?.amountOfProduct > 0
      );
      if (error) {
        const products = watch(`products.${productCount?.rowIndex}`);
        const measures = selectedProduct?.productInfo?.[0]?.info.map(
          (item: any, index: number) => ({
            measureId: item?.measureId?._id,
            amount: 1,
            sellPrice: item?.sellPrice,
            discount: item?.discount,
            selected: index === 0,
            measureName: item?.measureId?.name,
            discountPercentage: 0,
          })
        );
        const newProduct = {
          ...products,
          expireInDate: selectedProduct?.productInfo?.map(
            (item: any) => item?.expireInDate
          ),
          measures,
        };

        setValue(`products.${productCount?.rowIndex}`, newProduct);
        setProductCount({
          productId: "",
          entrepotId: entrepotId,
          rowIndex: undefined,
        });
        setModalSelectProduct(false);
        setEditProductId(selectedProduct?.productId?._id)
      } else {
        setModalSelectProduct(true);
        setNotFoundProduct({
          productName: selectedProduct?.productId?.name,
          warehouseName: watch("warehouseName"),
        });
      }
    }
  }, [
    selectedProduct,
    productCount?.entrepotId,
    productCount?.productId,
    isLoadingProductCount,
  ]);

  const style = {
    width: "100%",
    paddingInlineStart: "3px !important",
    "& .MuiInputBase-input": {
      paddingInlineStart: "3px !important",
    },
    "& .MuiInputBase-sizeSmall": {
      // paddingRight: "10px",
      paddingInlineStart: "3px !important",
    },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      // paddingRight: "10px !important",
      paddingInlineStart: "3px !important",
      "& fieldset": {
        borderColor: theme.palette.grey[100],
      },
      "&:hover fieldset": {
        borderColor: theme.palette.grey[100],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  };
  const handleAddNewProduct = () => {
    append({
      id: uniqueId(),
      productId: "new-product",
      productName: "",
      measures: [],
      warehouse: "",
    });
  };

  const products: any = useWatch({ name: "products" });
  useEffect(() => {
    const initialValue = 0;
    let discount = 0;
    let price = 0;
    const sumWithInitial = products?.reduce(
      (accumulator: any, product: any) => {
        const measures = 0;
        const sumMeasures = product?.measures?.reduce(
          (accum: number, measure: any) => {
            if (measure?.selected) {
              price = price + measure.sellPrice * (measure?.amount || 1);
              discount =
                discount +
                ((measure?.sellPrice * measure?.discount) / 100 || 0);
              return accum + (measure?.totalPrice || measure?.sellPrice);
            } else return accum;
          },
          measures
        );
        return accumulator + sumMeasures;
      },
      initialValue
    );
    setCalculateSellBill({
      receipt: 0,
      remain: price,
      total: price,
      totalAfterDiscount: price - discount,
      discount,
    });
    setValue("totalPrice", price);
    setValue("totalPriceAfterDiscount", price - discount);
  }, [JSON.stringify(products)]);

  const handleDeleteFunction = (event: MouseEvent<HTMLButtonElement>) => {
    const id = parseInt(event?.currentTarget?.id);
    remove(id);
  };

  const handleGetProductId = (id: string, warehouse: string) => {
    setProductCount({
      productId: id,
      entrepotId: warehouse,
      rowIndex: fields.findIndex((field: any) => field?.productId === id),
    });
    setEditProductId(id);
  };

    const handleOpenDialogSelectProduct = () => {
    setModalSelectProduct(!modalSelectProduct);
  };
  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Dialog
              open={modalSelectProduct}
              keepMounted
              onClose={handleOpenDialogSelectProduct}
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
                <Typography variant="h5">
                  {notFoundProduct?.productName} {t("in_warehouse")}(
                  {notFoundProduct.warehouseName}){t("not_available")}
                </Typography>
                <InfoCircle size="32" color={theme.palette.warning.main} />
              </DialogTitle>
              <DialogContent className="dialogContentDelete">
                <DialogContentText id="alert-dialog-slide-description">
                  <Typography variant="body1" mb={3}>{t("add_new_product")}</Typography>
                </DialogContentText>
                <Grid2 container spacing={3}>
                  <Grid2 size={6}>
                    <InputLabel>{t("product_name")}</InputLabel>
                    <Controller
                      control={control}
                      name={`products.${productCount?.rowIndex}.productId`}
                      render={({ field }) => (
                        <ProductsAutoComplete
                          getProduct={async (product) => {
                            removeProductCountQuery();
                            field.onChange(product?._id);
                            setValue(
                              `products.${productCount?.rowIndex}.productId`,
                              product?._id
                            );
                            setValue(
                              `products.${productCount?.rowIndex}.productName`,
                              product?.name
                            );
                            setProductCount((prevState) => ({
                              ...prevState,
                              productId: product?._id,
                            }));
                          }}
                          isTable
                          productIds={fields?.map((item: any) => item?.productId)}
                        />
                      )}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <InputLabel>{t("warehouse")}</InputLabel>
                    <Controller
                      control={control}
                      name={`products.${productCount?.rowIndex}.warehouse`}
                      render={({ field }) => (
                        <WarehouseAutoComplete
                          name="warehouse"
                          dir={t("dir")}
                          getWarehouse={(data: any) => {
                            removeProductCountQuery();
                            setValue(
                              `products.${productCount?.rowIndex}.warehouse`,
                              data?._id
                            );
                            setValue(
                              `products.${productCount?.rowIndex}.warehouseName`,
                              data?.name
                            );
                            setProductCount((prevState) => ({
                              ...prevState,
                              entrepotId: data?._id,
                            }));
                          }}
                        />
                      )}
                    />
                  </Grid2>
                </Grid2>
              </DialogContent>
              <DialogActions
                className="dialogActionDelete"
                sx={{ display: "flex", gap: "1rem" }}
              >
                <Button onClick={handleOpenDialogSelectProduct} variant="outlined">
                  {t("cancel")}
                </Button>
              </DialogActions>
            </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ width: 200 }}>
                {t("product_name")}
              </TableCell>
              <TableCell align="right">{t("warehouse")}</TableCell>
              <TableCell align="right">{t("unit")}</TableCell>
              <TableCell align="right">{t("amount")}</TableCell>
              <TableCell align="right">{t("price")}</TableCell>
              <TableCell align="right">{t("discount_percentage")}</TableCell>
              <TableCell align="right">{t("discount_amount")}</TableCell>
              <TableCell align="right">{t("total")}</TableCell>
              <TableCell align="right">{t("expiration_date")}</TableCell>
              <TableCell align="right">{t("actions")}</TableCell>
            </TableRow>
          </TableHead>
          {isLoadingData ? (
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={10}>
                    <SkeletonComponent />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {fields?.map((row: any, rowIndex: number) => {
                const rows = watch(`products.${rowIndex}`);
                if (
                  editProductId === rows.productId ||
                  rows?.productId === "new-product"
                ) {
                  return (
                    <TableRow
                      key={rows?.id}
                      ref={(el: any) => (editRowRef.current[rowIndex] = el)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        // border: rows?.error ? "2px solid #fe1212" : undefined,
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Controller
                          control={control}
                          name={`products.${rowIndex}.productId`}
                          render={({ field }) => (
                            <ProductsAutoComplete
                              // defaultValue={{
                              //   ...row,
                              //   id: rows?.productId,
                              //   label: rows?.productName,
                              // }}
                              getProduct={async (product) => {
                                field.onChange(product?._id);
                                setValue(
                                  `products.${rowIndex}.productId`,
                                  product?._id
                                );
                                setValue(
                                  `products.${rowIndex}.productName`,
                                  product?.name
                                );
                                setProductCount({
                                  entrepotId: watch("warehouseId"),
                                  productId: product?._id,
                                  rowIndex: rowIndex,
                                });
                                setEditProductId(product?._id)
                              }}
                              isTable
                              productIds={fields?.map(
                                (item: any) => item?.productId
                              )}
                              error={
                                !!(errors?.products as any)?.[rowIndex]
                                  ?.productId
                              }
                            />
                          )}
                        />
                        {(errors?.products as any)?.[rowIndex]?.productId && (
                          <Typography color="error" variant="body1">
                            {
                              (errors.products as any)[rowIndex].productId
                                .message
                            }
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Controller
                          control={control}
                          name={`products.${rowIndex}.warehouse`}
                          render={({ field }) => (
                            <WarehouseAutoComplete
                              name={`products.${rowIndex}.warehouse`}
                              dir={t("dir")}
                              getWarehouse={(data: any) => {
                                setValue(
                                  `products.${rowIndex}.warehouse`,
                                  data?._id
                                );
                                setValue(
                                  `products.${rowIndex}.warehouseName`,
                                  data?.name
                                );
                                field.onChange(data?._id);
                                setProductCount((prevState)=>({
                                  ...prevState,
                                  entrepotId: data?._id,
                                  rowIndex:rowIndex
                                 
                                }));
                              }}
                              error={
                                !!(errors?.products as any)?.[rowIndex]
                                  ?.warehouse
                              }
                            />
                          )}
                        />
                        {(errors?.products as any)?.[rowIndex]?.warehouse && (
                          <Typography color="error" variant="body1">
                            {
                              (errors.products as any)[rowIndex].warehouse
                                .message
                            }
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Controller
                          control={control}
                          name={`products.${rowIndex}.measures`}
                          render={({ field }) => {
                            const measures = watch(
                              `products.${rowIndex}.measures`
                            );
                            return (
                              <EditCustomSelectMeasure
                                data={measures || undefined}
                                getDataSelect={(selectedMeasures) => {
                                  const updatedMeasures = (measures || [])?.map(
                                    (measure: any) => ({
                                      ...measure,
                                      selected: selectedMeasures?.some(
                                        (sel) =>
                                          sel.measureId === measure.measureId
                                      ),

                                      // ...measure,
                                      // selected: selectedMeasures.some(
                                      //   (sel) => sel.measureId === measure.measureId
                                      // ),
                                    })
                                  );
                                  // update(rowIndex , updatedMeasures)
                                  // setValue(`products.${rowIndex}.measures`, updatedMeasures);
                                  field.onChange(updatedMeasures);
                                }}
                              />
                            );
                          }}
                        />
                        {(errors?.products as any)?.[rowIndex]?.measureId && (
                          <Typography color="error" variant="body1">
                            {
                              (errors.products as any)[rowIndex].measureId
                                .message
                            }
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="right" sx={{ display: "grad", gap: 4 }}>
                        {watch(`products.${rowIndex}.measures`)
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => (
                            <TextField
                              sx={style}
                              size="small"
                              type="number"
                              placeholder="تعداد"
                              value={item?.amount || 1}
                              name={`products.${rowIndex}.measures.${measureIndex}.amount`}
                              onChange={(e) => {
                                const value =
                                  parseFloat(e.target.value) > 1
                                    ? parseFloat(e?.target.value)
                                    : 1;
                                // field.onChange(value);
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.amount`,
                                  value
                                );
                                const discountPercentage =
                                  item?.discountPercentage || 0;
                                const sellPrice = item?.sellPrice || 0;
                                const discountAmount = (
                                  (sellPrice * value * discountPercentage) /
                                  100
                                ).toFixed(2);
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.discount`,
                                  Number(discountAmount)
                                );
                              }}
                              error={
                                !!(errors?.products as any)?.[rowIndex]?.amount
                              }
                            />
                          ))}
                        {(errors?.products as any)?.[rowIndex]?.amount && (
                          <Typography color="error" variant="body1">
                            {(errors.products as any)[rowIndex].amount.message}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {watch(`products.${rowIndex}.measures`)
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => (
                            <TextField
                              sx={style}
                              size="small"
                              type="number"
                              placeholder="sell price"
                              value={item?.sellPrice}
                              name={`products.${rowIndex}.measures.${measureIndex}.sellPrice`}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.sellPrice`,
                                  value
                                );
                                // field.onChange(value);
                                // const discountPercentage =
                                //   measures[measureIndex]?.discountPercentage || 0;
                                // const sellPrice =
                                //   measures[measureIndex]?.sellPrice || 0;
                                // const discountAmount = (
                                //   (sellPrice * value * discountPercentage) /
                                //   100
                                // ).toFixed(2);
                                // setValue(
                                //   `products.${rowIndex}.measures.${measureIndex}.discount`,
                                //   Number(discountAmount)
                                // );
                              }}
                              error={
                                !!(errors?.products as any)?.[rowIndex]
                                  ?.sellPrice
                              }
                            />
                          ))}
                        {(errors?.products as any)?.[rowIndex]?.sellPrice && (
                          <Typography color="error" variant="body1">
                            {
                              (errors.products as any)[rowIndex].sellPrice
                                .message
                            }
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {watch(`products.${rowIndex}.measures`)
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => {
                            return (
                              <TextField
                                sx={style}
                                size="small"
                                type="number"
                                placeholder="Discount percentage"
                                value={item?.discountPercentage}
                                name={`products.${rowIndex}.measures.${measureIndex}.discountPercentage`}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value) || 0;
                                  setValue(
                                    `products.${rowIndex}.measures.${measureIndex}.discountPercentage`,
                                    value
                                  );
                                  const sellPrice = item?.sellPrice || 0;
                                  const amount = item?.amount || 1;
                                  const discountAmount = (
                                    (sellPrice * amount * value) /
                                    100
                                  ).toFixed(2);
                                  setValue(
                                    `products.${rowIndex}.measures.${measureIndex}.discount`,
                                    Number(discountAmount)
                                  );
                                }}
                              />
                            );
                          })}
                      </TableCell>
                      <TableCell align="right">
                        {watch(`products.${rowIndex}.measures`)
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => (
                            <TextField
                              sx={style}
                              size="small"
                              type="number"
                              placeholder="discount"
                              value={item?.discount}
                              name={`products.${rowIndex}.measures.${measureIndex}.discount`}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.discount`,
                                  value
                                );
                                const sellPrice = item?.sellPrice || 0;
                                const amount = item?.amount || 1;
                                const discountPercentage =
                                  sellPrice * amount > 0
                                    ? (
                                        (value / (sellPrice * amount)) *
                                        100
                                      ).toFixed(2)
                                    : 0;
                                setValue(
                                  `products.${rowIndex}.measures.${measureIndex}.discountPercentage`,
                                  Number(discountPercentage)
                                );
                              }}
                            />
                          ))}
                      </TableCell>
                      <TableCell align="right">
                        {watch(`products.${rowIndex}.measures`)
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => {
                            const discount = item?.discount || 0;
                            const amount = item?.amount || 1;
                            const sellPrice = item?.sellPrice || 0;
                            const total =
                              sellPrice * amount - (sellPrice * discount) / 100;
                            return (
                              <Typography key={item?.measureId}>
                                {Number.isInteger(total)
                                  ? total
                                  : total.toFixed(2)}
                              </Typography>
                            );
                          })}
                      </TableCell>
                      <TableCell align="right">
                        <Controller
                          control={control}
                          name={`products.${rowIndex}.expireInDate`}
                          render={({ field }) => {
                            const expirationDate = watch(
                              `products.${rowIndex}.expireInDate`
                            );

                            if (
                              !getValues()?.products?.[rowIndex]
                                ?.expireInDateSelected &&
                              expirationDate?.length > 0
                            ) {
                              setValue(
                                `products.${rowIndex}.expireInDateSelected`,
                                new Date(
                                  expirationDate?.[0]
                                )?.toLocaleDateString("en-GB")
                              );
                            }

                            return (
                              <Select
                                {...field}
                                fullWidth
                                sx={{ minWidth: "10rem" }}
                                value={new Date(
                                  expirationDate?.[0]
                                ).toLocaleDateString("en-GB")}
                                size="small"
                                onChange={(event: SelectChangeEvent) => {
                                  setValue(
                                    `products.${rowIndex}.expireInDateSelected`,
                                    event?.target?.value
                                  );
                                  // field.onChange(event.target.value as string);
                                }}
                                name={`products.${rowIndex}.expireInDateSelected`}
                                error={
                                  !!(errors?.products as any)?.[rowIndex]
                                    ?.expireInDateSelected
                                }
                              >
                                {(expirationDate || [])?.map(
                                  (item: string, index: number) => (
                                    <MenuItem
                                      key={"expireInDate_" + index}
                                      value={new Date(item)?.toLocaleDateString(
                                        "en-GB"
                                      )}
                                    >
                                      <Moment format="YYYY/MM/DD">
                                        {item}
                                      </Moment>
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            );
                          }}
                        />
                        {(errors?.products as any)?.[rowIndex]
                          ?.expireInDateSelected && (
                          <Typography color="error" variant="body1">
                            {
                              (errors.products as any)[rowIndex]
                                .expireInDateSelected.message
                            }
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <SaveRow
                          getProductId={(id: string) => setEditProductId(id)}
                        />
                        <IconButton
                          size="small"
                          onClick={handleDeleteFunction}
                          id={`${rowIndex}`}
                          disabled={paymentOff?._id ? true : false}
                        >
                          <Trash
                            size={20}
                            color={
                              paymentOff?._id
                                ? theme.palette.grey?.[600]
                                : theme.palette.primary.contrastText
                            }
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }

                return (
                  <TableRow
                    key={rows?.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      // border: rows?.error ? "2px solid #fe1212" : undefined,
                    }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      {rows?.productName}
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {rows?.warehouseName}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={0.5}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <Chip
                              key={item?.measureId}
                              label={item?.measureName}
                              sx={{ fontSize: "12px", width: "fit-content" }}
                              size={"medium"}
                            />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.amount}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.sellPrice}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.discountPercentage || 0}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any) => (
                            <span>{item?.discount || 0}</span>
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display={"grid"} rowGap={1}>
                        {rows?.measures
                          ?.filter((f: any) => f.selected)
                          ?.map((item: any, measureIndex: number) => {
                            const discount = item?.discount || 0;
                            const amount = item?.amount || 1;
                            const sellPrice = item?.sellPrice || 0;
                            const total =
                              sellPrice * amount - (sellPrice * discount) / 100;
                            return (
                              <Typography key={item?.measureId}>
                                {Number.isInteger(total)
                                  ? total
                                  : total.toFixed(2)}
                              </Typography>
                            );
                          })}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Moment format="YYYY/MM/DD">
                        {rows?.expirationDate?.[0]}
                      </Moment>
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        display={"flex"}
                        columnGap={1}
                        justifyContent={"center"}
                      >
                        <EditRow
                          getProductId={handleGetProductId}
                          productId={rows?.productId}
                          warehouse={rows?.warehouse}
                          isLoading={isLoadingProductCount}
                        />
                        <IconButton
                          size="medium"
                          onClick={handleDeleteFunction}
                          id={`${rowIndex}`}
                          disabled={paymentOff?._id ? true : false}
                        >
                          <Trash
                            size={20}
                            color={
                              paymentOff?._id
                                ? theme.palette.grey?.[600]
                                : theme.palette.primary.contrastText
                            }
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[100],
          padding: "1rem 1rem",
          display: "flex",
          columnGap: "1rem",
          alignItems: "center",
        }}
        mt={1}
      >
        <Button
          startIcon={<Add style={{ margin: "0 1rem" }} />}
          variant={"outlined"}
          size={"small"}
          onClick={handleAddNewProduct}
          // disabled={paymentOff?._id ? true : false}
        >
          {t("insert_new_row")}
        </Button>
        <Typography variant="overline">{t("total_products")}</Typography>
        <Typography
          variant="overline"
          bgcolor={theme.palette.grey[100]}
          minWidth={"15rem"}
          sx={{ paddingInlineStart: "1rem", borderRadius: "5px" }}
        >
          {fields?.length}
        </Typography>
      </Box>
      <Grid2
        container
        spacing={3}
        maxWidth="100%"
        justifyContent="space-between"
        sx={{ marginTop: "1.5rem" }}
      >
        <Grid2 size={8}></Grid2>
        <Grid2 size={4} marginTop={3}>
          <Box
            sx={{ borderBottom: `2px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
          >
            <Box
              bgcolor={theme.palette?.grey[100]}
              p={1}
              paddingInlineStart={2}
            >
              {" "}
              <Typography>{t("total_invoice_amount")}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {calculateSellBill.total}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
          >
            <Box
              bgcolor={theme.palette?.grey[100]}
              p={1}
              paddingInlineStart={2}
            >
              {" "}
              <Typography>{t("discount_amount")}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {calculateSellBill.discount}
            </Typography>
          </Box>
          <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
          >
            <Box
              bgcolor={theme.palette?.grey[100]}
              p={1}
              paddingInlineStart={2}
            >
              {" "}
              <Typography>
                {t("total_invoice_amount_after_discount")}
              </Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {calculateSellBill?.totalAfterDiscount}
            </Typography>
          </Box>
          {/* <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
            alignItems={"center"}
          >
            <Box
              bgcolor={theme.palette?.grey[100]}
              p={1}
              paddingInlineStart={2}
            >
              {" "}
              <Typography>{t("receipt")}</Typography>
            </Box>
            <Typography alignItems={"center"} display="grid">
              {paymentOff?.payAmount || calculateSellBill?.receipt}
            </Typography>
          </Box> */}
          {/* <Box
            sx={{ borderBottom: `1px solid ${theme.palette?.grey[100]}` }}
            display="grid"
            gridTemplateColumns={"50% 50%"}
            columnGap="1rem"
          >
            <Box
              bgcolor={theme.palette?.grey[100]}
              p={1}
              paddingInlineStart={2}
            >
              {" "}
              <Typography>{t("remaining")}</Typography>
            </Box>
            <Typography>{calculateSellBill?.remain}</Typography>
          </Box> */}
        </Grid2>
      </Grid2>
      <Box display="flex" columnGap={"1rem"}>
        <Typography variant="overline" bgcolor={theme.palette.grey[100]}>
          {t("total_invoice_after_discount_in_words")} :
        </Typography>
        <Typography variant="overline">
          {numberToWords(calculateSellBill?.total)}
        </Typography>
      </Box>
    </Box>
  );
}
