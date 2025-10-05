import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { baseUrl } from '../api/apiSlice'
import { CategoryList } from "./CategoryList"
import { categoryResponse } from './mocks'


export const handlers = [
    rest.get(`*`, async (req, res, ctx) => {
    return await res(ctx.json(categoryResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);
beforeAll(async () => server.listen({ onUnhandledRequest: 'warn' }));


describe('ListCategory', () => {
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

    it('should render category with success', async () => {
        renderWithProviders(<CategoryList />);
        // await waitFor(() => {
        //     const name = screen.getByText('Tomato');
        //     expect(name).toBeInTheDocument();
        // });
    });

})