import { rest } from "msw";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { GenreEdit } from "./GenreEdit"
import { baseUrl } from "../api/apiSlice";
import { setupServer } from "msw/lib/node";
import { genreResponse } from "./mocks";
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get(`${baseUrl}/genres/1`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(200), ctx.json({ data: genreResponse }));
  }),
  rest.put(`${baseUrl}/genres/1`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201));
  }),
] 

export const server = setupServer(...handlers);
beforeAll(() => server.listen());
beforeEach(() => server.restoreHandlers());
afterAll(() => server.close());


describe('GenreEdit', () => {
  it('should render GenreEdit', () => {
    const {asFragment} = renderWithProviders(<GenreEdit/>);
    expect(asFragment).toMatchSnapshot();
  });

  it('should Edit Genre', async () => {
    renderWithProviders(<GenreEdit/>);
    const name = screen.getByTestId('name');
    const submit = screen.getByText('Save');
    fireEvent.change(name, {target: {value: "test"}});
    userEvent.click(submit).then(() => {
      const text = screen.getByText('Genre edit successfully');
      expect(text).toBeInTheDocument();
    });
  })
})