import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { CastMember } from '../../../types/CastMember';


type Props = {
    castMember: CastMember;
    isdisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CastMembersForm({
    castMember,
    isdisabled,
    isLoading,
    handleSubmit,
    handleChange,
    handleTypeChange

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
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={castMember.type ? castMember.type : 1}
                                name="type"
                                onChange={handleTypeChange}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Director" />
                                <FormControlLabel value="2" control={<Radio />} label="Actor" />
                            </RadioGroup>
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
                                disabled={isdisabled || isLoading}
                            >
                                { isLoading ? "Loading ...":  "Save" }
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </form>
        </Box>
    )
}
