import { Snackbar } from "@mui/material";
import { PreloadedState } from "@reduxjs/toolkit";
import { RenderOptions } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RootState, AppDispatch, store } from "../app/store";
import { render } from "@testing-library/react";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: any;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        store: customStore = store,
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider>{children}</SnackbarProvider>
                </BrowserRouter>
            </Provider>
        )
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'