import React from "react";
import { render, screen } from "@testing-library/react";

import WorkOrdersEditDialogComponent from "../WorkOrdersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders workOrders edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WorkOrdersEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("workOrders-edit-dialog-component")).toBeInTheDocument();
});
