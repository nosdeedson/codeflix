import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppStore, RootState, setupStore } from "../app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {store = setupStore(), ...renderOptions}: ExtendedRenderOptions= {}
){
    function Wrapper({children}: PropsWithChildren<{}>): JSX.Element{
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>{children}</SnackbarProvider>
                </BrowserRouter>
            </Provider>
        );
    };
    return { store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

export * from '@testing-library/react';
