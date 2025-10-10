import { Typography } from '@mui/material';
import { GridColDef, GridFilterModel, GridRenderCellParams } from '@mui/x-data-grid';
import { BaseTable } from '../../../components/BaseTable';
import { RenderCellActions } from '../../../helpers/renderActionCell/RenderCellActions';
import { RenderNameCell } from '../../../helpers/renderNameCell/RenderNameCell';
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

    function renderType(row: GridRenderCellParams) {
        return (
            <Typography >
                {row.value === 1 ? "Director" : "Actor"}
            </Typography>
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
            renderCell: (row) => RenderNameCell(row, 'cast-members')
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
            renderCell: (row) => RenderCellActions(row, handleDelete)
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
