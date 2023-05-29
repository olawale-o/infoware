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
    const { page, per_page, include } = req.query;
    const [employees, total] = await service.index(parseInt(per_page), parseInt(page - 1) * per_page);
    const metadata = {
      currentPage: parseInt(page),
      per_page: parseInt(per_page),
      totalRecords: total,
      links: [
        {self: `/employees?page=${page}&per_page=${per_page}`},
        {prev: page - 1 < 1 ? null : `/employees?page=${page - 1}&per_page=${per_page}`},
        {next: (parseInt(page) + 1) > Math.ceil(total / parseInt(per_page)) ? null : `/employees?page=${parseInt(page) + 1}&per_page=${per_page}` },
        {first: `/employees?page=1&per_page=${per_page}`},
        {last: `/employees?page=${Math.ceil(total / parseInt(per_page))}&per_page=${per_page}`},
      ]
    };
    return res.status(200).json({
      status: 'success',
      metadata: include === 'metadata' ? metadata : null,
      data: employees,
    });
  } catch(e) {
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