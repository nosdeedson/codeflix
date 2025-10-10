import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { onHandleFilterChange } from "../../helpers/handleFilterChange/handleFilterChange";
import { useHandleSnackbar } from "../../helpers/handleSnackbar/useHandleSnackBarStatus";
import { GenreParams } from "../../types/Genre";
import {GenreTable} from "./components/GenreTable";
import { useDeleleGenreMutation, useGetGenresQuery } from "./GenreSlice";

const initialOptions = {
  page: 1,
  perPage: 10,
  search: '',
  rowsPerPage: [10, 25, 50, 100]
}

export const GenreList = () => {

  const [options, setOptions] = useState(initialOptions);
  const [deleteGenre, deleteGenreStatus] = useDeleleGenreMutation();
  const params: GenreParams = {page: options.page, perPage: options.perPage, search: options.search};
  const { data, isFetching, error } = useGetGenresQuery(params);

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: (page + 1) });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    onHandleFilterChange(filterModel, options, setOptions);
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage })
  }

  async function handleDelete(id: string) {
    await deleteGenre({id});
  }

  useHandleSnackbar(deleteGenreStatus, 
    {successMessage: 'Genre deleted', errorMessage: 'Error deleting Genre'}
  );

  if(error){
    console.log(error);
    return <Typography variant="h2" color={"whitesmoke"}>Something went wrong</Typography>
  }

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }} >
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5' color='whitesmoke'>List Genres</Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to='/genres/create'
          style={{ marginBottom: '1rem' }}
        >
          New Genre
        </Button>
      </Box>

      <GenreTable
        data={data}
        perPage={options.perPage}
        isFetching={isFetching}
        rowsPerPage={options.rowsPerPage}
        handleOnPageChange={handleOnPageChange}
        handleFilterChange={handleFilterChange}
        handlePageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDelete}
      />
    </Box>
  )
}
