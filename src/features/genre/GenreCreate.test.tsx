import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { GenreCreate } from "./GenreCreate";
import userEvent from '@testing-library/user-event';

const handlers = [
    rest.post(`${baseUrl}/genres`, async (req, res, ctx) => {
        return await res(ctx.status(201), ctx.delay(0));
    })
]

export const server = setupServer(...handlers);


describe('GenreCreate', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close())
    it('should render genre create', () => {
        const { asFragment } = renderWithProviders(<GenreCreate />);
        expect(asFragment).toMatchSnapshot();
    });

    it('should create a genre', async () => {
        renderWithProviders(<GenreCreate />)
        const name = screen.getByTestId('name');
        const submit = screen.getByText('Save');

        fireEvent.change(name, { target: { value: 'Test' } });
        userEvent.click(submit).then(() => {
            const text = screen.getByText('Genre created successfully');
            expect(text).toBeInTheDocument();
        });
    })
})