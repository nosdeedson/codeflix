import { renderWithProviders } from "../../utils/test-utils"
import { CastMemberEdit } from "./CastMemberEdit"


describe('CastMemberEdit', () => {
  it('should render castmember edit', () => {
    const { asFragment } = renderWithProviders(<CastMemberEdit />)
    expect(asFragment()).toMatchSnapshot()
  })
})