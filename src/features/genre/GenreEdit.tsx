import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GenrePayload } from '../../types/Genre';
import { useGetCategoriesQuery } from '../categories/categorySlice';
import { GenreForm } from './componest/GenreForm';
import { useGetGenreQuery, useUpdateGenreMutation } from './GenreSlice';

export const GenreEdit = () => {

  const id = useParams().id || "";
  const { data: genre, isFetching } = useGetGenreQuery({ id });
  const { data: categories, error } = useGetCategoriesQuery({});
  const [genreState, setGenreState] = useState<GenrePayload>({
    id: "",
    name: "",
    categories_id: []
  });
  const { enqueueSnackbar } = useSnackbar();
  const [updateGenre, statusGenre] = useUpdateGenreMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateGenre(genreState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if (name === 'categories_id') {
      setGenreState({ ...genreState, [name]: value as unknown as string[] });
    } else {
      setGenreState({ ...genreState, [name]: value });
    }
  }

  useEffect(() =>{
    if(genre){
      setGenreState({
        id: genre.data.id,
        name: genre.data.name,
        categories_id: genre?.data?.categories?.map(cat => cat.id)
      });
    }
  }, [genre] );

  useEffect(() => {
    if(statusGenre.isSuccess){
      enqueueSnackbar('Genre edit successfully', {variant: 'success'});
    }
    if(statusGenre.isError){
      enqueueSnackbar('Error while editing genre', {variant: 'error'});
    }
  },[statusGenre, enqueueSnackbar]);

  if(error){
    console.log(error)
  }

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
          isDisabled={statusGenre.isLoading}
          isLoading={statusGenre.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  )
}
