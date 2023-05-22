module.exports = (app) => {
  app.use('/api/v1/employees', require('./v1/employes'));
};

