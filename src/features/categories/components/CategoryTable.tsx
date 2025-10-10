import { Typography } from '@mui/material';
import { GridColDef, GridFilterModel, GridRenderCellParams } from '@mui/x-data-grid';
import { BaseTable } from '../../../components/BaseTable';
import { RenderCellActions } from '../../../helpers/renderActionCell/RenderCellActions';
import { RenderNameCell } from '../../../helpers/renderNameCell/RenderNameCell';
import { Results } from '../../../types/Category';

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

export function CategoryTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChage,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete
}: Props) {

    function renderIsActiveCel(row: GridRenderCellParams) {
        return (
            <Typography color={row.value ? "primary" : 'secondary'}>
                {row.value ? "Active" : "Inactive"}
            </Typography>
        );
    }


    const mapDataToGridRows = (data: Results) =>
        data.data.map((it) => ({
            id: it.id,
            name: it.name,
            description: it.description,
            isActive: it.is_active,
            createdAt: new Date(it.created_at).toLocaleDateString('pt-BR'),
        }))

    const columns: GridColDef[] = [

        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: (row) => RenderNameCell(row, 'categories')
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: 'boolean',
            renderCell: renderIsActiveCel
        },
        {
            field: 'createdAt',
            headerName: 'Created',
            flex: 1,
            type: 'date'
        },
        {
            field: 'id',
            headerName: 'Actions',
            type: 'string',
            flex: 1,
            renderCell: (row) => RenderCellActions(row, handleDelete)
        },
    ];

    // const rowCount = data?.meta?.total ?? 0;

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
