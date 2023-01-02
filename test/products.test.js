const dotenv = require('dotenv');
const request = require('supertest');
const { appDataSource } = require('../models/data-source');
const { createApp } = require('../app');
dotenv.config();

describe('main-page-get', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
  });
  afterAll(async () => {
    await appDataSource.destroy();
  });

  test('FAILED: KEY_ERROR', async () => {
    await request(app)
      .get('/products')
      .expect(400)
      .expect({ message: 'KEY_ERROR' });
  });

  test('SUCCESS', async () => {
    await request(app)
      .get(
        '/products?page=0&category=hanok&room_type=private&bedroom=1&bed=2&min_price=30000&max_price=1000000&bathroom=1'
      )
      .expect(200);
  });

  test('FAILED: KEY_ERROR', async () => {
    await request(app)
      .get('/products/search')
      .expect(400)
      .expect({ message: 'KEY_ERROR' });
  });
  test('SUCCESS', async () => {
    await request(app)
      .get(
        '/products/search?page=0&region=seoul&category=hanok&check_in=2022/12/31&check_out=2023/01/01&bedroom=1&bed=1&bathroom=1&min_price=10000&max_price=100000&room_type=private'
      )
      .expect(200);
  });
});
