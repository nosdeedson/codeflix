import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Results } from '../../../types/CastMember';


type Props = {
    data: Results | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChage: (page: number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
}

export function CastMembersTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChage,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete
}: Props) {

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
        }
    };

    const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

    const columns: GridColDef[] = [

        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'type',
            headerName: 'Type',
            flex: 1,
            type: 'string',
            renderCell: renderType
        },
        {
            field: 'id',
            headerName: 'Actions',
            type: 'string',
            flex: 1,
            renderCell: renderActionsCell
        },
    ];


    function renderNameCell(row: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: 'none' }}
                to={`/cast-members/edit/${row.id}`}
            >
                <Typography color="primary">{row.value}</Typography>
            </Link>
        );
    }

    function mapDataToGridRows(data: Results) {
        const { data: castMembers } = data;
        return castMembers.map((castMember) => ({
            id: castMember.id,
            name: castMember.name,
            type: castMember.type,
        }))
    }

    function renderActionsCell(row: GridRenderCellParams) {
        return (
            <IconButton
                color='secondary'
                onClick={() => handleDelete(row.value)}

            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function renderType(row: GridRenderCellParams) {
        return (
            <Typography >
                {row.value == 1 ? "Director" : "Actor"}
            </Typography>
        );
    }

    const rowCount = data?.meta?.total ?? 0;

    return (
        <Box sx={{ display: 'flex', height: 375 }} >
            <DataGrid
                components={{ Toolbar: GridToolbar }}
                columns={columns}
                componentsProps={componentProps}
                // checkboxSelection={true}
                disableSelectionOnClick={true}
                disableColumnSelector={true}
                disableColumnFilter={true}
                disableDensitySelector={true}
                loading={isFetching}
                onFilterModelChange={handleFilterChange}
                onPageChange={handleOnPageChage}
                onPageSizeChange={handleOnPageSizeChange}
                pageSize={perPage}
                paginationMode={"server"}
                rowsPerPageOptions={rowsPerPage}
                rowCount={rowCount}
                rows={rows}
            />
        </Box>
    )
}
