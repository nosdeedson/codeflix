import { renderWithProviders } from "../../utils/test-utils"
import { CastMemberList } from "./CastMemberList"


describe('show render castmember list', () => {

  it('should render castmember list', () => {
    const { asFragment } = renderWithProviders(<CastMemberList />)
    expect(asFragment()).toMatchSnapshot()
  })
})