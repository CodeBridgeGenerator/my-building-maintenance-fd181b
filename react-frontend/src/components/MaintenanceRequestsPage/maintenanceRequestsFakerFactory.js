
import { faker } from "@faker-js/faker";
export default (count,useridIds,buildingidIds,requestidIds,assignedtouseridIds,buildingIdIds,requestIdIds,performedByUseridIds,employeeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
buildingid: buildingidIds[i % buildingidIds.length],
userid: useridIds[i % useridIds.length],
description: faker.commerce.productDescription(),
category: faker.company.catchPhraseAdjective(),

        };
        data = [...data, fake];
    }
    return data;
};
