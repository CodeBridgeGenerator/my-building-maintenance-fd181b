import React from "react";
import { render, screen } from "@testing-library/react";

import MaintenanceHistoryPage from "../MaintenanceHistoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders maintenanceHistory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaintenanceHistoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maintenanceHistory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("maintenanceHistory-add-button")).toBeInTheDocument();
});
