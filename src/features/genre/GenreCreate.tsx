import { Box, Paper, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react';
import { Genre, GenrePayload } from '../../types/Genre';
import { useGetCategoriesQuery } from '../categories/categorySlice';
import { GenreForm } from './componest/GenreForm'
import { useCreateGenreMutation } from './GenreSlice';

export const GenreCreate = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [createGenre, status] = useCreateGenreMutation();
    const [isDisabled] = useState();
    const { data, isFetching, error } = useGetCategoriesQuery({});

    const [genreState, setGenreState] = useState<GenrePayload>({
        id: "",
        name: "",
        categories_id: [],
    });

    useEffect(() => {

        if (status.isSuccess) {
            enqueueSnackbar('Genre created successfully', { variant: 'success' });
        }
        if (status.isError) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    }, [status, enqueueSnackbar]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await createGenre(genreState);
        setGenreState({
            id: "",
            name: "",
            categories_id: [],
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'categories_id') {
            setGenreState({ ...genreState, [name]: value as unknown as string[] });
        } else {
            setGenreState({ ...genreState, [name]: value });
        }
    }

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant='h5'>
                            Create Genre
                        </Typography>
                    </Box>
                </Box>
                <GenreForm
                    categories={data?.data || []}
                    genre={genreState}
                    isDisabled={status.isLoading}
                    isLoading={status.isLoading}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Paper>
        </Box>
    )
}
