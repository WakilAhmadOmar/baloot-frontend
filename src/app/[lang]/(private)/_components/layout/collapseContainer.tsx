"use client"
import { Fragment, MouseEvent, useState } from "react";
import ListItemComponent from "./listItem";
import { Collapse, List } from "@mui/material";
import LinkLayout from "./linkLayout";

interface IPropsCollapseContainer {
  t: any;
  lang:string,
            open:boolean
}

const CollapseContainer: React.FC<IPropsCollapseContainer> = ({ t  , lang , open}) => {
  const [selectedList, setSelected] = useState("");
  const handleChangeCollapse = (event: MouseEvent<HTMLElement>) => {
    const data = event.currentTarget?.id
    if (data === selectedList){
      setSelected("");

    }else{
      setSelected(data);
    }
  };
  return (
    <Fragment>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="definitions"
        selectedList={selectedList}
        t={t}
        text={t?.layout?.definitions}
        open={open}
      />
      <Collapse
        in={selectedList === "definitions"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout href={ "/" + lang +"/definitions/definitionUnit"} lang={lang} open={true} t={t} text={t?.layout?.definitions_units}  />
          <LinkLayout href={ lang +"/definitions/products"} lang={lang} open={true} t={t} text={t?.layout?.products_definition}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.products_category}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.warehouse_definition}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.customer_definition}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.employee_definition}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.cashBox_definition}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.banks_definition}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.consumption_definition}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.external_income}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.partners_definition}  />
        </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="accounts"
        selectedList={selectedList}
        t={t}
        text={t?.layout?.accounts}
        open={open}
      />
      <Collapse
        in={selectedList === "accounts"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout href={ lang +"/definitions/definitionUnit"} lang={lang} open={true} t={t} text={t?.layout?.customers_accounts}  />
          <LinkLayout href={ lang +"/definitions/products"} lang={lang} open={true} t={t} text={t?.layout?.employees_accounts}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Recording_past_fund_balances}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Recording_past_bank_balances}  />
          </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="Buying_and_selling"
        selectedList={selectedList}
        t={t}
        text={t?.layout?.Buying_and_selling}
        open={open}
      />
      <Collapse
        in={selectedList === "Buying_and_selling"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout href={ "/" + lang +"/invoice/purchase_invoice"} lang={lang} open={true} t={t} text={t?.layout?.purchase_invoice}  />
          <LinkLayout href={ lang +"/definitions/products"} lang={lang} open={true} t={t} text={t?.layout?.return_from_purchase}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.sales_invoice}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.return_from_sale}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.pre_purchase_invoice}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.pre_sales_invoice}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.rating_factor}  />
          </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="cash_receipts_and_payments"
        selectedList={selectedList}
        t={t}
        text={t?.layout?.cash_receipts_and_payments}
        open={open}
      />
      <Collapse
        in={selectedList === "cash_receipts_and_payments"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout href={ lang +"/definitions/definitionUnit"} lang={lang} open={true} t={t} text={t?.layout?.individual_cash_collection}  />
          <LinkLayout href={ lang +"/definitions/products"} lang={lang} open={true} t={t} text={t?.layout?.cash_payment_to_individuals}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.cash_receipt_from_employees}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.cash_payment_to_employees}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.expense_recording}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.recording_external_revenues}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.recording_employee_salaries}  />
          </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="financial_reports"
        selectedList={selectedList}
        t={t}
        text={t?.layout?.financial_reports}
        open={open}
      />
      <Collapse
        in={selectedList === "financial_reports"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout href={ lang +"/definitions/definitionUnit"} lang={lang} open={true} t={t} text={t?.layout?.customer_invoice}  />
          <LinkLayout href={ lang +"/definitions/products"} lang={lang} open={true} t={t} text={t?.layout?.employee_invoice}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.partner_invoice}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.debits_and_credits_across_all_accounts}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.expense_statement}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.external_revenue_statement}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.profit_and_loss_statement}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.total_balance_in_base_currency}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.general_ledger}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.detailed_balance}  />
          </List>
      </Collapse>
      <ListItemComponent
        handleOpenCollapse={handleChangeCollapse}
        name="Inventory_Reports"
        selectedList={selectedList}
        t={t}
        text={t?.layout?.Inventory_Reports}
        open={open}
      />
      <Collapse
        in={selectedList === "Inventory_Reports"}
        timeout="auto"
        unmountOnExit
      >
        <List>
          <LinkLayout href={ lang +"/definitions/definitionUnit"} lang={lang} open={true} t={t} text={t?.layout?.Inventory_Report_with_Date}  />
          <LinkLayout href={ lang +"/definitions/products"} lang={lang} open={true} t={t} text={t?.layout?.Report_of_Expired_Items}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Top_Selling_Products_Report}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Pre_Sale_Inventory_Report}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Pre_Ordered_Inventory_Report}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Total_Product_Sales_Report}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Total_Product_Purchase_Report}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Profit_on_a_Single_Item_Sale}  />
          <LinkLayout href={ lang +"/definitions/products_category"} lang={lang} open={true} t={t} text={t?.layout?.Inter_Warehouse_Transfer_Report}  />
          </List>
      </Collapse>
    </Fragment>
  );
};

export default CollapseContainer;
