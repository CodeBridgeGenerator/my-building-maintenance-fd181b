import React from "react";
import { render, screen } from "@testing-library/react";

import MaintenanceRequestsPage from "../MaintenanceRequestsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders maintenanceRequests page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaintenanceRequestsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maintenanceRequests-datatable")).toBeInTheDocument();
    expect(screen.getByRole("maintenanceRequests-add-button")).toBeInTheDocument();
});
