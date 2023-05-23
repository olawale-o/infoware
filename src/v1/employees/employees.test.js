const supertest = require('supertest');
const app = require('../../app');
const employees = require('./employee.data');

let employeeId = null;
describe('Employees', () => {
  describe('POST /api/v1/employees', () => {
    it('should create a new employee', async () => {
      const response = await supertest(app)
        .post('/api/v1/employees')
        .send(employees[0]);
      employeeId = response.body.data.id;
      expect(response.statusCode).toBe(201);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('full_name');
      expect(response.body.data).toHaveProperty('job_title');
      expect(response.body.data).toHaveProperty('phone_number');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('address');
      expect(response.body.data).toHaveProperty('city');
      expect(response.body.data).toHaveProperty('state');
      expect(response.body.data).toHaveProperty('contacts');
      expect(response.body.data.contacts).toHaveLength(employees[0].contacts.length);
    });
    it('should return an error if required fields are missing', async () => {
      const response = await supertest(app)
          .post('/api/v1/employees')
          .send({});
      expect(response.statusCode).toBe(422);
    });
  });
    
  describe('GET /api/v1/employees', () => {
    it('should return all employees', async () => {
      const response = await supertest(app)
          .get(`/api/v1/employees?per_page=5&page=1&include=metadata`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(1);
    });
  });
    
  describe('GET /api/v1/employees/:id', () => {
    it('should return an employee', async () => {
      const response = await supertest(app)
        .get(`/api/v1/employees/${employeeId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('full_name');
      expect(response.body.data).toHaveProperty('job_title');
      expect(response.body.data).toHaveProperty('phone_number');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('address');
      expect(response.body.data).toHaveProperty('city');
      expect(response.body.data).toHaveProperty('state');
      expect(response.body.data).toHaveProperty('contacts');
      expect(response.body.data.contacts).toHaveLength(employees[0].contacts.length);
    });
    it('should return an error if employee is not found', async () => {
      const response = await supertest(app)
        .get('/api/v1/employees/100');
      expect(response.statusCode).toBe(404);
    });
  });
    
  describe('PUT /api/v1/employees/:id', () => {
    it('should update an employee', async () => {
      const response = await supertest(app)
        .put(`/api/v1/employees/${employeeId}`)
        .send(employees[1]);
      expect(response.statusCode).toBe(204);
    });
    it('should return an error if required fields are missing', async () => {
      const response = await supertest(app)
        .put(`/api/v1/employees/${employeeId}`)
        .send({});
      expect(response.statusCode).toBe(422);
    });
    it('should return an error if employee is not found', async () => {
      const response = await supertest(app)
          .put('/api/v1/employees/100')
          .send(employees[1]);
        expect(response.statusCode).toBe(404);
    });
  });
    
  describe('DELETE', () => {
    it('should delete an employee', async () => {
      const response = await supertest(app)
        .delete(`/api/v1/employees/${employeeId}`);
      expect(response.statusCode).toBe(204);
    });
    it('should return an error if employee is not found', async () => {
      const response = await supertest(app)
        .delete('/api/v1/employees/100');
      expect(response.statusCode).toBe(404);
    });
  });
});