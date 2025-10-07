import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHandleSnackbar } from '../../helpers/handleSnackbar/useHandleSnackBarStatus';
import { Category } from '../../types/Category';
import { initialState as initialCategoryState, useCreateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CategoryCreate: any = () => {
    const [createCategory, categoryCreatestatus] = useCreateCategoryMutation();
    const [isdisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>(initialCategoryState);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        await createCategory(categoryState);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoryState({...categoryState, [name]: value});
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCategoryState({...categoryState, [name]: checked })
    };

    useHandleSnackbar(categoryCreatestatus,
        {
            successMessage: 'Category was not created',
            errorMessage: 'Category was not created'
        }
    );

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant='h4'>Create Category</Typography>
                    </Box>
                </Box>
                <CategoryForm
                category={categoryState}
                isdisabled={isdisabled}
                isLoading
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleToggle={handleToggle}
                />
               
            </Paper>
        </Box>
    )
}


