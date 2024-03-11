import React from "react";
import { render, screen } from "@testing-library/react";

import MaintenanceRequestsEditDialogComponent from "../MaintenanceRequestsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders maintenanceRequests edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaintenanceRequestsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maintenanceRequests-edit-dialog-component")).toBeInTheDocument();
});
