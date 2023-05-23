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

exports.index = async (req, res, next) => {
  try {
    const { page, limit, } = req.query;
    const [employees, total] = await service.index(parseInt(limit), parseInt(page - 1) * limit);
    return res.status(200).json({
      status: 'success',
      metadata: {
        currentPage: parseInt(page),
        limit: parseInt(limit),
        offset: parseInt(page - 1) * limit,
        totalRecords: total,
        first: `/employees?limit=${limit}&page=1`,
        previous: page > 1 ? `/employees?limit=${limit}&page=${page - 1}` : null,
        next: page < Math.ceil(total / limit) ? `/employees?limit=${limit}&page=${page + 1}` : null,
      },
      data: employees,
    });
  } catch(e) {
    console.log(e);
    next(e);
  }
};

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