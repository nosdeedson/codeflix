import { render } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import { Header } from "./Header";

const mockProps = {
  toggle: jest.fn(),
  theme: 'light',
  handleDrawerToggle: jest.fn(),
};

describe('Header', () => {
  it('should render header', () => {
    const { asFragment } = render(<Header {...mockProps} />,  ) 
    expect(asFragment()).toMatchSnapshot()
  })
});