import { Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid"
import { Link } from "react-router-dom";

export function renderNameCell(row: GridRenderCellParams, baseUrl: string) {
    return (
        <Link
            style={{ textDecoration: 'none' }}
            to={`/${baseUrl}/edit/${row.id}`}
        >
            <Typography color="primary">{row.value}</Typography>
        </Link>
    );
}