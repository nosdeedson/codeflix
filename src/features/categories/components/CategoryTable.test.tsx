import { GridRenderCellParams } from "@mui/x-data-grid";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { CategoryTable } from "./CategoryTable";

const data = {
    "data": [
        {
            "id": "398deb80-db08-4063-bba3-31ef961be11c",
            "name": "PeachPuff",
            "description": "test",
            "is_active": true,
            "deleted_at": '',
            "created_at": "2025-09-25T00:29:54+0000",
            "updated_at": "2025-09-25T00:29:54+0000"
        },
    ],
    "links": {
        "first": "http://localhost:8000/api/categories?page=1",
        "last": "http://localhost:8000/api/categories?page=7",
        "prev": null,
        "next": "http://localhost:8000/api/categories?page=2"
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 7,
        "path": "http://localhost:8000/api/categories",
        "per_page": 15,
        "to": 15,
        "total": 100
    }
};

const Props = {
    data: data,
    perPage: 1,
    isFetching: false,
    rowsPerPage: [1, 2, 3],
    handleOnPageChage: jest.fn(),
    handleFilterChange: jest.fn(),
    handleOnPageSizeChange: jest.fn(),
    handleDelete: jest.fn(),
}

function setUp(){
    render(
        <BrowserRouter>
            <CategoryTable {...Props}/>
        </BrowserRouter> 
    )
}

describe('CategoryTable', () => {
    it('should render CategoryTable', () => {
        const { asFragment } = render(<CategoryTable {...Props} />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render CategoryTable with isLoading state', () => {
        const { asFragment } = render(<CategoryTable {...Props} isFetching />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render CategoryTable with data null', () => {
        const { asFragment } = render(<CategoryTable {...Props} data={{ data: [], meta: {} as any, links: {} as any }} />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render CategoryTable with data null and isLoading state', () => {
        const { asFragment } = render(<CategoryTable {...Props} data={{ data: [], meta: {} as any, links: {} as any }} isFetching />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render CategoryTable with data and is_active false', () => {
        Props.data.data[0].is_active = false
        const { asFragment } = render(<CategoryTable {...Props} />)
        expect(asFragment()).toMatchSnapshot();
    });

    it('should delete a category', async () => {
        // await setUp();
        // const deleteButton = await screen.findByTestId('delete')as any;
        // 
        // fireEvent.click(deleteButton);
        // expect(Props.handleDelete).toHaveBeenCalled();
        // expect(Props.handleDelete).toHaveBeenCalledWith('398deb80-db08-4063-bba3-31ef961be11c')
    });

});