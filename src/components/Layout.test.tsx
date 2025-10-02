import { render } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { Layout } from "./Layout";


describe('Layout', () => {
  it('should render layout', () => {
    const { asFragment } = renderWithProviders(<Layout>
      <div>test</div>
    </Layout>)
    expect(asFragment()).toMatchSnapshot()
  })
});