import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { baseUrl } from "../api/apiSlice";
import { categoryResponse } from "../categories/mocks";
import { CastMemberEdit } from "./CastMemberEdit"

const handler =[
  rest.get(`${baseUrl}/cast_members/undefined`, async (req, res, ctx) => {
    return await res(ctx.json({data: categoryResponse}));
  }),
  rest.put(`${baseUrl}/cast_members/undefined`, async (req, res, ctx) =>{
    return await res(ctx.status(200))
  })
];

export const server = setupServer(...handler);

beforeAll(async () => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CastMemberEdit', () => {
  it('should render castmember edit', () => {
    const { asFragment } = renderWithProviders(<CastMemberEdit />)
    expect(asFragment()).toMatchSnapshot()
  });

  it('should update a cast member', async () => {
    renderWithProviders(<CastMemberEdit/>)
    const submit = await screen.findByText("Save");
    await waitFor(() => {
      const text = screen.getByText('Save')
      expect(text).toBeInTheDocument();
    });
    const name = screen.getByTestId('name');
    const type = screen.getByTestId('type');
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(type, { target: { checked: true } });
    fireEvent.click(submit);
   
    await waitFor(() => {
      const text = screen.getByText('Save');
      expect(text).toBeInTheDocument();
    })
  });

})