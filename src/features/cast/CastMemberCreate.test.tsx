import { renderWithProviders } from "../../utils/test-utils";
import { CastMemberCreate } from "./CastMemberCreate";


describe('CastMemberCreate', () => {

  it('should render castmember create', () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />)
    expect(asFragment()).toMatchSnapshot()
  })


});