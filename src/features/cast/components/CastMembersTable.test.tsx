import { GridFilterModel } from "@mui/x-data-grid"
import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { CastMembersTable } from "./CastMembersTable"


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

    it('should render castmember table with data null and isLoading state', () => {
        const {asFragment} = render(<CastMembersTable {...Props} data={{data: [], meta: {}} as any} isFetching />,{
            wrapper: BrowserRouter
        })
        expect(asFragment()).toMatchSnapshot()
    });

    it('should render castmember table with type equals to 1', () => {
        Props.data.data[0].type = 1;
        const {asFragment} = render(<CastMembersTable {...Props} />,{
            wrapper: BrowserRouter
        })
        expect(asFragment()).toMatchSnapshot()
    });

    it('should render castmember table with type equals to 2', () => {
        Props.data.data[0].type = 2;
        const {asFragment} = render(<CastMembersTable {...Props} />,{
            wrapper: BrowserRouter
        })
        expect(asFragment()).toMatchSnapshot()
    });

    
})


