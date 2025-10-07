
import { renderHook } from "@testing-library/react";
import * as notistack from "notistack";
import { useHandleSnackbar } from "./useHandleSnackBarStatus";

const mockEnqueueSnackbar = jest.fn();

jest.mock('notistack', () => ({
    ...jest.requireActual('notistack'),
    useSnackbar: () => ({
        ...jest.requireActual('notistack').useSnackbar,
        enqueueSnackbar: mockEnqueueSnackbar

    })
}))

describe('HandleSnackbar', () => {
    it('should show success message', () => {

        jest.spyOn(notistack, "useSnackbar").mockReturnValue({ mockEnqueueSnackbar } as any);

        renderHook(() =>
            useHandleSnackbar(
                { isSuccess: true, isError: false },
                { successMessage: "Success", errorMessage: "Error" }
            )
        );

        expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Success", { variant: "success" });
    });

    it('should show error message', () => {

        jest.spyOn(notistack, "useSnackbar").mockReturnValue({ mockEnqueueSnackbar } as any);    

        renderHook(() => 
            useHandleSnackbar(
                {isSuccess: false, isError: true},
                {successMessage: 'success', errorMessage: 'Error message'}
            )
        );
        expect(mockEnqueueSnackbar).toHaveBeenCalledWith("Error message", {variant: 'error'})
    });
})