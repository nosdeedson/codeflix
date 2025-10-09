import { parseQueryParams } from "../../helpers/queryParams/queryParams";
import { Result, Results, Video, VideoParams, VideoPayload } from "../../types/Video";
import { apiSlice } from "../api/apiSlice";
import { Results as CategoriesResults} from '../../types/Category';
import { Results as CastMembersResults } from "../../types/CastMember";
import { Results as GenresResults } from "../../types/Genre";

export const initialState : Video = {
    id: '',
    title: '',
    banner_file_url: '',
    cast_members: [],
    categories: [],
    created_at: '',
    deleted_at: null,
    description: '',
    duration: '',
    genres: [],
    opened: false,
    rating: 'L',
    thumb_file_url: '',
    trailer_file_url: '',
    updated_at: '',
    video_file_url: '',
    year_launched: ''
}

const endpointUrl = '/videos';

function getAllCategories(){
    return 'categories?all=true';
}

function getAllCastMembers(){
    return 'cast_members?all=true';
}

function getAllGenres(){
    return 'genres?all=true';
}

function getVideos(params: VideoParams) {
    return `${endpointUrl}?${parseQueryParams<VideoParams>(params)}`
}

function getVideo({id}: {id: string}){
    return `${endpointUrl}/${id}`;
}

function createVideoMutation(video: VideoPayload){
    return {url: endpointUrl, method: 'POST', body: video};
}

function updateVideoMutation(video: VideoPayload){
    return {url: `${endpointUrl}/${video.id}`, method: 'PUT', body: video}
}

function deleteVideoMutation({id}: {id: string}){
    return {
        url: `${endpointUrl}/${id}`,
        method: 'DELETE',
    }
}

export const videoApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getVideos: query<Results, VideoParams>({
            query: getVideos,
            providesTags: ["Videos"]
        }),
        getVideo: query<Result, {id: string}>({
            query: getVideo,
            providesTags: ['Videos']
        }),
        createVideo: mutation<Result, VideoPayload>({
            query: createVideoMutation,
            invalidatesTags: ['Videos']
        }),
        updateVideo: mutation<Result, VideoPayload>({
            query: updateVideoMutation,
            invalidatesTags: ['Videos']
        }),
        deleteVideo: mutation<Result, {id: string}>({
            query: deleteVideoMutation,
            invalidatesTags: ['Videos']
        }),
        getAllCategories: query<CategoriesResults, void>({
            query: getAllCategories,
        }),
        getAllCastMembers: query<CastMembersResults, void>({
            query: getAllCastMembers,
        }),
        getAllGenres: query<GenresResults, void>({
            query: getAllGenres,
        })
    })
});

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useDeleteVideoMutation,
    useCreateVideoMutation,
    useUpdateVideoMutation,
    useGetAllCastMembersQuery,
    useGetAllCategoriesQuery,
    useGetAllGenresQuery,
} = videoApiSlice;


