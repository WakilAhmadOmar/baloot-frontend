"use client";
import { BalanceIcon } from "@/icons";
import { Box, Button, Typography } from "@mui/material";
import { Balance } from "./balance-item";
import { useGetCashAtBankReportQuery } from "@/hooks/api/transactions/queries/use-get-cash-at-bank-report";
import { useGetCashAtCashboxReportQuery } from "@/hooks/api/transactions/queries/use-get-cash-at_cashbox-report";
import { useGetFinancialReportsForExistingProductsQuery } from "@/hooks/api/transactions/queries/use-get-financial-reports-for-existing-products";
import { useGetTotalReceivablesAndLiabilitiesReportQuery } from "@/hooks/api/transactions/queries/use-get-total-receivables_and_liabilities_report";
import { useGetTotalFixedAssetsQuery } from "@/hooks/api/transactions/queries/ues-get-total-fixed-assets-report";



export const TotalBalanceContainer = () => {
  const {data: cashAtBankReport , isLoading: isLoadingCashAtBankReport} = useGetCashAtBankReportQuery()
  const {data: cashAtCashboxReport , isLoading: isLoadingCashAtCashboxReport} = useGetCashAtCashboxReportQuery()
  const {data: productReport , isLoading: isLoadingProductReport} = useGetFinancialReportsForExistingProductsQuery()
  const {data: totalReceivableReport , isLoading: isLoadingTotalReceivableReport} = useGetTotalReceivablesAndLiabilitiesReportQuery()
  const {data: totalFixedAssets , isLoading: isLoadingFixedAssets} = useGetTotalFixedAssetsQuery()
  return (
    <Box>
      <Typography variant="h3">بیلانس کل با ارز معیاری</Typography>
      <Box display={"flex"} justifyContent={"flex-end"} mb={2}>
        <Box
          sx={{
            backgroundColor: "#E4E4E4",
            padding: "1rem",
            display: "flex",
            columnGap: "1rem",
            borderRadius: "0.8rem",
          }}
        >
          <Button
            variant="contained"
            sx={{
              paddingLeft: "1rem !important",
              paddingRight: "1rem !important",
              paddingTop: "0rem !important",
              paddingBottom: "0rem !important",
              fontSize: "1.4rem",
              fontWeight: 400,
              borderRadius: "0.7rem",
            }}
          >
            دالر
          </Button>
          <Button
            sx={{
              paddingLeft: "1rem !important",
              paddingRight: "1rem !important",
              paddingTop: "0rem !important",
              paddingBottom: "0rem !important",
              fontSize: "1.4rem",
              fontWeight: 400,
              borderRadius: "0.7rem",
            }}
          >
            {" "}
            افغانی
          </Button>
        </Box>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} columnGap={1} rowGap={1}>
        <Balance
          color1="#3970FB66"
          color2="#0031DF66"
          text={"مجموعه دارای های ثابت"}
          amount={totalFixedAssets?.totalAmount.toFixed(2) + totalFixedAssets?.currencyId?.symbol}
        />
        <Balance
          color1="#6CFB3966"
          color2="#01A00866"
          text={"مجموعه طلبات"}
          isLoading={isLoadingTotalReceivableReport}
          amount={totalReceivableReport?.receivables?.totalAmount?.toFixed(2) + totalReceivableReport?.receivables?.currencyId?.symbol}
        />
        <Balance
          color1="#F739FB66"
          color2="#9D01A066"
          text={"مجموعه قرض ها"}
          isLoading={isLoadingTotalReceivableReport}
          amount={totalReceivableReport?.liabilities?.totalAmount?.toFixed(2) + totalReceivableReport?.liabilities?.currencyId?.symbol}
        />
        <Balance
          color1="#FBA23966"
          color2="#DF860066"
          text={" مبلغ کل اجناس موجود"}
          isLoading={isLoadingProductReport}
          amount={productReport?.totalAmount.toFixed(2)+ productReport?.currencyId?.symbol}
        />
        <Balance
          color1="#FB683966"
          color2="#DF360066"
          text={"موجودی بانکها"}
          isLoading={isLoadingCashAtBankReport}
          amount={cashAtBankReport?.totalAmount.toFixed(2)+ cashAtBankReport?.currencyId?.symbol}
        />
        <Balance
          color1="#399EFB66"
          color2="#00AADF66"
          text={"مجموعه کل سرمایه فعلی"}
          amount="75636.39"
        />
        <Balance
          color1="#C839FB66"
          color2="#DB00DF66"
          text={"مفاد و ضرر"}
          amount="75636.39"
        />
        <Balance
          color1="#399EFB66"
          color2="#0059DF66"
          text={"سرمایه اولیه"}
          amount="75636.39"
        />
        <Balance
          color1="#39FBE466"
          color2="#01A09766"
          text={"موجودی دخلها"}
          isLoading={isLoadingCashAtCashboxReport}
          amount={cashAtCashboxReport?.totalAmount.toFixed(2) + cashAtCashboxReport?.currencyId?.symbol}
        />
        <Balance
          color1="#D4FB3966"
          color2="#9DA00166"
          text={"مجموعه مصارف"}
          amount="75636.39"
        />
        <Balance
          color1="#6CFB3966"
          color2="#01A00866"
          text={"مجموعه خریدات"}
          amount="75636.39"
        />
      </Box>
    </Box>
  );
};


