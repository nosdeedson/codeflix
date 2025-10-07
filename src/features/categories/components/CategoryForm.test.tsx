import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryForm } from "./CategoryForm";



const Props = {
    category: {
        id: "1",
        name: "Teste",
        description: "Teste",
        is_active: true,
        deleted_at: '',
        created_at: "2021-10-01T00:00:00.000000Z",
        updated_at: "2021-10-01T00:00:00.000000Z",
    },
    isdisabled: false,
    isLoading: false,
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleToggle: jest.fn(),
}


describe('CategoryForm', () => {

    it('should render categoryForm', () => {
        const {asFragment} = render(<CategoryForm {...Props} />, {wrapper: BrowserRouter})
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render categoryForm with isLoading state equals to true', () => {
        const {asFragment} = render(<CategoryForm {...Props} isLoading />, {wrapper: BrowserRouter})
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render categoryForm with isdisabled state true', () => {
        const {asFragment} = render(<CategoryForm {...Props} isdisabled />, {wrapper: BrowserRouter})
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render categoryForm with toggle true', () => {
        render(<CategoryForm {...Props}  />, {wrapper: BrowserRouter});
        const toggle = screen.getByRole('checkbox') as HTMLInputElement;
        expect(toggle.checked).toBe(true);
    });

     it('should render categoryForm with toggle false', () => {
        Props.category.is_active = false;
        render(<CategoryForm {...Props} />, {wrapper: BrowserRouter});
        const toggle = screen.getByRole('checkbox') as HTMLInputElement;
        expect(toggle.checked).toBe(false);
    });
});