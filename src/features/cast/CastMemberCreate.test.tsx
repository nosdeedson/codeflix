import { rest } from "msw";
import { setupServer } from "msw/node";
import { SnackbarProvider } from "notistack";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CastMemberCreate } from "./CastMemberCreate";
import { castMemberResponse } from "./mocks";

const handlers = [
  rest.post(`http://localhost:8000/api/cast_members`, async (req, res, ctx) => {
    console.log('Intercepted request:', req.url.toString());
    return await res(ctx.status(201), ctx.delay(150));
  })
]

export const server = setupServer(...handlers);

beforeAll(async () => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CastMemberCreate', () => {

  it('should render castmember create', () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />)
    expect(asFragment()).toMatchSnapshot()
  });

  it('should create a castmember', async () => {
    renderWithProviders(
    <CastMemberCreate />
  );
    const name = screen.getByTestId("name");
    const submit = screen.getByText("Save");

    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const text = screen.getByText("Name");
      expect(text).toBeInTheDocument();
    });
  });


});