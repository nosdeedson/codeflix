import { GridColDef } from "@mui/x-data-grid";
import { categoryResponse } from "../features/categories/mocks";
import { render, renderWithProviders } from "../utils/test-utils";
import { BaseTable } from "./BaseTable";


const result = categoryResponse;

const renderNameCell = jest.fn();
const renderIsActiveCel = jest.fn();
const renderActionsCell = jest.fn();

const columns: GridColDef[] = [

        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: 'boolean',
            renderCell: renderIsActiveCel
        },
        {
            field: 'createdAt',
            headerName: 'Created',
            flex: 1,
            type: 'date'
        },
        {
            field: 'id',
            headerName: 'Actions',
            type: 'string',
            flex: 1,
            renderCell: renderActionsCell
        },
    ];


const Props = {
  data: categoryResponse,
  mapDataToGridRows: (data: { data: any[]; }) => data.data.map((item: { id: any; name: any; description: any; is_active: any; created_at: string | number | Date; }) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    isActive: item.is_active,
    createdAt: new Date(item.created_at).toLocaleDateString('pt-BR'),
  })),
  columns: columns.map(col => ({
    ...col,
    renderCell: col.renderCell || ((params) => params.value)
  })),
  perPage: 1,
  isFetching: false,
  rowsPerPage: [1, 2, 3],
  rowCount: categoryResponse.data.length,
  handleOnPageChange: jest.fn(),
  handleFilterChange: jest.fn(),
  handleOnPageSizeChange: jest.fn(),
};



describe('BaseTable', () => {

    it('should render BaseTable', () => {
        const { asFragment } = render(<BaseTable {...Props} />)
        expect(asFragment()).toMatchSnapshot()
    });


})