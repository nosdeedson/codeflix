import { render } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { Header } from "./Header";


describe('Header', () => {
  it('should render header', () => {
    const { asFragment } = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
  })
});