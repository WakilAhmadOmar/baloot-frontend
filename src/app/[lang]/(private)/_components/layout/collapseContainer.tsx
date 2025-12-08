"use client";
import { Fragment, MouseEvent, useState } from "react";
import ListItemComponent from "./listItem";
import { Collapse, List } from "@mui/material";
import LinkLayout from "./linkLayout";
import { useTranslations } from "next-intl";

interface IPropsCollapseContainer {

  lang: string;
  open: boolean;
}

const CollapseContainer: React.FC<IPropsCollapseContainer> = ({

  lang,
  open,
}) => {
  const t = useTranslations("layout")
  const [selectedList, setSelected] = useState("");
  const handleChangeCollapse = (event: MouseEvent<HTMLElement>) => {
    const data = event.currentTarget?.id;
    if (data === selectedList) {
      setSelected("");
    } else {
      setSelected(data);
    }
  };
  return (
    <Fragment>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="definitions"
        selectedList={selectedList}

        text={t("definitions")}
        open={open}
      />
      <Collapse
        in={selectedList === "definitions"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout
            href={"/" + lang + "/definitions/definitionUnit"}
            lang={lang}
            open={true}
            text={t("definitions_units")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/product"}
            lang={lang}
            open={true}
            text={t("products_definition")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/fixed-products"}
            lang={lang}
            open={true}
            text={t("fixed_assets")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/product-category"}
            lang={lang}
            open={true}
            text={t("products_category")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/warehouse"}
            lang={lang}
            open={true}
            text={t("warehouse_definition")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/customer"}
            lang={lang}
            open={true}
            text={t("customer_definition")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/employee"}
            lang={lang}
            open={true}
            text={t("employee_definition")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/cashBox"}
            lang={lang}
            open={true}
            text={t("cashBox_definition")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/bank"}
            lang={lang}
            open={true}
            text={t("banks_definition")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/consumption"}
            lang={lang}
            open={true}
            text={t("consumption_definition")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/external-income"}
            lang={lang}
            open={true}
            text={t("external_income")}
          />
          <LinkLayout
            href={"/" + lang + "/definitions/partners"}
            lang={lang}
            open={true}
            text={t("partners_definition")}
          />
        </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="accounts"
        selectedList={selectedList}
        text={t("accounts")}
        open={open}
      />
      <Collapse in={selectedList === "accounts"} timeout="auto" unmountOnExit>
        <List>
          <LinkLayout
            href={"/" + lang + "/accounts/customers"}
            lang={lang}
            open={true}
            text={t("customers_accounts")}
          />
          <LinkLayout
            href={"/" + lang + "/accounts/employees"}
            lang={lang}
            open={true}
            text={t("employees_accounts")}
          />
          <LinkLayout
            href={"/" + lang + "/accounts/cash-box"}
            lang={lang}
            open={true}
            text={t("Recording_past_fund_balances")}
          />
          <LinkLayout
            href={"/" + lang + "/accounts/banks"}
            lang={lang}
            open={true}
            text={t("Recording_past_bank_balances")}
          />
        </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="Buying_and_selling"
        selectedList={selectedList}
        text={t("Buying_and_selling")}
        open={open}
      />
      <Collapse
        in={selectedList === "Buying_and_selling"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout
            href={"/" + lang + "/invoice/purchase-invoice"}
            lang={lang}
            open={true}
            text={t("purchase_invoice")}
          />
          {/* <LinkLayout href={ lang +"/definitions/products"} lang={lang} open={true} t={t} text={t("return_from_purchase")}  /> */}
          <LinkLayout
            href={"/" + lang + "/invoice/sales-invoice"}
            lang={lang}
            open={true}
            text={t("sales_invoice")}
          />
          {/*<LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("return_from_sale")}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("pre_purchase_invoice")}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("pre_sales_invoice")}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("rating_factor")}  /> */}
        </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="transactions_received_paid"
        selectedList={selectedList}
        text={t("transactions_received_paid")}
        open={open}
      />
      <Collapse
        in={selectedList === "transactions_received_paid"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout
            href={"/" + lang + "/transactions/receive-customer"}
            lang={lang}
            open={true}
            text={t("cash_receipt_from_customer")}
          />
          <LinkLayout
            href={"/" + lang + "/transactions/receive-employee"}
            lang={lang}
            open={true}
            text={t("cash_receipt_from_employees")}
          />
          <LinkLayout
            href={"/" + lang + "/transactions/payment-customer"}
            lang={lang}
            open={true}
            text={t("cash_payment_to_customer")}
          />
          <LinkLayout
            href={"/" + lang + "/transactions/payment-employee"}
            lang={lang}
            open={true}
            text={t("cash_payment_to_employees")}
          />
          <LinkLayout
            href={"/" + lang + "/transactions/expenses"}
            lang={lang}
            open={true}
            text={t("expense_recording")}
          />
          <LinkLayout
            href={"/" + lang + "/transactions/external-income"}
            lang={lang}
            open={true}
            text={t("recording_external_revenues")}
          />
          <LinkLayout
            href={"/" + lang + "/transactions/employee-salary"}
            lang={lang}
            open={true}
            text={t("recording_employee_salaries")}
          />
        </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="financial_reports"
        selectedList={selectedList}
        text={t("financial_reports")}
        open={open}
      />
      <Collapse
        in={selectedList === "financial_reports"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout href={"/" + lang +"/financial-reports/customers"} lang={lang} open={true}  text={t("customer_invoice")}  />
           <LinkLayout href={"/" + lang +"/financial-reports/employees"} lang={lang} open={true}  text={t("employee_invoice")}  />
          {/* <LinkLayout href={ "/" + lang +"/financial-reports/partner"} lang={lang} open={true}  text={t("partner_invoice")}  />
          <LinkLayout href={"/" + lang +"/financial-reports/debit-credit"} lang={lang} open={true}  text={t("debits_and_credits_across_all_accounts")}  /> */}
          <LinkLayout href={"/"+ lang +"/financial-reports/expense"} lang={lang} open={true}  text={t("expense_statement")}  />
         {/* <LinkLayout href={"/"+ lang +"/financial-reports/external-income"} lang={lang} open={true}  text={t("external_revenue_statement")}  /> */}
           <LinkLayout href={"/" +lang +"/financial-reports/profit-loss"} lang={lang} open={true} text={t("profit_and_loss_statement")}  />
         <LinkLayout href={ "/"+lang +"/financial-reports/total-balance"} lang={lang} open={true}  text={t("total_balance_in_base_currency")}  />
          {/* <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("general_ledger")}  />*/}
          <LinkLayout href={ "/" + lang +"/financial-reports/details-balance"} lang={lang} open={true} text={t("detailed_balance")}  /> 
        </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="Inventory_Reports"
        selectedList={selectedList}
        text={t("Inventory_Reports")}
        open={open}
      />
      <Collapse
        in={selectedList === "Inventory_Reports"}
        timeout="auto"
        unmountOnExit
      >
        <List>
           <LinkLayout href={ "/"+ lang +"/products-reports/with-date"} lang={lang} open={true} text={t("Inventory_Report_with_Date")}  />
           <LinkLayout href={ "/"+ lang +"/products-reports/expired-products"} lang={lang} open={true}  text={t("Report_of_Expired_Items")}  />
          <LinkLayout href={"/"+lang +"/products-reports/total-sales"} lang={lang} open={true}  text={t("Total_Product_Sales_Report")}  />
          <LinkLayout href={ "/"+ lang +"/products-reports/total-buy"} lang={lang} open={true}  text={t("Total_Product_Purchase_Report")}  />
          {/*<LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("Top_Selling_Products_Report")}  />
          <LinkLayout href={"/"+ lang +"/products-reports/products_category"} lang={lang} open={true} t={t} text={t("Pre_Sale_Inventory_Report")}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("Total_Product_Purchase_Report")}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("Profit_on_a_Single_Item_Sale")}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t("Inter_Warehouse_Transfer_Report")}  /> */}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default CollapseContainer;
