import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CastMemberCreate } from "./CastMemberCreate";

const handlers = [
  rest.post(`${baseUrl}/cast_members`, async (req, res, ctx) => {
    return await res(ctx.status(201), ctx.delay(100));
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
    renderWithProviders(<CastMemberCreate />);
    const name = screen.getByTestId("name");
    const submit = await screen.findByText("Save");
    const type = screen.getByTestId("type");
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(type, { target: { checked: true } });
    fireEvent.click(submit);
   
    await waitFor(() => {
      const text = screen.getByText('Save');
      expect(text).toBeInTheDocument();
    })

  });

});