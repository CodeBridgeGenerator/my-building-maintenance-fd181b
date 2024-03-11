import React from "react";
import { render, screen } from "@testing-library/react";

import MaintenanceHistoryEditDialogComponent from "../MaintenanceHistoryEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders maintenanceHistory edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaintenanceHistoryEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maintenanceHistory-edit-dialog-component")).toBeInTheDocument();
});
