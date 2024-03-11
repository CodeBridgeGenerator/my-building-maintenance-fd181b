import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';
import WhatToDoPage from '../components/WhatTodo';

import UsersPage from "../components/UsersPage/UsersPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import BuildingsPage from "../components/BuildingsPage/BuildingsPage";
import SingleBuildingsPage from "../components/BuildingsPage/SingleBuildingsPage";
import MaintenanceRequestsPage from "../components/MaintenanceRequestsPage/MaintenanceRequestsPage";
import SingleMaintenanceRequestsPage from "../components/MaintenanceRequestsPage/SingleMaintenanceRequestsPage";
import WorkOrdersPage from "../components/WorkOrdersPage/WorkOrdersPage";
import SingleWorkOrdersPage from "../components/WorkOrdersPage/SingleWorkOrdersPage";
import MaintenanceHistoryPage from "../components/MaintenanceHistoryPage/MaintenanceHistoryPage";
import SingleMaintenanceHistoryPage from "../components/MaintenanceHistoryPage/SingleMaintenanceHistoryPage";
import InventoryPage from "../components/InventoryPage/InventoryPage";
import SingleInventoryPage from "../components/InventoryPage/SingleInventoryPage";
import EmployeePage from "../components/EmployeePage/EmployeePage";
import SingleEmployeePage from "../components/EmployeePage/SingleEmployeePage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />
            {/* protected route https://www.robinwieruch.de/react-router-private-routes/ */}

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                    <Route path="/buildings" exact element={<BuildingsPage />} />
                    <Route path="/buildings/:singleBuildingsId" exact element={<SingleBuildingsPage />} />
                    <Route path="/maintenanceRequests" exact element={<MaintenanceRequestsPage />} />
                    <Route path="/maintenanceRequests/:singleMaintenanceRequestsId" exact element={<SingleMaintenanceRequestsPage />} />
                    <Route path="/workOrders" exact element={<WorkOrdersPage />} />
                    <Route path="/workOrders/:singleWorkOrdersId" exact element={<SingleWorkOrdersPage />} />
                    <Route path="/maintenanceHistory" exact element={<MaintenanceHistoryPage />} />
                    <Route path="/maintenanceHistory/:singleMaintenanceHistoryId" exact element={<SingleMaintenanceHistoryPage />} />
                    <Route path="/inventory" exact element={<InventoryPage />} />
                    <Route path="/inventory/:singleInventoryId" exact element={<SingleInventoryPage />} />
                    <Route path="/employee" exact element={<EmployeePage />} />
                    <Route path="/employee/:singleEmployeeId" exact element={<SingleEmployeePage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
