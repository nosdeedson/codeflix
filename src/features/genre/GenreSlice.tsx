import { Genre, GenreParams, GenrePayload, Result, Results } from "../../types/Genre";
import { apiSlice } from "../api/apiSlice";
import { Results as categoriesResults} from '../../types/Category'
import { parseQueryParams } from "../../helpers/queryParams/queryParams";

export const initialState: Genre = {
    id: '',
    name: '',
    created_at: "",
    updated_at: '',
    deleted_at: null,
    is_active: false,
    categories: [],
    description: "",
    pivot: {genre_id: "", category_id: ""}
}

const endpointUrl = '/genres';

function getAllCategories() {
    return `categories?all=true`;
}

function getGenres(params: GenreParams) {
    return `${endpointUrl}?${parseQueryParams<GenreParams>(params)}`;
}

function getGenre({ id }: { id: string }) {
    return {url: `${endpointUrl}/${id}`}
}

function createGenreMutation(genre: GenrePayload) {
    return { url: endpointUrl, method: 'POST', body: genre };
}

function updateGenreMutation(genre: GenrePayload){
    return {
        url: `${endpointUrl}/${genre.id}`,
        method: "PUT",
        body: genre
    }
}

function deleteGenreMutation(genre: GenrePayload){
    return {
        url: `${endpointUrl}/${genre.id}`,
        method: "DELETE"
    }
}

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getGenres: query<Results, GenreParams>({
            query: getGenres,
            providesTags: ["Genres"]
        }),
        getGenre: query<Result, {id: string}>({
            query: getGenre,
            providesTags: ['Genres'],
        }),
        createGenre: mutation<Result, GenrePayload>({
            query: createGenreMutation,
            invalidatesTags: ['Genres']
        }),
        updateGenre: mutation<Result, GenrePayload>({
            query: updateGenreMutation,
            invalidatesTags: ['Genres']
        }),
        deleleGenre: mutation<Result, {id: string}>({
            query: deleteGenreMutation,
            invalidatesTags: ['Genres']
        }),
        getAllCategories: query<categoriesResults, void>({
            query: getAllCategories,
        })
    })
});

export const {
    useGetGenresQuery,
    useGetGenreQuery,
    useDeleleGenreMutation,
    useCreateGenreMutation,
    useUpdateGenreMutation,
    useGetAllCategoriesQuery,
} = genreApiSlice;