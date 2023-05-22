const db = require('../../models');
const AppError =  require('../../common/app-error');

exports.new = async (employee) => {
  const {
    fullName,
    jobTitle,
    phoneNumber,
    email,
    address,
    city,
    state,
    contacts,
  } = employee;
  return db.sequelize.transaction(async (t) => {
    const newEmployee = await db.Employee.create({
      full_name: fullName,
      job_title: jobTitle,
      phone_number: phoneNumber,
      email,
      address,
      city,
      state,
    }, { transaction: t });
    const newContacts = await db.Contact.bulkCreate(contacts.map((contact) => {
      return {
        contact_name: contact.contactName,
        relationship: contact.relationship,
        phone_number: contact.phoneNumber,
        contact_type: contact.contactType,
        employee_id: newEmployee.id,
      };
    }), { transaction: t });
    return {
      ...newEmployee.toJSON(),
      contacts: newContacts,
    };
  });
};

exports.index = async () => {
  return db.Employee.findAll({
    include: [{
      model: db.Contact,
      as: 'contacts',
    }],
  });
};

exports.show = async (id) => {
  return db.Employee.findByPk(id, {
    include: [{
      model: db.Contact,
      as: 'contacts',
    }],
  });
};

exports.update = async (id, employee) => {
  const {
    fullName,
    jobTitle,
    phoneNumber,
    email,
    address,
    city,
    state,
    contacts,
  } = employee;
  const isFound = await db.Employee.findByPk(id);
  if (!isFound) {
    throw new AppError(404, 'Employee not found');
  }
  return db.Employee.update({
    full_name: fullName,
    job_title: jobTitle,
    phone_number: phoneNumber,
    email,
    address,
    city,
    state,
  }, {
    where: { id, },
  }).then((employee) => {
    db.Contact.destroy({
      where: {
        employee_id: id,
      },
    }).then((contact) => {
      db.Contact.bulkCreate(contacts.map((contact) => {
        return {
          contact_name: contact.contactName,
          relationship: contact.relationship,
          phone_number: contact.phoneNumber,
          contact_type: contact.contactType,
          employee_id: id,
        };
      })).then((contact) => {})
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  });
};

exports.delete = async (id) => {
  const isFound = await db.Employee.findByPk(id);
  if (!isFound) {
    throw new AppError(404, 'Employee not found');
  }
  return db.Employee.destroy({
    where: {
      id,
    },
  });
};