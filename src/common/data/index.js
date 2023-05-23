const { faker } = require('@faker-js/faker');

function createRandomEmployee() {
  return {
    full_name: faker.person.fullName(),
    job_title: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
  };
}

function createRandomContact() {
  return {
    contactName: faker.person.fullName(),
    relationship: faker.helpers.arrayElement(['friend', 'family', 'colleague', 'wife', 'husband']),
    phoneNumber: faker.phone.number(),
    contactType: faker.helpers.arrayElement(['primary', 'secondary']),
  }
}

function createRandomEmployeeWithContacts() {
  const contacts = faker.helpers.multiple(createRandomContact, { count: 2 });
  return {
    fullName: faker.person.fullName(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    contacts,
  };
}

module.exports = {
  createRandomEmployee,
  createRandomContact,
  createRandomEmployeeWithContacts,
};