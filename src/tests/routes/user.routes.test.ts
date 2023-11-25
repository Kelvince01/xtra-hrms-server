import request from 'supertest'

import app from '../../server'

describe('User routes', () => {
  test('Get all users', async () => {
    const res = await request(app).get('/api/users')
    expect(res.body).toEqual(['Goon', 'Tsuki', 'Joe'])
  })
})
