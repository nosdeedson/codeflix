import { Box, Button, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteCategory, selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery } from './categorySlice'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { Category } from '../../types/Category';
import { useEffect } from 'react';


export const CategoryList: any = () => {
    const {data, isFetching, error} = useGetCategoriesQuery();
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const categories: Category[] = data ? data.data : [];
    console.log(categories);
    // const categories = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
        }
    }

    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
    }))

    const columns: GridColDef[] = [
     
        { 
            field: 'name', 
            headerName: 'Name', 
            flex: 1,
            renderCell: renderNameCell
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
            renderCell: renderActionsCell
        },
    ];

    async function handleDeleteCategory(id: string){
        await deleteCategory({id});
    }
    
    useEffect(() => {
        if(deleteCategoryStatus.isSuccess){
            enqueueSnackbar("Category deleted", {variant: "success"});
        }
        if(deleteCategoryStatus.error){
            enqueueSnackbar("Error while deleting category", {variant: 'error'});
        }
    })

    function renderNameCell(row: GridRenderCellParams){
        return(
            <Link
            style={{textDecoration: 'none'}}
            to={`/categories/edit/${row.id}`}
            >
                <Typography color="primary">{row.value}</Typography>
            </Link>
        );
    }

    function renderActionsCell(row: GridRenderCellParams){
        return(
            <IconButton
            color='secondary'
            onClick={() => handleDeleteCategory(row.value)}
        
            >
                <DeleteIcon/>
            </IconButton>
        );
    }

    function renderIsActiveCel(row: GridRenderCellParams){
        return (
            <Typography color={row.value ? "primary": 'secondary'}>
                {row.value ? "Active": "Inactive"}
            </Typography>
        );
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display='flex' justifyContent='flex-end'>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>

            <Box sx={{ display: 'flex', height: 350 }} >
                <DataGrid 
                components={{Toolbar: GridToolbar}}
                componentsProps={componentProps}
                disableColumnSelector={true}
                disableColumnFilter={true}
                disableDensitySelector={true}
                // checkboxSelection={true}
                disableSelectionOnClick={true}
                rowsPerPageOptions={[2,10, 20, 25, 50, 100]}
                rows={rows} 
                columns={columns} />
            </Box>

        </Box>
    )
}