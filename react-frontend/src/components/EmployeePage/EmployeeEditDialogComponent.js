import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';


const genderArray = ["Male","Female"]
const genderOptions = genderArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const EmployeeCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [employeeId, setEmployeeId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount users 
                    client
                        .service("users")
                        .find({ query: { $limit: 10000 } })
                        .then((res) => {
                            setEmployeeId(res.data.map((e) => ({ name: e['name'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity.name,
            employeeId: _entity.employeeId,
            dob: _entity.dob,
            gender: _entity.gender,
            phone: _entity.phone,
            email: _entity.email,
            address: _entity.address,
            employment: _entity.employment,
            status: _entity.status,
            hire: _entity.hire,
            date: _entity.date,
            terminationDate: _entity.terminationDate,
            department: _entity.department,
            managerSupervisor: _entity.managerSupervisor,
            salary: _entity.salary,
        };

        setLoading(true);
        try {
            
        await client.service("employee").patch(_entity._id, _data);
        const eagerResult = await client
            .service("employee")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "employeeId",
                    service : "users",
                    select:["name"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info employee updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    // children dropdown options

    const employeeIdOptions = employeeId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="employee-edit-dialog-component">
                <div>
                <p className="m-0">Name :</p>
                <InputText className="w-full mb-3" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">employeeId:</p>
                <Dropdown value={_entity?.employeeId?._id} options={employeeIdOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("employeeId", e.value)} />
            </div>
            <div>
                <p className="m-0">dob:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.dob)} onChange={ (e) => setValByKey("dob", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">gender:</p>
                <Dropdown value={_entity?.gender} options={genderOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("gender", e.value)} />
            </div>
            <div>
                <p className="m-0">Phone:</p>
                <InputText className="w-full mb-3" value={_entity?.phone} onChange={(e) => setValByKey("phone", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Email:</p>
                <InputText className="w-full mb-3" value={_entity?.email} onChange={(e) => setValByKey("email", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Address:</p>
                <InputText className="w-full mb-3" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Employment:</p>
                <InputText className="w-full mb-3" value={_entity?.employment} onChange={(e) => setValByKey("employment", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">status:</p>
                <Checkbox checked={_entity?.status} onChange={ (e) => setValByKey("status", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">hire:</p>
                <Checkbox checked={_entity?.hire} onChange={ (e) => setValByKey("hire", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">date:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.date)} onChange={ (e) => setValByKey("date", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">terminationDate:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.terminationDate)} onChange={ (e) => setValByKey("terminationDate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">Department:</p>
                <InputText className="w-full mb-3" value={_entity?.department} onChange={(e) => setValByKey("department", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Manager Supervisor:</p>
                <InputText className="w-full mb-3" value={_entity?.managerSupervisor} onChange={(e) => setValByKey("managerSupervisor", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">salary:</p>
                <InputText type="number" className="w-full mb-3" value={_entity?.salary} onChange={(e) => setValByKey("salary", e.target.value)}  />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(EmployeeCreateDialogComponent);
