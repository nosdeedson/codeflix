import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';
import { GridColDef, GridFilterModel, GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { BaseTable } from '../../../components/BaseTable';
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

    function renderType(row: GridRenderCellParams) {
        return (
            <Typography >
                {row.value === 1 ? "Director" : "Actor"}
            </Typography>
        );
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

    const mapDataToGridRows = (data: Results) =>
        data.data.map((it) => ({
            id: it.id,
            name: it.name,
            type: it.type,
        }));
    
    const columns : GridColDef[] = [
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
            renderCell: renderType,
        },
        {
            field: 'id',
            headerName: 'Actions',
            flex: 1,
            renderCell: renderActionsCell
        }
    ]

    return (
        <BaseTable
            data={data}
            mapDataToGridRows={mapDataToGridRows}
            columns={columns}
            perPage={perPage}
            isFetching={isFetching}
            rowsPerPage={rowsPerPage}
            rowCount={data?.meta?.total ?? 0}
            handleOnPageChange={handleOnPageChage}
            handleFilterChange={handleFilterChange}
            handleOnPageSizeChange={handleOnPageSizeChange}
        />
    )
}
