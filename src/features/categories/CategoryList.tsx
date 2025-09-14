import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/Category';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from './categorySlice';
import { CategoryTable } from './components/CategoryTable';


export const CategoryList: any = () => {
    const [rowsPerPage] = useState([10,25, 50, 100]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    
    const options = {page, perPage, search };
    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const categories: Category[] = data ? data.data : [];

    // const categories = useAppSelector(selectCategories);
    const { enqueueSnackbar } = useSnackbar();

    function handleOnPageChage(page: number) {
        console.log(page);
        setPage(page);
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        const size = filterModel.quickFilterValues?.length;
        if( size != undefined && size > 4) {
            const searching = filterModel?.quickFilterValues?.[0];
            setSearch(searching);
        } else if(filterModel.quickFilterValues?.length == undefined){
            setSearch("");
        }
    }

    function handleOnPageSizeChange(perPage: number) {
        setPerPage(perPage)
        console.log(perPage)
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
                perPage={10}
                isFetching={isFetching}
                rowsPerPage={rowsPerPage}
                handleOnPageChage={handleOnPageChage}
                handleFilterChange={handleFilterChange}
                handleOnPageSizeChange={handleOnPageSizeChange}
                handleDelete={handleDeleteCategory}
            />

        </Box>
    )
}