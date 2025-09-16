"use client"
import { Box, Typography } from "@mui/material"
import DataTable from "./Table"
import { useTranslations } from "next-intl"

const Container = () => {
    const t = useTranslations("pages")
    return <Box>
        <Box mb={3}>
        <Typography variant="h3">
                {t("journal.journal_book")}
              </Typography>

        </Box>
        <DataTable />
    </Box>
}

export default Container