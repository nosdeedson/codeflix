import { rest } from "msw";
import { render, renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { GenreList } from "./GenreList"
import { baseUrl } from "../api/apiSlice";
import { genreResponse } from "./mocks";
import { setupServer } from "msw/node";

const handlers = [
  rest.get(`${baseUrl}/genres`, async (req, res, ctx) => {
    return await res(ctx.delay(0), ctx.status(200), ctx.json(genreResponse));
  })
];

const server = setupServer(...handlers);

describe('GenreList', () => {
  beforeAll( ( ) => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render genreList', () => {
    const { asFragment } = renderWithProviders(<GenreList />);
    expect(asFragment).toMatchSnapshot();
  });

  it('should render the table with Genre', async () => {
    // await waitFor(() => {
    //   renderWithProviders(<GenreList />);
    // }, {timeout: 4000, interval: 100}).then(async () => {
    //   const text = await screen.getByText((content) => content.includes('Venezuela'));
    //   
    //   expect(text).toBeInTheDocument();
    // })
  });

  it("should render loading state", () => {
    renderWithProviders(<GenreList />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

})