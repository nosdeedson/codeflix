import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { GridRenderCellParams } from "@mui/x-data-grid";

export function renderCellActions(
    row: GridRenderCellParams,
    handleDelete: (id: string) => void
){
    return (
            <IconButton
                color='secondary'
                onClick={() => handleDelete(row.value)}

            >
                <DeleteIcon />
            </IconButton>
        );
}