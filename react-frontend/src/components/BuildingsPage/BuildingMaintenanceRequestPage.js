import React from "react";
import MaintenanceRequestLayout from "../Layouts/MaintenanceRequestLayout";
import { connect } from "react-redux";
import BuildingsPage from "./BuildingsPage";

const BuildingMaintenanceRequestPage = (props) => {
  return (
    <MaintenanceRequestLayout>
      <div className="pt-2">
        <div className="card p-0 overflow-hidden ">
          <div
            className="flex justify-content-between p-4 mb-6 shadow-2"
            style={{
              backgroundImage:
                "linear-gradient(to right top, #d30078, #d1008f, #c600ab, #af00ca, #8312eb)",
            }}
          >
            <div className="flex align-items-center text-white">
              <p className="text-4xl text-white">
                {props.selectedMaintenanceRequest?.name + " > "} Buildings
              </p>
            </div>
          </div>
          <BuildingsPage />
        </div>
      </div>
    </MaintenanceRequestLayout>
  );
};

const mapState = (state) => {
  const { selectedMaintenanceRequest } = state.maintenanceRequest;
  return { selectedMaintenanceRequest };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(BuildingMaintenanceRequestPage);