import { render, screen } from "@testing-library/react"
import {  CastMembersTable } from "./CastMembersTable"
import { GridFilterModel, GridRenderCellParams } from "@mui/x-data-grid"
import { BrowserRouter, MemoryRouter } from "react-router-dom"


const data = {
  "data": [
    {
      "id": "479fee0e-41d0-4b23-bdbc-597e5e69516c",
      "name": "Schumm",
      "type": 2,
      "deleted_at": null,
      "created_at": "2025-09-21T13:57:42+0000",
      "updated_at": "2025-09-21T13:57:42+0000"
    },
  ],
  "links": {
    "first": "http://localhost:8000/api/cast_members?page=1",
    "last": "http://localhost:8000/api/cast_members?page=7",
    "prev": null,
    "next": "http://localhost:8000/api/cast_members?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 7,
    "path": "http://localhost:8000/api/cast_members",
    "per_page": 15,
    "to": 15,
    "total": 100
  }
}

const Props = {
    data: data,
    perPage: 1,
    isFetching: false,
    rowsPerPage: [1, 2, 3],

    handleOnPageChage: (page: number) => {},
    handleFilterChange: (filterModel: GridFilterModel) => {},
    handleOnPageSizeChange: (perPage: number) => {},
    handleDelete: (id: string) => {}
}

describe('CastMembersTable', () => {
    it('should render castmember table', () => {
        const {asFragment} = render(<CastMembersTable {...Props} />,{
            wrapper: BrowserRouter
        })
        expect(asFragment()).toMatchSnapshot()
    })

    it('should render castmember table with isLoading state', () => {
        const {asFragment} = render(<CastMembersTable {...Props} isFetching />,{
            wrapper: BrowserRouter
        })
        expect(asFragment()).toMatchSnapshot()
    });

    it('should render castmember table with data null', () => {
        const {asFragment} = render(<CastMembersTable {...Props} data={{data: [], meta: {}} as any} />,{
            wrapper: BrowserRouter
        })
        expect(asFragment()).toMatchSnapshot()
    });

    // it('should render castmember table testing renderNameCell', () => {
    //     const mockRow = {
    //         id: '123',
    //         value: 'John Doe'
    //     } as GridRenderCellParams;

    //     render(
    //         <MemoryRouter>
    //             <div style={{ height: 400, width: 600 }}> {/* important! */}
    //             <CastMembersTable {...Props}/>
    //             </div>
    //         </MemoryRouter>
    //     );

    //     const link = screen.getByRole('link', {name: '/Schumm/i'});
    //     expect(link).toBeInTheDocument()
    //     expect(link).toHaveAttribute('href', '/cast-members/edit/479fee0e-41d0-4b23-bdbc-597e5e69516c');
        
    // })

    
})


