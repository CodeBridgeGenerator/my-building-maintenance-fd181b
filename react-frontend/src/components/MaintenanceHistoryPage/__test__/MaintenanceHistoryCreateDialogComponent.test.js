import React from "react";
import { render, screen } from "@testing-library/react";

import MaintenanceHistoryCreateDialogComponent from "../MaintenanceHistoryCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders maintenanceHistory create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaintenanceHistoryCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maintenanceHistory-create-dialog-component")).toBeInTheDocument();
});
