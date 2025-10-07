import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice";
import { CastMemberList } from "./CastMemberList"
import { castMemberResponse } from "./mocks";

const handlers = [
  rest.get(`http://localhost:8000/api/cast_members`, async (req, res, ctx) => {
    console.log(req.url.toString());
    return await res(ctx.json({data: castMemberResponse}))
  })
];

export const server = setupServer(...handlers);


describe('show render castmember list', () => {

  beforeAll(async () => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
  it('should render castmember list', () => {
    const { asFragment } = renderWithProviders(<CastMemberList />)
    expect(asFragment()).toMatchSnapshot()
  });

  it('should render the table with data', async () => {
    // renderWithProviders(<CastMemberList/>);
    // expect(await screen.findByText('Tomato')).toBeInTheDocument();
  })
})