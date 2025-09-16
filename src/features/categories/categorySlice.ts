import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CategoryParams, Result, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category{
    id: string;
    name: string;
    description: null | string;
    is_active: boolean;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
}

const endpointUrl = '/categories';

function parseQueryParams(params: CategoryParams){
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
  if(params.isActive){
    query.append("is_active", params.isActive.toString());
  }
  return query.toString();
}

function getCategories({  page = 1, perPage = 10, search = ""}){
  const params = {page, perPage, search, isActive: true};
  const url = `${endpointUrl}?${parseQueryParams(params)}`;
  console.log(url)
  return url
}

function deleteCategoryMutation(category: Category){
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  }
}

function createCategoryMutation(category: Category){
  return {url: endpointUrl, method: "POST", body: category };
}

function updateCategoryMutation(category: Category){
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category
  };
}

function getCategory( {id}: { id: string}){
  return {url: `${endpointUrl}/${id}`}
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation} ) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"]
    }),
    getCategory: query<Result, {id: string}>({
      query: getCategory,
      providesTags: ['Categories']
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"]
    }),
    deleteCategory: mutation<Result, {id: string}>({
      query: deleteCategoryMutation,
      invalidatesTags: ['Categories']
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ['Categories']
    })
  })
})

const category: Category = {
    id: '',
    name: "",
    description: "",
    is_active: false,
    deleted_at: null,
    created_at: "",
    updated_at: "",
}

const categories: Category[] = [
    category,
]

export const initialState = [
    category,
]

const categorySlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    createCategory(state, action, ){
      state.push(action.payload)
    },
    updateCategory(state, action, ){
      const index = state.findIndex((category) => category.id === action.payload.id);
      state[index] = action.payload;
    },
    deleteCategory(state, action, ){
      const index = state.findIndex((category) => category.id === action.payload.id);
      state.splice(index, 1);
    },
  },
})

//select all category
export const selectCategories = (state: RootState) => state.categories;
// select category by id
export const selectCategoryById = (state: RootState, id: string) => {  
  return state.categories.find((category) => category.id === id) || {
    id: "",
    created_at: "",
    deleted_at: "",
    description: "",
    is_active: false,
    name: "",
    updated_at: ""
  };
}

export default categorySlice.reducer
export const {createCategory, updateCategory, deleteCategory} = categorySlice.actions;

export const {
  useGetCategoriesQuery, 
  useDeleteCategoryMutation, 
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery
} = categoriesApiSlice;