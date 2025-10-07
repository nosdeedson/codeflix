import { createSlice } from "@reduxjs/toolkit";
import { CastMember, CastMemberParams, Result, Results } from "../../types/CastMember";
import { parseQueryParams } from "../../helpers/queryParams/queryParams";
import { apiSlice } from "../api/apiSlice";


export const initialState: CastMember = {
    id: '',
    name: '',
    type: 1,
    created_at: '',
    updated_at: '',
    deleted_at: null
}

const endpointUrl = '/cast_members';

function getCastMembers(params: CastMemberParams){
    return `${endpointUrl}?${parseQueryParams<CastMemberParams>(params)}`;
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
    deleteCastMembers: mutation<Result, {id: string}>({
        query: deleteCategoryMutation,
        invalidatesTags: ['CastMembers']
    })
   })
});


export const {
    useGetCastMembersQuery,
    useGetCastMemberQuery,
    useCreateCastMembersMutation,
    useUpdateCastMembersMutation,
    useDeleteCastMembersMutation,
} = castMembersApiSlice;