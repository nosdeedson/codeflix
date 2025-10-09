import { Typography } from "@mui/material";
import { GridColDef, GridFilterModel, GridRenderCellParams } from "@mui/x-data-grid";
import { BaseTable } from "../../../components/BaseTable";
import { renderCellActions } from "../../../helpers/renderActionCell/renderCellActions";
import { renderNameCell } from "../../../helpers/renderNameCell/renderNameCell";
import { Results } from "../../../types/Video"

type Props = {
    data: Results | undefined;
    perPage: number;
    isFetching: boolean;
    rowsPerPage: number[];
    handleOnPageChange: (page: number) => void;
    handlePageSizeChange: (perPage: number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleDelete: (id: string) => void;
}

export function VideoTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handlePageSizeChange,
    handleFilterChange,
    handleDelete
}: Props) {

    function renderCategories(row: GridRenderCellParams){
        return(
            <Typography>
                {row.value?.map((c: {name: string}) => c.name).join(', ') || ''};
            </Typography>
        );
    }

    function renderGenres(row: GridRenderCellParams){
        return (
            <Typography>
                {row.value?.map((g: { name: string}) => g.name).join(', ') || ''}
            </Typography>
        )
    }

    function renderCastMembers(row: GridRenderCellParams){
        return (
            <Typography>
                {row.value?.map( (c: { name: string}) => c.name).join(', ') || ''};
            </Typography>
        )
    }

    const mapDataToGridRows = (data: Results) => {
        return data.data.map((it) => ({
            id: it.id,
            title: it.title,
            categories: it.categories,
            castMembers: it.cast_members,
            genres: it.genres,
            createdAt: new Date(it.created_at).toLocaleDateString('pt-BR')
        }));
    };

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Title',
            flex: 1,
            renderCell: (row) => renderNameCell(row, 'videos')
        },
        {
            field: 'categories',
            headerName: 'Categories',
            flex: 1,
            renderCell: renderCategories
        },
        {
            field: 'castMembers',
            headerName: 'Cast Members',
            flex: 1,
            renderCell: renderCastMembers,
        },
        {
            field: 'genres',
            headerName: 'Genres',
            flex: 1,
            renderCell: renderGenres
        },
        {
            field: 'createdAt',
            headerName: 'Created',
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
    ];

    return (
        <BaseTable 
            data={data}
            mapDataToGridRows={mapDataToGridRows}
            columns={columns}
            perPage={perPage}
            rowsPerPage={rowsPerPage}
            isFetching={isFetching}
            rowCount={data?.meta?.total ?? 0}
            handleOnPageChange={handleOnPageChange}
            handleFilterChange={handleFilterChange}
            handleOnPageSizeChange={handlePageSizeChange}
        />
    )

}