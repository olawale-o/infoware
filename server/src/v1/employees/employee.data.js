const {faker} = require('@faker-js/faker');
const {createRandomEmployeeWithContacts } = require('../../common/data');

const empoloyees = faker.helpers.multiple(createRandomEmployeeWithContacts, { count: 3 });

module.exports = empoloyees;
