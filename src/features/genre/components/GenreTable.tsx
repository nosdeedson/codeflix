import { Typography } from '@mui/material';
import { GridColDef, GridFilterModel, GridRenderCellParams } from '@mui/x-data-grid';
import { BaseTable } from '../../../components/BaseTable';
import { renderCellActions } from '../../../helpers/renderActionCell/renderCellActions';
import { renderNameCell } from '../../../helpers/renderNameCell/renderNameCell';
import { Results } from '../../../types/Genre';

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

export function GenreTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handlePageSizeChange,
    handleDelete,
}: Props) {

    function renderIsActiveCel(row: GridRenderCellParams) {
        return (
            <Typography>
                {row?.value ? "Active" : "Inactive"}
            </Typography>
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
            renderCell: (row) => renderNameCell(row, 'genres')
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
            renderCell: (row) => renderCellActions(row, handleDelete)
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
