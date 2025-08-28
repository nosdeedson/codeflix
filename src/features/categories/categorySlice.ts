import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category{
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
    createCategory(state, action, ){},
    updateCategory(state, action, ){},
    deleteCategory(state, action, ){},
  },
})

//selectors
export const selectCategories = (state: RootState) => state.categories;

export default categorySlice.reducer