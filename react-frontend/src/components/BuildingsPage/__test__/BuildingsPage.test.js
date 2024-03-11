import React from "react";
import { render, screen } from "@testing-library/react";

import BuildingsPage from "../BuildingsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders buildings page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BuildingsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("buildings-datatable")).toBeInTheDocument();
    expect(screen.getByRole("buildings-add-button")).toBeInTheDocument();
});
