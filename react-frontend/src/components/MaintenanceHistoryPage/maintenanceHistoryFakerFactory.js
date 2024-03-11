
import { faker } from "@faker-js/faker";
export default (count,useridIds,buildingidIds,requestidIds,assignedtouseridIds,buildingIdIds,requestIdIds,performedByUseridIds,employeeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
buildingId: buildingIdIds[i % buildingIdIds.length],
requestId: requestIdIds[i % requestIdIds.length],
performedByUserid: performedByUseridIds[i % performedByUseridIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
