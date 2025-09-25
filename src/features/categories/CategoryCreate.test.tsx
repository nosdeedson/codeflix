import { renderWithProviders } from "../../utils/test-utils";
import { CategoryCreate } from "./CategoryCreate";


describe('CategoryCreate', () => {
    it('should render category create', () => {
        const { asFragment } = renderWithProviders(<CategoryCreate />)
        expect(asFragment()).toMatchSnapshot()
    })
});