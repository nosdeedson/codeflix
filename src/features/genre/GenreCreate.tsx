import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useHandleSnackbar } from '../../helpers/handleSnackbar/useHandleSnackBarStatus';
import { Genre } from '../../types/Genre';
import { GenreForm } from './components/GenreForm';
import { initialState as initialGenreState, useCreateGenreMutation, useGetAllCategoriesQuery } from './GenreSlice';
import { mapToGenrePayload } from './util';

export const GenreCreate = () => {
    const [createGenre, genreCreateStatus] = useCreateGenreMutation();
    const { data: categories } = useGetAllCategoriesQuery();
    const [genreState, setGenreState] = useState<Genre>(initialGenreState);

    useHandleSnackbar(genreCreateStatus, 
        {successMessage: 'Genre created successfully', errorMessage: 'Something went wrong'}
    )

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const payload = mapToGenrePayload(genreState);
        console.log(payload)
        await createGenre(payload);
        setGenreState(initialGenreState)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGenreState({ ...genreState, [name]: value });
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
                    categories={categories?.data || []}
                    genre={genreState}
                    isDisabled={genreCreateStatus.isLoading}
                    isLoading={genreCreateStatus.isLoading}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Paper>
        </Box>
    )
}
