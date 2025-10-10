import { Autocomplete, Button, FormControl, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AutoCompleteFields } from "../../../components/AutoCompleteFields";
import { Category } from "../../../types/Category"
import { Genre } from "../../../types/Genre";


type Props = {
    categories: Category[] | [];
    genre: Genre;
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GenreForm(
    {
        categories,
        genre,
        isDisabled,
        isLoading,
        handleSubmit,
        handleChange
    }: Props
) {
    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="name"
                                label="Name"
                                value={genre.name}
                                disabled={isLoading}
                                onChange={handleChange}
                                inputProps={{"data-testid": "name"}}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <AutoCompleteFields
                                isLoading={isLoading}
                                isDisabled={isDisabled}
                                options={categories}
                                values={genre.categories}
                                label="Categories"
                                name="categories"
                                handleChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' gap={2}>
                            <Button
                                variant="contained"
                                component={Link} to="/genres"
                            >
                                Back
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={isDisabled || isLoading}
                            >
                                {isLoading ? "Loading..." : "Save"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}