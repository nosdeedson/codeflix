import { renderWithProviders } from "../../utils/utils";
import { CategoryEdit } from "./CategoryEdit";

describe('CategoryEdit', () => {
    it('should render category edit', () => {
        const { asFragment } = renderWithProviders(<CategoryEdit />)
        expect(asFragment()).toMatchSnapshot()
    })
});