import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastmemberStatus] = useDeleteCastMembersMutation();

  const {enqueueSnackbar} = useSnackbar();

  async function handleDelete(id: string) {
    await deleteCastMember({ id });
  }

  function handleOnPageChage(page: number) {
    setOptions({...options, page:  (page + 1)});
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const searching = filterModel?.quickFilterValues?.[0];
      setOptions({...options, search: searching});
    } else {
      setOptions({...options, search: ""});
    }
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({...options, perPage});
  }



  useEffect(() => {
    if (deleteCastmemberStatus.isSuccess) {
      enqueueSnackbar('Cast Member deleted', {variant: 'success'});
    }
    if (deleteCastmemberStatus.isError) {
      enqueueSnackbar('Error deleting Cast Member', {variant: 'error'});
    }
  }, [deleteCastmemberStatus, enqueueSnackbar]);

  if (error) {
    return <Typography variant='h2' color={'whitesmoke'}>Somenthin went wrong</Typography>
  }


  return (
    <Box maxWidth='lg' sx={{ mt: 4, mb: 4}}>
      <Box display={'flex'} justifyContent={'flex-end'} >
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
