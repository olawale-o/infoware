const service = require('./service');

exports.new = async (req, res, next) => {
  try {
    const employee = await service.new(req.body);
    if (!employee) {
      return res.status(400).json({
        status: 'error',
        message: 'Error creating employee',
      });
    }
    return res.status(201).json({
      status: 'success',
      data: employee,
    });
  } catch(e) {
    console.log(e);
    next(e);
  }
};

exports.index = (req, res, next) => {};

exports.show = async (req, res, next) => {
  try {
    const employee = await service.show(parseInt(req.params.id));
    if (!employee) {
      return res.status(404).json({
        status: 'error',
        message: 'Employee not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: employee,
    });
  } catch(e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const employee = await service.update(parseInt(req.params.id), req.body);
    return res.status(204).json({
      status: 'success',
      data: employee,
    });
  } catch(e) {
    next(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const employee = await service.delete(parseInt(req.params.id));
    return res.status(204).json({
      status: 'success',
      data: employee,
    });
  } catch(e) {
    next(e);
  }
};