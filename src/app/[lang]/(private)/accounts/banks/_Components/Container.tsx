"use client"
import AddBanksAccounts from "./Create";
import CollapseComponent from "@/components/collapse/Collapse";
import CustomSearch from "@/components/search/CustomSearch";
import { Box, Pagination, Stack, Typography } from "@mui/material";

interface IPropsBankAccountPages {
    t:any
}

const BanksAccountsPage:React.FC<IPropsBankAccountPages> = ({t}) => {
  return (
    <Box>
      <Typography variant="h3">لیست حساب های موجودی گذشته بانک ها</Typography>
      <Box display={"flex"} justifyContent={"space-between"} mt={4}>
        <Box>
          <AddBanksAccounts isEmptyPage={false} t={t}/>
        </Box>
        <Box>
          <CustomSearch t={t}/>
        </Box>
      </Box>
      <Box mt={2}>
        <CollapseComponent
          name="عزیزی بانک"
          createdAt="1402/2/23"
          height="270px"
          t={t}
          messageDescription=""
          messageTitle=""
        >
          <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
            <Typography variant="caption" pt={2}>
              کد صندوق{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              9983289{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              مبلغ{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              6000{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              دبت{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              1000 دالر{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              توضیحات{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              این آدم مبلغ همیقدر پول برده و دیگه به ای قرض ندهیم چون آدم گندی
              است بیایم دست به دست هم بدهیم و فساد را از کشور ریشه کن کنیم این
              وضعیت فعلی افغانستان اصل بدرد ای نمیخوره که آدم کاری بکنه بخاکی
              دیگه بریم آلمان. دوستا به فکر ای متن نشیم که چی است کار خو بکنیم.{" "}
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          name="عزیزی بانک"
          createdAt="1402/2/23"
          height="270px"
          t={t}
          messageDescription=""
          messageTitle=""
        >
          <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
            <Typography variant="caption" pt={2}>
              کد صندوق{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              9983289{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              مبلغ{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              6000{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              دبت{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              1000 دالر{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              توضیحات{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              این آدم مبلغ همیقدر پول برده و دیگه به ای قرض ندهیم چون آدم گندی
              است بیایم دست به دست هم بدهیم و فساد را از کشور ریشه کن کنیم این
              وضعیت فعلی افغانستان اصل بدرد ای نمیخوره که آدم کاری بکنه بخاکی
              دیگه بریم آلمان. دوستا به فکر ای متن نشیم که چی است کار خو بکنیم.{" "}
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          name="عزیزی بانک"
          createdAt="1402/2/23"
          height="270px"
          t={t}
          messageDescription=""
          messageTitle=""
        >
          <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
            <Typography variant="caption" pt={2}>
              کد صندوق{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              9983289{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              مبلغ{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              6000{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              دبت{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              1000 دالر{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              توضیحات{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              این آدم مبلغ همیقدر پول برده و دیگه به ای قرض ندهیم چون آدم گندی
              است بیایم دست به دست هم بدهیم و فساد را از کشور ریشه کن کنیم این
              وضعیت فعلی افغانستان اصل بدرد ای نمیخوره که آدم کاری بکنه بخاکی
              دیگه بریم آلمان. دوستا به فکر ای متن نشیم که چی است کار خو بکنیم.{" "}
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          name="عزیزی بانک"
          createdAt="1402/2/23"
          height="270px"
          t={t}
          messageDescription=""
          messageTitle=""
        >
          <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
            <Typography variant="caption" pt={2}>
              کد صندوق{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              9983289{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              مبلغ{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              6000{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              دبت{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              1000 دالر{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              توضیحات{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              این آدم مبلغ همیقدر پول برده و دیگه به ای قرض ندهیم چون آدم گندی
              است بیایم دست به دست هم بدهیم و فساد را از کشور ریشه کن کنیم این
              وضعیت فعلی افغانستان اصل بدرد ای نمیخوره که آدم کاری بکنه بخاکی
              دیگه بریم آلمان. دوستا به فکر ای متن نشیم که چی است کار خو بکنیم.{" "}
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          name="عزیزی بانک"
          createdAt="1402/2/23"
          height="270px"
          t={t}
          messageDescription=""
          messageTitle=""
        >
          <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
            <Typography variant="caption" pt={2}>
              کد صندوق{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              9983289{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              مبلغ{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              6000{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              دبت{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              1000 دالر{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              توضیحات{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              این آدم مبلغ همیقدر پول برده و دیگه به ای قرض ندهیم چون آدم گندی
              است بیایم دست به دست هم بدهیم و فساد را از کشور ریشه کن کنیم این
              وضعیت فعلی افغانستان اصل بدرد ای نمیخوره که آدم کاری بکنه بخاکی
              دیگه بریم آلمان. دوستا به فکر ای متن نشیم که چی است کار خو بکنیم.{" "}
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          name="عزیزی بانک"
          createdAt="1402/2/23"
          height="270px"
          t={t}
          messageDescription=""
          messageTitle=""
        >
          <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
            <Typography variant="caption" pt={2}>
              کد صندوق{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              9983289{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              مبلغ{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              6000{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              دبت{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              1000 دالر{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              توضیحات{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              این آدم مبلغ همیقدر پول برده و دیگه به ای قرض ندهیم چون آدم گندی
              است بیایم دست به دست هم بدهیم و فساد را از کشور ریشه کن کنیم این
              وضعیت فعلی افغانستان اصل بدرد ای نمیخوره که آدم کاری بکنه بخاکی
              دیگه بریم آلمان. دوستا به فکر ای متن نشیم که چی است کار خو بکنیم.{" "}
            </Typography>
          </Box>
        </CollapseComponent>
        <CollapseComponent
          name="عزیزی بانک"
          createdAt="1402/2/23"
          height="270px"
          t={t}
          messageDescription=""
          messageTitle=""
        >
          <Box display={"grid"} gridTemplateColumns={"15rem auto"}>
            <Typography variant="caption" pt={2}>
              کد صندوق{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              9983289{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              مبلغ{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              6000{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              دبت{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              1000 دالر{" "}
            </Typography>
            <Typography variant="caption" pt={2}>
              {" "}
              توضیحات{" "}
            </Typography>
            <Typography variant="caption">
              {" "}
              این آدم مبلغ همیقدر پول برده و دیگه به ای قرض ندهیم چون آدم گندی
              است بیایم دست به دست هم بدهیم و فساد را از کشور ریشه کن کنیم این
              وضعیت فعلی افغانستان اصل بدرد ای نمیخوره که آدم کاری بکنه بخاکی
              دیگه بریم آلمان. دوستا به فکر ای متن نشیم که چی است کار خو بکنیم.{" "}
            </Typography>
          </Box>
        </CollapseComponent>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
        <Stack spacing={2} p={1}>
          <Pagination
            count={Math.ceil(100 / 10)}
            size={"medium"}
            // onChange={handleChangePage}
            variant="outlined"
            color="primary"
            shape="rounded"
            sx={{
              fontSize: "2rem !important",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};
export default BanksAccountsPage;

