
import { faker } from "@faker-js/faker";
export default (count,useridIds,buildingidIds,requestidIds,assignedtouseridIds,buildingIdIds,requestIdIds,performedByUseridIds,employeeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
buildingName: faker.company.name(),
address: faker.address.buildingNumber(),
userid: useridIds[i % useridIds.length],

        };
        data = [...data, fake];
    }
    return data;
};
