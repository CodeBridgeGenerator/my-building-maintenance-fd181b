import React from "react";
import BuildingLayout from "../Layouts/BuildingLayout";
import { connect } from "react-redux";
import UsersPage from "./UsersPage";

const UserBuildingPage = (props) => {
  return (
    <BuildingLayout>
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
                {props.selectedBuilding?.name + " > "} Users
              </p>
            </div>
          </div>
          <UsersPage />
        </div>
      </div>
    </BuildingLayout>
  );
};

const mapState = (state) => {
  const { selectedBuilding } = state.building;
  return { selectedBuilding };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(UserBuildingPage);