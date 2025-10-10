import { GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { BaseTable } from "../../../components/BaseTable";
import { FormatEntitiesName } from "../../../helpers/formatEntitiesName/FormatEntitiesName";
import { RenderCellActions } from "../../../helpers/renderActionCell/RenderCellActions";
import { RenderNameCell } from "../../../helpers/renderNameCell/RenderNameCell";
import { Results } from "../../../types/Video";

type Props = {
    data: Results | undefined;
    handleDelete: (id: string) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageChange: (page: number) => void;
    handlePageSizeChange: (perPage: number) => void;
    isFetching: boolean;
    perPage: number;
    rowsPerPage: number[];
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
            renderCell: (row) => RenderNameCell(row, 'videos')
        },
        {
            field: 'categories',
            headerName: 'Categories',
            flex: 1,
            renderCell: (row) => FormatEntitiesName(row) //renderCategories
        },
        {
            field: 'castMembers',
            headerName: 'Cast Members',
            flex: 1,
            renderCell: (row) => FormatEntitiesName(row),
        },
        {
            field: 'genres',
            headerName: 'Genres',
            flex: 1,
            renderCell: (row) => FormatEntitiesName(row)
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
            renderCell: (row) => RenderCellActions(row, handleDelete)
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