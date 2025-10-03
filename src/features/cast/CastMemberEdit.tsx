import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CastMember } from '../../types/CastMember';
import { useGetCastMemberQuery, useUpdateCastMembersMutation } from './castMembersSlice';
import { CastMembersForm } from './components/CastMembersForm';

export const CastMemberEdit = () => {
  const id = useParams().id || "";
  const { data: castMember, isFetching } = useGetCastMemberQuery({ id });
  const [castMemberState, setCastMemberState] = useState<CastMember>({
    id: "",
    created_at: "",
    deleted_at: null,
    name: '',
    type: 1,
    updated_at: ''
  });
  const { enqueueSnackbar } = useSnackbar();
  const [updateCastMember, status] = useUpdateCastMembersMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await updateCastMember(castMemberState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  }

  const handleRadioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  }

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember.data);
    }
  }, [castMember]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar("Success updating Cast Member", { variant: 'success' })
    }
    if (status.error) {
      enqueueSnackbar("Error updating Cast Member", { variant: 'error' });
    }
  }, [enqueueSnackbar, status]);

  return (
    <Box >
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant='h4'>Edit Cast Member</Typography>
          </Box>
        </Box>

        <CastMembersForm
          castMember={castMemberState}
          isDisabled={status.isLoading}
          isLoading={isFetching}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleTypeChange={handleRadioInput}
        />

      </Paper>
    </Box>
  )
}
