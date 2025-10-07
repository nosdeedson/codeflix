import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useHandleSnackbar } from '../../helpers/handleSnackbar/useHandleSnackBarStatus';
import { CastMember } from '../../types/CastMember';
import { useCreateCastMembersMutation, initialState as initialCastMemberState } from './castMembersSlice';
import { CastMembersForm } from './components/CastMembersForm';

export const CastMemberCreate = () =>  {
  const [createCastMember, createCastMemberStatus] = useCreateCastMembersMutation();
  const [castMemberState, setCastMemberState] = useState<CastMember>(initialCastMemberState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    await createCastMember(castMemberState);
    setCastMemberState(initialCastMemberState);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCastMemberState({...castMemberState, [name]: value});
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const type = parseInt(value);
    setCastMemberState({...castMemberState, [name]: type});
  };

  // useEffect is used inside the function
  useHandleSnackbar(
    createCastMemberStatus,
    { 
      successMessage: "Cast Member created successfuly", 
      errorMessage: "Error creating Cast member"
    }
  );
  
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
              isDisabled={createCastMemberStatus.isLoading}
              isLoading={createCastMemberStatus.isLoading}
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
