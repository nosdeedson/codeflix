import { GridFilterModel } from "@mui/x-data-grid";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { onHandleFilterChange } from "./handleFilterChange";

describe('handleFilterChange', () => {
    it('should set search value', () => {
        const expectedSearch = "test search";
        const setOptions = jest.fn().mockImplementation(() => options.search = "test search");
        const options = { search: "", page: 1, perPage: 10 };
        const filterModel: GridFilterModel = {
            items: [],
            quickFilterValues: ["test search"],
        };
        const result = onHandleFilterChange(filterModel, options, setOptions);
        expect(options.search).toEqual(expectedSearch);
    });

    it('should set search value to ""', () => {
        const expectedSearch = "";
        const setOptions = jest.fn().mockImplementation(() => options.search = "");
        const options = { search: "has content", page: 1, perPage: 10 };
        const filterModel: GridFilterModel = {
            items: [],
            quickFilterValues: [],
        };

        const result = onHandleFilterChange(filterModel, options, setOptions);
        expect(options.search).toEqual(expectedSearch)

    })
})