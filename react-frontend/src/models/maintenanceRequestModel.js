import client from '../services/restClient';

export const maintenanceRequest = {
    state: {
        selectedMaintenanceRequest: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectMaintenanceRequest(state, maintenanceRequest) {
            let toReturn = { ...state, selectedMaintenanceRequest: maintenanceRequest };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE MaintenanceRequest ////
        ///////////////////////////
        async getOneMaintenanceRequest(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.maintenanceRequest.selectedMaintenanceRequest?._id === _id) {
                    resolve(reduxState.maintenanceRequest.selectedMaintenanceRequest);
                    return;
                }
                client
                    .service('maintenanceRequests')
                    .get(_id)
                    .then((res) => {
                        this.selectMaintenanceRequest(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log('Failed to get maintenanceRequest', error);
                        dispatch.toast.alert({ type: 'error', title: 'MaintenanceRequest', message: 'Failed to get maintenanceRequest' });
                        reject(error);
                    });
            });
        },
    })
};