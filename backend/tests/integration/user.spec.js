const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('User', () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  })

  afterAll(async() => {
    await connection.destroy();
  })

  it('should be able to create a new User', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: "Wallace",
        email: "wallacerheimon@yahoo.com",
        password: "123456",
        whatsapp: "38997457621",
        city: "Sampa",
        uf: "SP"
      });

      expect(response.status()).toBeEqual(204)
  });
});