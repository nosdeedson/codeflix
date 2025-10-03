import { IconButton, Typography } from '@mui/material';
import { GridColDef, GridFilterModel, GridRenderCellParams } from '@mui/x-data-grid';
import React from 'react'
import { Link } from 'react-router-dom';
import { Results } from '../../../types/Genre';
import DeleteIcon from '@mui/icons-material/Delete';
import { BaseTable } from '../../../components/BaseTable';

type Props = {
    data: Results | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage: number[];
    handleOnPageChange: (page: number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handlePageSizeChange: (perPage: number) => void;
    handleDelete: (id: string) => void;
}

export default function GenreTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handlePageSizeChange,
    handleDelete,
}: Props) {

    function renderNameCell(row: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: 'none' }}
                to={`/genres/edit/${row.id}`}
            >
                <Typography color='primary'>{row.value}</Typography>
            </Link>
        );
    }

    function renderIsActiveCel(row: GridRenderCellParams) {
        return (
            <Typography>
                {row?.value ? "Active" : "Inactive"}
            </Typography>
        );
    }

    function rendeActionsCell(row: GridRenderCellParams) {
        return (
            <IconButton
                color='secondary'
                onClick={() => handleDelete(row.value)}
            >
                <DeleteIcon />
            </IconButton>
        );
    }

    function renderCategories(row: GridRenderCellParams) {
        return (
            <Typography>
                {row.value?.map((c: { name: any; }) => c.name).join(', ') || ''}
            </Typography>
        );
    }


    const mapDataToGridRows = (data: Results) => {
        return data.data.map((it) => ({
            id: it.id,
            name: it.name,
            isActive: it.is_active,
            categories: it.categories,
            createdAt: new Date(it.created_at).toLocaleDateString('pt-BR'),
        }));
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 0.5,
            type: 'boolean',
            renderCell: renderIsActiveCel
        },
        {
            field: 'categories',
            headerName: "Categories",
            flex: 2,
            renderCell: renderCategories
        },
        {
            field: "createdAt",
            headerName: "Created",
            type: 'string',
            flex: 0.5
        },
        {
            field: 'id',
            headerName: 'Actions',
            type: 'string',
            flex: 0.3,
            renderCell: rendeActionsCell
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
            handleOnPageChange={handleOnPageChange}
            handleFilterChange={handleFilterChange}
            handleOnPageSizeChange={handlePageSizeChange}
        />
    )
}
