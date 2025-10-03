import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import GenreTable from "./componest/GenreTable";
import { useDeleleGenreMutation, useGetGenreQuery, useGetGenresQuery } from "./GenreSlice";

const initialOptions = {
  page: 1,
  perPage: 10,
  search: '',
  rowsPerPage: [10, 25, 50, 100]
}

export const GenreList = () => {

  const [options, setOptions] = useState(initialOptions);
  const [deleteGenre, deleteGenreStatus] = useDeleleGenreMutation();
  const { data, isFetching, error } = useGetGenresQuery(options);

  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: (page + 1) });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const searching = filterModel.quickFilterValues?.[0];
      setOptions({ ...options, search: searching })
    } else {
      setOptions({ ...options, search: "" })
    }
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage })
  }

  async function handleDelete(id: string) {
    await deleteGenre({id});
  }

  useEffect(() => {
    if(deleteGenreStatus.isSuccess){
      enqueueSnackbar("Genre deleted", {variant: 'success'})
    }
    if(deleteGenreStatus.isError){
      enqueueSnackbar("Error deleting Genre", {variant: 'error'})
    }
  }, [deleteGenreStatus, enqueueSnackbar]);

  if(error){
    console.log(error);
    return <Typography variant="h2" color={"whitesmoke"}>Something went wrong</Typography>
  }

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4 }} >
      <Box display='flex' justifyContent='flex-end' >
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
