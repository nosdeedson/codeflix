import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { CastMember } from '../../types/CastMember';
import { useCreateCastMembersMutation } from './castMembersSlice';
import { CastMembersForm } from './components/CastMembersForm';

export const CastMemberCreate = () =>  {
  const {enqueueSnackbar} = useSnackbar();
  const [createCastMember, status] = useCreateCastMembersMutation();
  const [isDisabled, setIsDisabled] = useState();
  const [castMemberState, setCastMemberState] = useState<CastMember>({
    id: "",
    name: "",
    type: 0,
    created_at: "",
    updated_at: "",
    deleted_at: null
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    console.log(castMemberState);
    await createCastMember(castMemberState);
    setCastMemberState({
    id: "",
    name: "",
    type: 0,
    created_at: "",
    updated_at: "",
    deleted_at: null
  });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const {name, value} = e.target;
    setCastMemberState({...castMemberState, [name]: value});
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const {name, value} = e.target;
    const type = parseInt(value);
    setCastMemberState({...castMemberState, [name]: type});
  };

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Cast Member created successfully', {variant: 'success'});
    }
    if (status.isError) {
      enqueueSnackbar('Error creating Cast Member', {variant: 'error'});
    }
  }, [status, enqueueSnackbar]);
  
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4" gutterBottom>
              Create Cast Member
            </Typography>
            <CastMembersForm
              castMember={castMemberState}
              isdisabled={isDisabled}
              isLoading={status.isLoading}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleTypeChange={handleTypeChange}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
