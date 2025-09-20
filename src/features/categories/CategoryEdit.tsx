import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';


export const CategoryEdit: any = () => {
    const id = useParams().id || "";
    const { data: category, isFetching } = useGetCategoryQuery({ id });
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        created_at: "",
        deleted_at: "",
        description: "",
        is_active: false,
        name: "",
        updated_at: ""
    });
    const { enqueueSnackbar } = useSnackbar();
    const [updateCategory, status] = useUpdateCategoryMutation();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await updateCategory(categoryState);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategoryState({ ...categoryState, [name]: value })
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCategoryState({ ...categoryState, [name]: checked })
    };

    useEffect(() => {
        if (category) {
            setCategoryState(category.data);
        }
    }, [category]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar('Success updating Category', { variant: 'success' });
        }
        if (status.error) {
            enqueueSnackbar('Error updating Category', { variant: 'error' })
        }
    }, [enqueueSnackbar, status.error, status.isSuccess])

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant='h4'>Edit Category</Typography>
                    </Box>
                </Box>

                <CategoryForm
                    category={categoryState}
                    isdisabled={status.isLoading}
                    isLoading={isFetching}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    )
}