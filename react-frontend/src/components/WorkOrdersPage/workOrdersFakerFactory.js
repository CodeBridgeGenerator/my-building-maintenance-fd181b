
import { faker } from "@faker-js/faker";
export default (count,useridIds,buildingidIds,requestidIds,assignedtouseridIds,buildingIdIds,requestIdIds,performedByUseridIds,employeeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
requestid: requestidIds[i % requestidIds.length],
assignedtouserid: assignedtouseridIds[i % assignedtouseridIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
