import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { CastMember } from '../../../types/CastMember';


type Props = {
    castMember: CastMember;
    isdisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CastMembersForm({
    castMember,
    isdisabled,
    isLoading,
    handleSubmit,
    handleChange,
    handleToggle

}: Props) {
    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name='name'
                                label='Name'
                                value={castMember?.name}
                                disabled={isdisabled}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name='description'
                                label='Description'
                                value={castMember?.type}
                                disabled={isdisabled}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>

                            <Button variant='contained' component={Link} to="/cast-members">
                                Back
                            </Button>

                            <Button
                                type='submit'
                                variant='contained'
                                color='secondary'
                                disabled={isdisabled}
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </form>
        </Box>
    )
}
