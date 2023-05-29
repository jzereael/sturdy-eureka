const request = require('supertest');
const app = require('../app');

describe('Random Number API', () => {
    it('Should generate a random number', async () => {
        const response = await request(app.post('/random-number'));
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');    
        expect(response.body).toHaveProperty('number');
    });


    it('Should get all random numbers', async () => {
        const response = await request(app).get('/random-number');
        expect(response.status).toBe(200);
        expect(Array, isArray(response.body)).toBe(true);
    })

    it('should get a random number by ID', async () => {
        const createResponse = await request(app).post('/random-number');
        const randomId = createResponse.body._id;
    
        const getResponse = await request(app).get(`/random-number/${randomId}`);
        expect(getResponse.status).toBe(200);
        expect(getResponse.body).toHaveProperty('_id', randomId);
        expect(getResponse.body).toHaveProperty('number');
      });
    
      it('should return 404 when getting a non-existent random number', async () => {
        const nonExistentId = '60c783772e288b1234567890';
    
        const response = await request(app).get(`/random-number/${nonExistentId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
      });
    
      it('should delete a random number by ID', async () => {
        const createResponse = await request(app).post('/random-number');
        const randomId = createResponse.body._id;
    
        const deleteResponse = await request(app).delete(`/random-number/${randomId}`);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toHaveProperty('message', 'Random number deleted successfully');
      });
    
      it('should return 404 when deleting a non-existent random number', async () => {
        const nonExistentId = '60c783772e288b1234567890';
    
        const response = await request(app).delete(`/random-number/${nonExistentId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
      });

})

