import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onHandleFilterChange } from '../../helpers/handleFilterChange/handleFilterChange';
import { useHandleSnackbar } from '../../helpers/handleSnackbar/useHandleSnackBarStatus';
import { CastMemberParams } from '../../types/CastMember';
import { useDeleteCastMembersMutation, useGetCastMembersQuery } from './castMembersSlice';
import { CastMembersTable } from './components/CastMembersTable';

const initialOptions = {
  page: 1,
  perPage: 10,  
  search: "",
  rowsPerPage: [10, 25, 50, 100],
}

export const CastMemberList = () => {
  const [options, setOptions] = useState(initialOptions);
  const [deleteCastMember, deleteCastmemberStatus] = useDeleteCastMembersMutation();

  const params: CastMemberParams = {page: options.page, perPage: options.perPage, search: options.search}
  const { data, isFetching, error } = useGetCastMembersQuery(params);

  async function handleDelete(id: string) {
    await deleteCastMember({ id });
  }

  function handleOnPageChage(page: number) {
    setOptions({...options, page:  (page + 1)});
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    onHandleFilterChange(filterModel, options, setOptions);
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({...options, perPage});
  }

  useHandleSnackbar( deleteCastmemberStatus,
     {successMessage: 'Cast Member deleted', errorMessage: 'Error deleting Cast Member'}
  );

  if (error) {
    console.log(error)
    return <Typography variant='h2' color={'whitesmoke'}>Somenthing went wrong</Typography>
  }

  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4}}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5' color='whitesmoke'>List Cast Members</Typography>
        <Button 
          variant='contained'
          color='secondary'
          component={Link}
          to={'/cast-members/create'}
          style={{marginBottom: '1rem'}}
        >
          New Cast Member
        </Button>
      </Box>

      <CastMembersTable
        data={data}
        perPage={options.perPage}
        isFetching={isFetching}
        rowsPerPage={options.rowsPerPage}
        handleOnPageChage={handleOnPageChage}
        handleFilterChange={handleFilterChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleDelete={handleDelete} 
      />

    </Box>
  )
}
