import client from '../services/restClient';

export const building = {
    state: {
        selectedBuilding: {}
    }, // initial state
    reducers: {
        update(state, newState) {
            return { ...state, ...newState };
        },
        selectBuilding(state, building) {
            let toReturn = { ...state, selectedBuilding: building };
            return toReturn;
        },
    },
    effects: (dispatch) => ({
        ///////////////////////////
        //// GET ONE Building ////
        ///////////////////////////
        async getOneBuilding(_id, reduxState) {
            return new Promise((resolve, reject) => {
                if (reduxState.building.selectedBuilding?._id === _id) {
                    resolve(reduxState.building.selectedBuilding);
                    return;
                }
                client
                    .service('buildings')
                    .get(_id)
                    .then((res) => {
                        this.selectBuilding(res);
                        resolve(res);
                    })
                    .catch((error) => {
                        console.log('Failed to get building', error);
                        dispatch.toast.alert({ type: 'error', title: 'Building', message: 'Failed to get building' });
                        reject(error);
                    });
            });
        },
    })
};