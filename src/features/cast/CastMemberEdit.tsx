import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHandleSnackbar } from '../../hooks/handleSnackbar/useHandleSnackBarStatus';
import { CastMember } from '../../types/CastMember';
import { useGetCastMemberQuery, useUpdateCastMembersMutation, initialState as initialCastMemberState } from './castMembersSlice';
import { CastMembersForm } from './components/CastMembersForm';

export const CastMemberEdit = () => {
  const id = useParams().id || "";
  const { data: castMember, isFetching } = useGetCastMemberQuery({ id });
  const [castMemberState, setCastMemberState] = useState<CastMember>(initialCastMemberState);
  const [updateCastMember, updateCastMemberStatus] = useUpdateCastMembersMutation();

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

  useHandleSnackbar(
    updateCastMemberStatus,
    {
      successMessage: "Success updating Cast Member",
      errorMessage: "Error updating Cast Member"
    }
  );

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
          isDisabled={updateCastMemberStatus.isLoading}
          isLoading={isFetching}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleTypeChange={handleRadioInput}
        />

      </Paper>
    </Box>
  )
}
