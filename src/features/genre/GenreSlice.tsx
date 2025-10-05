import { GenreParams, GenrePayload, Result, Results } from "../../types/Genre";
import { apiSlice } from "../api/apiSlice";
import { Results as categoriesResults} from '../../types/Category'

export const initialState: GenrePayload = {
    id: '',
    name: '',
    categories_id: [],
}

const endpointUrl = '/genres';

function parseQueryParams(params: GenreParams) {
    const query = new URLSearchParams();
    if (params.page) {
        query.append("page", params.page.toString());
    }
    if (params.perPage) {
        query.append("per_page", params.perPage.toString());
    }
    if (params.search) {
        query.append("search", params.search)
    }
    // if(params.isActive){
    //     query.append("is_active", params.isActive.toString());
    // }
    return query.toString();
}

function getAllCategories() {
    return `categories?all=true`;
}

function getGenres(params: GenreParams) {
    const { page = 1, perPage = 10, search = "", } = params;
    const url = `${endpointUrl}?${parseQueryParams({ page, perPage, search })}`;
    return url;
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