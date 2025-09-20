import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Category, useCreateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';

export const CategoryCreate: any = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [createCategory, status] = useCreateCategoryMutation();
    const [isdisabled] = useState(false);
    const [categoryState, setCategoryState] = useState<Category>({
        id: "",
        created_at: "",
        deleted_at: "",
        description: "",
        is_active: false,
        name: "",
        updated_at: ""
    });

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

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar("Category succefully created", { variant: "success" });
            setCategoryState({
                id: "",
                created_at: "",
                deleted_at: "",
                description: "",
                is_active: false,
                name: "",
                updated_at: ""
            })
        }
        if (status.isError) {
            enqueueSnackbar("Category was not created", { variant: "error" });

        }
    }, [enqueueSnackbar, status])

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


