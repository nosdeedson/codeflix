import { render } from "@testing-library/react"
import {GenreTable} from "./GenreTable"
import { BrowserRouter } from "react-router-dom"
import { genreResponse } from "../mocks"
import { Results } from "../../../types/Genre"

const data = {
    "data": [
    {
      "id": "e6528779-8ea6-4d33-9272-52430c288f5f",
      "name": "Venezuela",
      "is_active": true,
      "deleted_at": null,
      "created_at": "2025-10-04T15:22:30+0000",
      "updated_at": "2025-10-04T15:22:30+0000",
      "categories": undefined
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/genres?page=1",
    "last": "http://localhost:8000/api/genres?page=100",
    "prev": null,
    "next": "http://localhost:8000/api/genres?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 100,
    "path": "http://localhost:8000/api/genres",
    "per_page": 1,
    "to": 1,
    "total": 100
  }
} as Results;

const Props = {
    data: data,
    perPage: 1,
    isFetching: false,
    rowsPerPage: [1, 2, 3],
    handleOnPageChange: jest.fn(),
    handleFilterChange: jest.fn(),
    handlePageSizeChange: jest.fn(),
    handleDelete: jest.fn(),
}

describe('GenreTable', () => {

    it('should render GenreTable', () => {
        const {asFragment} = render(<GenreTable {...Props} />, {
            wrapper: BrowserRouter
        });
        expect(asFragment).toMatchSnapshot();
    });

    it('should render GenreTable with data empty', () => {
        const {asFragment} = render(<GenreTable {...Props} data={{data: [], links: {} as any, meta: {} as any}}/>, {
            wrapper: BrowserRouter
        });
        expect(asFragment).toMatchSnapshot();
    });


    it('should render GenreTable with isActive equal false', () => {
        Props.data.data[0].is_active = false;
        const {asFragment} = render(<GenreTable {...Props} />, {
            wrapper: BrowserRouter
        });
        expect(asFragment).toMatchSnapshot();
    });
})