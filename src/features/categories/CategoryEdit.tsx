import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHandleSnackbar } from '../../hooks/handleSnackbar/useHandleSnackBarStatus';
import { Category } from '../../types/Category';
import { initialState as initialCategoryState, useGetCategoryQuery, useUpdateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';


export const CategoryEdit: any = () => {
    const id = useParams().id || "";
    const { data: category, isFetching } = useGetCategoryQuery({ id });
    const [categoryState, setCategoryState] = useState<Category>(initialCategoryState);
    const [updateCategory, categoryEditStatus] = useUpdateCategoryMutation();

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

    useHandleSnackbar(
        categoryEditStatus,
        {
            successMessage: 'Success updating Category', 
            errorMessage: 'Error updating Category'
        }
    );

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
                    isdisabled={categoryEditStatus.isLoading}
                    isLoading={isFetching}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleToggle={handleToggle}
                />
            </Paper>
        </Box>
    )
}