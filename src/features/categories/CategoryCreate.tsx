import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Category, createCategory } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CategoryCreate: any = () => {
    const [isdisabled, setIsdisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        created_at: "",
        deleted_at: "",
        description: "",
        is_active: false,
        name: "",
        updated_at: ""
    });
    const dispatch = useAppDispatch();
    const {enqueueSnackbar} = useSnackbar()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        dispatch(createCategory(categoryState));
        enqueueSnackbar("Category succefully created", { variant: "success"})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCategoryState({...categoryState, [name]: value});
    };

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setCategoryState({...categoryState, [name]: checked })

    };

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


