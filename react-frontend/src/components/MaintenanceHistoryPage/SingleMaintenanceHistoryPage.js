import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleMaintenanceHistoryPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [buildingId, setBuildingId] = useState([]);
    const [requestId, setRequestId] = useState([]);
    const [performedByUserid, setPerformedByUserid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("maintenanceHistory")
            .get(urlParams.singleMaintenanceHistoryId, { query: { $populate: ["buildingId","requestId","performedByUserid"] }})
            .then((res) => {
                set_entity(res || {});
                const buildingId = Array.isArray(res.buildingId)
            ? res.buildingId.map((elem) => ({ _id: elem._id, buildingName: elem.buildingName }))
            : res.buildingId
                ? [{ _id: res.buildingId._id, buildingName: res.buildingId.buildingName }]
                : [];
        setBuildingId(buildingId);
                const requestId = Array.isArray(res.requestId)
            ? res.requestId.map((elem) => ({ _id: elem._id, description: elem.description }))
            : res.requestId
                ? [{ _id: res.requestId._id, description: res.requestId.description }]
                : [];
        setRequestId(requestId);
                const performedByUserid = Array.isArray(res.performedByUserid)
            ? res.performedByUserid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.performedByUserid
                ? [{ _id: res.performedByUserid._id, name: res.performedByUserid.name }]
                : [];
        setPerformedByUserid(performedByUserid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "MaintenanceHistory", type: "error", message: error.message || "Failed get maintenanceHistory" });
            });
    }, [props,urlParams.singleMaintenanceHistoryId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">MaintenanceHistory</h3>
                </div>
                <p>maintenanceHistory/{urlParams.singleMaintenanceHistoryId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">Building Name</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.buildingId?.buildingName}</p></div>
                    <label className="text-sm text-primary">requestId</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.requestId?.description}</p></div>
                    <label className="text-sm text-primary">Description</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.description}</p></div>
                    <label className="text-sm text-primary">Date Performed</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.datePerformed}</p></div>
                    <label className="text-sm text-primary">performedByUserid</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.performedByUserid?.name}</p></div>
            <label className="text-sm">Building Name</label>
            {buildingId.map((elem) => (
                    <Link key={elem._id} to={`/buildings/${elem._id}`}>
                        <div className="card">
                            <p>{elem.buildingName}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">requestId</label>
            {requestId.map((elem) => (
                    <Link key={elem._id} to={`/maintenanceRequests/${elem._id}`}>
                        <div className="card">
                            <p>{elem.description}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">performedByUserid</label>
            {performedByUserid.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
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

export default connect(mapState, mapDispatch)(SingleMaintenanceHistoryPage);
