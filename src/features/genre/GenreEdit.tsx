import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHandleSnackbar } from '../../helpers/handleSnackbar/useHandleSnackBarStatus';
import { Genre } from '../../types/Genre';
import { GenreForm } from './components/GenreForm';
import { useGetAllCategoriesQuery, useGetGenreQuery, useUpdateGenreMutation, initialState as initialGenreState } from './GenreSlice';
import { mapToGenrePayload } from './util';

export const GenreEdit = () => {

  const id = useParams().id || "";
  const { data: genre } = useGetGenreQuery({ id });
  const { data: categories } = useGetAllCategoriesQuery();
  const [genreState, setGenreState] = useState<Genre>(initialGenreState);
  const [updateGenre, updateGenreStatus] = useUpdateGenreMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateGenre(mapToGenrePayload(genreState));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  }

  useEffect(() =>{
    if(genre){
      setGenreState(genre.data);
    }
  }, [genre] );

  useHandleSnackbar(updateGenreStatus, 
    {successMessage: 'Genre edit successfully', errorMessage: 'Error whilte editing genre'}
  );

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          categories={categories?.data || []}
          genre={genreState}
          isDisabled={updateGenreStatus.isLoading}
          isLoading={updateGenreStatus.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  )
}
