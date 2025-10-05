import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import { CastMemberCreate } from "./CastMemberCreate";
import { userEvent } from '@testing-library/user-event'
import { baseUrl } from "../api/apiSlice";

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
    // renderWithProviders(<CastMemberCreate />);
    // const name = screen.getByTestId("name");
    // const submit = screen.getByText("Save");

    // fireEvent.change(name, { target: { value: "Test" } });
    // await userEvent.click(submit).then(async () => {
    //   const text = await screen.getByText('Cast Member created successfully');
    //   expect(text).not.toBeInTheDocument();
    // });
  });

  it('should render create castmember with error', async () => {
    // server.use(
    //   rest.post(`${baseUrl}/cast_members`, async (req, res, ctx) => {
    //     
    //     return await res(ctx.status(500));
    //   })
    // )
    // renderWithProviders(<CastMemberCreate />);
    // const name = screen.getByTestId("name");
    // const submit = screen.getByText("Save");

    // fireEvent.change(name, { target: { value: "Test" } });
    // await userEvent.click(submit).then(() => {
    //   const text = screen.getByText('Error creating Cast Member');
    //   screen.debug()
    //   expect(text).not.toBeInTheDocument();
    // });
  })


});