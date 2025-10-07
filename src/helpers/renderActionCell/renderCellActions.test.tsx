import { GridRenderCellParams } from "@mui/x-data-grid";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderCellActions } from "./renderCellActions";

jest.mock("@mui/icons-material/Delete", () => () => <svg data-testid="delete-icon" />);

describe('renderNameActions', () => {
    it('should call handleDelete when button clicked', () => {
        const mockHandleDelete = jest.fn();
        const mockRow = { value: "123" } as unknown as GridRenderCellParams;
        render(renderCellActions(mockRow, mockHandleDelete));

        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockHandleDelete).toHaveBeenCalledTimes(1);
        expect(mockHandleDelete).toHaveBeenCalledWith('123');
    });

    it("should render the delete icon", () => {
        const mockHandleDelete = jest.fn();
        const mockRow = { value: "456" } as unknown as GridRenderCellParams;

        render(renderCellActions(mockRow, mockHandleDelete));

        expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
    });
})