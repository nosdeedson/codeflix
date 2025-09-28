import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { renderWithProviders, screen, waitFor, within } from "../../utils/test-utils"
import { CategoryList } from "./CategoryList"
import { baseUrl } from '../api/apiSlice'
import { categoryResponse } from './mocks'
import { RootState, setupStore } from '../../app/store'

const result = categoryResponse;

const Props = {
    data: result.data,
    perPage: 1,
    isFetching: false,
    rowsPerPage: [1, 2, 3],
    handleOnPageChage: jest.fn(),
    handleFilterChange: jest.fn(),
    handleOnPageSizeChange: jest.fn(),
    handleDelete: jest.fn(),
}

export const handlers = [
    rest.get(`${baseUrl}/categories`, async (req, res, ctx) => {
        const response = await res(
            ctx.status(200),
            ctx.delay(200),
            ctx.json(result.data));
        return response
    })
];

const server = setupServer(...handlers);


describe('ListCategory', () => {
    beforeAll(() => {
        setupServer(...handlers)
        server.listen();
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render category list', () => {
        const { asFragment } = renderWithProviders(<CategoryList />)
        expect(asFragment()).toMatchSnapshot()
    });

    it('should render loading state', () => {
        renderWithProviders(<CategoryList />);
        const loading = screen.getByRole('progressbar');
        expect(loading).toBeInTheDocument();
    });

    it('should not render the table', async () => {
        const store = setupStore({ categories: categoryResponse.data });
        renderWithProviders(<CategoryList {...Props} />);
        await waitFor(() => {
            const result = screen.getByText((content) => content.includes("Something"))
            expect(result).toBeInTheDocument()
        })
    });


    it('should render the table', async () => {
        const preloadedState: RootState = {
            categories: [
                {
                    id: "1",
                    name: "Action",
                    description: "Action movies",
                    is_active: true,
                    deleted_at: null,
                    created_at: "2025-01-01",
                    updated_at: "2025-01-01"
                }
            ],
            castMembers: [
                {
                    id: "1",
                    name: "John Doe",
                    type: 1,
                    deleted_at: null,
                    created_at: "2025-01-01",
                    updated_at: "2025-01-01"
                }
            ],
            api: {
                queries: {},
                mutations: {},
                provided: {
                    Categories: {},
                    CastMembers: {}
                },
                subscriptions: {},
                config: {
                    online: true,
                    focused: true,
                    middlewareRegistered: true,
                    refetchOnFocus: false,
                    refetchOnReconnect: false,
                    refetchOnMountOrArgChange: false,
                    keepUnusedDataFor: 60,
                    reducerPath: "api"
                }
            }
        };
        const { store } = renderWithProviders(<CategoryList />, { preloadedState });
        const state = store.getState();

        console.log(store)
        await waitFor(() => {
            const result = screen.getByText((content) => content.includes("Tomato"));
            console.log(result)
            expect(result).toBeInTheDocument()
        })
    });

})