import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Paper, RadioGroup, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InputFile } from '../../../components/InputFile'
import { RatingsList } from '../../../components/RatingsList'
import { CastMember } from '../../../types/CastMember'
import { Category } from '../../../types/Category'
import { Genre } from '../../../types/Genre'
import { Video } from '../../../types/Video'

type Props = {
    categories: Category[] | [],
    genres: Genre[] | [],
    castMembers: CastMember[] | [],
    video: Video,
    isDisabled?: boolean,
    isLoading?: boolean,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VideoForm(
    {
        categories,
        genres,
        castMembers,
        video,
        isDisabled,
        isLoading,
        handleSubmit,
        handleChange
    }: Props
) {

    const [filterCategories, setFilteredCategories] = useState<Category[]>(categories);

    function handleGenreChanged(genres: Genre[]) {
        handleChange({
            target: {name: "genres", value: genres.map(g => g)}
        }as any);

        if(genres.length === 0) {
            setFilteredCategories(categories);
            return;
        }

        const relatedCategories = genres
            .flatMap(genre => genre.categories ?? []) // collect all related categories
            .reduce((acc: Category[], cat) => {
                if (!acc.find(c => c.id === cat.id)) acc.push(cat); // remove duplicates
                return acc;
            }, []) as Category[];

        setFilteredCategories(relatedCategories);
    }

    useEffect(() => {
        if (video.genres.length === 0) {
            setFilteredCategories(categories);
        }
    }, [video.genres]);

    return (
        <Box >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} sx={{ height: '100%' }} >
                    <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection:'column', height: "100%"}}>
                        <Grid item xs={12} p={1}>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='title'
                                    label='Title'
                                    value={video.title}
                                    disabled={isLoading}
                                    onChange={handleChange}
                                    inputProps={{'data-testid': 'title'}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <FormControl fullWidth>
                                <TextField
                                name='description'
                                label='Description'
                                value={video.description}
                                disabled={isLoading}
                                onChange={handleChange}
                                inputProps={{'data-testid': 'description'}}
                                minRows={4}
                                />
                            </FormControl>
                        </Grid>
                        {/*year launched and duration  */}
                        <Grid container spacing={1} p={1} >
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        name='year_launched'
                                        label='Year Launched'
                                        value={video.year_launched}
                                        disabled={isLoading}
                                        onChange={handleChange}
                                        inputProps={{ 'data-testid': 'yearLaunched' }}
                                        type='number'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                <TextField
                                name='duration'
                                label='Duration'
                                value={video.duration}
                                disabled={isLoading}
                                onChange={handleChange}
                                inputProps={{"data-testid": 'duration'}}
                                type='number'
                                 />
                            </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} p={1}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    multiple
                                    loading={isLoading}
                                    options={castMembers}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    value={video.cast_members}
                                    disabled={isLoading}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.id}>
                                            {option.name}
                                        </li>
                                    )}
                                    onChange={(e, newValue) => {
                                        handleChange({
                                            target: { name: 'cast_members', value: newValue.map(cm => cm) }
                                        } as any)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Cast Members" />}
                                />
                            </FormControl>
                        </Grid>

                        <Grid container spacing={1} p={1}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        multiple
                                        loading={isLoading}
                                        options={genres}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        value={video.genres}
                                        disabled={isLoading}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}>
                                                {option.name}
                                            </li>
                                        )}
                                        onChange={(_e, newValue) => {handleGenreChanged(newValue)}}
                                        renderInput={(params) => <TextField {...params} label="Genres" />}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <FormControl fullWidth>
                                    <Autocomplete
                                        multiple
                                        loading={isLoading}
                                        options={filterCategories}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        value={video.categories}
                                        disabled={video.genres.length === 0}
                                        getOptionLabel={(option) => option.name}
                                        renderOption={(props, option) => (
                                            <li {...props} key={option.id}>
                                                {option.name}
                                            </li>
                                        )}
                                        onChange={(e, newValue) => {
                                            handleChange({
                                                target: { name: 'categories', value: newValue.map(c => c) }
                                            } as any);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Categories" />}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{pl: 2, mt: 10}} >
                            <Box display='flex' gap={2} >
                                <Button
                                    variant="contained"
                                    component={Link} to="/videos"
                                >
                                    Back
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    disabled={isLoading}
                                >
                                    {false ? "Loading..." : "Save"}
                                </Button>
                            </Box>
                        </Grid>                    
                        
                    </Grid>
                    {/*second column */}
                    <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection:'column', height: "100%"}}>
                        {/*Ranting component */}
                        <Grid item xs={12}>
                            <FormControl sx={{ width: '60%' }}>
                                <Box mb={2}>
                                    <FormLabel component='legend'>Ratings</FormLabel>
                                    <RadioGroup 
                                    row 
                                    name='rating'
                                    value={video.rating}
                                    onChange={handleChange}
                                    >
                                        <RatingsList />
                                    </RadioGroup>
                                </Box>
                            </FormControl>
                        </Grid> 
                        <Grid item xs={12} mb={1}>
                            <Paper
                                sx={{
                                    elevation: 3,
                                    backgroundColor: "#1f1a1aff",
                                    padding: "8px"
                                }}
                            >
                                <FormControl fullWidth >
                                    <InputFile
                                    onAdd={() => void 0}
                                    onRemove={() => void 0}
                                    placeholder={"Select file"}
                                    />
                                </FormControl>
                                <FormControl fullWidth >
                                    <InputFile
                                    onAdd={() => void 0}
                                    onRemove={() => void 0}
                                    placeholder={"Select file"}
                                     />
                                </FormControl>
                            </Paper>
                        </Grid> 
                        <Grid item xs={12} mb={1}>
                            <Paper
                                sx={{
                                    elevation: 3,
                                    backgroundColor: "#1f1a1aff",
                                    padding: "8px"
                                }}
                            >
                                <FormControl fullWidth >
                                    <InputFile
                                    onAdd={() => void 0}
                                    onRemove={() => void 0}
                                    placeholder={"Select file"}
                                     />
                                </FormControl>
                                <FormControl fullWidth >
                                    <InputFile
                                    onAdd={() => void 0}
                                    onRemove={() => void 0}
                                    placeholder={"Select file"}
                                     />
                                </FormControl>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} p={1} >
                            <Paper
                                sx={{
                                    elevation: 3,
                                    backgroundColor: "#1f1a1aff",
                                    padding: "8px"
                                }}
                            >
                                <FormControl fullWidth>
                                    <FormControlLabel 
                                    control={<Checkbox/>} 
                                    label="This content should appear on the releases section."
                                    value={video.opened}
                                    />
                                </FormControl>
                            </Paper>
                        </Grid>
                        
                    </Grid>
                    {/*ending of second column */}

                </Grid>
            </form>
        </Box>
    )
}
