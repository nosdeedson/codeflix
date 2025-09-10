import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category{
    id: string;
    name: string;
    description: null | string;
    is_active: boolean;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
}

const category: Category = {
    id: '1',
    name: "olive",
    description: "teste teste teste",
    is_active: true,
    deleted_at: null,
    created_at: "2025-08-21",
    updated_at: "2025-08-21",
}

const categories: Category[] = [
    category,
    {...category, name: 'apple', id: '2'},
    {...category, name: 'banana', id: '3'},
    {...category, name: 'pear', id: '4'},
]

export const initialState = [
    category,
    {...category, name: 'apple', id: '2'},
    {...category, name: 'banana', id: '3'},
    {...category, name: 'pear', id: '4'},
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
export const {createCategory, updateCategory, deleteCategory} = categorySlice.actions