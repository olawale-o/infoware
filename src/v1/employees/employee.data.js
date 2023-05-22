const {faker} = require('@faker-js/faker');

const employeesData = [];
const contacts = [];

for (let i = 0; i < 3; i++) {
  contacts.push(
    {
      contactName: faker.person.fullName(),
      relationship: faker.helpers.arrayElement(['friend', 'family', 'colleague', 'wife', 'husband']),
      phoneNumber: faker.phone.number(),
      contactType: faker.helpers.arrayElement(['primary', 'secondary']),
    }
  );
}

for (let i = 0; i < 6; i++) {
    employeesData.push(
    {
        fullName: faker.person.fullName(),
        jobTitle: faker.person.jobTitle(),
        phoneNumber: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        contacts: faker.helpers.arrayElements(contacts, 2),
      }
  );
}
const empoloyees = faker.helpers.arrayElements(employeesData, 3);

module.exports = empoloyees;
