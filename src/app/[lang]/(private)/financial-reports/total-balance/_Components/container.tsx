import { BalanceIcon } from "@/icons";
import { Box, Button, Typography } from "@mui/material";
import { Balance } from "./balance-item";



export const TotalBalanceContainer = () => {
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
          amount="75636.39"
        />
        <Balance
          color1="#6CFB3966"
          color2="#01A00866"
          text={"مجموعه طلبات"}
          amount="75636.39"
        />
        <Balance
          color1="#F739FB66"
          color2="#9D01A066"
          text={"مجموعه قرض ها"}
          amount="75636.39"
        />
        <Balance
          color1="#FBA23966"
          color2="#DF860066"
          text={"موجودی اجناس"}
          amount="75636.39"
        />
        <Balance
          color1="#FB683966"
          color2="#DF360066"
          text={"موجودی بانکها"}
          amount="75636.39"
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
          amount="75636.39"
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


