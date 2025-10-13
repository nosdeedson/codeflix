import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridFilterModel } from "@mui/x-data-grid";
import { useState } from "react"
import { Link } from "react-router-dom";
import { onHandleFilterChange } from "../../helpers/handleFilterChange/handleFilterChange";
import { useHandleSnackbar } from "../../hooks/handleSnackbar/useHandleSnackBarStatus";
import { VideoParams } from "../../types/Video";
import { VideoTable } from "./components/VideoTable";
import { useDeleteVideoMutation, useGetVideosQuery } from "./VideoSlice";

const initialOptions = {
  page: 1,
  perPage: 10,
  search: '',
  rowsPerPage: [10, 25, 50, 100] 
}
export const VideoList = () => {

  const [options, setOptions] = useState(initialOptions);
  const [deleteVideo, deleteVidedoStatus] = useDeleteVideoMutation();
  const params: VideoParams = {page: options.page, perPage: options.perPage, search: options.search};
  const {data, isFetching, error} = useGetVideosQuery(params);

  function handleOnPageChange(page: number){
    setOptions({...options, page: (page + 1)})
  }

  function handleOnPageSizeChange(perPage: number){
    setOptions({...options, perPage});
  }

  function handleFilterChange(filterModel: GridFilterModel){
    onHandleFilterChange(filterModel, options, setOptions);
  }

  async function handleDelete(id: string){
    await deleteVideo({id});
  }

  useHandleSnackbar(
    deleteVidedoStatus,
    {
      successMessage: 'Video deleted successfullu',
      errorMessage: "Error while deleting Video"
    }
  );

  if(error){
    return <Typography variant='h2'>Something went wrong</Typography>
  }

  return (
    <Box maxWidth={'lg'} sx={{ mt: 4, mb: 4 }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5' color='whitesmoke'>List Videos</Typography>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to='/videos/create'
          style={{ marginBottom: '1rem' }}
        >
          New Video
        </Button>
      </Box>
      <VideoTable
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
