import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../categories/mocks";
import { GenreCreate } from "./GenreCreate";

const handlers = [
    rest.get(`${baseUrl}/categories`, async (req, res, ctx) => {
        return await res(ctx.status(200), ctx.json(categoryResponse));
    }),
    rest.post(`${baseUrl}/genres`, async (req, res, ctx) => {
        return await res(ctx.status(201), ctx.delay(0));
    })
]

export const server = setupServer(...handlers);


describe('GenreCreate', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('should render genre create', () => {
        const { asFragment } = renderWithProviders(<GenreCreate />);
        expect(asFragment).toMatchSnapshot();
    });

    it('should create a genre', async () => {
        // renderWithProviders(<GenreCreate />)
        // const name = screen.getByTestId('name');
        // const submit = screen.getByText('Save');
        // await waitFor(() => {
        //     expect(submit).toBeInTheDocument();
        // });

        // fireEvent.change(name, { target: { value: 'Test' } });
        // fireEvent.click(submit);
        // await waitFor(() => {
        //     const text = screen.getByText('Genre created successfully');
        //     expect(text).toBeInTheDocument();
        // })
    });

    
})