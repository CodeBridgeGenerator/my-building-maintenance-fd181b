
import { faker } from "@faker-js/faker";
export default (count,useridIds,buildingidIds,requestidIds,assignedtouseridIds,buildingIdIds,requestIdIds,performedByUseridIds,employeeIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.name.fullName(),
email: faker.internet.email(),
image: faker.image.avatar(),

        };
        data = [...data, fake];
    }
    return data;
};
