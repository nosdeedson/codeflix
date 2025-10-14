import { Autocomplete, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Paper, RadioGroup, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AutoCompleteFields } from '../../../components/AutoCompleteFields'
import { InputFile } from '../../../components/InputFile'
import { RatingsList } from '../../../components/RatingsList'
import { CastMember } from '../../../types/CastMember'
import { Category } from '../../../types/Category'
import { Genre } from '../../../types/Genre'
import { Video } from '../../../types/Video'
import { FileObject } from '../../../types/Video'

type Props = {
    categories: Category[] | [],
    genres: Genre[] | [],
    castMembers: CastMember[] | [],
    video: Video,
    isDisabled?: boolean,
    isLoading?: boolean,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddFile: ({ name, file }: FileObject) => void;
    handleRemoveFile: (name: string) => void;
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
        handleChange,
        handleAddFile,
        handleRemoveFile,
    }: Props
) {

    const handleAddThumbnail = (file: File) => {
        handleAddFile({ name: "thumb_file", file });
    };

    const handleRemoveThumbnail = () => {
        handleRemoveFile("thumb_file");
    };

    const handleAddBanner = (file: File) => {
        handleAddFile({ name: "banner_file", file });
    };

    const handleAddTrailer = (file: File) => {
        handleAddFile({ name: "trailer_file", file });
    };

    const handleAddVideo = (file: File) => {
        handleAddFile({ name: "video_file", file });
    };

    const handleRemoveBanner = () => {
        handleRemoveFile("banner_file");
    };

    const handleRemoveTrailer = () => {
        handleRemoveFile("trailer_file");
    };

    const handleRemoveVideo = () => {
        handleRemoveFile("video_file");
    };

    const [filterCategories, setFilteredCategories] = useState<Category[]>(categories);

    function handleGenreChanged(_e: React.SyntheticEvent<Element, Event>, genres: Genre[]) {
        handleChange({
            target: { name: "genres", value: genres.map(g => g) }
        } as any);

        if (genres.length === 0) {
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
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
                        <Grid item xs={12} p={1}>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name='title'
                                    label='Title'
                                    value={video.title}
                                    disabled={isLoading}
                                    onChange={handleChange}
                                    inputProps={{ 'data-testid': 'title' }}
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
                                    inputProps={{ 'data-testid': 'description' }}
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
                                        inputProps={{ "data-testid": 'duration' }}
                                        type='number'
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} p={1}>
                            <FormControl fullWidth>
                                <AutoCompleteFields
                                    isLoading={isLoading}
                                    isDisabled={isDisabled}
                                    options={castMembers}
                                    values={video.cast_members}
                                    label="Cast Memberes"
                                    name='cast_members'
                                    handleChange={handleChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid container spacing={1} p={1}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <AutoCompleteFields
                                        isLoading={isLoading}
                                        isDisabled={isDisabled}
                                        options={genres}
                                        values={video.genres}
                                        label='Genres'
                                        name='genres'
                                        handleChange={(e) => handleGenreChanged(null as any, e.target.value as any)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <FormControl fullWidth>
                                    <AutoCompleteFields
                                        isLoading={isLoading}
                                        isDisabled={isDisabled}
                                        options={filterCategories}
                                        values={video.categories}
                                        label='Categories'
                                        name='categories'
                                        handleChange={handleChange}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ pl: 2, mt: 10 }} >
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
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
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
                                        onAdd={handleAddThumbnail}
                                        onRemove={handleRemoveThumbnail}
                                        placeholder={"Select file"}
                                        label="Thumb"
                                    />
                                </FormControl>
                                <FormControl fullWidth >
                                    <InputFile
                                        onAdd={handleAddBanner}
                                        onRemove={handleRemoveBanner}
                                        placeholder={"Select file"}
                                        label="Banner"
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
                                        onAdd={handleAddTrailer}
                                        onRemove={handleRemoveTrailer}
                                        placeholder={"Select file"}
                                        label="Trailer"
                                    />
                                </FormControl>
                                <FormControl fullWidth >
                                    <FormLabel component='legend'>Principal</FormLabel>
                                    <InputFile
                                        onAdd={handleAddVideo}
                                        onRemove={handleRemoveVideo}
                                        placeholder={"Select file"}
                                        label='Principal'
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
                                        control={<Checkbox />}
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
