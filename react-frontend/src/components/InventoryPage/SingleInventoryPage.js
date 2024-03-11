import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleInventoryPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("inventory")
            .get(urlParams.singleInventoryId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Inventory", type: "error", message: error.message || "Failed get inventory" });
            });
    }, [props,urlParams.singleInventoryId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Inventory</h3>
                </div>
                <p>inventory/{urlParams.singleInventoryId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Item Name</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.itemName}</p></div>
                    <label className="text-sm text-primary">Category</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.category}</p></div>
                    <label className="text-sm text-primary">Unit Of Measure</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.unitOfMeasure}</p></div>
                    <label className="text-sm text-primary">Quantity On Hand</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.quantityOnHand}</p></div>
                    <label className="text-sm text-primary">minimumStockLevel</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.minimumStockLevel}</p></div>
                    <label className="text-sm text-primary">maximumStockLevel</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.maximumStockLevel}</p></div>
                    <label className="text-sm text-primary">reorderPoint</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.reorderPoint}</p></div>
                    <label className="text-sm text-primary">Supplier Vendor</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.supplierVendor}</p></div>
                    <label className="text-sm text-primary">Empty</label>
                    <div className="ml-3"><i className={`pi ${_entity?.Empty?"pi-check": "pi-times"}`}  ></i></div>
            
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleInventoryPage);
