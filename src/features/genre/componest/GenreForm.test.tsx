import { render, screen } from "@testing-library/react"
import { GenreForm } from "./GenreForm"
import { BrowserRouter } from "react-router-dom"
import { Category } from "../../../types/Category"
import { renderWithProviders } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

const category: Category = {
            "id": "8cfed211-62ad-4b05-928b-83ff7dabac2a",
            "name": "Tomato",
            "description": "Quisquam odio omnis fugit impedit culpa sed.",
            "is_active": true,
            "deleted_at": '',
            "created_at": "2025-09-27T20:42:38+0000",
            "updated_at": "2025-09-27T20:42:38+0000"
        };

const Props = {
    categories: [category],
    genre: {
        id: '1',
        name: 'test',
        created_at: "2021-10-01T00:00:00.000000Z",
        updated_at: "2021-10-01T00:00:00.000000Z",
        is_active: false,
        description: null,
        pivot: null,
        categories: null
    },
    isDisabled: false,
    isLoaging: false,
    handleSubmit: jest.fn(),
    handleHandle: jest.fn(),
    handleChange: jest.fn(),
}

describe('Genre', () => {
    it('should render genre form', () => {
        const { asFragment } = render(<GenreForm {...Props} />, {
            wrapper: BrowserRouter
        });
        expect(asFragment).toMatchSnapshot()
    });

    it('should render genre form with loading state', () => {
        const { asFragment } = render(<GenreForm {...Props} isLoading />, {
            wrapper: BrowserRouter
        });
        expect(asFragment).toMatchSnapshot();
    });

    it('should render handle change', async () => {
        render(<GenreForm {...Props}/>,  {
            wrapper: BrowserRouter
        });

        const input = screen.getByLabelText(/categories/i);

        await userEvent.click(input);
        const option = await screen.findByText("Tomato");
        await userEvent.click(option);
        expect(Props.handleChange).toHaveBeenLastCalledWith({
            target: {name: "categories_id", value: ["8cfed211-62ad-4b05-928b-83ff7dabac2a"]}
        })

    });
})