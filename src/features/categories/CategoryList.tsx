import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from './categorySlice';
import { CategoryTable } from './components/CategoryTable';

const initialOptions = { 
    page: 1, 
    perPage: 10, 
    search: "",
    rowsPerPage: [10, 25, 50, 100]
};

export const CategoryList: any = () => {
    const [options, setOptions] = useState(initialOptions);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    
    const { data, isFetching, error } = useGetCategoriesQuery(options);

    const { enqueueSnackbar } = useSnackbar();

    function handleOnPageChage(page: number) {
        setOptions({...options, page: (page + 1)});
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if( filterModel.quickFilterValues?.length) {
            const searching = filterModel?.quickFilterValues?.[0];
            setOptions({...options, search: searching});
        } else {
           setOptions({...options, search: ""});
        }
    }

    function handleOnPageSizeChange(perPage: number) {
        setOptions({...options, perPage});
    }

    async function handleDeleteCategory(id: string) {
        await deleteCategory({ id });
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category deleted", { variant: "success" });
        }
        if (deleteCategoryStatus.error) {
            enqueueSnackbar("Error while deleting category", { variant: 'error' });
        }
        
    }, [deleteCategoryStatus, enqueueSnackbar]);

    if(error){
        return <Typography variant='h2' color={'whitesmoke'}>Something went wrong!!</Typography>
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

            <CategoryTable
                data={data}
                perPage={options.perPage}
                isFetching={isFetching}
                rowsPerPage={options.rowsPerPage}
                handleOnPageChage={handleOnPageChage}
                handleFilterChange={handleFilterChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleDelete={handleDeleteCategory}
            />

        </Box>
    )
}