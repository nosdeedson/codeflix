import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridFilterModel, GridRowsProp, GridToolbar } from '@mui/x-data-grid';

type BaseTableProps<T> ={
    data: T | undefined;
    mapDataToGridRows: (data: T) => GridRowsProp;
    columns: GridColDef[];
    
    perPage: number;
    isFetching: boolean;
    rowsPerPage?: number[];
    rowCount: number;

    handleOnPageChange: (page: number) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleOnPageSizeChange: (perPage: number) => void;
}



export function BaseTable<T>({
    data,
    mapDataToGridRows,
    columns,
    perPage,
    isFetching,
    rowsPerPage,
    rowCount,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
}: BaseTableProps<T>) {

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickerFilterProps: {debounceMs: 500 },
        }
    };

    const rows: GridRowsProp = data ? mapDataToGridRows(data): [];

  return (
    <Box sx={{display: 'flex', height: 375}} >
        <DataGrid
        components={{Toolbar: GridToolbar}}
        columns={columns} 
        componentsProps={componentProps}
        disableSelectionOnClick
        disableColumnSelector
        disableColumnFilter
        disableDensitySelector
        loading={isFetching}
        onFilterModelChange={handleFilterChange}
        onPageChange={handleOnPageChange}
        onPageSizeChange={handleOnPageSizeChange}
        pageSize={perPage}
        paginationMode='server'
        rowsPerPageOptions={rowsPerPage}
        rowCount={rowCount}
        rows={rows}       
        />
    </Box>
  )
}
