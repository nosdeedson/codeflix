import { create } from "@mui/material/styles/createTransitions";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CastMember, CastMemberParams , Result, Results } from "../../types/CastMember";
import { apiSlice } from "../api/apiSlice";


const endpointUrl = '/cast_members'

const castMember: CastMember = {
    id: "",
    created_at: "",
    deleted_at: null,
    name: "",
    type: 0,
    updated_at: ""
}

const castMembers: CastMember[] = [
    castMember,
]

export const initialState = [
    castMember
] 

function parseQueryParams(params: CastMemberParams){
    const query = new URLSearchParams();
    if(params.page){
        query.append("page", params.page.toString())
    }
    if(params.perPage){
        query.append("per_page", params.perPage.toString())
    }
    if(params.search){
        query.append("search", params.search)
    }
    if(params.type){
        query.append("type", params.type.toString());
    }
    return query.toString();
}

function getCastMembers(params: CastMemberParams){
    const {page = 1, perPage = 10, search = ""} = params
    const url = `${endpointUrl}?${parseQueryParams(
        {page, perPage, search}
    )}`;
    return url
}

function getCastMember( {id}: { id: string}){
    return {url: `${endpointUrl}/${id}`}
}

function createCastMemberMutation(castMember: CastMember){
    return {url: endpointUrl, method: "POST", body: castMember };
}

function updateCastMemberMutation(castMember: CastMember){
    return {
        url: `${endpointUrl}/${castMember.id}`,
        method: "PUT",
        body: castMember
    };
}

function deleteCategoryMutation(castMember: CastMember){
    return {
        url: `${endpointUrl}/${castMember.id}`,
        method: "DELETE",
    }
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
   endpoints: ({ query, mutation} ) => ({
    getCastMembers: query<Results, CastMemberParams>({
        query: getCastMembers,
        providesTags: ["CastMembers"]
    }),
    getCastMember: query<Result, {id: string}>({
        query: getCastMember,
        providesTags: ['CastMembers']
    }),
    createCastMembers: mutation<Result, CastMember>({
        query: createCastMemberMutation,
        invalidatesTags: ["CastMembers"]
    }),
    updateCastMembers: mutation<Result, CastMember>({
        query: updateCastMemberMutation,
        invalidatesTags: ['CastMembers']
    }),
    deleteCastMembers: mutation<Result, CastMember>({
        query: deleteCategoryMutation,
        invalidatesTags: ['CastMembers']
    })
   })
});

const castMemberSlice = createSlice({
    name: "castMembers",
    initialState: initialState,
    reducers: {
        createCastMember: (state, action) => {
            state.push(action.payload)
        },
        updateCastMember: (state, action) => {
            const index = state.findIndex((castMember) => castMember.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteCastMember: (state, action) => {
            const index = state.findIndex((castMember) => castMember.id === action.payload.id);
            state.splice(index, 1);
        }
    }
});

export default castMemberSlice.reducer;
export const {createCastMember, updateCastMember, deleteCastMember} = castMemberSlice.actions

export const {
    useGetCastMembersQuery,
    useGetCastMemberQuery,
    useCreateCastMembersMutation,
    useUpdateCastMembersMutation,
    useDeleteCastMembersMutation,
} = castMembersApiSlice;